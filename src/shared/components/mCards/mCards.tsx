import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    directionRow?: boolean;
}

interface IMCard {
    item: IProduto;
}

export const MCardArea: React.FC<IMCardArea> = ({ children, directionRow }) => {
    return (
        <Grid
            container
            direction={directionRow ? 'row' : undefined}
            padding={1}
            marginX={0}
            marginBottom={3}
            marginTop={0}
            overflow='auto'
            sx={{
                '::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
            wrap={directionRow ? 'nowrap' : undefined}
        >
            {children}
        </Grid>
    )
}

export const MCard: React.FC<IMCard> = ({ item }) => {
    const theme = useTheme();
    const navigation = useNavigate();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
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
        <Grid
            item
            paddingX={1}
            paddingTop={2}
            xs={6}
            sm={4}
            md={3}
        >
            <Card sx={{ height: theme.spacing(40) }}>
                <Link component={RouterLink} to={url} preventScrollReset={true}>
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
                            title={title}
                            underline='none'
                            variant='inherit'
                        >
                            {title}
                        </Link>
                    </Typography>
                    <Stack direction='row' spacing={1}>
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
                            {price}
                        </Typography>
                    </Stack>
                    <CardActions sx={{
                        marginTop: 2,
                        padding: 0,
                    }}>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            width='100%'
                        >
                            <IconButton onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}>
                                <Favorite color='action' fontSize={sizeFontButton} />
                            </IconButton>
                            <Button
                                color='secondary'
                                disableElevation
                                variant='contained'
                                size={sizeFontButton}
                                onClick={() => navigation(url)}
                            >
                                Comprar
                            </Button>
                        </Stack>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

export const MCardSkeleton: React.FC = () => {
    const theme = useTheme();

    return (
        <Grid
            item
            paddingX={1}
            paddingTop={2}
            xs={6}
            sm={4}
            md={3}
        >
            <Card sx={{ height: theme.spacing(40) }}>
                <Skeleton height={theme.spacing(24)} variant='rectangular' />
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: 1
                }}>
                    <Skeleton variant='text' />
                    <CardContent sx={{
                        display: 'flex',
                        padding: 0
                    }}>
                        <Skeleton sx={{ width: '50%' }} variant='text' />
                    </CardContent>
                    <CardActions sx={{
                        marginTop: 2,
                        padding: 0
                    }}>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            width='100%'
                        >
                            <Skeleton variant='circular' width={20} />
                            <Skeleton variant='rounded' width={50} />
                        </Stack>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}