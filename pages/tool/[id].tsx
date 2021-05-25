import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Tool } from '@prisma/client';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Image from '../../components/Image';
import restEndpoints from '../../lib/restEndpoints';
import { fetcher } from '../../lib/fetcher';
import prisma from '../../prisma/prisma';

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        maxWidth: '80ch',
        paddingLeft: 100,
    },
    root: {
        padding: '.5em 2em',
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
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/" passHref>
                            Home
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12} container>
                    <Typography variant="h3" component="p">
                        Tool not found.
                    </Typography>
                </Grid>
            </Grid>
        );
    }
    return (
        <>
            <Layout title={`${data.name} | Next.js example`}>
                <Grid container spacing={4} className={classes.root}>
                    <Grid item xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link href="/" passHref>
                                Home
                            </Link>
                            <Typography color="textPrimary">{data.name}</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} container>
                        {data.image && <Image image={data.image} name={data.name} aria-hidden="true" />}
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
                        <Button variant="contained" href={tool.link} color="primary">
                            Visit {tool.name} documentation
                        </Button>
                    </Grid>
                </Grid>
            </Layout>
        </>
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
