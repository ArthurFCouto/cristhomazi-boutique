import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Card, CardArea, CardSkeleton } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import { Engineering } from '@mui/icons-material';
import { Api, IEstoqueProduto } from '../../shared/service';

export const Home: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      const responseProduto = await Api.get('produto').catch((error) => error.response);
      const responseEstoque = await Api.get('estoque').catch((error) => error.response);
      if (responseProduto && responseEstoque) {
        const { data: dataProduto } = responseProduto;
        const { data: dataEstoque } = responseEstoque;
        const cards = dataEstoque.map((item: IEstoqueProduto) => {
          item.produto = dataProduto[item.idProduto - 1];
          return item;
        })
        setProdutos(cards);
      } else {
        alert('Erro ao conectar com servidor.');
      }
      setLoading(false);
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
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </CardArea>
        )
      }
    </BaseLayout>
  )
}