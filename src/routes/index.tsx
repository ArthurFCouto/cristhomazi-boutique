import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '../pages';
import { LightTheme } from '../shared/themes';

export default function FullRoutes() {
    return (
        <ThemeProvider theme={LightTheme}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<h1>Página não encontrada!</h1>} path='*' />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}