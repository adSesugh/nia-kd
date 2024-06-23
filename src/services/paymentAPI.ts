import { PaymentInput } from "@/graphql/__generated__/graphql";
import { RESTDataSource } from "@apollo/datasource-rest";
import { Member, PrismaClient } from "@prisma/client";

class PaymentAPI extends RESTDataSource {

    async getPayments(prisma: PrismaClient, memberId?: string) {
        const payments = await prisma.payment.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: { due: true, member: true },
            where: {
                OR: [
                    {memberId}
                ]
            }
        })

        return payments
    }

    async memberPayments(prisma: PrismaClient, memberId: string) {
        const payments = await prisma.payment.findMany({
            where: {
                memberId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: { due: true }
        })

        return payments
    }

    async getPayment(prisma: PrismaClient, paymentId: string) {
        const payment = await prisma.payment.findFirst({
            where: {
                id: paymentId
            },
            include: { due: true, member: true }
        })

        return payment
    }

    async postPayment(prisma: PrismaClient, input: PaymentInput) {
        const payment = await prisma.payment.create({
            data: {
                paymentType: input.paymentType,
                description: input.description,
                eventId: input.eventId,
                phoneNumber: input.phoneNumber,
                amount: input.amount,
                memberId: input.memberId as string,
                duesId: input.duesId as string,
                paymentRef: input.paymentRef as string,
                status: input.status as string
            }
        })

        return payment
    }
}

export default PaymentAPI