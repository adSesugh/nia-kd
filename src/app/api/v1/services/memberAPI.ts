import { NewMember } from "@/graphql/__generated__/graphql";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { createWriteStream } from "fs";
import { join } from "path";

class MemberAPI extends RESTDataSource {
    async createMember(prisma: PrismaClient, host: string, input: NewMember) {
        const salt = await bcrypt.genSalt(Number(process.env.NEXT_PUBLIC_HASH_SALT))
        const newPassword = input.password ? input.password : `new@${new Date().getFullYear}`
        const hashPassword = bcrypt.hashSync(newPassword, salt)

        const { createReadStream, filename } = input.photoURL;

        const stream = createReadStream();
        const photoPath = join(process.cwd(), `public/members/${filename}`);
        await new Promise((resolve, reject) => {
            stream.pipe(createWriteStream(photoPath))
                .on('finish', resolve)
                .on('error', reject);
        });

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
                        photoURL: `${host}/members/${filename}`,
                        address: input.address
                    }
                }
            }
        })

        if (newUser) {
            const newMember = prisma.member.create({
                data: {
                    regId: input.regId,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    photoURL: input.photoURL,
                    address: input.address,
                    userId: newUser.id
                }
            })
            return {
                code: 200,
                success: true,
                message: "Member created!",
                member: newMember
            }
        }
        return {
            code: 400,
            success: false,
            message: "Failed to saved!",
            member: null
        }
    }

    async getMembers(prisma: PrismaClient) {
        const members = await prisma.member.findMany({})
        return members
    }

    async getMember(prisma: PrismaClient, id: string) {
        const member = await prisma.member.findFirst({
            where: {
                id
            }
        })
        return member
    }
}

export default MemberAPI