import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors"
import { DueInput, DueUpdateInput, MemberDueResponse } from "@/graphql/__generated__/graphql";
import moment from "moment";
import { getNumberOfDaysInYear, isDateRangeMoreThanOneYear } from "@/lib/helpers";

class DueAPI extends RESTDataSource {

    async getDues(prisma: PrismaClient) {
        const dues = await prisma.dues.findMany({
            where: {
                deletedAt: null
            },
            include: {
                user: {
                    include: {
                        member: true,
                    }
                },
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
                id,
                deletedAt: null
            }
        })
        return due
    }

    async createDue(prisma: PrismaClient, input: DueInput, userId: string) {

        if (userId === null) {
            throw new GraphQLError('Unauthenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }

        const isTrue = await isDateRangeMoreThanOneYear(input.startsAt, input.endsAt)
        console.log(isTrue)

        // if(isTrue) {
        //     throw new GraphQLError("Date out of bound", {
        //         extensions: {
        //             code: ApolloServerErrorCode.GRAPHQL_PARSE_FAILED,
        //             http: { status: 200 }
        //         }
        //     })
        // }

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

        const formattedData = input.membership?.map((membership) => {
            return {
                membershipTypeId: membership.id,
                amount: membership.amount,
                name: input.name,
                startsAt: new Date(input.startsAt),
                endsAt: new Date(input.endsAt),
                status: input.status as string,
                userId: userId
            }
        })

        await prisma.dues.createMany({
            data: [...formattedData as any]
        })

        return {
            code: 201,
            success: true,
            message: "Due created"
        }
    }

    async updateDue(prisma: PrismaClient, dueId: string, input: DueUpdateInput, userId: string) {

        if (userId === null) {
            throw new GraphQLError('Unauthenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }
        
        const due = await prisma.dues.update({
            where: {
                id: dueId
            },
            data: {
                amount: input.amount,
                startsAt: input.startsAt,
                endsAt: input.endsAt,
                name: input.name as string,
                userId: userId
            }
        })

        return {
            code: 200,
            success: true,
            message: "Due updated",
            due
        }
    }

    async archiveDue(prisma: PrismaClient, dueId: string) {
        (await prisma.dues.update({
            where: {
                id: dueId
            },
            data: {
                deletedAt: new Date(),
                status: 'Archived'
            }
        }))

        return true
    }

    async getUnpaidDues(prisma: PrismaClient, memberId: string, membershipTypeId: string) {

        const allDues = await prisma.dues.findMany({
            where: {
                deletedAt: null,
                membershipTypeId
            },
            include: {
                payments: true,
            },
        });
      
        const unpaidDues = allDues.filter(due => {
          const totalPaidByMember = due.payments
            .filter(payment => payment.memberId === memberId)
            .reduce((sum, payment) => sum + Number(payment.amount), 0);
      
          return totalPaidByMember < Number(due.amount);
        });
      
        return unpaidDues;
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