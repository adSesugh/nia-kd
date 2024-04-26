import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { GraphQLContext } from '@/graphql/context';
import { prisma } from '@/lib/prisma';
import BlogAPI from './services/blogAPI';
import TagAPI from './services/tagAPI';
import MemberAPI from './services/memberAPI';
import UserAPI from './services/userAPI';
import { getUserIdFromToken } from '@/lib/common';

const server = new ApolloServer({
    resolvers,
    typeDefs
});

const handler = startServerAndCreateNextHandler(server, {
    context: async (req): Promise<GraphQLContext> => {
        const { cache } = server
        const hostURL: string = req.headers.host ?? 'http://localhost:3000'
        const token = req.headers.authorization || '';
        const userId = getUserIdFromToken(token);
        return {
            prisma,
            host: hostURL,
            userId: userId,
            dataSources: {
                blogAPI: new BlogAPI({ cache, token }),
                tagAPI: new TagAPI({ cache }),
                memberAPI: new MemberAPI({ cache }),
                userAPI: new UserAPI({ cache })
            }
        }
    }
});

export { handler as GET, handler as POST };