import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteClass as deleteClassService } from '../services/classService';
import { editClass, removeClass } from '../slices/classesSlice';

const ClassCard = ({ classInfo }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [title, setTitle] = useState(classInfo.title);
    const [description, setDescription] = useState(classInfo.description);
    const [instructor, setInstructor] = useState(classInfo.instructor);

    const handleDelete = async () => {
        try {
            await deleteClassService(classInfo._id);
            dispatch(removeClass(classInfo._id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Failed to delete class:', error);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
          const updatedClass = { title, description, instructor };
          await dispatch(editClass({ id: classInfo._id, updatedClass })).unwrap();
          setIsEditModalOpen(false);
        } catch (error) {
            console.error('Failed to edit class:', error);
        }
    };

    return (
        <div className="col-6 p-3">
            <div className="border-round-xl surface-card shadow-2 p-4 border-round">
                <h3 className="text-2xl">{classInfo.title}</h3>
                <p>{classInfo.description}</p>
                <p><strong>Instructor:</strong> {classInfo.instructor}</p>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="p-2 border-none bg-blue-500 hover:bg-blue-600 text-white border-round cursor-pointer mt-3"
                >
                    Edit
                </button>
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-2 border-none bg-red-500 hover:bg-red-600 text-white border-round cursor-pointer mt-3 ml-3"
                >
                    Delete
                </button>
                <button
                    onClick={() => navigate(`/class/${classInfo._id}`)}
                    className="p-2 border-none bg-green-500 hover:bg-green-600 text-white border-round cursor-pointer mt-3 ml-3"
                >
                    Info
                </button>
            </div>

            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this class?</p>
                        <div className="flex justify-content-between mt-4">
                            <button
                                onClick={handleDelete}
                                className="p-2 border-none bg-red-500 hover:bg-red-600 text-white border-round cursor-pointer"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="p-2 border-none surface-700 text-white border-round cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Class</h2>
                        <form onSubmit={handleEdit}>
                            <div className="field mb-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
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
                                    className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                                    value={instructor}
                                    onChange={(e) => setInstructor(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-content-between mt-4">
                                <button
                                    type="submit"
                                    className="p-2 border-none bg-green-500 hover:bg-green-600 text-white border-round cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2 border-none surface-700 text-white border-round cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassCard;
