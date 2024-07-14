import { EventForm, EventInput, EventRegistrationInput, SendMailInput } from "@/graphql/__generated__/graphql";
import { sendEmail } from "@/lib/mailer";
import { s3FileUpload, s3FileUploadPdf } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import moment from "moment";

class EventAPI extends RESTDataSource {

    todayDate = new Date(moment().format("Y-MM-D"))
    startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
    endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))

    async createEvent(prisma: PrismaClient, input: EventInput) {

        const buffer = input.coverPhoto ? Buffer.from(input.coverPhoto.split(',')[1], 'base64') : '';

        const event = await prisma.event.create({
            data: {
                name: input.name,
                description: input.description || '',
                type: input.type,
                link: input.link,
                address: input.address,
                starts_at: new Date(input.starts_at),
                starts_time: input.starts_time,
                ends_at: new Date(input.ends_at),
                ends_time: input.ends_time,
                paymentType: input.paymentType,
                amount: input.amount,
                tickets: input.tickets || 0,
                isInfinity: input.isInfinity || false,
                formTitle: input.formTitle,
                instructions: input.instructions,
                message: input.message,
                cpdp_points: input.cpdpPoint || 0,
                hasCertificate: input.hasCertificate || false,
                sendTag: input.sendTag || false,
            }
        })

        if(input.form) {
            const formFields = input.form.map((field) => {
                return {
                    name: field.name,
                    label: field.label,
                    required: field.required,
                    type: field.type,
                    eventId: event.id
                }
            })
            await prisma.eventForm.createMany({
                data: [...formFields as any]
            })
        }

        if (input.coverPhoto){
            const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/${input.name.toLowerCase().replaceAll(' ', '-')}` : ''

            const res =  await s3FileUpload(`events/${event.id}/${event.name.toLowerCase().replaceAll(' ', '-')}`, 'image/png', buffer)
            if(res.httpStatusCode === 200){
                await prisma.event.update({
                    where: {
                        id: event.id
                    },
                    data: {
                        coverPhoto: url
                    }
                })
            }
        }

        if(input.certificate){
            const certBuffer = input.certificate ? Buffer.from(input.certificate.split(',')[1], 'base64') : '';
            const certificateUrl: string = certBuffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/certificate` : ''
            const certRes =  await s3FileUpload(`events/${event.id}/certificate`, 'image/png', certBuffer)
            if(certRes) {
                await prisma.event.update({
                    where: {
                        id: event.id
                    },
                    data: {
                        certificate: certificateUrl
                    }
                })
            }
        }

        if(input.resources && input?.resources?.length > 0){
            input.resources.forEach(async (resource, index) => {
                const buffer = resource ? Buffer.from(resource.resourceUrl.split(',')[1], 'base64') : '';
                const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/resources/${index}.pdf` : ''
                const response =  await s3FileUploadPdf(`events/${event.id}/resources/${index}.pdf`, buffer)
                if(response.httpStatusCode === 200){
                    await prisma.eventResource.create({
                        data: {
                            eventId: event.id,
                            resourceUrl: url,
                            name: resource.name
                        }
                    })
                }
            })
        }

        if(input.sponsors && input?.sponsors?.length > 0){
            input.sponsors.forEach(async (sponsor, index) => {
                const buffer = sponsor ? Buffer.from(sponsor.split(',')[1], 'base64') : '';
                const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/sponsors/${index}` : ''
                const response =  await s3FileUpload(`events/${event.id}/sponsors/${index}`, 'image/png', buffer)
                if(response.httpStatusCode === 200){
                    await prisma.sponsor.create({
                        data: {
                            eventId: event.id,
                            logo: url
                        }
                    })
                }
            })
        }

        if(input.speakers && input.speakers.length > 0) {
            const speakers: any = []
            input.speakers.forEach(async (speaker, index) => {
                const buffer = speaker ? Buffer.from(speaker.avatar.split(',')[1], 'base64') : '';
                const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/speakers/${index}` : ''
                const response =  await s3FileUpload(`events/${event.id}/speakers/${index}`, 'image/png', buffer)
                if(response.httpStatusCode === 200){
                    speakers.push({...speaker, avatar: url, eventId: event.id})
                    await prisma.speaker.create({
                        data: {
                            eventId: event.id,
                            name: speaker.name,
                            title: speaker.title || '',
                            about: speaker.about,
                            avatar: url
                        }
                    })
                }
            })
        }

        return {
            code: 201,
            success: true,
            message: "Event created",
            event: event
        }
    }

    async getEvent(prisma: PrismaClient, eventId: string) {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
                deletedAt: null
            },
            include: { 
                user: { 
                    include: { 
                        member: true 
                    } 
                }, 
                speakers: true, 
                eventResources: true,
                eventRegistrations: true
            },
        })

        return event
    }

    async getEvents(prisma: PrismaClient) {
        const events = await prisma.event.findMany({
            include: { 
                user: { 
                    include: { 
                        member: true 
                    } 
                }, 
                eventForms: true,
                _count: {
                    select: { eventRegistrations: true },
                },
            },
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return events
    }

    async getFormFields(prisma: PrismaClient) {
        const formFields = await prisma.formDesign.findMany({})

        return formFields
    }

    async watchViews(prisma: PrismaClient, eventId: string){
        await prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        return true
    }

    async getRegisteredMembers(prisma: PrismaClient, eventId: string){
        const registeredMembers = await prisma.eventRegistration.findMany({
            where: {
                eventId
            }
        })

        return registeredMembers
    }

    async getMembersAttendance(prisma: PrismaClient, eventId: string){
        const membersAttendance = await prisma.eventRegistration.findMany({
            where: {
                eventId
            }
        })

        return membersAttendance
    }

    async cancelEvent(prisma: PrismaClient, eventId: string, status: string) {
        await prisma.event.update({
            where: {
                id: eventId,
                deletedAt: null
            },
            data: {
                status
            }
        })

        return true
    }

    async deleteEvent(prisma: PrismaClient, eventId: string) {
        (await prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                deletedAt: new Date(),
                status: 'Archived'
            }
        }))

        return true
    }

    async getRegistrationForm(prisma: PrismaClient, eventId: string) {

        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            },
            include: {eventForms: true}
        })

        return event
    }

    async getEventsForPublic(prisma: PrismaClient) {
        const events = await prisma.event.findMany({
            include: { 
                user: { 
                    include: { 
                        member: true 
                    } 
                }, 
                eventForms: true,
                _count: {
                    select: { eventRegistrations: true },
                },
            },
            where: {
                deletedAt: null,
                status: {
                    in: ['Published', 'Ended']
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return events
    }

    async upComingEvents(prisma: PrismaClient, memberId: string) {
        const todayDate = new Date(moment().format('Y-MM-DD'))

        const upComingEvents = prisma.eventRegistration.findMany({
            where: {
                memberId,
                event: {
                    starts_at: {
                        gt: todayDate
                    },
                    ends_at: {
                        lte: todayDate
                    },
                    status: {
                        notIn: ['Ended', 'Archived', 'Draft']
                    }
                }
            },

        })

        return upComingEvents
    }

    async passedEvents(prisma: PrismaClient) {
        const todayDate = new Date(moment().format('Y-MM-DD'))
        const events = prisma.event.findMany({
            where: {
                OR: [
                    {
                        ends_at: {
                            gt: todayDate
                        }
                    },
                    {
                        status: 'Ended'
                    }
                ]
            },
            include: {eventRegistrations: true}
        })

        return events
    }

    async postRegistration(prisma: PrismaClient, input: EventRegistrationInput) {
        const totalRegistration = await prisma.eventRegistration.count({
            where: {
                eventId: input.eventId
            }
        })

        const event = await prisma.event.findFirst({
            where: {
                id: input.eventId,
                ends_at: {
                    gt: this.todayDate
                }
            },
            select: {
                tickets: true,
                starts_at: true,
                ends_at: true,
                message: true,
                name: true
            }
        })

        if(event !== null && totalRegistration < Number(event?.tickets)) {
            
            const registered = await prisma.eventRegistration.create({
                data: {
                    eventId: input.eventId ?? null,
                    memberId: input.memberId ?? null,
                    registrantDetail: {...input.registrantDetail}
                }
            })

            if(input.payment) {
                await prisma.payment.create({
                    data: {
                        eventId: input.eventId ?? null,
                        paymentType: input.payment.paymentType,
                        memberId: input.memberId ?? null,
                        description: input.payment.description,
                        phoneNumber: input.payment.phoneNumber,
                        paymentRef: input.payment.paymentRef,
                        amount: parseFloat(input.payment.amount),
                        status: input.payment.status,
                        eventRegistrationId: registered.id
                    }
                })

                try {
                    sendEmail(
                        input.registrantDetail.email, 
                        'Event Registration', 
                        event.message as string, {
                            fullname: `${input.registrantDetail.first_name} ${input.registrantDetail.last_name}`,
                            eventName: event.name,
                            startDate: moment(event.starts_at).format('LL'),
                            endDate: moment(event.ends_at).format('LL'),
                            startTime: moment(event.starts_at).format('h:mm A'),
                            endTime: moment(event.ends_at).format('h:mm A')
                        }
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }

            return registered
        } else {
            throw new GraphQLError('Event registration closed', {
                extensions: {
                    code: 'NOTFOUND',
                    http: { status: 400 },
                },
            });
        }
    }

    async resendEventMail(prisma: PrismaClient, input: SendMailInput) {
        const event = await prisma.event.findFirst({where: {id: input.eventId}})
        try {
            sendEmail(
                input.email, 
                'Event Registration', 
                event?.message as string, {
                    fullname: `${input.firstName} ${input.lastName}`,
                    eventName: event?.name,
                    startDate: moment(event?.starts_at).format('LL'),
                    endDate: moment(event?.ends_at).format('LL'),
                    startTime: moment(event?.starts_at).format('h:mm A'),
                    endTime: moment(event?.ends_at).format('h:mm A')
                }
            )

            return true
        } catch (error: any) {
            console.log(error)
            return false
        }
    }
}

export default EventAPI