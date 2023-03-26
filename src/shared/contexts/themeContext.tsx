import { createContext, useCallback, useContext,
    useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface AppThemeProviderProps {
    children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
    //const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);
    
    const theme = useMemo(() => {
        return themeName === 'light' ? LightTheme : DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box
                bgcolor={theme.palette.background.default}
                height='100vh'
                width='100vw'
                >
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}