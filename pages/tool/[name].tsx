import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Tool, tools } from '../../lib/tools';
import { ReactElement } from 'react';

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
    tool?: Tool;
}

export default function ToolInfo({ tool }: Props): ReactElement {
    const classes = useStyles();

    if (!tool) {
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
                {/* NextJS Image optimization example. Props are src(any file under the public dir), width, and height */}
                {tool.image && <Image {...tool.image} data-testid="image" />}
                <Typography variant="h2" className={classes.title}>
                    {tool.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.description}>
                    {tool.description}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    href={tool.link}
                    color="primary"
                    aria-label={`Link to ${tool.name} documentation`}
                >
                    Visit documentation
                </Button>
            </Grid>
        </Grid>
    );
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
    return {
        paths: tools.map((tool) => ({ params: { name: tool.name } })),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    if (params?.name) {
        const tool = tools.find(({ name: toolName }) => toolName === params.name);
        return {
            props: { tool },
        };
    }
    return {
        props: {},
    };
};
