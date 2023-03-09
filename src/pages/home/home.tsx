import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Chip, Typography } from '@mui/material';
import { MCard, MCardArea, MCardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { Environment } from '../../shared/environment';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    ProdutoService.getAll()
      .then((response) => setProdutos(response.list))
      .catch((error) => alert(error.customMessage))
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
            alt='Teste de Banner'
            component='img'
            image='https://s3images.coroflot.com/user_files/individual_files/505541_njloub9luqsdctrszc6itlpya.png'
            title='Banner'
            width='100%'
          />
        </Card>
        {
          showInfoBanner &&
          <Chip
            label='Preferência 1024px x 466px'
            onDelete={(_) => setShowInfoBanner(false)}
            sx={{ position: 'absolute', top: 3, right: 3 }}
          />
        }
      </Box>
      <Box textAlign='center'>
        <Typography variant='h6'>ÚLTIMOS LANÇAMENTOS</Typography>
      </Box>
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