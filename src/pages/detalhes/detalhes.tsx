import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Card, CardContent,
    CardMedia, Divider, IconButton, Link,
    Paper, Skeleton, Stack, Tooltip,
    Typography, useMediaQuery, useTheme
} from '@mui/material';
import { AddCard, Favorite, LocalMall, WhatsApp } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { Breadcrumbs, MCardAreaRow } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { Capitalize, FormatBRL } from '../../shared/util';
import { useCartContext } from '../../shared/contexts';

interface ILists {
    list: string[]
}

const ListCategories: React.FC<ILists> = ({ list }) => {
    return (
        <Stack direction='row' paddingX={1} spacing={1}>
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

export const Detalhes: React.FC = () => {
    const { categoria = 'roupas', nome } = useParams();
    const theme = useTheme();
    const navigation = useNavigate();
    const { addItem } = useCartContext();
    const [loading, setLoading] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [produto, setProduto] = useState<IProduto>();
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [sourceImage, setSourceImage] = useState<string>();
    const [sizeSelected, setSizeSelected] = useState('');
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ListImages: React.FC<ILists> = ({ list }) => {
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
                        <Paper
                            elevation={1}
                            key={index}
                            square
                            sx={{ cursor: 'pointer', padding: 0.5 }}
                        >
                            <CardMedia
                                alt={`${produto?.produto.titulo} - imagem ${index + 1}`}
                                component='img'
                                height={theme.spacing(8)}
                                image={image}
                                key={index}
                                onClick={() => setSourceImage(image)}
                                sx={{ objectFit: 'contain', width: theme.spacing(6) }}
                                title={`Imagem ${index + 1}`}
                            />
                        </Paper>
                    )
                }
            </Stack>
        )
    }

    const ListSizes: React.FC<ILists> = ({ list }) => {
        const handleClick = (tamanho: string) => setSizeSelected((oldSizeSelected) => oldSizeSelected !== tamanho ? tamanho : '');
        useEffect(() => {
            if (list.length === 1)
                setSizeSelected(list[0]);
        }, [list]);

        return (
            <Stack direction='row' marginTop={1} spacing={1}>
                {
                    list.map((tamanho, index) =>
                        <Box
                            component={Paper}
                            bgcolor={tamanho === sizeSelected ? theme.palette.background.default : 'default'}
                            elevation={1}
                            key={index}
                            onClick={() => handleClick(tamanho)}
                            paddingY={1}
                            paddingX={2}
                            square
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography fontSize={12}>
                                {Capitalize(tamanho)}
                            </Typography>
                        </Box>
                    )
                }
            </Stack>
        )
    }

    const handleListProducts = () => {
        ProdutoService.getAllByCategory(categoria)
            .then((response) => setProdutos(response.list))
            .catch((error) => alert(error.message))
            .finally(() =>  setLoadingProducts(false));
    }

    const handleFavorite = () => alert(Environment.NOT_IMPLEMENTED_MESSAGE);

    const handleShoppingBag = () => {
        if (produto) {
            if (sizeSelected.length > 0) {
                const cartProduct = {
                    id: produto.id,
                    titulo: produto.produto.titulo,
                    nome: produto.nome,
                    cor: produto.cor,
                    imagem: produto.imagens[0],
                    tamanho: sizeSelected,
                    categoria: produto.produto.categoria[0],
                    valor: produto.valor,
                }
                addItem(cartProduct);
                alert('Produto adicionado a sacola!');
            } else {
                alert('Selecione um tamanho!')
            }
        } else {
            alert('Não é possível adicionar a sacola!');
        }
    };

    const handleBuy = () => {
        if (produto) {
            if (sizeSelected.length > 0) {
                const cartProduct = {
                    id: produto.id,
                    titulo: produto.produto.titulo,
                    nome: produto.nome,
                    cor: produto.cor,
                    imagem: produto.imagens[0],
                    tamanho: sizeSelected,
                    categoria: produto.produto.categoria[0],
                    valor: produto.valor,
                }
                addItem(cartProduct);
                navigation('/sacola');
            } else {
                alert('Selecione um tamanho!')
            }
        } else {
            alert('Não é possível fazer esta operação!');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        setLoadingProducts(true);
        ProdutoService.getByName(nome || '')
            .then((response) => {
                setProduto(response);
                setSourceImage(response.imagens[0]);
            })
            .catch((error) => alert(error.message))
            .finally(() => {
                setLoading(false);
                handleListProducts();
            })
    }, [nome]);

    return (
        <BaseLayout
            description={Environment.CUSTOM_DESCRIPTION(String(produto?.produto.titulo))}
            showCategories
            showSearch
            title={`${produto?.produto.titulo} - ${Environment.DEFAULT_TITLE}`}
        >
            <Breadcrumbs loadingTitle={loading} title={String(produto?.produto.titulo)} />
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
                        width={smDownScreen ? '100%' : '50%'}
                    >
                        {
                            loading ? (
                                <Skeleton
                                    height='100%'
                                    variant='rounded'
                                />
                            ) : (
                                <CardMedia
                                    alt={produto?.produto.titulo}
                                    component='img'
                                    height='100%'
                                    image={sourceImage}
                                    sx={{ objectFit: 'contain' }}
                                    title={produto?.produto.titulo}
                                />
                            )
                        }
                    </Box>
                    <Box width={smDownScreen ? '100%' : '50%'}>
                        <CardContent
                            component={Box}
                            display='flex'
                            flexDirection={smDownScreen ? 'column-reverse' : 'column'}
                            height='100%'
                            sx={{ cursor: 'default' }}
                        >
                            <Stack direction='column'>
                                <Typography
                                    fontWeight={500}
                                    variant='h5'
                                >
                                    {
                                        loading ? <Skeleton variant='text' width='80%' /> : produto?.produto.titulo
                                    }
                                </Typography>
                                <Typography
                                    fontSize={10}
                                    variant='caption'
                                >
                                    {
                                        loading ? <Skeleton variant='text' width='20%' /> : `Sku: ${produto?.produto.sku}`
                                    }
                                </Typography>
                                <Typography
                                    component='nav'
                                    display='flex'
                                    alignItems='center'
                                    flexDirection='row'
                                    fontSize={10}
                                    overflow='auto'
                                    variant='caption'
                                >
                                    {
                                        loading ? (
                                            <Skeleton variant='text' width='50%' />
                                        ) : (
                                            <>
                                                Categoria: {produto && <ListCategories list={produto.produto.categoria} />}
                                            </>
                                        )
                                    }
                                </Typography>
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
                                        produto && <ListSizes list={produto.tamanhos} />
                                    )
                                }
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    flexDirection='row'
                                    justifyContent='space-between'
                                    marginY={2}
                                    gap={1}
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
                                    <Stack direction='row' spacing={2}>
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
                                                onClick={handleShoppingBag}
                                            >
                                                <LocalMall />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                                <Button
                                    color='secondary'
                                    endIcon={<AddCard />}
                                    onClick={handleBuy}
                                    title='Comprar esta peça'
                                    variant='contained'
                                >
                                    Comprar
                                </Button>
                                <Link
                                    href={`https://wa.me/?text=${window.location.href}`}
                                    target='_blank'
                                    title='Compartilhar pelo WhatsApp'
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
                                {(!loading && produto) && <ListImages list={produto.imagens} />}
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
                            ) : produto?.produto.descricao
                        }
                    </Typography>
                </CardContent>
            </Card>
            <Typography
                fontWeight={500}
                marginLeft={smDownScreen ? 2 : 0}
                marginY={2}
                variant='h6'
                sx={{ textTransform: 'uppercase' }}
            >
                Você também pode gostar
            </Typography>
            <Box
                component={Paper}
                marginY={1}
                square
                variant='outlined'
            >
                <MCardAreaRow list={produtos} isLoading={loadingProducts} />
            </Box>
        </BaseLayout >
    )
}