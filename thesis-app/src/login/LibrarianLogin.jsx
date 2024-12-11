import React, { useState } from 'react';
import { supabase } from '../lib/helper/supabaseClient.js';
import neu from '../Image/NEU.png';
import './css/Dashboard-Libriarian-Style.css';

const LibrarianLogin = ({ logout }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Upload file to the "pdf" bucket
      const { data, error } = await supabase.storage.from('pdf').upload(`files/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false, // Avoid overwriting existing files
      });

      if (error) {
        throw error;
      }

      setFileName(file.name); // Display the uploaded file name
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload Error:', error.message);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={neu} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Theses</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="notification-icon">
            <img src={neu} alt="Bell Icon" className="bell-icon" />
          </div>
          <div className="profile-icon">
            <img src={neu} alt="User Icon" />
            <button className="down-button">
              <img src={neu} alt="Down Arrow" />
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="text-container">
        <h1>Welcome, Librarian</h1>
      </div>

      {/* Upload Section */}
      <div className="upload-container">
        <h2>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} disabled={uploading} />
        {uploading && <p>Uploading file...</p>}
        {uploadError && <p className="error">{uploadError}</p>}
        {fileName && <p>Uploaded: {fileName}</p>}
      </div>

      {/* Logout Button */}
      <div className="dashboard-container">
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default LibrarianLogin;
