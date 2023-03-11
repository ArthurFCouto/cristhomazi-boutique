import { createContext, useContext, useState } from 'react';

export interface ICartProduct {
    id: number;
    titulo: string;
    nome: string;
    cor: string;
    imagem: string;
    tamanho: string;
    valor: number;
}

interface ICartContextData {
    addItem: (item: ICartProduct) => void;
    clearCart: () => void;
    items: ICartProduct[];
    removeItem: (id: number) => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

const CartContext = createContext({} as ICartContextData);

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<ICartProduct[]>([]);
    const addItem = (item: ICartProduct) => {
        const existItem = items.filter((produto) => produto.id == item.id && produto.tamanho == item.tamanho);
        if (existItem.length == 0)
            setItems([...items, item]);
    }
    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id != id));
    }
    const clearCart = () => setItems([]);

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