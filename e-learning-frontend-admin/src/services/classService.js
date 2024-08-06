import api from './api';

export const addClass = (data) => api.post('/classes/add', data);
export const listClasses = () => api.get('/classes');
export const deleteClass = (id) => api.delete(`/classes/delete/${id}`);
export const editClass = (id, data) => api.put(`/classes/edit/${id}`, data);
export const getClassById = (id) => api.get(`/classes/${id}`);
