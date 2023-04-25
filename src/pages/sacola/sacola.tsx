import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box, Button, Card,
    CardActions, CardContent, CardMedia, Chip,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Divider, IconButton,
    Link, Paper, Stack, Tooltip, Typography,
    useMediaQuery, useTheme
} from '@mui/material'
import { Clear, DeleteForever, Done, ShoppingBag } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout'
import { ICartProduct, useCartContext, useDialogContext } from '../../shared/contexts';
import { SendOrderMessage, FormatBRL } from '../../shared/util';
import { Environment } from '../../shared/environment';

interface IDetailsProduct {
    param: string;
    value: string;
}

interface ICardProduct {
    clickDelete: () => void;
    produto: ICartProduct;
}

const CartNotFound: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            alignItems='center'
            display='flex'
            flexDirection='column'
            gap={2}
            paddingY={2}
            width='100%'
        >
            <Stack
                direction={smDownScreen ? 'column' : 'row'}
                width='100%'
            >
                <Typography
                    fontWeight={600}
                    textAlign={smDownScreen ? 'center' : 'right'}
                    padding={1}
                    variant='h6'
                    width='100%'
                >
                    Sua sacola está vazia
                </Typography>
                <Divider orientation={smDownScreen ? 'horizontal' : 'vertical'} />
                <Box
                    alignItems='flex-start'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    padding={1}
                    width='100%'
                >
                    <Typography
                        alignItems='center'
                        color='text.secondary'
                        component={Box}
                        display='flex'
                        gap={1}
                        variant='subtitle2'
                    >
                        <ShoppingBag fontSize='small' />
                        {'São dezenas de produtos para você escolher'}
                    </Typography>
                </Box>
            </Stack>
            <Box padding={2}>
                <Button
                    color='secondary'
                    disableElevation
                    onClick={() => navigate('/')}
                    variant='contained'
                >
                    Conferir Novidades
                </Button>
            </Box>
        </Box >
    )
}

const DetailsProduct: React.FC<IDetailsProduct> = ({ param, value }) => (
    <Stack
        alignItems='center'
        direction='row'
        spacing={1}
    >
        <Typography variant='caption'>{param}</Typography>
        <Chip
            icon={<Done />}
            label={value}
            size='small'
        />
    </Stack>
)

const CardProduct: React.FC<ICardProduct> = ({ clickDelete, produto }) => {
    const theme = useTheme();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Card
            component={Box}
            display='flex'
            flexDirection='row'
            sx={{ backgroundColor: theme.palette.background.default }}
            width='100%'
        >
            <CardContent sx={{ width: '25%' }}>
                <CardMedia
                    alt='Imagem do produto'
                    component='img'
                    height={theme.spacing(15)}
                    image={produto.imagem}
                    sx={{ objectFit: 'contain' }}
                />
            </CardContent>
            <CardContent sx={{ width: '50%' }}>
                <Stack spacing={1}>
                    <Link
                        component={RouterLink}
                        to={`/buscar/${produto.categoria}/${produto.nome}`}
                        underline='none'
                        variant='inherit'
                    >
                        <Typography fontWeight={600} gutterBottom variant='button'>
                            {produto.titulo}
                        </Typography>
                    </Link>
                    <DetailsProduct param='Cor' value={produto.cor} />
                    <DetailsProduct param='Tamanho' value={produto.tamanho} />
                </Stack>
            </CardContent>
            <CardContent sx={{ width: '25%' }}>
                <Stack
                    alignItems='center'
                    direction={smDownScreen ? 'column' : 'row'}
                    height='100%'
                    justifyContent='center'
                    spacing={1}
                >
                    <Stack direction='row' spacing={0.5}>
                        <Typography textAlign='left' variant='subtitle2'>
                            Por
                        </Typography>
                        <Typography fontWeight={600} textAlign='left' variant='subtitle2'>
                            {FormatBRL(produto.valor)}
                        </Typography>
                    </Stack>
                    <CardActions>
                        {
                            mdDownScreen ? (
                                <IconButton onClick={clickDelete}>
                                    <DeleteForever color='secondary' />
                                </IconButton>
                            ) : (
                                <Button
                                    color='secondary'
                                    disableElevation
                                    onClick={clickDelete}
                                    size='small'
                                    startIcon={<DeleteForever />}
                                    variant='contained'
                                >
                                    Remover
                                </Button>
                            )
                        }
                    </CardActions>
                </Stack>
            </CardContent>
        </Card>
    )
}

export const Sacola: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigate();
    const { clearCart, items, removeItem } = useCartContext();
    const { showAlert } = useDialogContext();
    const [amount, setAmount] = useState(0);
    const [propsBoxDialog, setPropsBoxDialog] = useState({
        action: () => { },
        contentText: '',
        open: false,
        title: ''
    })

    const handleCloseDialog = () => setPropsBoxDialog((oldPropsBoxDialog) => { return { ...oldPropsBoxDialog, open: false } });

    const handleClearCart = () => {
        clearCart();
        handleCloseDialog();
    }

    const handleRemove = (item: ICartProduct) => {
        removeItem(item);
        handleCloseDialog();
    }

    const handleDialogRemove = (item: ICartProduct) => {
        setPropsBoxDialog({
            action: () => handleRemove(item),
            contentText: 'Tem certeza que deseja remover este item da sacola?',
            open: true,
            title: 'Remover item da sacola?'
        });
    }

    const handleDialogClear = () => {
        setPropsBoxDialog({
            action: handleClearCart,
            contentText: 'Tem certeza que deseja remover todos os itens da sacola?',
            open: true,
            title: 'Remover todos os itens da sacola?'
        });
    }

    const handleCheckout = () => {
        if (items.length > 0) {
            SendOrderMessage(items);
            clearCart();
        } else {
            showAlert('Seu carrinho está vazio', 'info');
        }
    }

    useEffect(() => {
        setAmount(items.reduce((total, produto) => total += produto.valor, 0));
    }, [items]);

    return (
        <BaseLayout
            showCategories
            showSearch
            sampleFooter
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                padding={1}>
                <Typography fontWeight={600} variant='h6'>Minha Sacola</Typography>
                <Box
                    alignItems='center'
                    display='flex'
                    flexDirection='row'
                    gap={1}
                >
                    <Typography color='text.secondary' variant='caption'>
                        {`${items.length} produtos`}
                    </Typography>
                    {
                        items.length !== 0 && (
                            <Tooltip title='Remover todos os itens'>
                                <IconButton
                                    color='secondary'
                                    onClick={handleDialogClear}
                                    size='small'
                                >
                                    <Clear />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Box>
            </Stack>
            <Box
                display='flex'
                flex={1}
                flexDirection='column'
                gap={1}
                padding={1}
            >
                {
                    items.length > 0 ? items.map((produto, index) =>
                        <CardProduct
                            clickDelete={() => handleDialogRemove(produto)}
                            key={index}
                            produto={produto}
                        />
                    ) : (
                        <CartNotFound />
                    )
                }
            </Box>
            <Box
                bgcolor={theme.palette.background.default}
                component={Paper}
                elevation={0}
                marginY={2}
                padding={1}
            >
                <Typography fontWeight={600} variant='button'>Resumo</Typography>
                <Stack
                    alignItems='start'
                    direction='row'
                    justifyContent='space-between'
                    marginY={1}
                    sx={{ cursor: 'default' }}
                >
                    <Typography variant='body1'>Total</Typography>
                    <Box>
                        <Typography fontWeight={600} textAlign='right' variant='subtitle1'>
                            {FormatBRL(amount)}
                        </Typography>
                        {
                            (Environment.CALCULATE_INSTALLMENT(amount).quantidade > 1) && (
                                <Typography
                                    color='text.secondary'
                                    marginY={2}
                                    textAlign='right'
                                    variant='caption'
                                >
                                    {`Em até ${Environment.CALCULATE_INSTALLMENT(amount).quantidade}x de ${FormatBRL(Environment.CALCULATE_INSTALLMENT(amount).parcela)}`}
                                </Typography>
                            )
                        }
                    </Box>
                </Stack>
                <Divider />
                {
                    items.length > 0 && (
                        <Stack
                            direction='row'
                            justifyContent='end'
                            marginY={1}
                            spacing={1}
                        >
                            <Button
                                disableElevation
                                onClick={() => navigation('/')}
                                variant='outlined'
                            >
                                Adicionar itens
                            </Button>
                            <Button
                                color='secondary'
                                disableElevation
                                onClick={handleCheckout}
                                variant='contained'
                            >
                                Fechar compra
                            </Button>
                        </Stack>
                    )
                }
            </Box>
            <Dialog
                open={propsBoxDialog.open}
                onClose={handleCloseDialog}
            >
                <DialogTitle>
                    {propsBoxDialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {propsBoxDialog.contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        size='small'
                    >
                        Cancelar
                    </Button>
                    <Button
                        autoFocus
                        color='secondary'
                        onClick={propsBoxDialog.action}
                        size='small'
                        variant='contained'
                    >
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
        </BaseLayout>
    )
}