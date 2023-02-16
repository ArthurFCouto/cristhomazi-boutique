import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Card, CardArea, CardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { Engineering } from '@mui/icons-material';
import { IProduto, ProdutoService } from '../../shared/service';

export const Home: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      ProdutoService.getAll()
        .then((response) => {
          setLoading(false);
          if (response instanceof Error) {
            alert(response.message);
          } else {
            setProdutos(response.list);
          }
        });
    }
    buscarProdutos();
  }, []);

  return (
    <BaseLayout title='Cris Thomazi Boutique' showSearch>
      <Box textAlign='center'>
        <Typography variant='h6'>Seja bem vindo(a)<br /> Site em construção</Typography>
        <Engineering />
      </Box>
      {
        !loading && (
          produtos.length === 0 ? (
            <Typography variant='body1'>Não há produtos para exibir.</Typography>
          ) : (
            <CardArea>
              {
                produtos.map((item, index) => (
                  <Card item={item} key={index} />
                ))
              }
            </CardArea>
          )
        )
      }
      {
        loading && (
          <CardArea>
            {
              Array.from(Array(12)).map(() => (<CardSkeleton />))
            }
          </CardArea>
        )
      }
    </BaseLayout>
  )
}