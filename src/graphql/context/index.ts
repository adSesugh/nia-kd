import BlogAPI from "@/app/api/graphql/services/blogAPI";
import MemberAPI from "@/app/api/graphql/services/memberAPI";
import TagAPI from "@/app/api/graphql/services/tagAPI";
import UserAPI from "@/app/api/graphql/services/userAPI";
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


// export interface AppContext {
//     prisma: PrismaClient,
//     dataSources: {
//         blogAPI: BlogAPI;
//     }
// }