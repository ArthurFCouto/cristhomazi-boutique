import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { useEffect, useState } from 'react';
import { Api } from '../../shared/service';
import { Breadcrumbs } from '../../shared/components';

export const Detalhes: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [produto, setProduto] = useState({});
    const [titulo, setTitulo] = useState();

    useEffect(() => {
        const buscarProdutos = async () => {
            const url = `produtos/${id}`;
            setLoading(true);
            const response = await Api.get(url).catch((error) => error.response);
            if (response) {
                const { data } = response;
                if (!data.error) {
                    setProduto(data);
                    setTitulo(data.produto.titulo);
                }
            } else {
                alert('Erro ao conectar com servidor.');
            }
            setLoading(false);
        }
        buscarProdutos();
    }, [id]);

    return (
        <BaseLayout title='Cris Thomazi Boutique' showSearch>
            <Breadcrumbs title={titulo} />
            <Typography>Teste</Typography>
        </BaseLayout>
    )
}