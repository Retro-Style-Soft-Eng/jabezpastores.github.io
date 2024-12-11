import React, { useState } from 'react';
import { supabase } from '../lib/helper/supabaseClient.js'; // Make sure the supabase client is correctly imported
import icon from "../Image/NEU.png";
import './css/Dashboard-Admin-Style.css';

const AdminLogin = ({ logout }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState(null);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Upload file to the "pdf" bucket
      const { data, error } = await supabase.storage.from('pdf').upload(`${file.name}`, file, {
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
          <img src={icon} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#" className="active">Dashboard, You're a ADMIN!</a></li>
            <li><a href="#">Submissions</a></li>
            <li><a href="#">References</a></li>
            <li><a href="#">Archives</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="notification-icon">
            <img src={icon} alt="Bell Icon" className="bell-icon" />
          </div>
          <div className="profile-icon">
            <img src={icon} alt="User Icon" />
            <button className="down-button">
              <img src={icon} alt="Down Arrow" />
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="search-bar">
          <img src={icon} alt="Search Icon" className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        {/* Upload Section */}
        <div className="upload-container">
          <h2>Upload PDF</h2>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} disabled={uploading} />
          {uploading && <p>Uploading file...</p>}
          {uploadError && <p className="error">{uploadError}</p>}
          {fileName && <p>Uploaded: {fileName}</p>}
        </div>

        {/* Add the Logout button */}
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
