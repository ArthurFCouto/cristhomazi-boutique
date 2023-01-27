import { useEffect, useState } from 'react';
import { Paper, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { DrawerMenu, Header } from '../components';

interface BaseLayout {
    children: React.ReactNode;
    title: string;
}

export const BaseLayout: React.FC<BaseLayout> = ({ children, title }) => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
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
                    component={Paper}
                    display='flex'
                    flex={1}
                    flexDirection='column'
                    alignItems='center'
                >
                    <Box
                        height='100%'
                        marginX={theme.spacing(1)}
                        maxWidth='md'
                        overflow='auto'
                        paddingY={theme.spacing(1)}
                        width='100%'
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </DrawerMenu>
    );
}