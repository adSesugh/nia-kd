import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";

class MemberAPI extends RESTDataSource {

    async getMembers(prisma: PrismaClient, userId: string) {
        console.log(userId)
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
            }
        })
        return member
    }
}

export default MemberAPI