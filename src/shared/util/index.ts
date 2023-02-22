export const Capitalize = (text: string) => text.split(' ').map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');

export const FormatBRL = (value: number | bigint) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(value);