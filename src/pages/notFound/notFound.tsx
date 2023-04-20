import { Box, Typography } from '@mui/material';
import { BaseLayout } from '../../shared/layout';

export const NotFound: React.FC = () => {

    return (
        <BaseLayout title='Cris Thomazi Boutique' showSearch>
            <Box
                justifyContent='center'
                display='flex'
                flex={1}
                flexDirection='column'
                ml={5}
            >
                <Typography variant='h2'> OPS! </Typography>
                <Typography color='text.secondary' variant='h6'>
                    Não encontramos o que você procurou.
                </Typography>
                <Typography color='text.secondary' variant='h6'>
                    Faça uma busca ou conheça nossas novidades.
                </Typography>
            </Box>
        </BaseLayout>
    )
}