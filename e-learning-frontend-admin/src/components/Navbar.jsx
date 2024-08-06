import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access the auth state from Redux

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex justify-content-between m-4">
            <h2 className='cursor-pointer' onClick={()=>navigate('/')}>Admin Dashboard</h2>
            {isLoggedIn && (
                <div className="flex align-items-center">
                    <button
                        onClick={() => navigate('/withdrawals')}
                        className="p-3 border-none bg-primary hover:bg-blue-600 text-white border-round cursor-pointer mr-3"
                    >
                        Withdrawals
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-3 border-none bg-red-500 hover:bg-red-600 text-white border-round cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
