import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import Image from '../../components/Image';
import gql from 'graphql-tag';
import { useToolQuery } from '../../gen/graphql-types';

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

interface URLParams {
    id?: string;
}

export const QUERY_TOOL = gql`
    query Tool($id: Int!) {
        tool(where: { id: $id }) {
            id
            name
            description
            link
            image
        }
    }
`;

export default function ToolInfo(): ReactElement {
    const classes = useStyles();
    const { query }: { query: URLParams } = useRouter();
    // client side fetch
    const { data } = useToolQuery({ variables: { id: Number(query.id) } });

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
                {data?.tool?.image && <Image image={data?.tool?.image} name={data?.tool?.name} />}
                <Typography variant="h2" className={classes.title}>
                    {data?.tool?.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.description}>
                    {data?.tool?.description}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    href={data?.tool?.link}
                    color="primary"
                    aria-label={`Link to ${data?.tool?.name} documentation`}
                >
                    Visit documentation
                </Button>
            </Grid>
        </Grid>
    );
}
