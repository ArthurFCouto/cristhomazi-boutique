import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Engineering } from '@mui/icons-material';
import { Card, CardArea, CardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { IProduto, ProdutoService } from '../../shared/service';

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
      .finally(() =>setLoading(false));
  }, []);

  return (
    <BaseLayout showSearch>
      <Box textAlign='center'>
        <Typography variant='h6'>ÚLTIMOS LANÇAMENTOS</Typography>
      </Box>
      {
        loading ?
          (
            <CardArea>
              {
                Array.from(Array(12)).map((_, index) => (<CardSkeleton key={index} />))
              }
            </CardArea>
          ) : (
            produtos.length === 0 ?
              (
                <Box textAlign='center'>
                  <Typography variant='h6'>Não encontramos produtos para exibir</Typography>
                  <Engineering />
                </Box>
              ) : (
                <CardArea>
                  {
                    produtos.map((item, index) => <Card item={item} key={index} />)
                  }
                </CardArea>
              )
          )
      }
      <Box textAlign='center'>
        <Typography variant='h6'>Site em construção</Typography>
        <Engineering />
      </Box>
    </BaseLayout>
  )
}