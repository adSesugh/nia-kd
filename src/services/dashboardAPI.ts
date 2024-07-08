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
            by: ['memberType'],
            where: {
              status: {
                equals: 'Active',
              },
            },
            _count: {
                _all: true,
            },
        })

        const revenueAcc = await prisma.payment.groupBy({
            by: ['paymentType'],
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

        const paymentByMonths = await prisma.payment.findMany({
            where: {
                createdAt: {
                    gte: this.startOfYear,
                    lte: this.endOfYear
                },
                status: {
                    equals: 'Successful'
                }
            },
            select: {
              createdAt: true,
              amount: true,
              paymentType: true,
            },
        });

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

        // const eventPayments = await prisma.payment.aggregate({
        //     where: {
        //         createdAt: {
        //             gte: this.startOfYear,
        //             lte: this.endOfYear
        //         },
        //         status: {
        //             equals: 'Successful'
        //         },
        //         paymentType: 'event'
        //     },
        //     _sum: {
        //         amount: true
        //     }
        // })

        // const duesPayments = await prisma.payment.aggregate({
        //     where: {
        //         createdAt: {
        //             gte: this.startOfYear,
        //             lte: this.endOfYear
        //         },
        //         status: {
        //             equals: 'Successful'
        //         },
        //         paymentType: 'dues'
        //     },
        //     _sum: {
        //         amount: true
        //     }
        // })

        const attendances = await prisma.eventRegistration.count({
            where: {
                checkin: {
                    equals: true
                }
            }
        })

        const revenue = Number(payments._sum.amount)
        const revData = {
            events: revenueAcc.find(type => type.paymentType === 'event')?._sum.amount || 0,  //eventPayments._sum.amount || 0,
            dues: revenueAcc.find(type => type.paymentType === 'dues')?._sum.amount || 0, //duesPayments._sum.amount || 0,
            others: revenueAcc.find(type => {
                return type.paymentType !== 'event' && type.paymentType !== 'dues'
            })?._sum.amount || 0
        }

        const membership = [
            groupMembers.find((member) => member.memberType === 'Assoicate')?._count._all || 0,
            groupMembers.find((member) => member.memberType === 'Fellow')?._count._all || 0,
            groupMembers.find((member) => member.memberType === 'Full Member')?._count._all || 0,
            groupMembers.find((member) => member.memberType === 'Graduate')?._count._all || 0,
            groupMembers.find((member) => member.memberType === 'Student')?._count._all || 0,
            groupMembers.find((member) => member.memberType === 'Technologist')?._count._all || 0,
        ]

        const avgAttendance = attendances / eventHeld || 0

        // Initialize the result object
        const result = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dues: Array(12).fill(0),
            event: Array(12).fill(0),
            totalRevenue: Array(12).fill(0),
        };

        // Process each payment
        paymentByMonths.forEach(payment => {
            const month = new Date(payment.createdAt).getMonth();
            if (payment.paymentType === 'dues') {
            result.dues[month] += Number(payment.amount);
            } else if (payment.paymentType === 'event') {
            result.event[month] += Number(payment.amount);
            }
            result.totalRevenue[month] += Number(payment.amount);
        });

        const dashboardData = {
            totalMember: memberCount,
            eventHeld,
            membership,
            avgAttendance,
            revenue,
            result,
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

        const resources = await prisma.resource.count({
            where: {
                deletedAt: null
            }
        })

        return {
            members: members,
            events: events._count._all,
            blogs,
            resources: resources,
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
      
    async revenueByCategory(prisma: PrismaClient, duration: string) {
        if(duration === 'monthly') {
            const paymentByMonths = await prisma.payment.findMany({
                where: {
                    createdAt: {
                        gte: this.startOfYear,
                        lte: this.endOfYear
                    },
                    status: {
                        equals: 'Successful'
                    }
                },
                select: {
                  createdAt: true,
                  amount: true,
                  paymentType: true,
                },
            });

            // Initialize the result object
            const result = {
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dues: Array(12).fill(0),
                event: Array(12).fill(0),
                totalRevenue: Array(12).fill(0),
            };

            // Process each payment
            paymentByMonths.forEach(payment => {
                const month = new Date(payment.createdAt).getMonth();
                if (payment.paymentType === 'dues') {
                result.dues[month] += Number(payment.amount);
                } else if (payment.paymentType === 'event') {
                result.event[month] += Number(payment.amount);
                }
                result.totalRevenue[month] += Number(payment.amount);
            });

            return result
        }
        else {
            const paymentByYears = await prisma.payment.findMany({
                where: {
                    status: {
                        equals: 'Successful'
                    }
                },
                select: {
                  createdAt: true,
                  amount: true,
                  paymentType: true,
                },
            });

            // Initialize the result object
            const result: { [year: string]: number } = {};

            // Process each payment
            paymentByYears.forEach(payment => {
                const year = new Date(payment.createdAt).getFullYear();

                if (!result[year]) {
                result[year] = 0;
                }

                result[year] += Number(payment.amount);
            });

            return result;
        }
    }   
}

export default DashboardAPI