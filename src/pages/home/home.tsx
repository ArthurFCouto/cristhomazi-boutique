import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardMedia, Link, Typography, useTheme } from '@mui/material';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { MCardArea } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { useDialogContext } from '../../shared/contexts';

const banners = [
  {
    alt: 'Banner 1',
    image: '/banner1.jpg'
  },
  {
    alt: 'Banner 2',
    image: '/banner2.jpg'
  },
  {
    alt: 'Banner 3',
    image: '/banner3.jpeg'
  }
]

export const Home: React.FC = () => {
  const theme = useTheme();
  const { showAlert } = useDialogContext();
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    ProdutoService.getAll()
      //.then((response) => setProdutos(response.list))
      .then((response) => console.log)
      .catch((error) => showAlert(error.customMessage, 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseLayout showSearch showLegend showCategories>
      <Box paddingX={1} paddingTop={2}>
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
            sx={{ zIndex: 0 }}
          >
            {
              banners.map((item, index) => (
                <Link
                  component={RouterLink}
                  key={index}
                  to='#'
                >
                  <CardMedia
                    alt={item.alt}
                    component='img'
                    image={item.image}
                    sx={{ maxHeight: theme.spacing(50) }}
                    width='100%'
                  />
                </Link>
              ))
            }
          </Carousel>
        </Card>
        <Typography px={1} textAlign='left' variant='h6'>
          Últimos Lançamentos
        </Typography>
        <MCardArea list={produtos} isLoading={loading} />
      </Box>
    </BaseLayout >
  )
}