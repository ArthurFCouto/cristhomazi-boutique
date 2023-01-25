import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { DrawerMenu, Header } from '../components';

interface BaseLayout {
    children: React.ReactNode;
    title: string;
}

export const BaseLayout: React.FC<BaseLayout> = ({ children, title }) => {
    const theme = useTheme();
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <DrawerMenu>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                height='100%'
            >
                <Header />
                <Box
                    flex={1}
                    marginX={theme.spacing(1)}
                    maxWidth='md'
                    overflow='auto'
                    paddingY={theme.spacing(1)}
                >
                    {children}
                </Box>
            </Box>
        </DrawerMenu>
    );
}