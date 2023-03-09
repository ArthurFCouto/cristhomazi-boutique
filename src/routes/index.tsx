import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Buscar, Detalhes, Home, Login, Sacola } from '../pages';
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
                path: '/buscar/roupas',
                label: 'Roupas',
            },
            {
                path: '/buscar/acessorios',
                label: 'Acessórios',
            },
            {
                path: '/buscar/promocoes',
                label: 'Promoções',
            },
            {
                path: '/buscar/masculino',
                label: 'Masculino',
            },
        ]);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' />
                <Route element={<Buscar />} path='buscar' />
                <Route element={<Buscar />} path='buscar/:categoria' />
                <Route element={<Detalhes />} path='buscar/:categoria/:nome' />
                <Route element={<Login />} path='/acessar' />
                <Route element={<Sacola />} path='/sacola' />
                <Route element={<span>Página não encontrada!</span>} path='*' />
            </Routes>
        </BrowserRouter>
    )
}