import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://192.168.29.141:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResult(response.data);
      setUploadError(null); // Clear previous error if any
      console.log('Image upload successful:', response.data);
    } catch (error) {
      setUploadError(error.message);
      setUploadResult(null); // Clear previous result if any
      console.error('Image upload failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
      {uploadResult && <p>Upload Successful: {uploadResult}</p>}
      {uploadError && <p style={{ color: 'red' }}>Upload Error: {uploadError}</p>}
    </form>
  );
}

export default ImageUpload;
