import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Card, CardContent,
    CardMedia, Divider, IconButton, Link,
    Paper, Skeleton, Stack, Tooltip,
    Typography, useMediaQuery, useTheme
} from '@mui/material';
import { AddCard, ArrowBackIosOutlined, ArrowForwardIosOutlined, Favorite, LocalMall, WhatsApp } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { Breadcrumbs, MCardAreaRow } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { Capitalize, FormatBRL } from '../../shared/util';
import { useCartContext, useDialogContext } from '../../shared/contexts';
import Carousel from 'react-material-ui-carousel';

interface ILists {
    list: string[],
    click?: (text: string) => void;
}

interface IListsImage extends ILists {
    heightImage: number;
    widthImage: number;
}

interface IAreaImage {
    img: string | undefined;
    isLoading: boolean;
}

interface IAreaRecommended {
    recommendeds: IProduto[];
    isLoading: boolean;
}

const ListCategories: React.FC<ILists> = ({ list }) => {
    return (
        <Stack
            direction='row'
            paddingX={1}
            spacing={1}
        >
            {
                list.map((categoria, index) =>
                    <Link
                        component={RouterLink}
                        key={index}
                        title={`Navegar para categoria ${categoria}`}
                        to={`/buscar/${categoria}`}
                        underline='hover'
                    >
                        {Capitalize(categoria)}
                    </Link>)
            }
        </Stack>
    )
}

const ListSizes: React.FC<ILists> = ({ list, click }) => {
    const theme = useTheme();
    const [sizeSelected, setSizeSelected] = useState<string>('');

    const handleClick = (size: string) => {
        setSizeSelected((oldSizeSelected) => oldSizeSelected !== size ? size : '');
        click && click(sizeSelected !== size ? size : '');
    }

    useEffect(() => {
        if (list.length === 1) {
            setSizeSelected(list[0]);
            click && click(list[0]);
        }
    }, [list]);

    return (
        <Stack
            direction='row'
            marginTop={1}
            spacing={1}
        >
            {
                list.map((size, index) =>
                    <Box
                        component={Paper}
                        bgcolor={size == sizeSelected ? theme.palette.primary.light : 'default'}
                        elevation={1}
                        key={index}
                        onClick={() => handleClick(size)}
                        paddingY={1}
                        paddingX={2}
                        square
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography fontSize={12}>
                            {Capitalize(size)}
                        </Typography>
                    </Box>
                )
            }
        </Stack>
    )
}

const ListImages: React.FC<IListsImage> = ({ list, click, heightImage, widthImage }) => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState(list[0]);

    const getOpacity = (image: string) => image == selectedImage ? 0.75 : 1;

    const handleClick = (image: string) => {
        setSelectedImage(image);
        click && click(image);
    }

    return (
        <Stack
            alignItems='center'
            direction='row'
            justifyContent='center'
            paddingY={1}
            overflow='auto'
            spacing={2}
        >
            {
                list.map((image, index) =>
                    <Card
                        component={Paper}
                        elevation={1}
                        key={index}
                        square
                        sx={{ cursor: 'pointer', padding: 0.5 }}
                    >
                        <CardMedia
                            alt={`Imagem ${index + 1}`}
                            component='img'
                            height={theme.spacing(heightImage)}
                            image={image}
                            key={index}
                            onClick={() => handleClick(image)}
                            sx={{ objectFit: 'contain', opacity: getOpacity(image), width: theme.spacing(widthImage) }}
                        />
                    </Card>
                )
            }
        </Stack>
    )
}

const AreaImage: React.FC<IAreaImage> = ({ img, isLoading }) => {
    return isLoading ? (
        <Skeleton
            height='100%'
            variant='rounded'
        />
    ) : (
        <CardMedia
            alt='Imagem principal'
            component='img'
            height='100%'
            image={img}
            sx={{ objectFit: 'contain' }}
        />
    )
}

const AreaRecommended: React.FC<IAreaRecommended> = ({ isLoading, recommendeds }) => (
    <Card
        component={Box}
        marginY={2}
        padding={1}
    >
        <Typography
            variant='h6'
            sx={{ textTransform: 'uppercase' }}
        >
            Você também pode gostar
        </Typography>
        <Box marginY={1}>
            <MCardAreaRow list={recommendeds} isLoading={isLoading} />
        </Box>
    </Card>
)

export const Detalhes: React.FC = () => {
    const { categoria = 'roupas', nome } = useParams();
    const theme = useTheme();
    const navigation = useNavigate();
    const { addItem } = useCartContext();
    const { showAlert } = useDialogContext();
    const [loading, setLoading] = useState(true);
    const [produto, setProduto] = useState<IProduto>();
    const [loadingRecommendeds, setLoadingRecommendeds] = useState(true);
    const [recommendeds, setRecommendeds] = useState<IProduto[]>([]);
    const [sourceImage, setSourceImage] = useState<string>();
    const [sizeSelected, setSizeSelected] = useState('');
    const [title, setTitle] = useState<string | undefined>();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const addCart = (product: IProduto) => {
        const cartProduct = {
            id: product.id,
            titulo: product.produtoBase.titulo,
            nome: product.nome,
            cor: product.cor,
            imagem: product.imagens[0],
            tamanho: sizeSelected,
            categoria: product.produtoBase.categoria[0],
            valor: product.valor,
        };
        addItem(cartProduct);
    }

    const handleListRecommendeds = () => {
        ProdutoService.getAllByCategory(categoria)
            .then((response) => setRecommendeds(response.list))
            .catch((error) => showAlert(error.message, 'error'))
            .finally(() => setLoadingRecommendeds(false));
    }

    const handleFavorite = () => showAlert(Environment.NOT_IMPLEMENTED_MESSAGE, 'warning');

    const handleActionBuy = (action: () => void) => {
        if (produto) {
            if (sizeSelected.length > 0) {
                addCart(produto);
                action();
            } else {
                showAlert('Selecione um tamanho!', 'warning');
            }
        } else {
            showAlert('Não foi possível adicionar a sacola!', 'error');
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        setLoadingRecommendeds(true);
        ProdutoService.getByName(nome || '')
            .then((response) => {
                setProduto(response);
                setTitle(response.produtoBase.titulo);
                setSourceImage(response.imagens[0]);
            })
            .catch((error) => showAlert(error.message, 'error'))
            .finally(() => {
                setLoading(false);
                handleListRecommendeds();
            })
    }, [nome]);

    return (
        <BaseLayout
            description={Environment.CUSTOM_DESCRIPTION(String(title))}
            showCategories
            showSearch
            title={`${title} - ${Environment.DEFAULT_TITLE}`}
        >
            <Breadcrumbs loadingTitle={loading} title={title} />
            <Card
                component={Box}
                display='flex'
                flexDirection='column'
                variant='outlined'
            >
                <Stack direction={smDownScreen ? 'column' : 'row'}>
                    <Box
                        height={theme.spacing(50)}
                        marginY='auto'
                        padding={1}
                        width={smDownScreen ? '100%' : '65%'}
                    >
                        <AreaImage img={sourceImage} isLoading={loading} />
                    </Box>
                    <Box width={smDownScreen ? '100%' : '35%'}>
                        <CardContent
                            component={Box}
                            display='flex'
                            flexDirection={smDownScreen ? 'column-reverse' : 'column'}
                            height='100%'
                            sx={{ cursor: 'default' }}
                        >
                            <Stack direction='column'>
                                <Typography fontWeight={500} variant='h5'>
                                    {
                                        loading ? <Skeleton variant='text' width='80%' /> : produto?.produtoBase.titulo
                                    }
                                </Typography>
                                <Typography fontSize={10} variant='caption'>
                                    {
                                        loading ? <Skeleton variant='text' width='20%' /> : `Sku: ${produto?.produtoBase.sku}`
                                    }
                                </Typography>
                                {
                                    loading ? (
                                        <Skeleton variant='text' width='50%' />
                                    ) : (
                                        <Typography
                                            display='flex'
                                            alignItems='center'
                                            flexDirection='row'
                                            fontSize={10}
                                            overflow='auto'
                                            variant='caption'
                                        >
                                            Categoria: {produto && <ListCategories list={produto.produtoBase.categoria} />}
                                        </Typography>
                                    )
                                }
                                <Typography marginTop={1} variant='h6'>
                                    Tamanhos
                                </Typography>
                                {
                                    loading ? (
                                        <Stack direction='row' spacing={2}>
                                            {
                                                Array.from(Array(4)).map((_, index) =>
                                                    <Skeleton
                                                        height={theme.spacing(5)}
                                                        key={index}
                                                        variant='rounded'
                                                        width={theme.spacing(6)}
                                                    />
                                                )
                                            }
                                        </Stack>
                                    ) : (
                                        produto && <ListSizes list={produto.tamanhos} click={(size) => setSizeSelected(size)} />
                                    )
                                }
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    flexDirection='row'
                                    justifyContent='space-between'
                                    marginY={2}
                                >
                                    <Typography fontWeight={500} variant='h5'>
                                        {
                                            loading ? (
                                                <Skeleton variant='text' width={theme.spacing(15)} />
                                            ) : (
                                                produto && `${FormatBRL(produto.valor)}`
                                            )
                                        }
                                    </Typography>
                                    <Stack direction='row' spacing={1}>
                                        <Tooltip title='Adicionar aos favoritos'>
                                            <IconButton
                                                color='secondary'
                                                onClick={handleFavorite}
                                            >
                                                <Favorite />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Adicionar a sacola'>
                                            <IconButton
                                                color='secondary'
                                                onClick={() => handleActionBuy(() => showAlert('Produto adicionado a sacola!', 'success'))}
                                            >
                                                <LocalMall />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                {
                                    (!loading && produto && Environment.CALCULATE_INSTALLMENT(produto.valor).quantidade > 1) && (
                                        <Typography
                                            color='text.secondary'
                                            marginBottom={2}
                                            marginTop={-2}
                                            sx={{ cursor: 'default' }}
                                            variant='caption'
                                        >
                                            {`Em até ${Environment.CALCULATE_INSTALLMENT(produto.valor).quantidade}x de ${FormatBRL(Environment.CALCULATE_INSTALLMENT(produto.valor).parcela)}`}
                                        </Typography>
                                    )
                                }
                                <Button
                                    color='secondary'
                                    endIcon={<AddCard />}
                                    onClick={() => handleActionBuy(() => navigation('/sacola'))}
                                    variant='contained'
                                >
                                    Eu quero
                                </Button>
                                <Link
                                    href={`https://wa.me/?text=${window.location.href}`}
                                    target='_blank'
                                    underline='hover'
                                >
                                    <Stack
                                        alignItems='center'
                                        direction='row'
                                        justifyContent='center'
                                        marginY={2}
                                        spacing={1}
                                        width='100%'
                                    >
                                        <Typography fontSize='inherit'>
                                            Curtiu? Compartilhe essa peça!
                                        </Typography>
                                        <WhatsApp color='success' />
                                    </Stack>
                                </Link>
                            </Stack>
                            <Box flex={1} paddingY={1} >
                                {
                                    (!loading && produto) && (
                                        <ListImages
                                            click={(text) => setSourceImage(text)}
                                            heightImage={8}
                                            list={produto.imagens}
                                            widthImage={6}
                                        />
                                    )
                                }
                            </Box>
                        </CardContent>
                    </Box>
                </Stack>
                <Divider />
                <CardContent sx={{ cursor: 'default' }}>
                    <Typography variant='h6'>Informações da modelo</Typography>
                    <Typography variant='body1'>
                        {
                            loading ? (
                                <>
                                    <Skeleton variant='text' width='100%' />
                                    <Skeleton variant='text' width='80%' />
                                </>
                            ) : produto?.produtoBase.descricao
                        }
                    </Typography>
                </CardContent>
            </Card>
            <AreaRecommended recommendeds={recommendeds} isLoading={loadingRecommendeds} />
            {
                produto && (
                    <Card
                        component={Box}
                        marginBottom={2}
                        padding={1}
                    >
                        <Carousel
                            autoPlay
                            height={theme.spacing(75)}
                            NextIcon={<ArrowForwardIosOutlined />}
                            PrevIcon={<ArrowBackIosOutlined />}
                            sx={{ zIndex: 0 }}
                        >
                            {
                                produto.imagens.map((image, index) => (
                                    <CardMedia
                                        alt={title}
                                        component='img'
                                        height='100%'
                                        image={image}
                                        sx={{ objectFit: 'contain' }}
                                    />
                                ))
                            }
                        </Carousel>
                    </Card>
                )
            }
        </BaseLayout >
    )
}