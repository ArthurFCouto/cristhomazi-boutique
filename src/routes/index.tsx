import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppThemeProvider } from '../shared/contexts';
import { Home } from '../pages';

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