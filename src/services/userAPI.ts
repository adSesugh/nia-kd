import { NewMember, ResetPasswordResponse, SignInUser } from "@/graphql/__generated__/graphql";
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
            },
            include: {membershipType: true}
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
                membershipType: {
                    name: input.membershipType
                }
            }
        }))

        const memberType = await prisma.membershipType.findFirst({
            where: {
                id: input.membershipType
            }, 
            select: { name: true}
        })

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
                            membershipTypeId: input.membershipType,
                            membershipId: input.membershipId,
                            memberType: memberType?.name,
                            firstName: input.firstName,
                            lastName: input.lastName,
                            email: input.email,
                            phoneNumber: input.phoneNumber,
                            workplace: input.workplace
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
            }, include: { member: {
                include: {membershipType: true}
            }}
        })

        if (!loggedUser) {
            throw new GraphQLError("Invalid credentials", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                    http: { status: 200 },
                },
            })
        }

        const validPassword = await bcrypt.compare(password, loggedUser.password);
        
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
            member: loggedUser.member,
            photoURL: loggedUser.member?.photoURL
        }

        const token = authenticateUser(loggedUser.id as string);

        return { token, user }
    }

    async getMembershipTypes(prisma: PrismaClient) {
        const allMembershipTypes = await prisma.membershipType.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return allMembershipTypes
    }

    async resetPassword(prisma: PrismaClient, userId: string, password: string) {
        const salt = await bcrypt.genSalt(Number(process.env.NEXT_PUBLIC_HASH_SALT))
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashPassword
            }
        })

        const response: ResetPasswordResponse = {
            code: 200,
            success: true,
            message: 'Password reset succesffuly'
        }

        return response
    }
}

export default UserAPI