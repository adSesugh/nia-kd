import { NewMember, SignInUser } from "@/graphql/__generated__/graphql";
import { authenticateUser } from "@/lib/common";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

class UserAPI extends RESTDataSource {
    async getUsers(prisma: PrismaClient) {
        const users = await prisma.user.findMany({
            include: {
                events: true
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
        const salt = await bcrypt.genSalt(Number(process.env.NEXT_PUBLIC_HASH_SALT))
        const newPassword = input.password ? input.password : `new@${new Date().getFullYear}`
        const hashPassword = bcrypt.hashSync(newPassword, salt)

        const newUser = await prisma.user.create({
            data: {
                regId: input.regId,
                password: hashPassword,
                member: {
                    create: {
                        regId: input.regId,
                        firstName: input.firstName,
                        lastName: input.lastName,
                        email: input.email,
                        phoneNumber: input.phoneNumber,
                        photoURL: input.photoURL,
                        address: input.address
                    }
                }
            }
        })
        return newUser
    }

    async loginUser(prisma: PrismaClient, input: SignInUser) {
        const { regId, password, rememberMe } = input
        const user = await prisma.$transaction(async (tx) => {
            const user = tx.user.findUnique({ where: { regId } })
            return user
        });

        if (!user) {
            throw new Error('Invalid Membership ID or password');
        }

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid Membership ID or password');
        }

        const token = authenticateUser(user.regId);
        return { token, user };
    }
}

export default UserAPI