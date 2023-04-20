import { Box, Grid, Link, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Instagram, Store, WhatsApp } from '@mui/icons-material';
import { Environment } from '../../environment';

interface IFooter {
    sampleFooter?: boolean;
}

export const Footer: React.FC<IFooter> = ({ sampleFooter }) => {
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
            {
                !sampleFooter && (
                    <Grid
                        container
                        direction={smDownScreen ? 'column' : 'row'}
                        maxWidth='lg'
                        paddingX={1}
                    >
                        <Grid item xs={12} sm={3}>
                            <Typography fontWeight={600} gutterBottom variant='button'>
                                Endereço
                            </Typography>
                            <Typography variant='caption'>
                                <br />Rua Alcides Carneiro 162 Centro
                                <br />Arinos - MG 38680-000
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontWeight={600} gutterBottom variant='button'>
                                Atendimento
                            </Typography>
                            <Typography variant='caption'>
                                <br />(38) 99187-2888 (Cris Thomazi)
                                <br />
                                <Stack alignItems='center' direction='row'>
                                    <Store fontSize='inherit' sx={{ marginRight: 0.5 }} />
                                    Segunda à Sexta das 13h às 19h e Sábado das 9h às 13h.
                                </Stack>
                                <Link href={`mailto:${Environment.INFORMATION_BASE.EMAIL}`} underline='none'>{Environment.INFORMATION_BASE.EMAIL}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography fontWeight={600} gutterBottom variant='button'>
                                Redes Sociais
                            </Typography>
                            <Box display='flex' gap={theme.spacing(1)}>
                                <Link href={Environment.INFORMATION_BASE.BASE_INSTAGRAM.url} underline='none'>
                                    <Box display='flex' alignContent='center' title='Instagram'>
                                        <Instagram fontSize='medium' htmlColor={theme.palette.primary.contrastText} />
                                    </Box>
                                </Link>
                                <Link href={Environment.INFORMATION_BASE.BASE_URL_WHATSAPP('Olá Cris!')} underline='none'>
                                    <Box display='flex' alignContent='center' title='WhatsApp'>
                                        <WhatsApp fontSize='medium' htmlColor={theme.palette.primary.contrastText} />
                                    </Box>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
            <Box
                component={Paper}
                elevation={0}
                marginY={theme.spacing(1)}
                paddingY={theme.spacing(0.5)}
                textAlign='center'
                width='100%'
            >
                <Typography variant='overline'>
                    {`${Environment.INFORMATION_BASE.SOCIAL_NAME} ${Environment.INFORMATION_BASE.CNPJ}`}
                </Typography>
            </Box>
        </Box>
    )
};