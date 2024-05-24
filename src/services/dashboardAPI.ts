import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";

class DashboardAPI extends RESTDataSource {
    async getRecentRegistrations(prisma: PrismaClient) {
        const newMembers = await prisma.member.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })

        return newMembers
    }
}

export default DashboardAPI