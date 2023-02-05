import {
    Button, Card as MuiCard, CardActions,
    CardContent, CardMedia, Grid, IconButton,
    Link, Typography, useMediaQuery, useTheme
} from '@mui/material'
import { Favorite } from '@mui/icons-material';
import { IDatabase } from '../../database';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

interface ICardArea {
    children: React.ReactNode;
}

interface ICard {
    item: IDatabase;
}

export const CardArea: React.FC<ICardArea> = ({ children }) => {
    return (
        <Grid
            container
            paddingX={1}
            rowSpacing={3}
            spacing={2}
        >
            {children}
        </Grid>
    )
}

export const Card: React.FC<ICard> = ({ item }) => {
    const theme = useTheme();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const sizeFontButton = mdDownScreen ? 'small' : 'medium';
    const { produto: { categoria, titulo }, id, imagens, valor } = item;

    const [image, setImage] = useState(imagens[0]);
    const changeImage = () => {
        const secondImage = imagens[1];
        if(secondImage)
            setImage(secondImage)
    }

    return (
        <Grid item xs={smDownScreen ? 6 : mdDownScreen ? 4 : 3}>
            <MuiCard sx={{
                height: theme.spacing(40),
            }}>
                <Link component={RouterLink} to={`/buscar/${categoria[0]}/${id}`}>
                    <CardMedia
                        alt={titulo}
                        component='img'
                        height='60%'
                        image={image}
                        onMouseEnter={changeImage}
                        onMouseOut={()=>setImage(imagens[0])}
                        title={titulo}
                        sx={{
                            objectFit: 'contain'
                        }}
                    />
                </Link>
                <CardContent sx={{
                    flex: '1 0 auto',
                    padding: 1
                }}>
                    <Typography
                        component='div'
                        fontSize={smDownScreen ? 12 : 'auto'}
                        gutterBottom
                        noWrap
                        textOverflow='ellipsis'
                        variant='button'
                    >
                        <Link
                            component={RouterLink}
                            to={`/buscar/${categoria[0]}/${id}`}
                            sx={{ textDecoration: 'none' }}
                            variant='inherit'
                        >
                            {titulo}
                        </Link>
                    </Typography>
                    <CardContent sx={{
                        display: 'flex',
                        padding: 0
                    }}>
                        <Typography color='text.secondary' variant='caption'>por</Typography>
                        <Typography variant='subtitle2'>&nbsp; R$ {valor}</Typography>
                    </CardContent>
                    <CardActions sx={{
                        marginTop: 2,
                        padding: 0,
                        justifyContent: 'space-between'
                    }}>
                        <IconButton onClick={() => alert('Ainda não implementado')}>
                            <Favorite color='action' fontSize={sizeFontButton} />
                        </IconButton>
                        <Button
                            color='secondary'
                            disableElevation
                            variant='contained'
                            size={sizeFontButton}
                            onClick={() => alert('Ainda não implementado')}
                        >
                            Comprar
                        </Button>
                    </CardActions>
                </CardContent>
            </MuiCard>
        </Grid>
    )
}