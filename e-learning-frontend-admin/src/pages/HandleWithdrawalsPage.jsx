import React, { useEffect, useState } from 'react';
import api from '../services/api';

const HandleWithdrawalPage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await api.get('/withdrawals');
                setForms(response.data);
            } catch (error) {
                console.error('Failed to fetch withdrawal forms:', error);
            }
        };

        fetchForms();
    }, []);

    const handleApproval = async (id, status) => {
        try {
            await api.put(`/withdrawals/approve/${id}`, { status });
            setForms(forms.map(form => form._id === id ? { ...form, status } : form));
        } catch (error) {
            console.error('Failed to update withdrawal form status:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="mb-4">Withdrawals</h2>
            <div className="grid">
                {forms.map((form) => (
                    <div key={form._id} className="col-12 md:col-6 lg:col-4 p-3">
                        <div className="surface-card shadow-2 p-4 border-round">
                            <p><strong>Student:</strong> {form.user.name}</p>
                            <p><strong>Class:</strong> {form.class.title}</p>
                            <p><strong>Reason:</strong> {form.reason}</p>
                            <p><strong>Status:</strong> {form.status}</p>
                            <div className="flex justify-content-between mt-3">
                                <button
                                    onClick={() => handleApproval(form._id, 'approved')}
                                    className="p-2 border-none surface-700 text-white border-round cursor-pointer"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApproval(form._id, 'rejected')}
                                    className="p-2 border-none surface-700 text-white border-round cursor-pointer"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HandleWithdrawalPage;
