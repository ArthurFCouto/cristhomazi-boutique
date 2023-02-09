import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Button, Typography } from '@mui/material';
import { Class, Home, List } from '@mui/icons-material';

interface IBreadcrumbs {
    title?: string;
}

export const Breadcrumbs: React.FC<IBreadcrumbs> = ({ title }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const search = searchParams.get('search');

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
            {
                title && (
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color='text.primary'
                    >
                        <List sx={{ mr: 0.5 }} fontSize='inherit' />
                        {title}
                    </Typography>
                )
            }
        </MuiBreadcrumbs>
    )
}