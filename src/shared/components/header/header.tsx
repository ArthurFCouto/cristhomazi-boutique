import React, { useState } from 'react';
import { createSearchParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Badge, Box, ButtonBase,
    ButtonGroup, Divider, Fade, FormControl, Grid,
    IconButton, InputAdornment, Link,
    OutlinedInput, Paper, Stack, Tooltip,
    Typography, useMediaQuery, useTheme
} from '@mui/material';
import {
    DarkMode, Favorite, Instagram,
    LocalMall, Menu, Person2, Search, WhatsApp
} from '@mui/icons-material';
import {
    useAppThemeContext, useCartContext,
    useDialogContext, useDrawerContext
} from '../../contexts';
import { Environment } from '../../environment';

interface IHeader {
    showCategories?: boolean;
    showSearch?: boolean;
};

export const Header: React.FC<IHeader> = ({ showCategories, showSearch }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { themeName, toggleTheme } = useAppThemeContext();
    const { drawerOptions, toggleDrawerOpen } = useDrawerContext();
    const { items } = useCartContext();
    const { showAlert } = useDialogContext();
    const mdDownScreen = useMediaQuery(theme.breakpoints.down('md'));
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [busca, setBusca] = useState<string>('');
    const [isShowSearch, setIsShowSearch] = useState<boolean>(showSearch || false);

    const handleInputSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        redirectSearch();
    }

    const redirectSearch = () => {
        setIsShowSearch(false);
        navigate({
            pathname: '/buscar',
            search: createSearchParams({
                busca
            }).toString()
        });
    }

    const IconInput: React.FC = () => (
        <InputAdornment position='end'>
            <Search onClick={redirectSearch} sx={{ cursor: 'pointer' }} />
        </InputAdornment>
    );

    const ImgLogo: React.FC<{ height: number }> = ({ height }) => (
        <img
            alt={Environment.DEFAULT_TITLE}
            height={theme.spacing(height)}
            loading='lazy'
            onClick={() => navigate('/')}
            src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
        />
    )

    const ButtonLink: React.FC<{ label: string, to: string }> = ({ label, to }) => (
        /*
        <Button size='small' onClick={() => navigate(to)}>
            {label}
        </Button>
        */
        <Link
            component={RouterLink}
            to={to}
            underline='none'
        >
            {label.toLowerCase()}
        </Link>
    )

    return (
        <Box
            bgcolor={theme.palette.background.default}
            component='header'
            position={smDownScreen ? 'sticky' : 'relative'}
            top={0}
            width='100%'
            zIndex={smDownScreen ? 1 : 'auto'}
        >
            <Box
                component={Paper}
                display='flex'
                justifyContent='center'
                square
                width='100%'
            >
                {
                    smDownScreen ? (
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            marginX={1}
                            paddingY={1}
                            width='100%'
                        >
                            <IconButton onClick={toggleDrawerOpen}>
                                <Menu />
                            </IconButton>
                            <ButtonBase>
                                <ImgLogo height={5} />
                            </ButtonBase>
                            <ButtonGroup>
                                <IconButton onClick={() => setIsShowSearch(true)}>
                                    <Search />
                                </IconButton>
                                <IconButton onClick={() => navigate('/sacola')}>
                                    <Badge
                                        color='secondary'
                                        badgeContent={items.length}
                                        max={9}
                                    >
                                        <LocalMall />
                                    </Badge>
                                </IconButton>
                            </ButtonGroup>
                        </Stack>
                    ) : (
                        <Stack
                            direction='row'
                            spacing={5}
                            justifyContent='end'
                            marginX={1}
                            maxWidth='lg'
                            paddingY={1}
                            width='100%'
                        >
                            <Tooltip title='Visite nosso #insta'>
                                <Link
                                    href={Environment.INFORMATION_BASE.BASE_INSTAGRAM.url}
                                    target='_blank'
                                    underline='none'
                                >
                                    <Box display='flex' alignItems='center'>
                                        <Instagram htmlColor={theme.palette.primary.contrastText} sx={{ fontSize: 14 }} />
                                        <Typography fontSize={12} ml={0.5} variant='body2'>
                                            {Environment.INFORMATION_BASE.BASE_INSTAGRAM.user}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Tooltip>
                            <Tooltip title='Chama no #whats'>
                                <Link
                                    href={Environment.INFORMATION_BASE.BASE_URL_WHATSAPP('Olá CrisThomazi!')}
                                    target='_blank'
                                    underline='none'
                                >
                                    <Box display='flex' alignItems='center'>
                                        <WhatsApp htmlColor={theme.palette.primary.contrastText} sx={{ fontSize: 14 }} />
                                        <Typography fontSize={12} ml={0.5} variant='body2'>
                                            {Environment.INFORMATION_BASE.BASE_TELL}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Tooltip>
                        </Stack>
                    )
                }
            </Box>
            {
                isShowSearch && (
                    <Box
                        display='flex'
                        justifyContent='center'
                        width='100%'
                    >
                        <Fade in={isShowSearch}>
                            <Grid
                                alignItems='center'
                                container
                                direction='row'
                                marginX={1}
                                paddingY={1}
                                maxWidth='lg'
                                width='100%'
                            >
                                <Grid
                                    item
                                    display={smDownScreen ? 'none' : 'flex'}
                                    sm={3}
                                >
                                    <ButtonBase sx={{ height: theme.spacing(10), marginRight: 'auto' }} >
                                        <ImgLogo height={mdDownScreen ? 5 : 7} />
                                    </ButtonBase>
                                </Grid>
                                <Grid
                                    item
                                    paddingY={smDownScreen ? 1 : 0}
                                    sm={9}
                                    xs={12}
                                >
                                    <Stack
                                        direction='row'
                                        spacing={3}
                                        width='100%'
                                    >
                                        <FormControl
                                            component='form'
                                            fullWidth
                                            onSubmit={handleInputSearch}
                                        >
                                            <Tooltip title='Digite algo para pesquisar'>
                                                <OutlinedInput
                                                    endAdornment={<IconInput />}
                                                    name='search'
                                                    placeholder='Colcci, Calvin Klein, Santa Lolla ...'
                                                    onChange={(event) => setBusca(event.target.value)}
                                                    size='small'
                                                    value={busca}
                                                />
                                            </Tooltip>
                                        </FormControl>
                                        <Box
                                            alignItems='center'
                                            display={smDownScreen ? 'none' : 'flex'}
                                            flexDirection='row'
                                            gap={1}
                                            justifyContent='end'
                                        >
                                            <Tooltip title='Alternar Tema'>
                                                <IconButton
                                                    onClick={toggleTheme}
                                                    size='small'
                                                >
                                                    <DarkMode />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Acessar conta'>
                                                <IconButton
                                                    onClick={() => navigate('/acessar')}
                                                    size='small'
                                                >
                                                    <Person2 />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Ver favoritos'>
                                                <IconButton
                                                    onClick={() => showAlert(Environment.NOT_IMPLEMENTED_MESSAGE, 'warning')}
                                                    size='small'
                                                >
                                                    <Favorite />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Ver sacola'>
                                                <IconButton
                                                    onClick={() => navigate('/sacola')}
                                                    size='small'
                                                >
                                                    <Badge
                                                        badgeContent={items.length}
                                                        color='secondary'
                                                        max={10}
                                                    >
                                                        <LocalMall />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Fade>
                    </Box>
                )
            }
            {
                (!smDownScreen && showCategories) && (
                    <Box
                        display='flex'
                        justifyContent='center'
                        width='100%'
                    >
                        <Stack
                            alignItems='center'
                            direction='row'
                            justifyContent='center'
                            marginX={1}
                            paddingY={1}
                            spacing={4}
                            maxWidth='lg'
                            width='100%'
                        >
                            {
                                drawerOptions.slice(0, 4).map((option, index) =>
                                    <ButtonLink
                                        key={index}
                                        label={option.label}
                                        to={option.path}
                                    />
                                )
                            }
                            <Divider orientation='vertical' />
                            {
                                drawerOptions.slice(4).map((option, index) =>
                                    <ButtonLink
                                        key={index}
                                        label={option.label}
                                        to={option.path}
                                    />
                                )
                            }
                        </Stack>
                    </Box>
                )
            }
            {
                !smDownScreen && (
                    <Stack
                        component={Paper}
                        direction='row'
                        elevation={0}
                        justifyContent='center'
                        padding={1}
                        spacing={2}
                        square
                        width='100%'
                    >
                        <Typography variant='caption'>
                            As novidades das melhores marcas você encontra aqui!
                        </Typography>
                    </Stack>
                )
            }
        </Box >
    );
}