import { useParams } from 'react-router-dom';
import { Avatar, Box, Card, CardMedia, Typography, useTheme } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { useEffect, useMemo, useState } from 'react';
import { Api, IProduto, ProdutoService } from '../../shared/service';
import { Breadcrumbs } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { Capitalize } from '../../shared/util';

export const Detalhes: React.FC = () => {
    const { nome } = useParams();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [produto, setProduto] = useState<IProduto>();
    const [titulo, setTitulo] = useState('Carregando...');
    const [sourceImage, setSourceImage] = useState<string>();

    const buscarEstoque = async (idProdutoBase: number) => {
        const url = `produto?idProdutoBase=${idProdutoBase}`;
        const responseEstoque = await Api.get(url).catch((error) => error.response);
        console.log('Response estoque', responseEstoque);
    }

    useEffect(() => {
        ProdutoService.getByName(nome || '')
            .then((response) => {
                setProduto(response);
                setTitulo(response.produto.titulo);
                setSourceImage(response.imagens[0]);
                buscarEstoque(response.idProdutoBase);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [nome]);

    return (
        <BaseLayout
            description={Environment.CUSTOM_DESCRIPTION(titulo)}
            title={`${titulo} - ${Environment.DEFAULT_TITLE}`}
            showSearch
        >
            <Breadcrumbs loadingTitle={loading} title={titulo} />
            <Box height={theme.spacing(50)} display={'flex'} flexDirection={'row'}>
                <Card sx={{ padding: 1, width: '50%' }} variant='outlined'>
                    <CardMedia
                        alt={titulo}
                        component='img'
                        height='100%'
                        image={sourceImage}
                        sx={{ objectFit: 'contain' }}
                        title={titulo}
                    />
                </Card>
                <Box
                    padding={1}
                    width='50%'
                >
                    <Typography>
                        {titulo}
                    </Typography>
                    <Typography>
                        Sku: {produto?.produto.sku}
                    </Typography>
                    <Typography>
                        Categoria: {produto?.produto.categoria.map((categoria) => ' ' + Capitalize(categoria)).join()}
                    </Typography>
                    <Typography>
                        Tamanhos: {produto?.tamanhos.map((tamanho) => ' ' + Capitalize(tamanho)).join()}
                    </Typography>
                    <Typography>
                        por R$ {produto?.valor}
                    </Typography>
                    <Box display={'flex'} alignItems='center' justifyContent='center' height={theme.spacing(10)}>
                        {
                            produto?.imagens.map((image) => <img src={image} style={{ maxHeight: '100%', maxWidth: '100%' }} onClick={() => setSourceImage(image)} />)
                        }
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography>Descrição do produto</Typography>
                <Typography>{produto?.produto.descricao}</Typography>
            </Box>
        </BaseLayout>
    )
}