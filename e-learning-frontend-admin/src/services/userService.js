import api from './api';

export const listUsers = () => api.get('/users');
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
