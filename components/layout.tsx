import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { ReactElement } from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            padding: '1em 2em',
        },
    })
);

const Layout = ({ children }: { children: ReactElement | ReactElement[] | string }): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <header className={classes.header}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
            </header>
            <main>{children}</main>
        </>
    );
};

export default Layout;
