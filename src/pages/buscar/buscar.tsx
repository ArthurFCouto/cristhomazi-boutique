import { Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppThemeContext } from '../../shared/contexts'
import { BaseLayout } from '../../shared/layout';

export const Buscar: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { categoria } = useParams();
    const search = searchParams.get('search');

    return (
        <BaseLayout title='Cris Thomazi Boutique' >
            <Typography>
                Categoria enviada = {categoria === null ? 'Nenhuma' : categoria} / Objeto de pesquisa enviado = {search === null ? 'Nenhum' : search}
            </Typography>
        </BaseLayout>
    )
}