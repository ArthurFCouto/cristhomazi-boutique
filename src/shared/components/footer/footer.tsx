import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Instagram, WhatsApp } from '@mui/icons-material';

export const Footer: React.FC = () => {
    const theme = useTheme();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component='footer'
            display='flex'
            flexDirection='column'
            alignItems='center'
            paddingY={theme.spacing(1)}
            width='100%'
        >
            <Grid
                container
                direction={smDownScreen ? 'column' : 'row'}
                maxWidth='md'
                spacing={1}
                paddingLeft={theme.spacing(1)}
            >
                <Grid item xs>
                    <Typography variant='button'>
                        Endereço
                    </Typography>
                    <Typography variant='caption'>
                        <br />Rua Alcides Carneiro 162 Centro
                        <br />Arinos - MG
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant='button'>
                        Atendimento
                    </Typography>
                    <Typography variant='caption'>
                        <br />(61) 99187-2888 (Cris Thomazi)
                        <br />(38) 9732-6440 (WhatsApp)
                        <br />Atendimento: Segunda à Sexta das 13h às 19h e Sábado das 9h às 13h.
                        <br /><Link href='mailto:cristhomazi07@gmail.com' underline='none'>cristhomazi07@gmail.com</Link>
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant='button'>
                        Redes Sociais
                    </Typography>
                    <Box display='flex' gap={theme.spacing(1)}>
                        <Link href='https://www.instagram.com/cristhomaziboutique/' underline='none'>
                            <Box display='flex' alignContent='center' title='Instagram'>
                                <Instagram fontSize='medium' htmlColor={theme.palette.primary.contrastText} />
                            </Box>
                        </Link>
                        <Link href='https://api.whatsapp.com/send?phone=553897326440&text=Ol%C3%A1!%20' underline='none'>
                            <Box display='flex' alignContent='center' title='WhatsApp'>
                                <WhatsApp fontSize='medium' htmlColor={theme.palette.primary.contrastText} />
                            </Box>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
            <Box
                bgcolor={theme.palette.background.paper}
                marginY={theme.spacing(1)}
                paddingY={theme.spacing(0.5)}
                textAlign='center'
                width='100%'
            >
                <Typography variant='overline'>Cris Thomazi Boutique 32.291.204/0001-15</Typography>
            </Box>
        </Box>
    )
};