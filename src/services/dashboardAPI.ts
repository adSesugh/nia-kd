import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

class DashboardAPI extends RESTDataSource {

    todayDate = new Date(moment().format("Y-MM-D"))
    startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
    endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))

    async getRecentRegistrations(prisma: PrismaClient) {
        const newMembers = await prisma.member.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })

        return newMembers
    }

    async getAdminStat(prisma: PrismaClient) {

        const memberCount = await prisma.member.count()
        const eventHeld = await prisma.event.count({
            where: {
                status: 'Ended',
                ends_at: {
                    lt: this.todayDate
                },
            }
        })

        const groupMembers = await prisma.member.groupBy({
            by: ['membershipTypeId'],
            where: {
              status: {
                equals: 'Active',
              },
            },
            _count: {
                _all: true
            }
        })

        const payments = await prisma.payment.aggregate({
            where: {
                createdAt: {
                    gte: this.startOfYear,
                    lte: this.endOfYear
                },
                status: {
                    equals: 'Successful'
                }
            },
            _sum: {
                amount: true
            }
        })

        const eventPayments = await prisma.payment.aggregate({
            where: {
                createdAt: {
                    gte: this.startOfYear,
                    lte: this.endOfYear
                },
                status: {
                    equals: 'Successful'
                },
                paymentType: 'event'
            },
            _sum: {
                amount: true
            }
        })

        const duesPayments = await prisma.payment.aggregate({
            where: {
                createdAt: {
                    gte: this.startOfYear,
                    lte: this.endOfYear
                },
                status: {
                    equals: 'Successful'
                },
                paymentType: 'dues'
            },
            _sum: {
                amount: true
            }
        })

        const attendances = await prisma.eventRegistration.count({
            where: {
                checkin: {
                    equals: true
                }
            }
        })

        const revenue = Number(payments._sum.amount)
        const revData = {
            events: eventPayments._sum.amount || 0,
            dues: duesPayments._sum.amount || 0,
            others: 0
        }

        const membership = [
            groupMembers.find((member) => member.membershipTypeId === 'Assoicate')?._count._all || 0,
            groupMembers.find((member) => member.membershipTypeId === 'Fellow')?._count._all || 0,
            groupMembers.find((member) => member.membershipTypeId === 'Full Member')?._count._all || 0,
            groupMembers.find((member) => member.membershipTypeId === 'Graduate')?._count._all || 0,
            groupMembers.find((member) => member.membershipTypeId === 'Student')?._count._all || 0,
            groupMembers.find((member) => member.membershipTypeId === 'Technologist')?._count._all || 0,
        ]

        const avgAttendance = attendances / eventHeld || 0

        const dashboardData = {
            totalMember: memberCount,
            eventHeld,
            membership,
            avgAttendance,
            revenue,
            revByCategory: revData 
        }
    
        return dashboardData
    }

    async getSidebarData (prisma: PrismaClient) {
        const members = await prisma.member.count({
            where: {
                status: 'Active'
            }
        })

        const events = await prisma.event.aggregate({
            where: {
                status: 'Published'
            },
            _count: {
                _all: true
            }
        })

        const blogs = await prisma.blog.count({
            where: {
                status: 'Published'
            }
        })

        return {
            members: members,
            events: events._count._all,
            blogs,
            resources: 0,
            ads: 0
        }
    }

    async getMemberStat(prisma: PrismaClient, memberId: string) {
        
        const totalEventPoints = await prisma.event.count({
            select: {
                cpdp_points: true
            }
        })

        const totalPointsEarned = await prisma.cpdpPoint.count({
            where: {
                memberId
            },
            select: {
                points: true
            }
        })

        const eventAttended = await prisma.eventRegistration.count({
            where: {
                checkin: true,
                memberId
            }
        })

        const checkYearlyDuePayment = await prisma.payment.count({
            where: {
                memberId,
                due: {
                    startsAt: {gt: this.startOfYear},
                    endsAt: {lte: this.endOfYear}
                },
                createdAt: {
                    gt: this.startOfYear,
                    lte: this.endOfYear
                }
            }
        })

        const response = {
            'totalEventPoints': totalEventPoints.cpdp_points,
            'pointsEarned': totalPointsEarned.points,
            'eventAttended': eventAttended,
            'fin_status': checkYearlyDuePayment > 0 ? true : false
        }

        return response
    }
      
}

export default DashboardAPI