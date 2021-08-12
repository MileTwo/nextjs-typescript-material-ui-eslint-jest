// https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { ToolForm } from '../../../components/dialog/ToolDialog';
import prisma from '../../../services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            const tools = await prisma().tool.findMany();
            if (tools) {
                res.status(200).json(tools);
            } else {
                res.status(400).end('Unable to find tools');
            }
            break;
        }
        case 'POST': {
            const body: ToolForm = await JSON.parse(req.body);
            if (!body.name) {
                res.status(400).end('Unable to create tool. Missing name');
            } else {
                const tool = await prisma().tool.create({
                    data: body,
                });
                if (tool) {
                    res.status(200).json(tool);
                } else {
                    res.status(500).end('Unable to create tool');
                }
            }
            break;
        }
        default: {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}
