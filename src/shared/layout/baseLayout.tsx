import { useEffect } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { DrawerMenu, Footer, Header } from '../components';
import { Environment } from '../environment';

interface BaseLayout {
    children: React.ReactNode;
    description?: string;
    sampleFooter?: boolean;
    showCategories?: boolean;
    showLegend?: boolean;
    showSearch?: boolean;
    title?: string;
}

export const BaseLayout: React.FC<BaseLayout> = ({ children, description, sampleFooter, showCategories, showLegend, showSearch, title }) => {
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
                <Header
                showSearch={showSearch}
                showLegend={showLegend}
                showCategories={showCategories}
                />
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
                        display='flex'
                        flexDirection='column'
                        height='100%'
                        maxWidth='lg'
                        paddingBottom={4}
                        paddingTop={2}
                        width='100%'
                    >
                        {children}
                    </Box>
                </Box>
                <Footer sampleFooter={sampleFooter} />
            </Box>
        </DrawerMenu>
    );
}