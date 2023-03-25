import { Normalize } from '../../../util';
import { Api } from '../axios/axios';

export interface IProdutoBase {
    id: number;
    categoria: string[],
    descricao: string,
    marca: string
    sku: string,
    titulo: string,
}

export interface IProduto {
    id: number,
    idProdutoBase: number,
    cor: string,
    hex: string,
    imagens: string[],
    nome: string,
    produtoBase: IProdutoBase
    tamanhos: string[],
    valor: number,
    visitas: number
}

interface IGetAll {
    list: IProduto[],
    total: number
}

const getAll = async (): Promise<IGetAll> => {
    try {
        const response = await Api.get('produto').catch((error) => error.response);
        const { data: list } = response;
        return {
            list,
            total: list.length
        }
    } catch (error) {
        (error as { customMessage: string }).customMessage = 'Erro ao listar produtos.';
        return Promise.reject(error);
    }
}

const getAllWithFilter = async (nome: string, categoria: string, sort: 'id' | 'nome' | 'valor' | 'visitas', order: 'desc' | 'asc'): Promise<IGetAll> => {
    try {
        let url = `produto?q=${Normalize(nome)}&_sort=${sort}&_order=${order}`;
        if (categoria.length > 0) 
            url = `produto?q=${Normalize(nome)}&produtoBase.categoria_like=${categoria}&_sort=${sort}&_order=${order}`;
        const { data:list } = await Api.get(url).catch((error) => error.response);
        if (list.length < 1)
            throw new Error('Nenhum produto encontrado');
        return {
            list,
            total: list.length
        }
    } catch (error) {
        (error as { customMessage: string }).customMessage = 'Erro ao listar produtos.';
        return Promise.reject(error);
    }
}

const getByName = async (nome: string): Promise<IProduto> => {
    try {
        const url = `produto?nome_like=${nome}`;
        const response = await Api.get(url).catch((error) => error.response);
        if (response.data.length < 1)
            throw new Error('Produto não encontrado');
        const { data } = response;
        return data[0];
    } catch (error) {
        (error as { customMessage: string }).customMessage = 'Erro ao listar produto.';
        return Promise.reject(error);
    }
}

const getAllByCategory = async (categoria: string): Promise<IGetAll> => {
    try {
        const { data: list } = await Api.get(`produto?produtoBase.categoria_like=${categoria}`).catch((error) => error.response);
        if (list.length < 1)
            throw new Error('Nenhum produto encontrado');
        return {
            list,
            total: list.length
        }
    } catch (error) {
        (error as { customMessage: string }).customMessage = 'Erro ao listar produtos.';
        return Promise.reject(error);
    }
}

export const ProdutoService = {
    getAll,
    getAllByCategory,
    getAllWithFilter,
    getByName
}