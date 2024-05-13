import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';
import { GraphQLContext } from '@/graphql/context';
import { prisma } from '@/lib/prisma';
import MemberAPI from '@/services/memberAPI';
import UserAPI from '@/services/userAPI';
import { getUserIdFromToken } from '@/lib/common';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [],
    nodeEnv: process.env.NODE_ENV,
});

server.logger

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req): Promise<GraphQLContext> => {
        const { cache } = server
        const hostURL: string = req.headers.get('host') || process.env.NEXT_PUBLIC_APP_URL as string
        const token = req.headers.get('authorization') || '';
        const userId = getUserIdFromToken(token);
        return {
            prisma,
            host: hostURL,
            userId: userId,
            request: req,
            dataSources: {
                userAPI: new UserAPI({ cache }),
                memberAPI: new MemberAPI({ cache }),

            },
        }
    },
});

export { handler as GET, handler as POST };