import apiConfig from './api-config';
import axios from 'axios';

const api = axios.create({
    baseURL: apiConfig,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (err) => {
        /**
         * TODO: thêm một số case
         */
        return Promise.reject(err);
    }
);

export default api;
