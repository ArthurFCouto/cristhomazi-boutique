import { useEffect } from 'react';
import { Paper, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { DrawerMenu, Footer, Header } from '../components';
import { Environment } from '../environment';

interface BaseLayout {
    children: React.ReactNode;
    description?: string;
    showSearch?: boolean;
    title?: string;
}

export const BaseLayout: React.FC<BaseLayout> = ({ children, description, showSearch, title }) => {
    const theme = useTheme();
    useEffect(() => {
        document.title = title || Environment.DEFAULT_TITLE;
        document.getElementsByTagName('META')[1].setAttribute('content', description || Environment.DEFAULT_DESCRIPTION);
    }, [description, title]);

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
                        //bgcolor={theme.palette.background.paper}
                        height='100%'
                        maxWidth='md'
                        paddingBottom={4}
                        paddingTop={2}
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