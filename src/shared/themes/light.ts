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
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3'
        }
    }
});