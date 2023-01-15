import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { AppThemeProvider } from '../shared/contexts';

export default function FullRoutes() {
    return (
        <AppThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<h1>Página não encontrada!</h1>} path='*' />
                </Routes>
            </BrowserRouter>
        </AppThemeProvider>
    )
}