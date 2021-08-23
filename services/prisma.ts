import { PrismaClient } from '@prisma/client';
export * from '@prisma/client';

export default function prisma(): PrismaClient {
    // @ts-ignore
    global.prisma = global.prisma || new PrismaClient();
    // @ts-ignore
    return global.prisma;
}
