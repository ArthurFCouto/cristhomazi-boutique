import {
    Box, Button, Card, CardActions,
    CardContent, CardMedia, Chip,
    IconButton, Paper, Stack, Typography,
    useMediaQuery, useTheme
} from '@mui/material'
import { Delete, DeleteForever, Done } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout'
import { FormatBRL } from '../../shared/util';
import { Environment } from '../../shared/environment';
import { useNavigate } from 'react-router-dom';

export const Sacola: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigate();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));

    const item = [{
        id: 2,
        titulo: 'Calça de linho Joana',
        cor: 'roxo simples',
        imagens: ['https://54325.cdn.simplo7.net/static/54325/sku/roupas-calcas-calca-de-linho-joana-p-1674506551553.jpeg'],
        tamanhos: ['G'],
        valor: 159.9,
    }]

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
                <Typography variant='h6'>Minha Sacola ({item.length})</Typography>
            </Box>
            <Box
                display='flex'
                flex={1}
                flexDirection='column'
                gap={1}
                padding={1}
            >
                {
                    item.map((produto, index) =>
                        <Card
                            component={Box}
                            display='flex'
                            flexDirection='row'
                            key={index}
                            width='100%'
                        >
                            <CardContent sx={{ width: '25%' }}>
                                <CardMedia
                                    component='img'
                                    height={theme.spacing(15)}
                                    image={produto.imagens[0]}
                                    sx={{ objectFit: 'contain' }}
                                />
                            </CardContent>
                            <CardContent sx={{ width: '50%' }}>
                                <Stack spacing={1}>
                                    <Typography
                                        gutterBottom
                                        variant='button'
                                    >
                                        {produto.titulo}
                                    </Typography>
                                    <Stack
                                        alignItems='center'
                                        direction='row'
                                        spacing={1}
                                    >
                                        <Typography variant='caption'>Cor:</Typography>
                                        <Chip icon={<Done />} label={produto.cor} size='small' />
                                    </Stack>
                                    <Stack
                                        alignItems='center'
                                        direction='row'
                                        spacing={1}
                                    >
                                        <Typography variant='caption'>Tamanho:</Typography>
                                        <Chip icon={<Done />} label={produto.tamanhos[0]} size='small' />
                                    </Stack>
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
                                    <Typography textAlign='left' variant='subtitle2'>
                                        {'Por: ' + FormatBRL(produto.valor)}
                                    </Typography>
                                    <CardActions>
                                        {
                                            mdDownScreen ? (
                                                <IconButton onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}>
                                                    <DeleteForever color='secondary' />
                                                </IconButton>
                                            ) : (
                                                <Button
                                                    color='secondary'
                                                    disableElevation
                                                    onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}
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
                    <Typography fontWeight={500}>{FormatBRL(item.reduce((total, produto) => total += produto.valor, 0))}</Typography>
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
                        size='small'
                        variant='contained'
                    >
                        Finalizar
                    </Button>
                </Stack>
            </Box>
        </BaseLayout>
    )
}