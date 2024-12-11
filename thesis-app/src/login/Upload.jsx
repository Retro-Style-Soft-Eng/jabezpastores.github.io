import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/helper/supabaseClient.js'; // Import the Supabase client
import './css/Upload-Style.css';
import neu from '../Image/NEU.png';

const Upload = () => {
  const [files, setFiles] = useState([]);  // State to store files
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Fetch files from your 'pdf' bucket (replace 'pdf' with your actual bucket name)
        const { data, error } = await supabase.storage.from('pdf').list();

        if (error) throw error;

        // Update state with fetched files
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error.message);
      } finally {
        setLoading(false); // Stop loading when the data is fetched
      }
    };

    fetchFiles();  // Fetch files when the component mounts
  }, []);  // Empty array ensures this effect runs only once

  // If the data is still loading, show a loading message
  if (loading) {
    return <p>Loading files...</p>;
  }

  return (
    <div>
      {/* Dashboard and Search Bar */}
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <img src={neu} alt="Search Icon" className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Display List of Files */}
      <div className="file-list-container">
        <h2>Files in Your Bucket</h2>
        <ul>
          {files.length > 0 ? (
            files.map((file, index) => (
              <li key={index}>
                {/* Generate a public URL to the file */}
                <a
                  href={supabase.storage.from('pdf/files').getPublicUrl(file.name).publicURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </a>
              </li>
            ))
          ) : (
            <p>No files found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Upload;
