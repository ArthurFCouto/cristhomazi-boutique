import axios from 'axios';
import { interceptiorError, intereptorResponse } from './interceptors';

const Api = axios.create({
  //baseURL: 'http://localhost:3030/'
  baseURL: 'https://price-medium.herokuapp.com/api/v2/cristhomazi/'
})

Api.interceptors.response.use(
  (response) => intereptorResponse(response),
  (error) => interceptiorError(error)
);

export { Api };