import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { Header } from '../components';

interface IBaseLayout {
    title: string;
    children: React.ReactNode;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children, title }) => {
    const theme = useTheme();
    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <Box
            display='flex'
            flexDirection='column'
            height='100%'
        >
            <Header />
            <Box
                height='100%'
                marginX='auto'
                maxWidth='md'
                overflow='auto'
                paddingY={theme.spacing(1)}
                width='100%'
            >
                {
                    children
                }
            </Box>
        </Box>
    );
}