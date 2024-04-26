import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { AppContext } from '@/graphql/context';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import BlogAPI from './services/blogAPI';
import { prisma } from '@/lib/prisma';


const server = new ApolloServer({
    resolvers,
    typeDefs
});


const handler = startServerAndCreateNextHandler(server, {
    context: async (req): Promise<AppContext> => {
        const { cache } = server
        const token = req.headers.authorization ?? ''
        return {
            prisma,
            dataSources: {
                blogAPI: new BlogAPI({ cache })
            }
        }
    }
});

export { handler as GET, handler as POST };