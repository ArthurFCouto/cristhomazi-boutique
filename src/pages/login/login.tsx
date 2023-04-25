import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Box, Button, Paper, Stack,
    TextField, Tooltip, Typography,
    useMediaQuery, useTheme
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useAppThemeContext } from '../../shared/contexts';
import { Environment } from '../../shared/environment';
import { BaseLayout } from '../../shared/layout';

export const Login: React.FC = () => {
    const theme = useTheme();
    const { themeName } = useAppThemeContext();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const acao = useMemo(() => {
        return searchParams.get('acao') || '';
    }, [searchParams]);

    const ImgLogo: React.FC<{ height: number }> = ({ height }) => (
        <Stack
            direction='row'
            justifyContent='center'
            paddingTop={5}
            paddingBottom={5}
        >
            <Box>
                <img
                    height={theme.spacing(height)}
                    loading='lazy'
                    onClick={() => navigate('/')}
                    src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
                    style={{ cursor: 'pointer' }}
                    title='Voltar a página inicial'
                />
            </Box>
        </Stack>
    )

    const SigninOrLogin: React.FC = () => {
        return acao === 'cadastrar' ? (
            <Stack
                alignItems='center'
                direction='row'
                justifyContent='center'
                width='100%'
            >
                <Typography fontSize='inherit'>
                    Já é cadastrado(a)?
                </Typography >
                <Tooltip title='Fazer Login'>
                    <Button
                        color='secondary'
                        onClick={() => setSearchParams({ acao: 'login' }, { replace: true })}
                        size='small'
                    >
                        Fazer login
                    </Button>
                </Tooltip>
            </Stack>
        ) : (
            <Stack
                alignItems='center'
                direction='row'
                justifyContent='center'
                width='100%'
            >
                <Typography fontSize='inherit'>
                    Não está cadastrado(a)?
                </Typography>
                <Tooltip title='Fazer cadastro'>
                    <Button
                        color='secondary'
                        onClick={() => setSearchParams({ acao: 'cadastrar' }, { replace: true })}
                        size='small'
                    >
                        Cadastre-se
                    </Button>
                </Tooltip>
            </Stack>
        )
    }

    return (
        <BaseLayout sampleFooter title='Acessar minha conta'>
            <Box
                sx={{ backgroundColor: theme.palette.background.default }}
                component={Paper}
                marginY={5}
                marginX='auto'
                maxWidth='100%'
                paddingX={2}
                width={theme.breakpoints.values.sm}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    autoComplete='off'
                    component='form'
                    height='100%'
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert(Environment.NOT_IMPLEMENTED_MESSAGE)
                    }}
                >
                    {
                        !smDownScreen ? (
                            <ImgLogo height={8} />
                        ) : (
                            <Typography
                                marginTop={2}
                                marginBottom={5}
                                textAlign='center'
                                variant='h6'
                            >
                                {acao === 'cadastrar' ? 'Cadastrar novo usuário' : 'Acessar sua conta'}
                            </Typography>
                        )
                    }
                    <TextField
                        fullWidth
                        helperText={acao === 'cadastrar' ? 'Nome completo' : undefined}
                        id={acao === 'cadastrar' ? 'name' : 'email'}
                        label={acao === 'cadastrar' ? 'Nome completo' : 'Email'}
                        margin='dense'
                        variant='outlined'
                    />
                    {
                        acao === 'cadastrar' && (
                            <>
                                <TextField
                                    fullWidth
                                    helperText='Email para acesso a sua conta'
                                    id='email'
                                    label='Email'
                                    margin='dense'
                                    variant='outlined'
                                />
                                <TextField
                                    fullWidth
                                    helperText='Preferência WhatsApp'
                                    id='tell'
                                    label='Telefone'
                                    margin='dense'
                                    variant='outlined'
                                />
                            </>
                        )
                    }
                    <TextField
                        autoComplete='current-password'
                        fullWidth
                        helperText={acao === 'cadastrar' ? 'No mínimo 8 digitos, letras e números' : undefined}
                        id='password'
                        label='Senha'
                        margin='dense'
                        type='password'
                        variant='outlined'
                    />
                    <Box
                        display='flex'
                        flex={1}
                        flexDirection='column'
                        justifyContent='end'
                        paddingY={2}
                    >
                        <SigninOrLogin />
                        <Stack
                            alignItems='center'
                            direction='row'
                            justifyContent='end'
                            marginTop={2}
                            spacing={1}
                            width='100%'
                        >
                            <Button
                                onClick={() => navigate(-1)}
                                size='small'
                                variant='outlined'
                            >
                                Voltar
                            </Button>
                            <Button
                                color='secondary'
                                endIcon={<Send />}
                                type='submit'
                                size='small'
                                variant='contained'
                            >
                                Enviar
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </BaseLayout>
    )
}