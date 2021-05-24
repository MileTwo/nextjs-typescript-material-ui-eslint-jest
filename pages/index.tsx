import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { makeStyles, createStyles, Typography, Theme, Paper, ListItem, List, Grid, Button } from '@material-ui/core';
import Layout from '../components/layout';

import { tools } from '../lib/tools';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            background: theme.palette.gray.light,
            boxShadow: `0 0.125em 0.25em 0 ${theme.palette.shadow.main}, 0 0.1875em 0.625em 0 ${theme.palette.shadow.main}`,
            padding: '2em',
        },
        root: {
            padding: '2em',
        },
        linkButton: {
            marginLeft: '1em',
        },
    })
);

interface Props {
    tools: { name: string; image?: { src: string; width: number; height: number } }[];
}

export default function Home({ tools }: Props) {
    const classes = useStyles();

    return (
        <>
            <Layout title="Next.js example">
                <Grid container spacing={4} direction="column" className={classes.root}>
                    <Grid item container spacing={4} direction="column" xs={12} alignItems="center">
                        <Grid container item alignContent="center" justify="center">
                            <Typography variant="h5" component="h2">
                                Tools
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <List aria-label={tools.join(', ')}>
                                    {tools.map(({ name, image }) => (
                                        <ListItem key={name}>
                                            <Grid container alignItems="center" justify="space-between">
                                                {/* NextJS Image optimization example. Props are src(any file under the public dir), width, and height */}
                                                {image && <Image {...image} aria-hidden="true" />}
                                                <Typography variant="body1" aria-hidden="true">
                                                    {name}
                                                </Typography>
                                                <Link href="/tool/[name]" as={`/tool/${name}`} passHref>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.linkButton}
                                                        aria-label={`Learn more about ${name}`}
                                                    >
                                                        <span aria-hidden="true">Learn more</span>
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return {
        props: {
            tools: tools.map(({ name, image }) => ({
                name,
                image,
            })),
        },
    };
};
