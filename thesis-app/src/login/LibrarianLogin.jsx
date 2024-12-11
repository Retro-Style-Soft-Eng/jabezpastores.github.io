import React, { useState } from 'react';
import { supabase } from '../lib/helper/supabaseClient.js';
import './css/Dashboard-Libriarian-Style.css'; // Assuming the CSS file is in the same directory


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
        
        {/*Home */}
        <div className="text-container">
          <h1>Welcome, Librarian</h1>
        </div>

        {/* Logout Button */}
        <div className="dashboard-container">
          <button onClick={logout} className="logout-button">Logout</button>
        </div>


      </div>
      
  );
};

export default LibrarianLogin;
