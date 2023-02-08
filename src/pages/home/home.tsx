import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Card, CardArea, CardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { Engineering } from '@mui/icons-material';
import { Api } from '../../shared/service';

export const Home: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      const response = await Api.get('produtos').catch((error) => error.response);
      if (response) {
        const { data } = response;
        if (!data.error)
          setProdutos(data);
      } else {
        alert('Erro ao conectar com servidor.');
      }
      setLoading(false);
    }
    buscarProdutos();
  }, []);

  return (
    <BaseLayout title='Cris Thomazi Boutique' >
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
            <CardSkeleton />
            <CardSkeleton />
          </CardArea>
        )
      }
    </BaseLayout>
  )
}