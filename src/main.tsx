import React from 'react';
import ReactDOM from 'react-dom/client';
import FullRoutes from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
        <FullRoutes />
      </DrawerProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)