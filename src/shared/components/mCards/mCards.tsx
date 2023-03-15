import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box, Card, CardContent, CardMedia,
    Fade, Grid, IconButton, Link, Skeleton,
    Stack, Typography, useTheme
} from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material';
import { useDialogContext } from '../../contexts';
import { IProduto } from '../../service';
import { Environment } from '../../environment';
import { Capitalize, FormatBRL } from '../../util';

interface IMCardArea {
    children: React.ReactNode;
    directionRow?: boolean;
    list?: IProduto[];
}

interface IMCard {
    item: IProduto;
}

export const MCardArea: React.FC<IMCardArea> = ({ children, directionRow, list }) => {
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
    const { showAlert } = useDialogContext();
    const { produto: { categoria, marca, titulo }, cor, nome, imagens, valor } = item;
    const [image, setImage] = useState(imagens[0]);
    const [showTransition, setShowTransition] = useState(false);
    const [variantCard, setVariantCard] = useState<'outlined' | 'elevation'>('outlined');

    const url = `/buscar/${categoria[0]}/${nome}`;
    const title = Capitalize(titulo + ' ' + cor);
    const price = FormatBRL(valor);
    const installment = Environment.CALCULATE_INSTALLMENT(valor);

    const handleMouseEnter = () => {
        const secondImage = imagens[1];
        if (secondImage)
            setImage(secondImage)
        setVariantCard('elevation');
    };

    const handleMouseOut = () => {
        setImage(imagens[0]);
        setVariantCard('outlined');
    };

    useEffect(() => {
        setTimeout(() => setShowTransition(true), 500)
    }, []);

    return (
        <Grid
            item
            paddingX={1}
            paddingTop={2}
            xs={6}
            sm={4}
            md={3}
        >
            <Fade in={showTransition}>
                <Card
                    component={Box}
                    height={theme.spacing(46)}
                    position='relative'
                    sx={{ backgroundColor: 'transparent', border: 0 }}
                    variant={variantCard}
                >
                    <IconButton
                        onClick={() => showAlert(Environment.NOT_IMPLEMENTED_MESSAGE, 'warning')}
                        sx={{ position: 'absolute', top: 5, right: 5 }}
                    >
                        <FavoriteBorder />
                    </IconButton>
                    <Link
                        component={RouterLink}
                        to={url}
                        preventScrollReset={true}
                    >
                        <CardMedia
                            alt={title}
                            component='img'
                            height='75%'
                            image={image}
                            onMouseEnter={handleMouseEnter}
                            onMouseOut={handleMouseOut}
                            sx={{ objectFit: 'contain' }}
                        />
                    </Link>
                    <CardContent sx={{
                        flex: '1 0 auto',
                        padding: 1
                    }}>
                        <Typography
                            fontSize={10}
                            fontWeight={600}
                            sx={{ cursor: 'default' }}
                            textTransform='capitalize'
                        >
                            {marca}
                        </Typography>
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
                                underline='none'
                                variant='inherit'
                            >
                                {title}
                            </Link>
                        </Typography>
                        <Stack alignItems='center' direction='row' spacing={1}>
                            <Typography
                                sx={{ cursor: 'default' }}
                                variant='caption'
                            >
                                por
                            </Typography>
                            <Typography
                                fontWeight={600}
                                sx={{ cursor: 'default' }}
                                variant='subtitle1'
                            >
                                {price}
                            </Typography>
                        </Stack>
                        {
                            installment.quantidade > 1 && (
                                <Stack direction='row' spacing={1}>
                                    <Typography
                                        color='text.secondary'
                                        sx={{ cursor: 'default' }}
                                        variant='caption'
                                    >
                                        {`Em até ${installment.quantidade}x de ${FormatBRL(installment.parcela)}`}
                                    </Typography>
                                </Stack>
                            )
                        }
                    </CardContent>
                </Card>
            </Fade>
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
            <Card
                sx={{ height: theme.spacing(46) }}
                variant='outlined'
            >
                <Skeleton height={theme.spacing(34)} variant='rectangular' />
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: 1
                }}>
                    <Stack spacing={1}>
                        <Skeleton sx={{ width: '35%' }} variant='text' />
                        <Skeleton variant='rounded' />
                        <Skeleton sx={{ width: '50%' }} variant='rounded' />
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}