import { AxiosError } from 'axios';

export const interceptiorError = (error: AxiosError) => {
    if (error.response) {
        const { data }: any = error.response;
        data.error = 'Houve um erro durante a requisição.';
        error.response.data = data;
    }
    return Promise.reject(error);
}