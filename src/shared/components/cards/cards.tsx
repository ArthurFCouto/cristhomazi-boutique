import { Box, Button, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Bookmark, Share } from '@mui/icons-material';
import { IDatabase } from '../../database';

interface ICardArea {
    children: React.ReactNode;
}

/* Criar o tipo de item*/
interface ICard {
    item: IDatabase;
}

export const CardArea: React.FC<ICardArea> = ({ children }) => {
    const theme = useTheme();
    return (
        <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
            gap={theme.spacing(2)}
            width='100%'
        >
            {children}
        </Box>
    )
}

export const Card: React.FC<ICard> = ({ item }) => {
    const theme = useTheme();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { produto: { titulo }, imagens, valor } = item;
    const sizeFontButton = mdDownScreen ? 'small' : 'medium';
    return (
        <Box
            component={Paper}
            display='flex'
            flexDirection='column'
            height={theme.spacing(40)}
            width={smDownScreen ? '40%' : '30%'}
        >
            <Box
                height='60%'
                textAlign='center'
                padding={theme.spacing(1)}
                width='100%'
            >
                <img
                    height='auto'
                    loading='lazy'
                    src={imagens[0]}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%'
                    }}
                />
            </Box>
            <Box display='flex' flexDirection='column' padding={theme.spacing(1)} overflow='hidden' height='100%'>
                <Typography
                    component='div'
                    noWrap
                    textOverflow='ellipsis'
                    variant='button'
                >
                    {titulo}
                </Typography>
                <Box display='flex' alignItems='baseline' marginTop={theme.spacing(1)}>
                    <Typography color='text.secondary' variant='caption'>por</Typography>
                    <Typography variant='subtitle2'>&nbsp; R$ {valor}</Typography>
                </Box>
                <Box display='flex' alignItems='center' flex={1}>
                    <IconButton onClick={()=> alert('Ainda não implementado')}>
                        <Bookmark color='action' fontSize={sizeFontButton} />
                    </IconButton>
                    <IconButton onClick={()=> alert('Ainda não implementado')}>
                        <Share color='action' fontSize={sizeFontButton} />
                    </IconButton>
                    <Button color='secondary' variant='contained' size={sizeFontButton} sx={{ marginLeft: 'auto' }} onClick={()=> alert('Ainda não implementado')}>
                        Comprar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}