import apiConfig from './api-config';
import axios from 'axios';
import router from '@/router';
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
        router.push({ name: "login" })
        sessionStorage.removeItem("token")
        return Promise.reject(err);
    }
);

export default api;
