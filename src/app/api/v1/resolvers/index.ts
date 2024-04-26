import { Resolvers } from "@/graphql/__generated__/graphql";

export const resolvers: Resolvers = {
    Mutation: {
        createTag: (_, { input }, { prisma, dataSources }) => dataSources.tagAPI.addTag(prisma, input),
        updateTag: (_, { id, name }, { prisma, dataSources }) => dataSources.tagAPI.modifyTag(prisma, id, name),
        createUser: (_, { input }, { prisma, dataSources }) => dataSources.userAPI.addUser(prisma, input),
        createMember: (_, { input }, { prisma, host, dataSources }) => dataSources.memberAPI.createMember(prisma, host, input),
        createBlog: (_, { input }, { prisma, dataSources }) => dataSources.blogAPI.createBlog(prisma, input),
        login: (_, { input }, { prisma, dataSources }) => dataSources.userAPI.loginUser(prisma, input),
        logout: async (_, __, { userId }) => {
            if (!userId) {
                throw new Error('Not authenticated');
            }
            return true;
        },
    },
    Query: {
        tags: (_, __, { prisma, dataSources }) => dataSources.tagAPI.getTags(prisma),
        tag: (_, { id }, { prisma, dataSources }) => dataSources.tagAPI.getTag(prisma, id),
        blogs: (_, __, { prisma, dataSources }) => dataSources.blogAPI.getBlogs(prisma),
        blog: (_, { id }, { prisma, dataSources }) => dataSources.blogAPI.getBlog(prisma, id),
        users: (_, __, { prisma, dataSources }) => dataSources.userAPI.getUsers(prisma),
        user: (_, { id }, { prisma, dataSources }) => dataSources.userAPI.getUser(prisma, id),
        members: (_, __, { prisma, dataSources }) => dataSources.memberAPI.getMembers(prisma),
        member: (_, { id }, { prisma, dataSources }) => dataSources.memberAPI.getMember(prisma, id),
    },
};