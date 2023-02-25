import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { Breadcrumbs, Card, CardArea, CardSkeleton } from '../../shared/components';
import { IProduto, ProdutoService } from '../../shared/service';

export const Buscar: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState<IProduto[]>([]);

    const search = useMemo(() => searchParams.get('search'), [searchParams]);

    const buscarProdutos = () => {
        setLoading(true);
        setProdutos([]);
        ProdutoService.getAllWithFilter(search || '', categoria || '')
            .then((response) => {
                setProdutos(response.list);
                console.log('Response', response);
            })
            .catch((error) => {
                console.log('Erro:', error);
                alert(error.customMessage);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        buscarProdutos();
    }, [categoria, search]);

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
                        {
                            Array.from(Array(12)).map((_, index) => (<CardSkeleton key={index} />))
                        }
                    </CardArea>
                )
            }
        </BaseLayout>
    )
}