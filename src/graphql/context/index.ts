import BlogAPI from "@/app/api/v1/services/blogAPI";
import MemberAPI from "@/app/api/v1/services/memberAPI";
import TagAPI from "@/app/api/v1/services/tagAPI";
import UserAPI from "@/app/api/v1/services/userAPI";
import type { PrismaClient } from "@prisma//client";

export type GraphQLContext = {
    prisma: PrismaClient,
    host: string,
    userId: string,
    dataSources: {
        blogAPI: BlogAPI
        tagAPI: TagAPI
        memberAPI: MemberAPI
        userAPI: UserAPI
    };
}
