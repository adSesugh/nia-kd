import { EventForm, EventInput, EventRegistrationInput, SendMailInput } from "@/graphql/__generated__/graphql";
import { sendEmail } from "@/lib/mailer";
import { s3FileUpload, s3FileUploadPdf } from "@/lib/s3Client";
import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import moment from "moment";

class EventAPI extends RESTDataSource {

    private _todayDate = new Date(moment().format("Y-MM-D"))
    private _startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
    private _endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))

    async createEvent(prisma: PrismaClient, input: EventInput) {

        const buffer = input.coverPhoto ? Buffer.from(input.coverPhoto.split(',')[1], 'base64') : '';

        try {
            const event = await prisma.event.create({
                data: {
                    name: input.name,
                    theme: input.theme,
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
    
            if(input?.eventPlanPrices && input?.eventPlanPrices?.length > 0) {
                const eventPlanFields = input.eventPlanPrices.map((field) => {
                    return {
                        name: field?.name,
                        charge: field?.charge,
                        eventId: event.id,
                        membershipTypeId: field?.membershipTypeId,
                        tickets: field?.tickets
                    }
                })
    
                await prisma.eventPlanPrice.createMany({
                    data: [...eventPlanFields as any]
                })
            }
    
            if(input.form) {
                const formFields = input.form.map((field) => {
                    return {
                        name: field.name,
                        label: field.label,
                        required: field.required,
                        type: field.type,
                        eventId: event.id,
                        priority: field.priority
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
            // const {event} = await prisma.$transaction(async (tx) =>{
                
            //     const event = await prisma.event.create({
            //         data: {
            //             name: input.name,
            //             theme: input.theme,
            //             description: input.description || '',
            //             type: input.type,
            //             link: input.link,
            //             address: input.address,
            //             starts_at: new Date(input.starts_at),
            //             starts_time: input.starts_time,
            //             ends_at: new Date(input.ends_at),
            //             ends_time: input.ends_time,
            //             paymentType: input.paymentType,
            //             amount: input.amount,
            //             tickets: input.tickets || 0,
            //             isInfinity: input.isInfinity || false,
            //             formTitle: input.formTitle,
            //             instructions: input.instructions,
            //             message: input.message,
            //             cpdp_points: input.cpdpPoint || 0,
            //             hasCertificate: input.hasCertificate || false,
            //             sendTag: input.sendTag || false,
            //         }
            //     })
        
            //     if(input?.eventPlanPrices && input?.eventPlanPrices?.length > 0) {
            //         const eventPlanFields = input.eventPlanPrices.map((field) => {
            //             return {
            //                 name: field?.name,
            //                 charge: field?.charge,
            //                 eventId: event.id,
            //                 membershipTypeId: field?.membershipTypeId,
            //                 tickets: field?.tickets
            //             }
            //         })
        
            //         await prisma.eventPlanPrice.createMany({
            //             data: [...eventPlanFields as any]
            //         })
            //     }
        
            //     if(input.form) {
            //         const formFields = input.form.map((field) => {
            //             return {
            //                 name: field.name,
            //                 label: field.label,
            //                 required: field.required,
            //                 type: field.type,
            //                 eventId: event.id,
            //                 priority: field.priority
            //             }
            //         })
            //         await prisma.eventForm.createMany({
            //             data: [...formFields as any]
            //         })
            //     }
        
            //     if (input.coverPhoto){
            //         const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/${input.name.toLowerCase().replaceAll(' ', '-')}` : ''
        
            //         const res =  await s3FileUpload(`events/${event.id}/${event.name.toLowerCase().replaceAll(' ', '-')}`, 'image/png', buffer)
            //         if(res.httpStatusCode === 200){
            //             await prisma.event.update({
            //                 where: {
            //                     id: event.id
            //                 },
            //                 data: {
            //                     coverPhoto: url
            //                 }
            //             })
            //         }
            //     }
        
            //     if(input.certificate){
            //         const certBuffer = input.certificate ? Buffer.from(input.certificate.split(',')[1], 'base64') : '';
            //         const certificateUrl: string = certBuffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/certificate` : ''
            //         const certRes =  await s3FileUpload(`events/${event.id}/certificate`, 'image/png', certBuffer)
            //         if(certRes) {
            //             await prisma.event.update({
            //                 where: {
            //                     id: event.id
            //                 },
            //                 data: {
            //                     certificate: certificateUrl
            //                 }
            //             })
            //         }
            //     }
        
            //     if(input.resources && input?.resources?.length > 0){
            //         input.resources.forEach(async (resource, index) => {
            //             const buffer = resource ? Buffer.from(resource.resourceUrl.split(',')[1], 'base64') : '';
            //             const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/resources/${index}.pdf` : ''
            //             const response =  await s3FileUploadPdf(`events/${event.id}/resources/${index}.pdf`, buffer)
            //             if(response.httpStatusCode === 200){
            //                 await prisma.eventResource.create({
            //                     data: {
            //                         eventId: event.id,
            //                         resourceUrl: url,
            //                         name: resource.name
            //                     }
            //                 })
            //             }
            //         })
            //     }
        
            //     if(input.sponsors && input?.sponsors?.length > 0){
            //         input.sponsors.forEach(async (sponsor, index) => {
            //             const buffer = sponsor ? Buffer.from(sponsor.split(',')[1], 'base64') : '';
            //             const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/sponsors/${index}` : ''
            //             const response =  await s3FileUpload(`events/${event.id}/sponsors/${index}`, 'image/png', buffer)
            //             if(response.httpStatusCode === 200){
            //                 await prisma.sponsor.create({
            //                     data: {
            //                         eventId: event.id,
            //                         logo: url
            //                     }
            //                 })
            //             }
            //         })
            //     }
        
            //     if(input.speakers && input.speakers.length > 0) {
            //         const speakers: any = []
            //         input.speakers.forEach(async (speaker, index) => {
            //             const buffer = speaker ? Buffer.from(speaker.avatar.split(',')[1], 'base64') : '';
            //             const url: string = buffer ? `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/events/${event.id}/speakers/${index}` : ''
            //             const response =  await s3FileUpload(`events/${event.id}/speakers/${index}`, 'image/png', buffer)
            //             if(response.httpStatusCode === 200){
            //                 speakers.push({...speaker, avatar: url, eventId: event.id})
            //                 await prisma.speaker.create({
            //                     data: {
            //                         eventId: event.id,
            //                         name: speaker.name,
            //                         title: speaker.title || '',
            //                         about: speaker.about,
            //                         avatar: url
            //                     }
            //                 })
            //             }
            //         })
            //     }
            //     return {event}
            // })
    
            return {
                code: 201,
                success: true,
                message: "Event created",
                event: event
            }
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: "Event failed create",
                event: null
            }
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
                eventRegistrations: true,
                sponsors: true,
                eventPlanPrices: true,
                eventPayments: true
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
                eventPlanPrices: true,
                eventRegistrations: {
                    select: { id: true }
                }
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
            },
            include: {
                member: true
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
            include: {eventForms: {
                orderBy: {
                    priority: 'asc'
                }
            }, eventPlanPrices: true}
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
                eventPlanPrices: true,
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

        const upComingEvents = prisma.eventRegistration.findMany({
            where: {
                memberId,
                event: {
                    starts_at: {
                        gt: this._todayDate
                    },
                    ends_at: {
                        lte: this._todayDate
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
        const events = prisma.event.findMany({
            where: {
                OR: [
                    // {
                    //     ends_at: {
                    //         gt: this._todayDate
                    //     }
                    // },
                    {
                        status: 'Ended'
                    }
                ]
            },
            include: {eventRegistrations: true},
            take: 0
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
                // ends_at: {
                //     gt: this._todayDate
                // }
            },
            include: {speakers: true, sponsors: true}
        })

        if(event === null) {
            throw new GraphQLError('Event registration closed', {
                extensions: {
                    code: 'NOTFOUND',
                    http: { status: 200 },
                },
            });
        }

        let memberPhotoURL: string = ''

        if(event !== null && (totalRegistration < Number(event?.tickets) || Number(event.tickets) === 0)) {
            const member = await prisma.member.findFirst({
                where: {
                    OR: [
                        {
                            phoneNumber: input.registrantDetail.phoneNumber,
                        },
                        {
                            email: input.registrantDetail.email
                        }
                    ]
                }
            })

            memberPhotoURL = member?.photoURL as string

            const registered = await prisma.eventRegistration.create({
                data: {
                    eventId: input.eventId ?? null,
                    memberId: input.memberId ?? member?.id ?? null,
                    registrantDetail: {...input.registrantDetail}
                }
            })

            if(input.payment) {
                const payment = await prisma.payment.create({
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
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/send-email`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: input.registrantDetail.email,
                  subject: 'Event Registration',
                  content: event.message as string,
                  data: {
                    eventId: event.id,
                    fullName: `${input.registrantDetail.firstName} ${input.registrantDetail.lastName}`,
                    photoURL: memberPhotoURL ?? '',
                    eventName: event.name,
                    eventTheme: event.theme,
                    startDate: moment(event.starts_at).format('LL'),
                    endDate: moment(event.ends_at).format('LL'),
                    startTime: moment(event.starts_at).format('h:mm A'),
                    endTime: moment(event.ends_at).format('h:mm A'),
                    sponsors: event.sponsors,
                    address: event.address || event.link,
                    email: input.registrantDetail.email,
                    phone: input.registrantDetail.phoneNumber
                  }
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Email sent:', data.message);
            } else {
                console.error('Error sending email:', data.error);
            }

            return registered
        } else {
            throw new GraphQLError('Event registration closed', {
                extensions: {
                    code: 'NOTFOUND',
                    http: { status: 200 },
                },
            });
        }
    }

    async resendEventMail(prisma: PrismaClient, input: SendMailInput) {
        const event = await prisma.event.findFirst({
            where: {id: input.eventId},
            include: {
                sponsors: true,
            }
        })
        console.log(input)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/send-email`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: input.email,
                  subject: 'Event Registration',
                  content: event?.message as string,
                  data: {
                    eventId: event?.id,
                    fullName: `${input.firstName} ${input.lastName}`,
                    photoURL: input.memberPhotoURL ?? '',
                    eventName: event?.name,
                    eventTheme: event?.theme,
                    startDate: moment(event?.starts_at).format('LL'),
                    endDate: moment(event?.ends_at).format('LL'),
                    startTime: moment(event?.starts_at).format('h:mm A'),
                    endTime: moment(event?.ends_at).format('h:mm A'),
                    sponsors: event?.sponsors,
                    address: event?.address || event?.link,
                    email: input?.email,
                    phone: input?.phone
                  }
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Email sent:', data.message);
            } else {
                console.error('Error sending email:', data.error);
            }

            return true
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    async memberEventCheckin(prisma: PrismaClient, id: string) {
        const eventRegistration = await prisma.eventRegistration.update({
            where: {
                id
            },
            data: {
                checkin: true,
                checkinDate: new Date()
            }
        })

        if(eventRegistration){
            const event = await prisma.event.findFirst({
                where: {
                    id: eventRegistration?.eventId as string
                }
            })
            await prisma.cpdpPoint.create({
                data: {
                    memberId: eventRegistration.memberId,
                    points: event?.cpdp_points as number,
                    eventId: event?.id
                }
            })
            return true
        }
        return false
    }
}

export default EventAPI