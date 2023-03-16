import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography, useTheme } from '@mui/material';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
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
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    ProdutoService.getAll()
      .then((response) => setProdutos(response.list))
      .catch((error) => showAlert(error.customMessage, 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseLayout showSearch showLegend showCategories>
      <Box paddingX={1}>
        <Card
          component={Box}
          marginBottom={2}
          sx={{ backgroundColor: 'transparent', border: 0 }}
          variant='outlined'
        >
          <Carousel
            indicators={false}
            NextIcon={<ArrowForwardIosOutlined />}
            PrevIcon={<ArrowBackIosOutlined />}
          >
            {
              banners.map((item, index) => (
                <CardMedia
                  alt={item.alt}
                  component='img'
                  image={item.image}
                  key={index}
                  sx={{ maxHeight: theme.spacing(50) }}
                  width='100%'
                />
              ))
            }
          </Carousel>
        </Card>
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
    </BaseLayout >
  )
}