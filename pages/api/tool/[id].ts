// https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    const id = Number(query?.id);
    // missing param in query
    if (id < 0) {
        res.statusCode = 400;
        res.end('Unable to fetch tool without id');
    }

    switch (method) {
        case 'GET': {
            const tool = await prisma().tool.findUnique({
                where: {
                    id,
                },
            });
            if (tool) {
                res.json(tool);
                res.statusCode = 200;
            } else {
                res.statusCode = 400;
                res.end(`Unable to find tool with id: ${id}`);
            }
            break;
        }
        default: {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}
