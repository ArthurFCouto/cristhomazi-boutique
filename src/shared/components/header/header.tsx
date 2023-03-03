import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import {
    Box, Button, ButtonBase, FormControl,
    Icon, IconButton, InputAdornment, Link,
    OutlinedInput, Tooltip, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { Instagram, LocalMall, Search, WhatsApp } from '@mui/icons-material';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { Environment } from '../../environment';

interface IImgLogo {
    height: number;
}

interface IButtonLink {
    label: string;
    to: string;
};

interface IHeader {
    showCategories?: boolean;
    showSearch?: boolean;
};

export const Header: React.FC<IHeader> = ({ showCategories, showSearch }) => {
    const theme = useTheme();
    const { themeName } = useAppThemeContext();
    const { drawerOptions, toggleDrawerOpen } = useDrawerContext();
    const navigate = useNavigate();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [busca, setBusca] = useState<string>('');

    const handleInputSearch = () => {
        navigate({
            pathname: '/buscar',
            search: createSearchParams({
                busca
            }).toString()
        });
    }

    const IconStartInput: React.FC = () => (
        <InputAdornment position='end'>
            <Search onClick={handleInputSearch} sx={{ cursor: 'pointer' }} />
        </InputAdornment>
    );

    const ImgLogo: React.FC<IImgLogo> = ({ height }) => (
        <img
            alt={Environment.DEFAULT_TITLE}
            height={theme.spacing(height)}
            loading='lazy'
            onClick={() => navigate('/')}
            src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
        />
    )

    const ButtonLink: React.FC<IButtonLink> = ({ label, to }) => (
        <Button size='small' onClick={() => navigate(to)}>
            {label}
        </Button>
    )

    return (
        <Box component='header' width='100%'>
            <Box
                bgcolor={theme.palette.background.paper}
                display='flex'
                justifyContent='center'
                width='100%'
            >
                {
                    smDownScreen ? (
                        <Box
                            component='nav'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            marginX={1}
                            paddingY={1}
                            width='100%'
                        >
                            <IconButton onClick={toggleDrawerOpen}>
                                <Icon>menu</Icon>
                            </IconButton>
                            <ButtonBase>
                                <ImgLogo height={5} />
                            </ButtonBase>
                            <IconButton onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)}>
                                <Icon>local_mall</Icon>
                            </IconButton>
                        </Box>
                    ) : (
                        <Box
                            component='nav'
                            display='flex'
                            alignContent='center'
                            gap={5}
                            justifyContent='end'
                            marginX={1}
                            maxWidth='md'
                            paddingY={1}
                            width='100%'
                        >
                            <Tooltip title='Visite nosso #insta'>
                                <Link href='https://www.instagram.com/cristhomaziboutique/' target='_blank' underline='none'>
                                    <Box display='flex' alignContent='center'>
                                        <Instagram fontSize='small' htmlColor={theme.palette.primary.contrastText} />
                                        <Typography variant='body2' ml={0.5}>
                                            @cristhomaziboutique
                                        </Typography>
                                    </Box>
                                </Link>
                            </Tooltip>
                            <Tooltip title='Chama no #whats'>
                                <Link href='https://api.whatsapp.com/send?phone=553897326440&text=Ol%C3%A1!%20' target='_blank' underline='none'>
                                    <Box display='flex' alignContent='center'>
                                        <WhatsApp fontSize='small' htmlColor={theme.palette.primary.contrastText} />
                                        <Typography variant='body2' ml={0.5}>
                                            (38) 99732-6440
                                        </Typography>
                                    </Box>
                                </Link>
                            </Tooltip>
                        </Box>
                    )
                }
            </Box>
            {
                showSearch && (
                    <Box
                        display='flex'
                        justifyContent='center'
                        width='100%'
                    >
                        <Box
                            display='flex'
                            marginX={1}
                            paddingY={0.5}
                            maxWidth='md'
                            width='100%'
                        >
                            <Box
                                display={smDownScreen ? 'none' : 'flex'}
                                width='25%'
                            >
                                <ButtonBase sx={{ height: theme.spacing(15), marginRight: 'auto' }}>
                                    <ImgLogo height={5} />
                                </ButtonBase>
                            </Box>
                            <Box
                                component='form'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                width={smDownScreen ? '100%' : '50%'}
                                paddingY={smDownScreen ? 1 : 0}
                                onSubmit={
                                    (event) => {
                                        event.preventDefault();
                                        handleInputSearch();
                                    }
                                }
                            >
                                <Typography
                                    component='label'
                                    display='block'
                                    variant='caption'
                                >
                                    Seja bem-vindo(a) a CrisThomazi Boutique
                                </Typography>
                                <FormControl sx={{ width: '100%' }}>
                                    <Tooltip title='Digite algo para pesquisar'>
                                        <OutlinedInput
                                            name='search'
                                            value={busca}
                                            onChange={(event) => setBusca(event.target.value)}
                                            placeholder='Colcci, Calvin Klein, Lança Perfume ...'
                                            size='small'
                                            endAdornment={<IconStartInput />}
                                            sx={{ bgcolor: theme.palette.background.paper }}
                                        />
                                    </Tooltip>
                                </FormControl>
                            </Box>
                            <Box
                                display={smDownScreen ? 'none' : 'flex'}
                                alignItems='flex-end'
                                flexDirection='column'
                                justifyContent='center'
                                width='25%'
                            >
                                <Button color='secondary' onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)} size='small' title='Acessar conta' variant='text'>
                                    Minha Conta
                                </Button>
                                <Button onClick={() => alert(Environment.NOT_IMPLEMENTED_MESSAGE)} startIcon={<LocalMall fontSize='inherit' />} title='Ver sacola' variant='text'>
                                    Sacola
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )
            }
            {
                (!smDownScreen && showCategories) && (
                    <Box
                        bgcolor={theme.palette.background.paper}
                        display='flex'
                        justifyContent='center'
                        width='100%'
                    >
                        <Box
                            component='nav'
                            display='flex'
                            alignContent='center'
                            gap={5}
                            justifyContent='center'
                            marginX={1}
                            paddingY={0.5}
                            maxWidth='md'
                            width='100%'
                        >
                            {
                                drawerOptions.map((option, index) =>
                                    <ButtonLink
                                        key={index}
                                        label={option.label}
                                        to={option.path}
                                    />
                                )
                            }
                        </Box>
                    </Box>
                )
            }
        </Box >
    );
}