import React from 'react';
import api from '../services/api';

const UserCard = ({ user, onDelete }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`/users/${user._id}`);
            onDelete(user._id);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className="col-6 p-3 ">
            <div className="border-round-xl surface-card shadow-2 p-4 border-round h-auto">
                <h3 className="text-2xl">{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <h4 className="mt-3">Enrolled Classes:</h4>
                <ul>
                    {user.enrollments.map((enrollment) => (
                        <li key={enrollment._id}>{enrollment.class.title}</li>
                    ))}
                </ul>
                <button
                    onClick={handleDelete}
                    className="p-2 mt-4 border-none bg-red-500 text-white border-round cursor-pointer"
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default UserCard;
