import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)');
    const [themeName, setThemeName] = useState<'light' | 'dark'>(prefersColorScheme.matches ? 'light' : 'dark');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);
    
    const theme = useMemo(() => {
        return themeName === 'light' ? LightTheme : DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}