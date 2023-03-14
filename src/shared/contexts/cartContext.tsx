import { createContext, useContext, useState } from 'react';
import { useDialogContext } from './dialogContext';

export interface ICartProduct {
    id: number;
    titulo: string;
    nome: string;
    cor: string;
    imagem: string;
    tamanho: string;
    categoria: string;
    valor: number;
}

interface ICartContextData {
    addItem: (item: ICartProduct) => void;
    clearCart: () => void;
    items: ICartProduct[];
    removeItem: (item: ICartProduct) => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

const CartContext = createContext({} as ICartContextData);

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { showAlert } = useDialogContext();
    const [items, setItems] = useState<ICartProduct[]>([]);

    const addItem = (item: ICartProduct) => {
        const existItem = items.filter((produto) => produto.id == item.id);
        if (existItem.length == 0) {
            setItems([...items, item]);
            showAlert('Item adicionado a sacola', 'success');
        }
        else {
            showAlert('Este item já está adicionado a sacola', 'error');
        }
    }

    const removeItem = (item: ICartProduct) => {
        setItems(items.filter((produto) => produto.id != item.id));
        showAlert('Item removido da sacola', 'success');
    }

    const clearCart = () => {
        setItems([]);
        showAlert('Todos os itens foram removidos da sacola', 'warning');
    }

    return (
        <CartContext.Provider value={{
            addItem,
            clearCart,
            items,
            removeItem
        }}>
            {children}
        </CartContext.Provider>
    )
}