import { createTheme } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[600],
            contrastText: '#ffffff',
        },
        secondary: {
            main: blue[700],
            dark: blue[800],
            light: blue[600],
            contrastText: '#ffffff',
        },
        background: {
            paper: '#333333',
            default: '#3f3f3f'
        }
    }
});