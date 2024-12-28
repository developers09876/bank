

import React, { useState } from "react";
import { Table } from "react-bootstrap";
// import "./FileTable.css"; // Add CSS for styling

const Documents = () => {
  const [files, setFiles] = useState([
    { name: "Aadhar.jpg", uploader: "Uploader Name", date: "2020.05.12 AM 8:34", type: "jpg" ,url: "https://i.pinimg.com/originals/d4/f5/13/d4f513c861886dd40f3e3d2e2012a3cd.jpg"},
    { name: "Pan.png", uploader: "Uploader Name", date: "2020.05.12 AM 8:34", type: "png" ,url: "https://via.placeholder.com/150"},
    { name: "VoterID.doc", uploader: "Uploader Name", date: "2020.05.12 AM 8:34", type: "doc" },
    { name: "Photo.jpg", uploader: "Uploader Name", date: "2020.05.12 AM 8:34", type: "jpg" },
    
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log('selectedImage', selectedImage)

  const handleDownload = (file) => {
    if (file.type === "jpg" || file.type === "png") {
      setSelectedImage(file.url); // Set the image URL for display
      console.log('first', file.url)
    } else {
      alert(`${file.name} is not an image.`);
    }
  };
  return (
    <div className="file-table-container">
      <h2>Files</h2>
      <Table className="file-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Uploader</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>
                <span className={`file-icon ${file.type}`}></span>
                {file.name}
              </td>
              <td>{file.uploader}</td>
              <td>{file.date}</td>
              <td>
                <button className="download-btn" onClick={() => handleDownload(file)}>
                  View
                </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedImage && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={selectedImage} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default Documents;

