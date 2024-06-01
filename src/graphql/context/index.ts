import MemberAPI from "@/services/memberAPI";
import UserAPI from "@/services/userAPI";
import DuesAPI from "@/services/dueAPI";
import type { PrismaClient } from "@prisma//client";
import { NextRequest } from "next/server";
import PaymentAPI from "@/services/paymentAPI";
import DashboardAPI from "@/services/dashboardAPI";
import BlogAPI from "@/services/blogAPI";
import EventAPI from "@/services/eventAPI";

export type GraphQLContext = {
    prisma: PrismaClient,
    host: string,
    userId: string,
    request: NextRequest,
    dataSources: {
        userAPI: UserAPI
        memberAPI: MemberAPI
        dueAPI: DuesAPI,
        paymentAPI: PaymentAPI,
        dashboardAPI: DashboardAPI,
        blogAPI: BlogAPI,
        eventAPI: EventAPI,
    };
}
