import Image from '../Image';
import {
    ListItem as MUIListItem,
    Divider,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Grid,
    Hidden,
    ListItemSecondaryAction,
    Typography,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';
import Link from '../link/Link';
import { Maybe } from 'graphql/jsutils/Maybe';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        info: {
            justify: 'center',
            padding: theme.spacing(2),
        },
        avatar: {
            backgroundColor: theme.palette.gray.light,
        },
    })
);

export type LinkProps = {
    label: string;
    href: string;
    as?: string;
};

type Props = {
    name: string;
    image: Maybe<string> | undefined;
    link: LinkProps;
};

export default function ListItem({ name, image, link }: Props) {
    const classes = useStyles();
    return (
        <MUIListItem divider>
            <Grid container>
                <ListItemAvatar>
                    <Avatar alt={name} className={classes.avatar}>
                        {/* NextJS Image optimization example. Props are src(any file under the public dir), width, and height */}
                        <Image image={image} name={name} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    <Typography variant="body1">{name}</Typography>
                </ListItemText>
                <Hidden smDown>
                    <ListItemSecondaryAction className={classes.info}>
                        <Link href={link.href} as={link?.as} label={link.label} />
                    </ListItemSecondaryAction>
                </Hidden>
                <Hidden mdUp>
                    <Grid container item xs={12} className={classes.info} justify="flex-end">
                        <Link href={link.href} as={link?.as} label={link.label} />
                    </Grid>
                </Hidden>
            </Grid>
        </MUIListItem>
    );
}
