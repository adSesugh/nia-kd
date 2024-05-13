import { Resolvers } from "@/graphql/__generated__/graphql";

export const resolvers: Resolvers = {
    Mutation: {
        createUser: (_, { input }, { prisma, dataSources }) => dataSources.userAPI.addUser(prisma, input),
        login: (_, { input }, { prisma, dataSources, request }) => dataSources.userAPI.loginUser(prisma, input),
    },
    Query: {
        members: (_, __, { prisma, dataSources, userId }) => dataSources.memberAPI.getMembers(prisma, userId),
        member: (_, { id }, { prisma, dataSources }) => dataSources.memberAPI.getMember(prisma, id),
        users: (_, __, { prisma, dataSources }) => dataSources.userAPI.getUsers(prisma),
    },
};