import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { Breadcrumbs, Card, CardArea, CardSkeleton } from '../../shared/components';
import { Api } from '../../shared/service';

export const Buscar: React.FC = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const buscarProdutos = async () => {
            const url = `produtos?q=${search}`;
            setLoading(true);
            setProdutos([]);
            const response = await Api.get(url).catch((error) => error.response);
            if (response) {
                const { data } = response;
                if (!data.error)
                    setProdutos(data);
            } else {
                alert('Erro ao conectar com servidor.');
            }
            setLoading(false);
        }
        buscarProdutos();
    }, [search]);

    return (
        <BaseLayout title='Cris Thomazi Boutique' showSearch>
            <Breadcrumbs />
            {
                !loading && (
                    produtos.length === 0 ? (
                        <Typography variant='body1'>Não há produtos para exibir.</Typography>
                    ) : (
                        <CardArea>
                            {
                                produtos.map((item, index) => (
                                    <Card item={item} key={index} />
                                ))
                            }
                        </CardArea>
                    )
                )
            }
            {
                loading && (
                    <CardArea>
                        <CardSkeleton />
                        <CardSkeleton />
                    </CardArea>
                )
            }
        </BaseLayout>
    )
}