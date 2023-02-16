import { Api } from '../axios/axios';

export interface IProdutoBase {
    id: number;
    sku: string,
    titulo: string,
    categoria: string[],
    descricao: string,
    marca: string
}

export interface IProduto {
    id: number,
    idProduto: number,
    nome: string,
    cor: string,
    hex: string,
    imagens: string[],
    tamanhos: string[],
    valor: number,
    produto: IProdutoBase
}

interface IGetAll {
    list: IProduto[],
    total: number
}

const getAll = async (): Promise<IGetAll | Error> => {
    try {
        const responseProdutoBase = await Api.get('produtoBase').catch((error) => error.response);
        const responseProduto = await Api.get('produto').catch((error) => error.response);
        const { data: dataProdutoBase } = responseProdutoBase;
        const { data: dataProduto } = responseProduto;
        const list = dataProduto.map((item: IProduto) => {
            const position = item.idProduto - 1;
            item.produto = dataProdutoBase[position];
            return item;
        });
        return {
            list,
            total: list.length
        }
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return new Error((error as { message: string }).message || 'Erro ao listar produtos.');
    }
}

export const ProdutoService = {
    getAll
}