import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';
import { Breadcrumbs, MCard, MCardArea, MCardSkeleton } from '../../shared/components';
import { IProduto, ProdutoService } from '../../shared/service';
import { Environment } from '../../shared/environment';
import { Engineering } from '@mui/icons-material';

export const Buscar: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState<IProduto[]>([]);

    const search = useMemo(() => searchParams.get('busca'), [searchParams]);

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
        <BaseLayout title='Cris Thomazi Boutique' showCategories showSearch>
            <Breadcrumbs />
            {
                loading ? (
                    <MCardArea>
                        {
                            Array.from(Array(12)).map((_, index) => <MCardSkeleton key={index} />)
                        }
                    </MCardArea>
                ) : produtos.length === 0 ? (
                    <Box textAlign='center'>
                        <Typography variant='h6'>{Environment.DEFAULT_NOT_FOUND_MESSAGE}</Typography>
                    </Box>
                ) : (
                    <MCardArea>
                        {
                            produtos.map((item, index) => <MCard item={item} key={index} />)
                        }
                    </MCardArea>
                )
            }
            <Box textAlign='center' bgcolor={'snow'}>
                <Typography variant='h6'>Site em construção</Typography>
                <Engineering />
            </Box>
        </BaseLayout>
    )
}