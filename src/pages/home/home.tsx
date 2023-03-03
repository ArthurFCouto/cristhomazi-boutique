import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Engineering } from '@mui/icons-material';
import { MCard, MCardArea, MCardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';
import { Environment } from '../../shared/environment';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    ProdutoService.getAll()
      .then((response) => setProdutos(response.list))
      .catch((error) => {
        console.log('Erro:', error);
        alert(error.customMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseLayout showSearch showCategories>
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
      <Box textAlign='center' bgcolor={'snow'}>
        <Typography variant='h6'>Site em construção</Typography>
        <Engineering />
      </Box>
    </BaseLayout>
  )
}