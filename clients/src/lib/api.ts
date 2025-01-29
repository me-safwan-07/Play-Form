import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', //add the env variable
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const forms = {
  create: async (data: { name: string; status?: string }) => {
    const response = await api.post('/forms', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/forms');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/forms/${id}`);
    return response.data;
  },
  update: async (id: string, data: { name?: string; status?: string }) => {
    const response = await api.put(`/forms/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/forms/${id}`);
    return response.data;
  },
  getUserForms: async () => {
    const response = await api.get('/forms/user');
    return response.data;
  },
};

export default api;