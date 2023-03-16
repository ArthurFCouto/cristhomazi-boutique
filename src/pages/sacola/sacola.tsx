import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box, Button, Card,
    CardActions, CardContent, CardMedia, Chip,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Divider, IconButton,
    Link, Paper, Stack, Tooltip, Typography,
    useMediaQuery, useTheme
} from '@mui/material'
import { Clear, Delete, DeleteForever, Done } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout'
import { ICartProduct, useCartContext, useDialogContext } from '../../shared/contexts';
import { BuyRedirectCart, FormatBRL } from '../../shared/util';

interface IDetailsProduct {
    param: string;
    value: string;
}

export const Sacola: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigate();
    const { clearCart, items, removeItem } = useCartContext();
    const { showAlert } = useDialogContext();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [showDialog, setShowDialog] = useState(false);
    const [itemForRemove, setItemForRemove] = useState<ICartProduct>();
    const [objDialog, setObjDialog] = useState({
        title: '',
        contentText: '',
        action: () => { }
    })

    const handleCheckout = () => {
        if (items.length > 0) {
            BuyRedirectCart(items);
            clearCart();
        } else {
            showAlert('Seu carrinho está vazio', 'info');
        }
    }

    const handleDialogRemove = (item: ICartProduct) => {
        setObjDialog({
            title: 'Remover item da sacola?',
            contentText: 'Tem certeza que deseja remover este item da sacola?',
            action: handleRemove
        });
        setShowDialog(true);
        setItemForRemove(item);
    }

    const handleDialogClear = () => {
        setObjDialog({
            title: 'Remover todos os itens da sacola?',
            contentText: 'Tem certeza que deseja remover todos os itens da sacola?',
            action: clearCart
        });
        setShowDialog(true);
    }

    const handleRemove = () => {
        itemForRemove && removeItem(itemForRemove);
        setShowDialog(false);
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

    return (
        <BaseLayout
            showCategories
            showSearch
            sampleFooter
        >

            <Stack direction='row' justifyContent='space-between' padding={1}>
                <Typography variant='h6'>Minha Sacola</Typography>
                <Box alignItems='center' display='flex' flexDirection='row' gap={1}>
                    <Typography color='text.secondary' variant='caption'>
                        {`${items.length} produtos`}
                    </Typography>
                    {
                        items.length == 0 && (
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
                    items.map((produto, index) =>
                        <Card
                            component={Box}
                            display='flex'
                            flexDirection='row'
                            key={index}
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
                                        <Typography gutterBottom variant='button'>{produto.titulo}</Typography>
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
                                    <Typography textAlign='left' variant='subtitle2'>{'Por: ' + FormatBRL(produto.valor)}</Typography>
                                    <CardActions>
                                        {
                                            mdDownScreen ? (
                                                <IconButton onClick={() => handleDialogRemove(produto)}>
                                                    <DeleteForever color='secondary' />
                                                </IconButton>
                                            ) : (
                                                <Button
                                                    color='secondary'
                                                    disableElevation
                                                    onClick={() => handleDialogRemove(produto)}
                                                    size='small'
                                                    startIcon={<Delete />}
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
            </Box>
            <Box
                component={Paper}
                elevation={0}
                padding={1}
            >
                <Typography variant='button'>Resumo</Typography>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    marginY={1}
                >
                    <Typography>Total</Typography>
                    <Typography fontWeight={500}>{FormatBRL(items.reduce((total, produto) => total += produto.valor, 0))}</Typography>
                </Stack>
                <Divider />
                <Stack
                    direction='row'
                    justifyContent='end'
                    marginY={1}
                    spacing={1}
                >
                    <Button
                        disableElevation
                        onClick={() => navigation('/')}
                        //size={smDownScreen ? 'small' : 'medium'}
                        variant='outlined'
                    >
                        Adicionar mais itens
                    </Button>
                    <Button
                        color='secondary'
                        disableElevation
                        onClick={handleCheckout}
                        //size={smDownScreen ? 'small' : 'medium'}
                        variant='contained'
                    >
                        Fechar compra
                    </Button>
                </Stack>
                <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                >
                    <DialogTitle>
                        {objDialog.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {objDialog.contentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)} size='small'>Cancelar</Button>
                        <Button
                            autoFocus
                            color='secondary'
                            onClick={objDialog.action}
                            size='small'
                            variant='contained'
                        >
                            Remover
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </BaseLayout>
    )
}