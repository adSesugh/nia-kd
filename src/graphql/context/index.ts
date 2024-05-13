import MemberAPI from "@/services/memberAPI";
import UserAPI from "@/services/userAPI";
import type { PrismaClient } from "@prisma//client";
import { NextRequest } from "next/server";

export type GraphQLContext = {
    prisma: PrismaClient,
    host: string,
    userId: string,
    request: NextRequest,
    dataSources: {
        userAPI: UserAPI
        memberAPI: MemberAPI
    };
}
