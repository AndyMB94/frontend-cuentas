import axios from 'axios';

// Configuración global de Axios
const api = axios.create({
  baseURL: 'http://18.230.216.176:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token en las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
