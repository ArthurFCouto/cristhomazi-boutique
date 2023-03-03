import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Button, Card, CardActions,
    CardContent, CardMedia, Grid, IconButton,
    Link, Skeleton, Stack, Typography, useMediaQuery, useTheme
} from '@mui/material'
import { Favorite } from '@mui/icons-material';
import { IProduto } from '../../service';
import { Capitalize, FormatBRL } from '../../util';
import { Environment } from '../../environment';

interface IMCardArea {
    children: React.ReactNode;
}

interface IMCard {
    item: IProduto;
}

export const MCardArea: React.FC<IMCardArea> = ({ children }) => {

    return (
        <Grid
            container
            paddingX={1}
            rowSpacing={3}
            spacing={2}
            marginBottom={3}
            marginTop={0}
        >
            {children}
        </Grid>
    )
}

export const MCard: React.FC<IMCard> = ({ item }) => {
    const theme = useTheme();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const sizeFontButton = mdDownScreen ? 'small' : 'medium';
    const { produto: { categoria, titulo }, cor, nome, imagens, valor } = item;
    const title = Capitalize(titulo + ' ' + cor);
    const price = FormatBRL(valor);
    const url = `/buscar/${categoria[0]}/${nome}`;
    const [image, setImage] = useState(imagens[0]);

    const changeImage = () => {
        const secondImage = imagens[1];
        if (secondImage)
            setImage(secondImage)
    }

    return (
        <Grid item xs={smDownScreen ? 6 : mdDownScreen ? 4 : 3}>
            <Card sx={{ height: theme.spacing(40) }}>
                <Link component={RouterLink} to={url}>
                    <CardMedia
                        alt={title}
                        component='img'
                        height='60%'
                        image={image}
                        onMouseEnter={changeImage}
                        onMouseOut={() => setImage(imagens[0])}
                        sx={{ objectFit: 'contain' }}
                        title={title}
                    />
                </Link>
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: 1
                }}>
                    <Typography
                        component='div'
                        fontSize={12}
                        gutterBottom
                        noWrap
                        textOverflow='ellipsis'
                        variant='button'
                    >
                        <Link
                            component={RouterLink}
                            to={url}
                            sx={{ textDecoration: 'none' }}
                            title={title}
                            variant='inherit'
                        >
                            {title}
                        </Link>
                    </Typography>
                    <CardContent sx={{
                        display: 'flex',
                        padding: 0
                    }}>
                        <Typography
                            color='text.secondary'
                            sx={{ cursor: 'default' }}
                            variant='caption'
                        >
                            por
                        </Typography>
                        <Typography
                            sx={{ cursor: 'default' }}
                            variant='subtitle2'
                        >
                            &nbsp; {price}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{
                        marginTop: 2,
                        padding: 0,
                        justifyContent: 'space-between'
                    }}>
                        <IconButton onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}>
                            <Favorite color='action' fontSize={sizeFontButton} />
                        </IconButton>
                        <Button
                            color='secondary'
                            disableElevation
                            variant='contained'
                            size={sizeFontButton}
                            onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}
                        >
                            Comprar
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

export const MCardSkeleton: React.FC = () => {
    const theme = useTheme();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid item xs={smDownScreen ? 6 : mdDownScreen ? 4 : 3}>
            <Card sx={{ height: theme.spacing(40) }}>
                <Skeleton height={theme.spacing(24)} variant='rectangular'/>
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: 1
                }}>
                    <Skeleton variant='text'/>
                    <CardContent sx={{
                        display: 'flex',
                        padding: 0
                    }}>
                        <Skeleton sx={{ width: '50%' }} variant='text'/>
                    </CardContent>
                    <CardActions sx={{
                        marginTop: 2,
                        padding: 0,
                        justifyContent: 'space-between'
                    }}>
                        <Skeleton variant='circular' width={20} />
                        <Skeleton variant='rounded' width={50} />
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}