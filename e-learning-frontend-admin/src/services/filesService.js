import api from './api';

export const uploadFile = (classId, data) => api.post(`/files/upload/${classId}`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const viewFile = (filename) => api.get(`/files/view/${filename}`, {
  responseType: 'blob', // Important for handling file responses
});
