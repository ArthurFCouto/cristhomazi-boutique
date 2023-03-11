import { ICartProduct } from '../contexts';

export const Capitalize = (text: string) => text.split(' ').map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');

export const FormatBRL = (value: number | bigint) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(value);

export const Normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const BuyRedirectCart = (listProducts: ICartProduct[]) => {
    const message = listProducts.reduce((text, item) => `${text}*${item.titulo}* _(${item.id})_\nTamanho *${item.tamanho}* na cor *${item.cor}*, com preço *${FormatBRL(item.valor)}*\n\n`, '\n');
    const urlEncode = window.encodeURIComponent(`Olá CrisThomazi!\nGostaria de continuar o pedido abaixo:\n${message}Valor final apresentado na sacola: *${FormatBRL(listProducts.reduce((total, item)=> total += item.valor, 0))}*`);
    window.open('https://api.whatsapp.com/send?phone=5538999414205&text=' + urlEncode);
}