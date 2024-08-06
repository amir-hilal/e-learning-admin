import React, { useState } from 'react';
import api from '../services/api';
import 'primeflex/primeflex.css';

const UploadFiles = () => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2>Upload Files</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>File</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="p-inputtext p-component" />
                </div>
                <button type="submit" className="p-button p-component">Upload</button>
            </form>
        </div>
    );
};

export default UploadFiles;
