import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import File from '../components/File';
import { getClassEnrollments } from '../services/enrollementService';
import { getClassById } from '../services/classService';
import { uploadFile } from '../services/filesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from 'react-loading';

const ClassInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const classInfoFromState = useSelector(state => state.classes.classes.find(c => c._id === id));
  const [classData, setClassData] = useState(classInfoFromState || null);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(!classInfoFromState);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (!classInfoFromState) {
        try {
          const response = await getClassById(id);
          setClassData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch class info:', error);
          setLoading(false);
          toast.error('Failed to fetch class info');
        }
      } else {
        setLoading(false);
      }
    };

    const fetchEnrollments = async () => {
      try {
        const response = await getClassEnrollments(id);
        setEnrolledUsers(response.data);
        setLoadingEnrollments(false);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
        setLoadingEnrollments(false);
        toast.error('Failed to fetch enrollments');
      }
    };

    fetchClassInfo();
    fetchEnrollments();
  }, [id, classInfoFromState]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadFile(id,formData);
      toast.success('File uploaded successfully');
      setFile(null);
      const response = await getClassById(id);
      setClassData(response.data);
    } catch (error) {
      console.error('Failed to upload file:', error);
      toast.error('Failed to upload file');
    }
  };

  if (loading) {
    return (
      <div className='flex flex-column align-items-center justify-content-center w-full text-center'>
        <p>Loading class info...</p>
        <LoadingSpinner type="spin" color="#000" height={50} width={50} />
      </div>
    );
  }

  if (!classData) {
    return <div className='w-full text-center'>Class not found</div>;
  }

  return (
    <div className="pl-4 pr-4">
      <ToastContainer />
      <h2 className='m-0 mb-2 cursor-pointer' onClick={() => navigate('/classes')}>&#10229;</h2>
      <div className="border-round-xl surface-card shadow-2 p-4 border-round mb-4">
        <h2 className="text-2xl">{classData.title}</h2>
        <p>{classData.description}</p>
        <p><strong>Instructor:</strong> {classData.instructor}</p>
      </div>
      <h3 className="mb-4">Files</h3>

        <form onSubmit={handleFileUpload} className="mb-4">
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className="p-2 border-none bg-blue-500 hover:bg-blue-600 text-white border-round cursor-pointer mt-3">
            Upload File
          </button>
        </form>

      <div className="grid m-1">
        {classData.files && classData.files.length > 0 ? (
          classData.files.map((file, index) => (
            <File key={index} filename={file} />
          ))
        ) : (
          <div><p>No files available</p></div>
        )}
      </div>
      <h3 className="mt-4">Enrolled Users</h3>
      {loadingEnrollments ? (
        <div><p>Loading enrolled users...</p></div>
      ) : (
        <div className="grid m-1">
          {enrolledUsers.length > 0 ? (
            enrolledUsers.map((enrollment, index) => (
              <div key={index} className="col-12 md:col-6 lg:col-4 p-3">
                <div className="border-round-xl surface-card shadow-2 p-4 border-round">
                  <p><strong>Name:</strong> {enrollment.user.name}</p>
                  <p><strong>Email:</strong> {enrollment.user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div><p>No enrolled users</p></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassInfoPage;
