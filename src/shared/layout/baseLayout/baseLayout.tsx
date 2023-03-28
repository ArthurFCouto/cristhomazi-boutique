import { useEffect } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { DrawerMenu, Footer, Header } from '../../components';
import { Environment } from '../../environment';
import { useAppThemeContext } from '../../contexts';

interface IBaseLayout {
    children: React.ReactNode;
    description?: string;
    sampleFooter?: boolean;
    showCategories?: boolean;
    showLegend?: boolean;
    showSearch?: boolean;
    title?: string;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children, description, sampleFooter, showCategories, showLegend, showSearch, title }) => {
    const theme = useTheme();
    const { themeName } = useAppThemeContext();
    useEffect(() => {
        document.title = title || Environment.DEFAULT_TITLE;
        document.getElementsByTagName('META')[1].setAttribute('content', description || Environment.DEFAULT_DESCRIPTION);
    }, [description, title]);

    return (
        <DrawerMenu>
            <Box
                alignItems='center'
                display='flex'
                flexDirection='column'
                height='100%'
                overflow='auto'
            >
                <Header
                    showSearch={showSearch}
                    showLegend={showLegend}
                    showCategories={showCategories}
                />
                <Box
                    alignItems='center'
                    bgcolor={theme.palette.background.default}
                    component={Paper}
                    display='flex'
                    flex={1}
                    flexDirection='column'
                    sx={{ background: themeName == 'light' ? `url('/background.png') right top fixed` : undefined }}
                    square
                    width='100%'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        height='100%'
                        maxWidth='lg'
                        paddingTop={1}
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