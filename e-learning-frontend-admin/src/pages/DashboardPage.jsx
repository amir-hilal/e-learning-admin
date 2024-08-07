import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchClasses } from '../slices/classesSlice';
import { fetchUsers } from '../slices/usersSlice';

const DashboardPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const classes = useSelector((state) => state.classes.classes);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchClasses());
    }, [dispatch]);

    return (
        <div className="grid justify-content-between m-0">
            <div className="col-12">
                <div className="border-round-xl surface-card shadow-2 p-4 border-round cursor-pointer" onClick={() => navigate('/classes')}>
                    <h3 className="m-2 ml-3">Classes &#10230;</h3>
                    <div className="flex overflow-x-scroll">
                        {Array.isArray(classes) && classes.slice(0, 3).map((classItem) => (
                            <div key={classItem._id} className="p-3">
                                <div className="surface-card shadow-2 p-4 border-round">
                                    <h3 className="text-2xl">{classItem.title}</h3>
                                    <p>{classItem.description}</p>
                                    <p><strong>Instructor:</strong> {classItem.instructor}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="border-round-xl surface-card shadow-2 p-4 border-round cursor-pointer" onClick={() => navigate('/users')}>
                    <h3 className="m-2 ml-3">Users and Enrolled Classes &#10230;</h3>
                    <div className="flex overflow-x-scroll">
                        {Array.isArray(users) && users.slice(0, 3).map((user) => (
                            <div key={user._id} className="p-3">
                                <div className="surface-card shadow-2 p-4 border-round">
                                    <h3 className="text-2xl">{user.name}</h3>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Enrolled Classes:</strong></p>
                                    <ul>
                                        {user.enrollments.map((enrollment) => (
                                            <li key={enrollment._id}>{enrollment.class.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
