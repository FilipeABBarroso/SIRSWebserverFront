import axios from 'axios';

export const nextClient = axios.create({
   baseURL: '/api',
});

export const backendClient = axios.create({
    baseURL: 'http://localhost:5000/'
});