import { Box, Typography } from '@mui/material';
import { Card, CardArea } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import database from '../../shared/database';
import { Engineering } from '@mui/icons-material';

export const Home: React.FC = () => {

  return (
    <BaseLayout title='Cris Thomazi Boutique' >
      <Box textAlign='center'>
        <Typography variant='h6'>Seja bem vindo(a)<br/> Site em construção</Typography>
        <Engineering />
      </Box>
      <CardArea>
        {
          database.map((item, index) => (
            <Card item={item} key={index} />
          ))
        }
        {
          database.map((item, index) => (
            <Card item={item} key={index} />
          ))
        }
        {
          database.map((item, index) => (
            <Card item={item} key={index} />
          ))
        }
      </CardArea>
    </BaseLayout>
  )
}