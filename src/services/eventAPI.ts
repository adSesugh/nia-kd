import { EventFormInput, EventInput } from "@/graphql/__generated__/graphql";
import s3Client from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

class EventAPI extends RESTDataSource {
    async createEvent(prisma: PrismaClient, input: EventInput) {

        const buffer = input.coverPhoto ? Buffer.from(input.coverPhoto.split(',')[1], 'base64') : '';

        const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${input.name.toLowerCase().replaceAll(' ', '-')}` : ''

        const event = await prisma.event.create({
            data: {
                name: input.name,
                description: input.description as string,
                cpdp_points: Number(input.cpdpPoint),
                type: input.type,
                link: input.link,
                address: input.address,
                starts_at: input.starts_at,
                ends_at: input.ends_at,
                paymentType: input.paymentType,
                amount: input.amount,
                tickets: input.tickets ? input.tickets : 0,
                isInfinity: input.isInfinity as boolean,
                coverPhoto: url,
                formTitle: input.formTitle,
                instructions: input.instructions,
                message: input.message,
                eventForms: {
                    create: [...input.form as any],
                },
                eventResources: {
                    create: [...input.resources as any]
                },
                certificate: input.certificate,
                hasCertificate: input.hadCertificate as boolean,
                userId: '3315ed4a-f3f6-480e-8c30-06ad44aca84c',
            }
        })

        await prisma.formDesign.createMany({
            data: [...input.form as any],
            skipDuplicates: true
        })

        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
            Key: `blogs/${event.id}`,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        });

        const { $metadata: res } = await s3Client.send(command);

        if (res.httpStatusCode === 200) {
            return {
                code: res.httpStatusCode,
                success: true,
                message: "Event created",
                event
            }
        }

        return {
            code: 400,
            success: false,
            message: "Error occurred",
            event: null
        }
    }

    async getEvent(prisma: PrismaClient, eventId: string) {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId
            },
            include: { user: { include: { member: true } }, eventForms: true }
        })

        return event
    }

    async getEvents(prisma: PrismaClient) {
        const events = await prisma.event.findMany({
            include: { user: { include: { member: true } }, eventForms: true }
        })

        return events
    }

    async getFormFields(prisma: PrismaClient) {
        const formFields = await prisma.formDesign.findMany({})

        return formFields
    }
}

export default EventAPI