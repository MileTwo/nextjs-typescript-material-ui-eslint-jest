import { GetServerSideProps } from 'next';
import { makeStyles, createStyles, Typography, Theme, List, Grid, Button } from '@material-ui/core';
import useSWR from 'swr';
import Layout from '../components/layout';

import prisma, { Tool } from '../services/prisma';
import restEndpoints from '../lib/restEndpoints';
import { fetcher } from '../lib/fetcher';
import { useState } from 'react';
import ToolDialog from '../components/dialog/ToolDialog';
import ListItem, { Link } from '../components/list/ListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            minWidth: theme.breakpoints.values.sm,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                minWidth: 100,
            },
        },
        root: {
            padding: '2em',
        },
    })
);
interface Props {
    tools: Tool[];
}

export default function Home({ tools }: Props) {
    const classes = useStyles();
    // CSR(Client-side rendering) example
    const { data } = useSWR<Tool[]>(restEndpoints.tools, fetcher, { initialData: tools });
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <Layout title="Next.js example">
                <Grid container spacing={4} direction="column" className={classes.root}>
                    <Grid item container spacing={4} direction="column">
                        <Grid
                            item
                            container
                            spacing={4}
                            alignContent="center"
                            justifyContent="center"
                            direction="column"
                        >
                            <Grid item container justifyContent="center">
                                <Typography variant="h5" component="h2">
                                    Tools
                                </Typography>
                            </Grid>
                            <Grid item container justifyContent="center">
                                <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                                    Create
                                </Button>
                            </Grid>
                            <ToolDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
                        </Grid>
                        <Grid item container justifyContent="center">
                            <List aria-label={tools.join(', ')} className={classes.list}>
                                {data?.map(({ name, image, id }) => {
                                    const link: Link = {
                                        href: '/tool/[id]',
                                        as: `/tool/${id}`,
                                        label: 'Learn More',
                                    };
                                    return <ListItem key={name} name={name} image={image} link={link} />;
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}

// SSR (server-side rendering) example
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const tools = await prisma().tool.findMany();

    return {
        props: {
            tools,
        },
    };
};
