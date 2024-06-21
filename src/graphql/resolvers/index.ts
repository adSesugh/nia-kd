import { Resolvers } from "@/graphql/__generated__/graphql";
import GraphQLJSON from 'graphql-type-json';

export const resolvers: Resolvers = {
    JSON: GraphQLJSON,
    Mutation: {
        createUser: (_, { input }, { prisma, dataSources }) => dataSources.userAPI.addUser(prisma, input),
        login: (_, { input }, { prisma, dataSources }) => dataSources.userAPI.loginUser(prisma, input),
        createDue: (_, { input }, { prisma, dataSources, userId }) => dataSources.dueAPI.createDue(prisma, input, userId),
        updateDue: (_, { dueId, input }, { prisma, dataSources }) => dataSources.dueAPI.updateDue(prisma, dueId, input),
        postPayment: (_, { input }, { prisma, dataSources }) => dataSources.paymentAPI.postPayment(prisma, input),
        deactivateMember: (_, { memberId, status }, { prisma, dataSources }) => dataSources.memberAPI.deactivate(prisma, memberId, status),
        createBlog: (_, { input }, { prisma, dataSources, userId }) => dataSources.blogAPI.createBlog(prisma, userId, input),
        publishedBlog: (_, { blogId, status }, { prisma, dataSources }) => dataSources.blogAPI.publishedBlog(prisma, blogId, status),
        createEvent: (_, { input }, { prisma, dataSources }) => dataSources.eventAPI.createEvent(prisma, input),
        watchEventViews: (_, {eventId}, {prisma, dataSources}) => dataSources.eventAPI.watchViews(prisma, eventId),
        cancelEvent: (_, {eventId, status}, {prisma, dataSources}) => dataSources.eventAPI.cancelEvent(prisma, eventId, status),
        deleteEvent: (_, {eventId}, {prisma, dataSources}) => dataSources.eventAPI.deleteEvent(prisma, eventId)
    },
    Query: {
        members: (_, __, { prisma, dataSources, userId }) => dataSources.memberAPI.getMembers(prisma, userId),
        member: (_, { id }, { prisma, dataSources }) => dataSources.memberAPI.getMember(prisma, id),
        users: (_, __, { prisma, dataSources }) => dataSources.userAPI.getUsers(prisma),
        dues: (_, __, { prisma, dataSources }) => dataSources.dueAPI.getDues(prisma),
        singeDue: (_, { dueId }, { prisma, dataSources }) => dataSources.dueAPI.getDue(prisma, dueId),
        getPayments: (_, __, { prisma, dataSources }) => dataSources.paymentAPI.getPayments(prisma),
        getPayment: (_, { paymentId }, { prisma, dataSources }) => dataSources.paymentAPI.getPayment(prisma, paymentId),
        memberPayments: (_, { memberId }, { prisma, dataSources }) => dataSources.paymentAPI.memberPayments(prisma, memberId),
        getDuePayment: (_, { memberId }, { prisma, dataSources }) => dataSources.dueAPI.getDuePayment(prisma, memberId),
        getRecentRegistration: (_, __, { prisma, dataSources }) => dataSources.dashboardAPI.getRecentRegistrations(prisma),
        getBlogs: (_, { status }, { prisma, dataSources }) => dataSources.blogAPI.getBlogs(prisma, status),
        getBlog: (_, { blogId }, { prisma, dataSources }) => dataSources.blogAPI.getBlog(prisma, blogId),
        getEvents: (_, __, { prisma, dataSources }) => dataSources.eventAPI.getEvents(prisma),
        getEvent: (_, { eventId }, { prisma, dataSources }) => dataSources.eventAPI.getEvent(prisma, eventId),
        eventFormFields: (_, __, { prisma, dataSources }) => dataSources.eventAPI.getFormFields(prisma),
        getAdminDashboardStat: (_, __, {prisma, dataSources}) => dataSources.dashboardAPI.getAdminStat(prisma),
        getSidebarStat: (_, __, {prisma, dataSources}) => dataSources.dashboardAPI.getSidebarData(prisma),
        getMembersAttendance: (_, {eventId}, {prisma, dataSources}) => dataSources.eventAPI.getMembersAttendance(prisma, eventId),
        getRegisteredMembers: (_, {eventId}, {prisma, dataSources}) => dataSources.eventAPI.getMembersAttendance(prisma, eventId),
        getEventsForPublic: (_, __, { prisma, dataSources }) => dataSources.eventAPI.getEventsForPublic(prisma),
        getUpComingEvents: (_, {memberId}, {prisma, dataSources}) => dataSources.eventAPI.upComingEvents(prisma, memberId),
        getPastEvents: (_, __, {prisma, dataSources}) => dataSources.eventAPI.passedEvents(prisma)
    },
};