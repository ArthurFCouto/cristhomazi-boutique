import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:3030/'
})

/* Remover */

interface ITamanhoCor {
  tamanho: string;
  cor: string[];
  
}

export interface IDatabase {
  id: number;
  produto: {
      id: number;
      sku: string;
      titulo: string;
      categoria: string[];
  };
  tamanhoCor: ITamanhoCor[];
  valor: number;
  descricao: string;
  imagens: string[];
}