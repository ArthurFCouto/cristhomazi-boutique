import {
    Button, ButtonBase, FormControl,
    Icon, IconButton, InputAdornment, Link,
    OutlinedInput, Tooltip, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Instagram, LocalMall, Search, WhatsApp } from '@mui/icons-material';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useState } from 'react';

interface IButtonLink {
    label: string;
    navigate: NavigateFunction;
    to: string;
};

const ButtonLink: React.FC<IButtonLink> = ({ label, navigate, to }) => (
    <Button size='small' onClick={() => navigate(to)}>
        {label}
    </Button>
)

export const Header: React.FC = () => {
    const theme = useTheme();
    const { themeName } = useAppThemeContext();
    const { drawerOptions, toggleDrawerOpen } = useDrawerContext();
    const navigate = useNavigate();
    const smDownScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [search, setsearch] = useState<string>('');

    const handleInputSearch = () => {
        navigate({
            pathname: '/buscar',
            search: createSearchParams({
                search
            }).toString()
        });
    }

    const IconStartInput: React.FC = () => (
        <InputAdornment position='end'>
            <Search onClick={handleInputSearch} sx={{ cursor: 'pointer' }} />
        </InputAdornment>
    );

    /*
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const Menu: React.FC = () => (
        <>
            <Button
                aria-controls={open ? 'menu-category' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                id='btn-category'
                onClick={handleClick}
                size='small'
            >
                Roupas
            </Button>
            <Menu
                anchorEl={anchorEl}
                id='basic-menu'
                onClose={handleClose}
                open={open}
                MenuListProps={{
                    'aria-labelledby': 'btn-category',
                }}
            >
                <MenuItem onClick={handleClose}>Blazer/Jaquetas/Casacos</MenuItem>
                <MenuItem onClick={handleClose}>Blusas/Croppeds/Camisas</MenuItem>
                <MenuItem onClick={handleClose}>Body</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Conjuntos</MenuItem>
                <MenuItem onClick={handleClose}>Macaquinhos/Macacões</MenuItem>
                <MenuItem onClick={handleClose}>Vestidos</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Calças</MenuItem>
                <MenuItem onClick={handleClose}>Saias</MenuItem>
                <MenuItem onClick={handleClose}>Shorts</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Moda praia</MenuItem>
            </Menu>
        </>
    )
    */

    return (
        <Box
            display='block'
            component='header'
            width='100%'
        >
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
                            marginX={theme.spacing(1)}
                            paddingY={theme.spacing(1)}
                            width='100%'
                        >
                            <IconButton onClick={toggleDrawerOpen}>
                                <Icon>menu</Icon>
                            </IconButton>
                            <ButtonBase onClick={() => navigate('/')}>
                                <img
                                    alt='Logo da Loja'
                                    height={theme.spacing(5)}
                                    loading='lazy'
                                    src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
                                />
                            </ButtonBase>
                            <Tooltip title='Sacola'>
                                <IconButton onClick={() => alert('Ainda não implementado.')}>
                                    <Icon>local_mall</Icon>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box
                            component='nav'
                            display='flex'
                            alignContent='center'
                            gap={theme.spacing(5)}
                            justifyContent='end'
                            marginX={theme.spacing(1)}
                            maxWidth='md'
                            paddingY={theme.spacing(1)}
                            width='100%'
                        >
                            <Link href='https://www.instagram.com/cristhomaziboutique/' underline='none'>
                                <Box display='flex' alignContent='center'>
                                    <Instagram fontSize='small' htmlColor={theme.palette.primary.contrastText} />
                                    <Typography variant='body2' ml={theme.spacing(0.5)}>
                                        @cristhomaziboutique
                                    </Typography>
                                </Box>
                            </Link>
                            <Link href='https://api.whatsapp.com/send?phone=553897326440&text=Ol%C3%A1!%20' underline='none'>
                                <Box display='flex' alignContent='center'>
                                    <WhatsApp fontSize='small' htmlColor={theme.palette.primary.contrastText} />
                                    <Typography variant='body2' ml={theme.spacing(0.5)}>
                                        (38) 99732-6440
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    )
                }
            </Box>
            <Box
                display='flex'
                justifyContent='center'
                width='100%'
            >
                <Box
                    display='flex'
                    marginX={theme.spacing(1)}
                    paddingY={theme.spacing(0.5)}
                    maxWidth='md'
                    width='100%'
                >
                    <Box
                        display={smDownScreen ? 'none' : 'flex'}
                        width='25%'
                    >
                        <ButtonBase
                            sx={{
                                height: theme.spacing(15),
                                marginRight: 'auto',
                            }}
                        >
                            <img
                                alt='Logo da Loja'
                                height={theme.spacing(5)}
                                loading='lazy'
                                onClick={() => navigate('/')}
                                src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
                            />
                        </ButtonBase>
                    </Box>
                    <Box
                        component='form'
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        width={smDownScreen ? '100%' : '50%'}
                        paddingY={smDownScreen ? theme.spacing(1) : 0}
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
                                    value={search}
                                    onChange={(event) => setsearch(event.target.value)}
                                    placeholder='Colcci, Calvin Klein, Lança Perfume ...'
                                    size='small'
                                    endAdornment={<IconStartInput />}
                                    sx={{
                                        bgcolor: theme.palette.background.paper
                                    }}
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
                        <Button variant='text' color='secondary' size='small'>Minha Conta</Button>
                        <Button variant='text' startIcon={<LocalMall fontSize='inherit' />}>
                            Sacola
                        </Button>
                    </Box>
                </Box>
            </Box>
            {
                !smDownScreen && (
                    <Box
                        bgcolor={theme.palette.background.paper}
                        display='flex'
                        justifyContent='center'
                        width='100%'
                    >
                        <Box
                            component='nav'
                            display='flex'
                            gap={theme.spacing(5)}
                            alignContent='center'
                            justifyContent='center'
                            marginX={theme.spacing(1)}
                            paddingY={theme.spacing(0.5)}
                            maxWidth='md'
                            width='100%'
                        >
                            {
                                drawerOptions.map((option, index) =>
                                    <ButtonLink
                                        key={index}
                                        label={option.label}
                                        to={option.path}
                                        navigate={navigate}
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