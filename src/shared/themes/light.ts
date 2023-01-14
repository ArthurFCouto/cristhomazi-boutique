import { createTheme } from '@mui/material';
import { cyan, green } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: green[700],
            dark: green[800],
            light: green[600],
            contrastText: '#ffffff',
        },
        secondary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[600],
            contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3'
        }
    }
});