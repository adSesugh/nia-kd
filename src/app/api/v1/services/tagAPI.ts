import { NewTag } from "@/graphql/__generated__/graphql";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";

class TagAPI extends RESTDataSource {
    async getTags(prisma: PrismaClient) {
        const tags = await prisma.tag.findMany({})
        return tags
    }

    async getTag(prisma: PrismaClient, id: string) {
        const tag = await prisma.tag.findUnique({
            where: {
                id
            },
            include: {
                blogs: true
            }
        })
        return tag
    }

    async addTag(prisma: PrismaClient, input: NewTag) {
        const tag = prisma.tag.create({
            data: {
                name: input.name
            }
        })
        return tag
    }

    async modifyTag(prisma: PrismaClient, id: string, name: string) {
        const tag = prisma.tag.update({
            where: {
                id
            },
            data: {
                name,
            }
        })
        return tag
    }
}

export default TagAPI