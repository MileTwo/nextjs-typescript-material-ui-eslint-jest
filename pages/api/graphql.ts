import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import prisma from '../../prisma/prisma';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '@generated/type-graphql';

interface Context {
    prisma: PrismaClient;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

const schema = buildSchemaSync({
    resolvers,
    validate: false,
});

const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: (): Context => ({ prisma: prisma() }),
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default handler;
