import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import UserCard from '../components/UserCard';
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
      <div className="  grid justify-content-between m-0">

      <div className="col-12">
          <div className="border-round-xl surface-card shadow-2 p-4 border-round cursor-pointer" onClick={() => navigate('/classes')}>
            <h3 className="m-2 ml-3">Classes &#10230;</h3>
            <div className="flex overflow-x-scroll">
              {Array.isArray(classes) && classes.slice(0, 3).map((classItem) => (
                <ClassCard key={classItem._id} classInfo={classItem} />
              ))}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className=" border-round-xl surface-card shadow-2 p-4 border-round cursor-pointer" onClick={() => navigate('/users')}>
            <h3 className="m-2 ml-3">Users and Enrolled Classes &#10230;</h3>
            <div className= "flex overflow-x-scroll">
              {Array.isArray(users) && users.slice(0, 3).map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
