import { Resolvers } from "@/graphql/__testgen__/graphql";

export const resolvers: Resolvers = {
    Mutation: {
    },
    Query: {
        books: (_, __, { dataSources, prisma }) => {
            const books = [{
                title: 'apple',
                author: 'Hello'
            }]
            return books
        },
        blogs: (_, __, { dataSources, prisma }) => dataSources.blogAPI.getBlogs(prisma)
    },
};