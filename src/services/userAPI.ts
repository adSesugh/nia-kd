import { NewMember, SignInUser } from "@/graphql/__generated__/graphql";
import { authenticateUser } from "@/lib/common";
import { generateZerofillID } from "@/lib/helpers";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors"

class UserAPI extends RESTDataSource {
    async getUsers(prisma: PrismaClient) {
        const users = await prisma.user.findMany({
            include: {
                member: {
                    select: { firstName: true, lastName: true }
                }
            }
        })
        return users
    }

    async getUser(prisma: PrismaClient, id: string) {
        const user = await prisma.member.findFirst({
            where: {
                userId: id
            }
        })
        return user
    }

    async addUser(prisma: PrismaClient, input: NewMember) {

        const currentYear = new Date().getFullYear()
        const salt = await bcrypt.genSalt(Number(process.env.NEXT_PUBLIC_HASH_SALT))
        const newPassword = input.password ? input.password : `new@${currentYear}`
        const hashPassword = bcrypt.hashSync(newPassword, salt)

        const userExists = (await prisma.member.findFirst({
            where: {
                email: input.email,
                phoneNumber: input.phoneNumber,
                membershipType: input.membershipType
            }
        }))

        if (userExists) {
            throw new GraphQLError("Account already exists", {
                extensions: {
                    code: ApolloServerErrorCode.GRAPHQL_PARSE_FAILED,
                    http: { status: 200 }
                }
            })
        }

        const counter = (await prisma.counter.findFirst({
            where: {
                name: "MemberReg"
            }
        }))?.number

        const newNumber = generateZerofillID(Number(counter))
        const registrationId = `NIA/KD/${currentYear}/${newNumber}`

        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    regId: registrationId,
                    password: hashPassword,
                    email: input.email,
                    member: {
                        create: {
                            regId: registrationId,
                            membershipType: input.membershipType,
                            membershipId: input.membershipId,
                            firstName: input.firstName,
                            lastName: input.lastName,
                            email: input.email,
                            phoneNumber: input.phoneNumber,
                            address: input.address
                        }
                    }
                },
                include: { member: true }
            })

            const nextNumber: number = Number(counter) + 1

            const nextCounter = await tx.counter.update({
                where: {
                    name: "MemberReg"
                },
                data: {
                    number: nextNumber
                }
            })

            return { user, nextCounter }
        });

        return {
            code: 201,
            success: true,
            message: "Account created successfully"
        }
    }

    async loginUser(prisma: PrismaClient, input: SignInUser) {
        const { regId, password, rememberMe } = input
        const loggedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { regId: regId },
                    { email: regId }
                ]
            }, include: { member: true }
        })

        if (!loggedUser) {
            throw new GraphQLError("Invalid credentials", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                    http: { status: 200 },
                },
            })
        }

        const validPassword = bcrypt.compare(password, loggedUser.password);
        if (!validPassword) {
            throw new GraphQLError("Invalid credentials", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                    http: { status: 200 },
                },
            })
        }

        const user = {
            id: loggedUser.id,
            regId: loggedUser.regId as string,
            role: loggedUser.role,
            member: loggedUser.member
        }

        const token = authenticateUser(loggedUser.regId as string);

        return { token, user }
    }
}

export default UserAPI