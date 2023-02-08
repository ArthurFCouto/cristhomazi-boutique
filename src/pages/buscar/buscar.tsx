import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Class, Home, List } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout';
import { Card, CardArea, CardSkeleton } from '../../shared/components';
import { Api } from '../../shared/service';

export const Buscar: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const search = searchParams.get('search');
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const buscarProdutos = async () => {
            setLoading(true);
            setProdutos([]);
            const response = await Api.get(`produtos?q=${search}`).catch((error) => error.response);
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
        <BaseLayout title='Cris Thomazi Boutique' >
            <Breadcrumbs aria-label='breadcrumb'>
                <Button
                    color='inherit'
                    onClick={() => navigate('/')}
                    size='small'
                    startIcon={<Home />}
                >
                    Home
                </Button>
                {
                    categoria && categoria !== null && categoria.length > 0 && (
                        <Button
                            color='inherit'
                            onClick={() => navigate(`/buscar/${categoria}`)}
                            size='small'
                            startIcon={<Class />}
                        >
                            {categoria}
                        </Button>
                    )
                }
                {
                    search && search !== null && search.length > 0 && (
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color='text.primary'
                        >
                            <List sx={{ mr: 0.5 }} fontSize='inherit' />
                            {search}
                        </Typography>
                    )
                }
            </Breadcrumbs>
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