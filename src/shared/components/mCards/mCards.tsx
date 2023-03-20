import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box, Card, CardContent, CardMedia,
    Fade, Grid, IconButton, Link, Skeleton,
    Stack, Typography, useMediaQuery, useTheme
} from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material';
import { useAppThemeContext, useDialogContext } from '../../contexts';
import { IProduto } from '../../service';
import { Environment } from '../../environment';
import { Capitalize, FormatBRL } from '../../util';

function BackgroundColorCard() {
    const theme = useTheme();
    const { themeName } = useAppThemeContext();
    return themeName == 'light' ? '#ffffff65' : theme.palette.background.paper;
}

function CalculateWidhtWhenRow() {
    const theme = useTheme();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    return smDownScreen ? '50%' : (mdDownScreen ? '33%' : '25%');
}

interface IMCardArea {
    list: IProduto[];
    isLoading: boolean;
}

interface IMCard {
    item: IProduto;
    directionRow?: boolean;
}

const MCard: React.FC<IMCard> = ({ directionRow, item }) => {
    const theme = useTheme();
    const { showAlert } = useDialogContext();
    const [showTransition, setShowTransition] = useState(false);
    const [variantCard, setVariantCard] = useState<'outlined' | 'elevation'>('outlined');
    const widhtWhenRow = directionRow ? CalculateWidhtWhenRow() : undefined;
    const backgroundColorCard = BackgroundColorCard();

    const { produto: { categoria, marca, titulo }, cor, nome, imagens, valor } = item;
    const [image, setImage] = useState(imagens[0]);
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
        setTimeout(() => setShowTransition(true), 750)
    }, []);

    return (
        <Grid
            item
            paddingX={1}
            paddingTop={2}
            xs={6}
            sm={4}
            md={3}
            minWidth={widhtWhenRow}
        >
            <Fade in={showTransition}>
                <Card
                    component={Box}
                    height={theme.spacing(45)}
                    position='relative'
                    sx={{ backgroundColor: backgroundColorCard, border: 0 }}
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
                        underline='none'
                    >
                        <CardMedia
                            alt={title}
                            component='img'
                            height='73%'
                            image={image}
                            onMouseEnter={handleMouseEnter}
                            onMouseOut={handleMouseOut}
                            sx={{ objectFit: 'contain' }}
                        />
                    </Link>
                    <CardContent sx={{ flex: '1 0 auto', padding: 1 }}>
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
                        <Stack
                            alignItems='center'
                            direction='row'
                            spacing={1}
                        >
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
                                <Typography
                                    color='text.secondary'
                                    sx={{ cursor: 'default' }}
                                    variant='caption'
                                >
                                    {`Em até ${installment.quantidade}x de ${FormatBRL(installment.parcela)}`}
                                </Typography>
                            )
                        }
                    </CardContent>
                </Card>
            </Fade>
        </Grid>
    )
}

const MCardSkeleton: React.FC<{ directionRow?: boolean }> = ({ directionRow }) => {
    const theme = useTheme();
    const widhtWhenRow = directionRow ? CalculateWidhtWhenRow() : undefined;

    return (
        <Grid
            item
            paddingX={1}
            paddingTop={2}
            xs={6}
            sm={4}
            md={3}
            minWidth={widhtWhenRow}
        >
            <Card sx={{ height: theme.spacing(45) }} variant='outlined'>
                <Skeleton height={theme.spacing(33)} variant='rectangular' />
                <CardContent sx={{ flex: '1 0 auto', padding: 1 }}>
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

export const MCardNotFound: React.FC = () => {

    return (
        <Grid
            container
            item
            textAlign='center'
        >
            <Grid
                item
                xs={12}
                sm={6}
            >
                <Typography variant='h6'>{Environment.DEFAULT_NOT_FOUND_MESSAGE}</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
            >
                <Typography variant='h6'>Confira se digitou corretamente</Typography>
                <Typography variant='h6'>Use palavras chave diferentes</Typography>
                <Typography variant='h6'>Tente novamente mais tarde</Typography>
            </Grid>
        </Grid>
    )
}

export const MCardArea: React.FC<IMCardArea> = ({ list, isLoading }) => {
    const countMCardSkeleton = 12;

    return (
        <Grid
            container
            padding={1}
            marginX={0}
            marginBottom={2}
        >
            {
                isLoading ? (
                    Array.from(Array(countMCardSkeleton)).map((_, index) => <MCardSkeleton key={index} />)
                ) : list.length > 0 ? (
                    list.map((item, index) => <MCard item={item} key={index} />)
                ) : (
                    <MCardNotFound />
                )
            }
        </Grid>
    )
}

export const MCardAreaRow: React.FC<IMCardArea> = ({ list, isLoading }) => {
    const theme = useTheme();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const countMCardSkeleton = smDownScreen ? 2 : mdDownScreen ? 3 : 4;

    return (
        <Stack
            direction='row'
            overflow='auto'
            sx={{
                '::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            {
                isLoading ? (
                    Array.from(Array(countMCardSkeleton)).map((_, index) => <MCardSkeleton directionRow key={index} />)
                ) : list.length > 0 ? (
                    list.map((item, index) => <MCard directionRow item={item} key={index} />)
                ) : (
                    <Box textAlign='center'>
                        <Typography variant='h6'>{Environment.DEFAULT_NOT_FOUND_MESSAGE}</Typography>
                    </Box>
                )
            }
        </Stack>
    )
}