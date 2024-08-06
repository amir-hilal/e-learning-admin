import api from './api';

export const listEnrollments = () => api.get('/enrollments');
export const enrollInClass = (data) => api.post('/enrollments/enroll', data);
export const getClassEnrollments = (classId) => api.get(`/enrollments/class/${classId}`);
