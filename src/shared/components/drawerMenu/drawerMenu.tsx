import {
  Divider, Drawer, Icon, List, ListItemButton,
  ListItemIcon, ListItemText, useTheme
} from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { Box } from '@mui/system';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { AccountBox, DarkMode } from '@mui/icons-material';

interface ListItemLinkProps {
  label: string;
  onClick: (() => void) | undefined;
  to: string;
}

interface DrawerMenuProps {
  children: React.ReactNode;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label, onClick }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });
  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { themeName, toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        onClose={toggleDrawerOpen}
        open={isDrawerOpen}
        variant={'temporary'}
        sx={{ zIndex: 2000 }}
      >
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          width={theme.spacing(28)}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height={theme.spacing(14)}
            width='100%'
          >
            <img
              alt='Logo da Loja'
              loading='lazy'
              onClick={() => { toggleDrawerOpen(); navigate('/') }}
              src={themeName === 'light' ? '/logoDark.png' : '/logoLight.png'}
              width='60%'
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav'>
              <ListItemButton onClick={() => { toggleDrawerOpen(); navigate('/acessar') }}>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary='Minha Conta' />
              </ListItemButton>
              <Divider />
              {
                drawerOptions.map(drawerOption => (
                  <ListItemLink
                    to={drawerOption.path}
                    key={drawerOption.path}
                    label={drawerOption.label}
                    onClick={toggleDrawerOpen}
                  />
                ))
              }
            </List>
          </Box>
          <Box>
            <List component='nav'>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <DarkMode />
                </ListItemIcon>
                <ListItemText primary='Alternar tema' />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh'>
        {children}
      </Box>
    </>
  );
};