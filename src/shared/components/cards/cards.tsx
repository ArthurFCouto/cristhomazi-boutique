import { Box, Button, ButtonBase, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
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
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { produto: { titulo }, imagens, valor } = item;
    return (
        <Box
            component={Paper}
            display='flex'
            flexDirection='column'
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
            <Box padding={theme.spacing(1)} overflow='hidden'>
                <Typography
                    component='div'
                    noWrap
                    textOverflow='ellipsis'
                    variant='button'
                >
                    {titulo}
                </Typography>
                <Box display='flex' alignItems='baseline'>
                    <Typography variant='caption' mt={theme.spacing(1)}>por</Typography>
                    <Typography variant='subtitle2'>&nbsp;R$ {valor}</Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton>
                    <Bookmark color='disabled' fontSize={smDownScreen ? 'small' : 'medium'} />
                    </IconButton>
                    <IconButton>
                    <Share color='disabled' fontSize={smDownScreen ? 'small' : 'medium'} />
                    </IconButton>
                    <Button color='secondary' variant='contained' size={smDownScreen ? 'small' : 'medium'} sx={{ marginLeft: 'auto' }}>
                        Comprar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}