import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Button, Skeleton, Typography, useTheme } from '@mui/material';
import { Class, Home, List } from '@mui/icons-material';
import { useMemo } from 'react';

interface IBreadcrumbs {
    loadingTitle?: boolean;
    title?: string;
}

export const Breadcrumbs: React.FC<IBreadcrumbs> = ({ loadingTitle, title }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const theme = useTheme();
    const search = useMemo(()=> searchParams.get('busca'), [searchParams]);

    return (
        <MuiBreadcrumbs aria-label='breadcrumb'>
            <Button
                color='inherit'
                onClick={() => navigate('/')}
                size='small'
                startIcon={<Home />}
            >
                Home
            </Button>
            {
                categoria && categoria.length > 0 && (
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
                search  && search.length > 0 && (
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color='text.primary'
                    >
                        <List sx={{ mr: 0.5 }} fontSize='inherit' />
                        {`Resultados para ${search?.toUpperCase()}`}
                    </Typography>
                )
            }
            {
                title && (
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color='text.primary'
                    >
                        <List sx={{ mr: 0.5 }} fontSize='inherit' />
                        {
                            loadingTitle ? (
                                <Skeleton variant='text' sx={{ fontSize: 'inherit', width: theme.spacing(10) }} />
                            ) : title
                        }
                    </Typography>
                )
            }
        </MuiBreadcrumbs>
    )
}