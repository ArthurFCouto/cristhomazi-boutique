import { useParams } from 'react-router-dom';
import { Box, CardMedia, Typography, useTheme } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { useEffect, useState } from 'react';
import { Api, IProduto, ProdutoService } from '../../shared/service';
import { Breadcrumbs } from '../../shared/components';
import { Environment } from '../../shared/environment';

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
            <Box height='100%' width='100%'>
                <Box flexDirection='column' height={theme.spacing(80)} width='50%'>
                    <CardMedia
                        alt={titulo}
                        component='img'
                        height='60%'
                        image={sourceImage}
                        sx={{ objectFit: 'contain' }}
                        title={titulo}

                    />
                    <Box alignItems='center' justifyContent='center'>
                        {
                            //produto?.imagens.map((image) => <img src={image} style={{ maxHeight: '100%', maxWidth: '100%' }} onClick={() => setSourceImage(image)} />)
                        }
                    </Box>
                </Box>
                <Box width='50%'>

                </Box>
            </Box>
        </BaseLayout>
    )
}