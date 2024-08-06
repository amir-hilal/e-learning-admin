import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClassCard from '../components/ClassCard';
import { addClass, fetchClasses } from '../slices/classesSlice';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Ensure accessibility

const ClassesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useSelector((state) => state.classes.classes);

    useEffect(() => {
        if (classes.length === 0) {
            dispatch(fetchClasses());
        }
    }, [dispatch, classes.length]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');

    const handleAddClass = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addClass({ title, description, instructor })).unwrap();
            setTitle('');
            setDescription('');
            setInstructor('');
            setModalIsOpen(false);
            toast.success('Class added successfully');
        } catch (error) {
            toast.error('Failed to add class');
        }
    };

    return (
        <div className="p-4">
            <ToastContainer />
            <div className="flex justify-content-between items-center mb-2">
                <h2 className="text-2xl cursor-pointer m-1" onClick={() =>navigate('/')}>&#10229; Classes</h2>
                <button
                    onClick={() => setModalIsOpen(true)}
                    className="p-2 bg-blue-500 text-white border-round cursor-pointer"
                >
                    Add Class
                </button>
            </div>
            <div className="grid">
                {classes.map((classInfo) => (
                    <ClassCard key={classInfo._id} classInfo={classInfo} />
                ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Class"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="mb-4">Add Class</h2>
                <form onSubmit={handleAddClass}>
                    <div className="field mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            required
                            type="text"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            required
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="instructor">Instructor</label>
                        <input
                            id="instructor"
                            type="text"
                            required
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-3 border-none surface-700 text-white border-round cursor-pointer"
                    >
                        Add Class
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ClassesPage;
