import axios from 'axios';
import { interceptiorError, intereptorResponse } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3030/'
})

Api.interceptors.response.use(
  (response) => intereptorResponse(response),
  (error) => interceptiorError(error)
);

export { Api };

/* Remover */
export interface IProduto {
  id: number;
  sku: string,
  titulo: string,
  categoria: string[],
  descricao: string,
  marca: string
}

export interface IEstoque {
  id: number,
  idProduto: number,
  nome: string,
  cor: string,
  hex: string,
  imagens: string[],
  tamanhos: string[],
  valor: number
}

export interface IEstoqueProduto extends IEstoque {
  produto: IProduto
}