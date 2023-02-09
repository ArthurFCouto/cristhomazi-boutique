import { useEffect } from 'react';
import { Paper, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { DrawerMenu, Footer, Header } from '../components';

interface BaseLayout {
    children: React.ReactNode;
    showSearch?: boolean;
    title: string;
}

export const BaseLayout: React.FC<BaseLayout> = ({ children, showSearch, title }) => {
    const theme = useTheme();
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <DrawerMenu>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                height='100%'
                overflow='auto'
            >
                <Header showSearch={showSearch} />
                <Box
                    bgcolor={theme.palette.background.default}
                    borderRadius={0}
                    component={Paper}
                    display='flex'
                    flex={1}
                    flexDirection='column'
                    alignItems='center'
                    width='100%'
                >
                    <Box
                        bgcolor={theme.palette.background.paper}
                        height='100%'
                        maxWidth='md'
                        paddingY={theme.spacing(1)}
                        width='100%'
                    >
                        {children}
                    </Box>
                </Box>
                <Footer />
            </Box>
        </DrawerMenu>
    );
}