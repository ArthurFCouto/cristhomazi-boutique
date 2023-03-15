import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Chip, Typography, useTheme } from '@mui/material';
import { MCard, MCardArea, MCardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { Environment } from '../../shared/environment';
import { useDialogContext } from '../../shared/contexts';

const banners = [
  {
    alt: 'Banner 1',
    image: '/banner1.jpg'
  },
  {
    alt: 'Banner 2',
    image: '/banner2.jpg'
  }
]

export const Home: React.FC = () => {
  const theme = useTheme();
  const { showAlert } = useDialogContext();
  const [loading, setLoading] = useState(true);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    ProdutoService.getAll()
      .then((response) => setProdutos(response.list))
      .catch((error) => showAlert(error.customMessage, 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseLayout showSearch showCategories>
      <Box
        paddingX={1}
        position='relative'
      >
        <Card
          sx={{ marginBottom: 2 }}
          variant='outlined'
        >
          <CardMedia
            alt={banners[0].alt}
            component='img'
            image={banners[0].image}
            sx={{ maxHeight: theme.spacing(50) }}
            width='100%'
          />
        </Card>
        {
          showInfoBanner &&
          <Chip
            label='Banners promocionais e informativos 1024px x 466px'
            onDelete={(_) => setShowInfoBanner(false)}
            sx={{ position: 'absolute', top: 3, right: 3 }}
          />
        }
      </Box>
      <Typography mt={2} px={1} textAlign='left' variant='h6'>
        ÚLTIMOS LANÇAMENTOS
      </Typography>
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
    </BaseLayout>
  )
}