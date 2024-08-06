import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import api from '../services/api';
import { login } from '../slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            dispatch(login({ token: response.data.token, user: response.data.user }));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-content-center align-items-center">
            <div className="border-round-xl surface-card p-4 shadow-2">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="field mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 border-none surface-700 text-white border-round cursor-pointer flex justify-content-center align-items-center"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Login'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
