import { createTheme } from '@mui/material';
import { cyan } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#121212',
            dark: '#12121280',
            light: '#12121250',
            contrastText: '#121212',
        },
        secondary: {
            //main: cyan[500],
            main: '#333333',
            dark: '#33333380',
            light: '#33333350',
            contrastText: '#ffffff',
        },
        background: {
            paper: '#f5f6f7' || '#f0ead8' || '#eceff5',
            default: '#ffffff',
        }
    },
    typography: {
        allVariants: {
            color: 'black',
        },
        fontFamily: [
            '-apple-system',
            '"Helvetica Neue"',
            'sans-serif',
        ].join(','),
    }
});