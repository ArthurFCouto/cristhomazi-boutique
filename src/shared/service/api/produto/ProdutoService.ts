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
    produto: IProdutoBase
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
        const responseProdutoBase = await Api.get('produtoBase').catch((error) => error.response);
        const responseProduto = await Api.get('produto').catch((error) => error.response);
        const { data: dataProdutoBase } = responseProdutoBase;
        const { data: dataProduto } = responseProduto;
        let list = dataProduto.map((item: IProduto) => {
            const position = item.idProdutoBase - 1;
            item.produto = dataProdutoBase[position];
            return item;
        });
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
        const url = `produto?q=${Normalize(nome)}&_sort=${sort}&_order=${order}`;
        const { data: dataProdutoBase } = await Api.get('produtoBase').catch((error) => error.response);
        const { data: dataProduto } = await Api.get(url).catch((error) => error.response);
        if (dataProduto.length < 1)
            throw new Error('Nenhum produto encontrado');
        let list = dataProduto.map((item: IProduto) => {
            const position = item.idProdutoBase - 1;
            item.produto = dataProdutoBase[position];
            return item;
        });
        if (categoria.length > 0)
            list.filter((item: IProduto) => item.produto.categoria.includes(categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
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
        const url = `produto?nome=${nome}`;
        const responseProdutoBase = await Api.get('produtoBase').catch((error) => error.response);
        const responseProduto = await Api.get(url).catch((error) => error.response);
        if (responseProduto.data.length < 1)
            throw new Error('Produto não encontrado');
        const { data: dataProduto } = responseProduto;
        const { data: dataProdutoBase } = responseProdutoBase;
        const position = dataProduto[0].idProdutoBase - 1;
        dataProduto[0].produto = dataProdutoBase[position];
        return dataProduto[0];
    } catch (error) {
        (error as { customMessage: string }).customMessage = 'Erro ao listar produto.';
        return Promise.reject(error);
    }
}

const getAllByCategory = async (categoria: string): Promise<IGetAll> => {
    try {
        const { data: dataProdutoBase } = await Api.get('produtoBase').catch((error) => error.response);
        const { data: dataProduto } = await Api.get('produto').catch((error) => error.response);
        if (dataProduto.length < 1)
            throw new Error('Nenhum produto encontrado');
        let list = dataProduto.map((item: IProduto) => {
            const position = item.idProdutoBase - 1;
            item.produto = dataProdutoBase[position];
            return item;
        });
        list.filter((item: IProduto) => item.produto.categoria.includes(categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()));
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