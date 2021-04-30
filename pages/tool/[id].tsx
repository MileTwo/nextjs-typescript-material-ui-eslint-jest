import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Tool } from '@prisma/client';
import { useRouter } from 'next/router';

import Image from '../../components/Image';
import prisma from '../../prisma/prisma';

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        paddingLeft: 100,
    },
    root: {
        padding: '2em',
    },
    title: {
        paddingLeft: '1em',
        color: theme.palette.secondary.dark,
    },
}));

interface Props {
    tool: Tool;
}

interface URLParams {
    id?: string;
}

export default function ToolInfo({ tool }: Props): ReactElement {
    const classes = useStyles();
    const { query }: { query: URLParams } = useRouter();
    // client side fetch
    const { data = tool } = useSWR<Tool>(query?.id ? restEndpoints.tool(query.id) : null, fetcher, {
        initialData: tool,
    });

    if (!data) {
        return (
            <Grid container spacing={4} className={classes.root}>
                <Grid item xs={12}>
                    <Link href="/">
                        <Button variant="contained" color="primary" aria-label="Link to Home">
                            Go Home
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} container>
                    <Typography variant="h3">Tool not found.</Typography>
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12}>
                <Link href="/">
                    <Button variant="contained" color="primary" aria-label="Link to Home">
                        Go Home
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12} container>
                {data.image && <Image image={data.image} name={data.name} />}
                <Typography variant="h2" className={classes.title}>
                    {data.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.description}>
                    {data.description}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    href={data.link}
                    color="primary"
                    aria-label={`Link to ${data.name} documentation`}
                >
                    Visit documentation
                </Button>
            </Grid>
        </Grid>
    );
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
    const tools = await prisma().tool.findMany();

    return {
        paths: tools.map((tool) => ({ params: { id: `${tool.id}` } })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    if (params?.id) {
        const tool = await prisma().tool.findUnique({ where: { id: Number(params.id) } });
        if (tool) {
            return {
                props: { tool },
            };
        }
    }
    return {
        notFound: true,
    };
};
