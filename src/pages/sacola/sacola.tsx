import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Button, Card,
    CardActions, CardContent, CardMedia, Chip,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, IconButton,
    Paper, Stack, Typography,
    useMediaQuery, useTheme
} from '@mui/material'
import { Clear, Delete, DeleteForever, Done } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout'
import { useCartContext, useDialogContext } from '../../shared/contexts';
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
    const [idForRemove, setIdForRemove] = useState(0);

    const handleCheckout = () => {
        if (items.length > 0) {
            BuyRedirectCart(items);
            clearCart();
        } else {
            showAlert('Seu carrinho está vazio.', 'info');
        }
    }

    const handleDialog = (id: number) => {
        setShowDialog(true);
        setIdForRemove(id);
    }

    const handleRemove = () => {
        removeItem(idForRemove);
        setShowDialog(false);
        showAlert('Removido com sucesso.', 'success');
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
            <Box
                component={Paper}
                elevation={0}
                padding={1}
            >
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6'>Minha Sacola ({items.length})</Typography>
                    <Button
                        color='secondary'
                        onClick={clearCart}
                        startIcon={<Clear />}
                        size='small'
                        variant='contained'
                    >
                        Limpar
                    </Button>
                </Stack>
            </Box>
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
                                    <Typography gutterBottom variant='button'>{produto.titulo}</Typography>
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
                                                <IconButton onClick={() => handleDialog(produto.id)}>
                                                    <DeleteForever color='secondary' />
                                                </IconButton>
                                            ) : (
                                                <Button
                                                    color='secondary'
                                                    disableElevation
                                                    onClick={() => handleDialog(produto.id)}
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
                    marginBottom={2}
                    marginTop={1}
                >
                    <Typography>Total</Typography>
                    <Typography fontWeight={500}>{FormatBRL(items.reduce((total, produto) => total += produto.valor, 0))}</Typography>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent='end'
                    spacing={1}
                >
                    <Button
                        disableElevation
                        onClick={() => navigation('/')}
                        size='small'
                        variant='outlined'
                    >
                        Continuar comprando
                    </Button>
                    <Button
                        color='secondary'
                        disableElevation
                        onClick={handleCheckout}
                        size='small'
                        variant='contained'
                    >
                        Finalizar
                    </Button>
                </Stack>
                <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                >
                    <DialogTitle>
                        Remover item da sacola?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja remover este item da sacola?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button onClick={handleRemove} autoFocus>
                            Remover
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </BaseLayout>
    )
}