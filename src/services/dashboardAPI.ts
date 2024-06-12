import { RESTDataSource } from "@apollo/datasource-rest";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

class DashboardAPI extends RESTDataSource {
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
        const today = new Date(moment().format("Y-MM-D"))
        const startOfYear = new Date(moment().startOf('year').format("Y-MM-D"))
        const endOfYear = new Date(moment().endOf('year').format("Y-MM-D"))

        const memberCount = await prisma.member.count()
        const eventHeld = await prisma.event.count({
            where: {
                status: 'Published',
                ends_at: {
                    lt: today
                },
            }
        })

        const groupMembers = await prisma.member.groupBy({
            by: ['membershipType'],
            where: {
              status: {
                equals: 'Active',
              },
            },
            _count: {
                _all: true
            }
        })

        const duesPayments = await prisma.payment.aggregate({
            where: {
                createdAt: {
                    gte: startOfYear,
                    lte: endOfYear
                },
                status: {
                    equals: 'Successful'
                }
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

        const eventPayments = await prisma.eventPayment.aggregate({
            where: {
                createdAt: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            },
            _sum: {
                amount: true
            }
        })

        const revenue = Number(eventPayments._sum.amount) + Number(duesPayments._sum.amount)
        const revData = {
            events: eventPayments._sum.amount || 0,
            dues: duesPayments._sum.amount || 0,
            others: 0
        }

        const membership = [
            groupMembers.find((member) => member.membershipType === 'Assoicate')?._count._all || 0,
            groupMembers.find((member) => member.membershipType === 'Fellow')?._count._all || 0,
            groupMembers.find((member) => member.membershipType === 'Full Member')?._count._all || 0,
            groupMembers.find((member) => member.membershipType === 'Graduate')?._count._all || 0,
            groupMembers.find((member) => member.membershipType === 'Student')?._count._all || 0,
            groupMembers.find((member) => member.membershipType === 'Technologist')?._count._all || 0,
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
}

export default DashboardAPI