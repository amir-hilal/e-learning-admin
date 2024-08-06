import React from 'react';
import { viewFile } from '../services/filesService';

const File = ({ filename }) => {
  const handleViewFile = () => {
    viewFile(filename).then(response => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', filename);
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink); // Clean up
    }).catch(error => {
      console.error('Failed to view file:', error);
    });
  };

  return (
    <div className="col-12 md:col-6 lg:col-4 p-3">
      <div className="border-round-xl surface-card shadow-2 p-4 border-round">
        <p>{filename}</p>
        <button
          onClick={handleViewFile}
          className="p-2 border-none bg-blue-500 hover:bg-blue-600 text-white border-round cursor-pointer mt-3"
        >
          View/Download
        </button>
      </div>
    </div>
  );
};

export default File;
