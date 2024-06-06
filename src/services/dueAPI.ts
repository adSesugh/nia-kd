import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors"
import { DueInput, MemberDueResponse } from "@/graphql/__generated__/graphql";
import moment from "moment";

class DueAPI extends RESTDataSource {
    async getDues(prisma: PrismaClient) {
        const dues = await prisma.dues.findMany({
            include: {
                user: {
                    include: {
                        member: true
                    }
                }
            },
            orderBy: {
                startsAt: 'desc'
            }
        })
        return dues
    }

    async getDue(prisma: PrismaClient, id: string) {
        const due = await prisma.dues.findFirst({
            where: {
                id
            }
        })
        return due
    }

    async createDue(prisma: PrismaClient, input: DueInput) {

        const dueExists = (await prisma.dues.findFirst({
            where: {
                startsAt: {
                    equals: new Date(input.startsAt)
                },
                endsAt: {
                    equals: new Date(input.endsAt)
                }
            }
        }))

        if (dueExists) {
            throw new GraphQLError("Due already exists", {
                extensions: {
                    code: ApolloServerErrorCode.GRAPHQL_PARSE_FAILED,
                    http: { status: 200 }
                }
            })
        }

        const due = await prisma.dues.create({
            data: {
                amount: input.amount,
                startsAt: new Date(input.startsAt),
                endsAt: new Date(input.endsAt),
                name: input.name as string,
                status: input.status as string,
                userId: 'fc73ac67-1a50-4edc-afd9-4b5a1f53acde'
            }
        })

        return {
            code: 201,
            success: true,
            message: "Due created",
            due
        }
    }

    async updateDue(prisma: PrismaClient, dueId: string, input: DueInput) {
        const due = await prisma.dues.update({
            where: {
                id: dueId
            },
            data: {
                amount: input.amount,
                startsAt: input.startsAt,
                endsAt: input.endsAt,
                name: input.name as string,
                status: input.status as string,
                userId: ''
            }
        })

        return {
            code: 201,
            success: true,
            message: "Due updated",
            due
        }
    }

    async getDuePayment(prisma: PrismaClient, memberId: string) {
        const todayDate = new Date(moment().format("Y-MM-D"))
        const endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))

        const checkPayment = await prisma.payment.findFirst({
            where: {
                memberId,
                due: {
                    AND: [
                        { startsAt: { lte: todayDate } },
                        { endsAt: { equals: endOfYear } }
                    ]
                }
            }, include: { due: true }
        })

        const duePayment = await prisma.dues.findFirst({
            where: {
                AND: [
                    { startsAt: { lte: todayDate } },
                    { endsAt: { equals: endOfYear } },
                    { status: { equals: 'Active' } }
                ]
            }
        })

        if (checkPayment && duePayment) {
            const response: MemberDueResponse = { ...duePayment, paymentStatus: true }
            return response
        }

        return duePayment
    }
}

export default DueAPI