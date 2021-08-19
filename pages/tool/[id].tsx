import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Image from '../../components/Image';
import restEndpoints from '../../lib/restEndpoints';
import { fetcher } from '../../lib/fetcher';
import prisma, { Tool } from '../../services/prisma';

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        maxWidth: '80ch',
    },
    root: {
        padding: '.5em 2em',
    },
    title: {
        paddingLeft: '1em',
        color: theme.palette.text.secondary,
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
                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                        {data.image && <Image image={data.image} name={data.name} aria-hidden="true" />}
                        <Typography variant="h2" className={classes.title}>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <Typography variant="body1" className={classes.description}>
                            {data.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <Button variant="contained" href={tool.link} target="_blank" color="primary">
                            Visit {tool.name} documentation
                        </Button>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
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
