import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Button, Skeleton, Stack, Typography, useTheme } from '@mui/material';
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
    const search = useMemo(() => searchParams.get('busca'), [searchParams]);

    return (
        <MuiBreadcrumbs>
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
                search && search.length > 0 && (
                    <Stack direction='row' alignItems='center' spacing={0.5}>
                        <List />
                        <Typography variant='subtitle2'>
                            {`Resultados para ${search?.toUpperCase()}`}
                        </Typography>
                    </Stack>
                )
            }
            {
                title && (
                    <Stack direction='row' alignItems='center' spacing={0.5}>
                        <List />
                        <Typography variant='subtitle2'>
                            {
                                loadingTitle ? (
                                    <Skeleton variant='text' sx={{ fontSize: 'inherit', width: theme.spacing(10) }} />
                                ) : title
                            }
                        </Typography>
                    </Stack>
                )
            }
        </MuiBreadcrumbs>
    )
}