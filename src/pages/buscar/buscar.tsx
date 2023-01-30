import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Class, Home, List, Search } from '@mui/icons-material';
import { BaseLayout } from '../../shared/layout';
import { CardArea } from '../../shared/components';

export const Buscar: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const search = searchParams.get('search');

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
                <Button
                    color='inherit'
                    size='small'
                    startIcon={<Search />}
                >
                    Buscar
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
            <CardArea>
                <Typography>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                    Teste de Overflow<br/><br/>
                </Typography>
            </CardArea>
        </BaseLayout>
    )
}