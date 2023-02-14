import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { useEffect, useState } from 'react';
import { Api } from '../../shared/service';
import { Breadcrumbs } from '../../shared/components';

export const Detalhes: React.FC = () => {
    const { nome } = useParams();
    const [loading, setLoading] = useState(true);
    const [produto, setProduto] = useState({});
    const [titulo, setTitulo] = useState('Carregando...');

    useEffect(() => {
        const buscarEstoque = async (idProduto: number)=> {
            const url = `estoque?idProduto=${idProduto}`;
            const responseEstoque = await Api.get(url).catch((error) => error.response);
            console.log('Response estoque', responseEstoque);
        }
        const buscarProdutos = async () => {
            const url = `estoque?nome=${nome}`;
            setLoading(true);
            const responseProduto = await Api.get('produto').catch((error) => error.response);
            const responseEstoque = await Api.get(url).catch((error) => error.response);
            if (responseProduto && responseEstoque) {
                const { data: dataProduto } = responseProduto;
                const { data: dataEstoque } = responseEstoque;
                if (!dataEstoque.error && !dataProduto.error) {
                    dataEstoque[0].produto = dataProduto[dataEstoque[0].idProduto - 1];
                    setProduto(dataEstoque[0]);
                    setTitulo(dataEstoque[0].produto.titulo);
                    buscarEstoque(dataEstoque[0].idProduto);
                }
            } else {
                alert('Erro ao conectar com servidor.');
            }
            setLoading(false);
        }
        buscarProdutos();
    }, [nome]);

    return (
        <BaseLayout title='Cris Thomazi Boutique' showSearch>
            <Breadcrumbs loadingTitle={loading} title={titulo}/>
            <Typography>Teste</Typography>
        </BaseLayout>
    )
}