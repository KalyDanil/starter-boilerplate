import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
);