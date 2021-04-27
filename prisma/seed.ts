import { PrismaClient, Tool } from '@prisma/client';
import { tools } from '../lib/tools';
const prisma = new PrismaClient();

async function main() {
    const toolPromises: Promise<Tool>[] = [];
    tools.forEach((tool) => {
        const promise = prisma.tool.upsert({
            where: {
                name: tool.name,
            },
            create: tool,
            update: tool,
        });
        toolPromises.push(promise);
    });

    await Promise.all(toolPromises);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
