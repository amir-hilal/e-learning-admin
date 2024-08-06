import api from './api';

export const listWithdrawals = () => api.get('/withdrawals');
export const applyWithdrawal = (data) => api.post('/withdrawals/apply', data);
export const updateWithdrawal = (id, data) => api.put(`/withdrawals/approve/${id}`, data);
