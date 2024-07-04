import { UploadResponse } from "@/graphql/__generated__/graphql";
import { s3FileUpload } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";

class MemberAPI extends RESTDataSource {

    async getMembers(prisma: PrismaClient, userId: string) {

        if (userId === null) {
            throw new GraphQLError('Unauthenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }
        const members = await prisma.member.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return members
    }

    async getMember(prisma: PrismaClient, id: string) {
        const member = await prisma.member.findFirst({
            where: {
                id
            },
            include: {membershipType: true}
        })
        return member
    }

    async deactivate(prisma: PrismaClient, memberId: string, status: string) {
        const member = await prisma.member.update({
            where: {
                id: memberId
            },
            data: {
                status
            }
        })

        if (status === 'Inactive') {
            await prisma.user.update({
                where: {
                    id: member.userId
                },
                data: {
                    status
                }
            })
        }

        return member
    }

    async uploadPhoto(prisma: PrismaClient, memberId: string, photo: string){
        const buffer = photo ? Buffer.from(photo.split(',')[1], 'base64') : '';
        
        const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/profile/${memberId}` : ''

        const res =  await s3FileUpload(`profile/${memberId}`, 'image/png', buffer)
        if(res.httpStatusCode === 200){
            await prisma.member.update({
                where: {
                    id: memberId
                },
                data: {
                    photoURL: url
                }
            })
        }
        const preSignedURL: UploadResponse = {
            url
        }
        return preSignedURL
    }
}

export default MemberAPI