import React from 'react';
import ReactDOM from 'react-dom/client';
import FullRoutes from './routes';
import { AppThemeProvider, CartProvider, DialogProvider, DrawerProvider } from './shared/contexts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DialogProvider>
        <CartProvider>
          <DrawerProvider>
            <FullRoutes />
          </DrawerProvider>
        </CartProvider>
      </DialogProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)