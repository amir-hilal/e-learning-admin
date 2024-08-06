import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../components/UserCard';
import { fetchUsers, deleteUserAsync } from '../slices/usersSlice';

const UsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const handleDelete = (userId) => {
        dispatch(deleteUserAsync(userId));
    };

    return (
        <div className="p-4 min-h-screen min-w-full bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <div className="grid gap-4">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
