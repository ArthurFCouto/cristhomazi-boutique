import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export default function FullRoutes() {
    const { setDrawerOptions } = useDrawerContext();
    useEffect(() => {
        setDrawerOptions([
            {
                path: '/',
                label: 'Home',
            },
            {
                path: '/buscar',
                label: 'Roupas',
            },
            {
                path: '/acessorios',
                label: 'Acessórios',
            },
            {
                path: '/promocoes',
                label: 'Promoções',
            },
            {
                path: '/masculino',
                label: 'Masculino',
            },
        ]);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<h1>Página não encontrada!</h1>} path='*' />
            </Routes>
        </BrowserRouter>
    )
}