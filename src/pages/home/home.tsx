import { Typography } from '@mui/material';
import { Card, CardArea } from '../../shared/components';
import { BaseLayout } from '../../shared/layout';
import database from '../../shared/database';

export const Home: React.FC = () => {

  return (
    <BaseLayout title='Cris Thomazi Boutique' >
      <Typography>Em construção</Typography>
      <CardArea>
        {
          database.map((item, index)=> (
            <Card item={item} key={index}/>
          ))
        }
      </CardArea>
    </BaseLayout>
  )
}