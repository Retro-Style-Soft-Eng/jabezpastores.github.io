import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/helper/supabaseClient.js'; // Import the Supabase client
import './css/Upload-Style.css';
import neu from '../Image/NEU.png';

const Upload = () => {
  const [files, setFiles] = useState([]);  // State to store files
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Fetch files from your 'pdf' bucket with the root path ('')
        const { data, error } = await supabase.storage.from('pdf').list('');

        if (error) throw error;

        // Generate the custom public URLs for the fetched files
        const fileLinks = data.map(file => {
          // Manually format the public URL using your custom base URL
          const publicURL = `https://acdisgqdwzxffrlolqda.supabase.co/storage/v1/object/public/pdf/${file.name}`;

          // If there is an error, log it (although no error is thrown in this case)
          if (!publicURL) {
            console.error(`Error generating URL for ${file.name}`);
            return null;
          }

          return {
            name: file.name,
            url: publicURL
          };
        });

        // Filter out any null values (files that had URL generation errors)
        setFiles(fileLinks.filter(file => file !== null));
      } catch (err) {
        console.error('Error fetching files:', err.message);
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Stop loading when the data is fetched
      }
    };

    fetchFiles();  // Fetch files when the component mounts
  }, []);  // Empty array ensures this effect runs only once

  // Show a loading message while fetching data
  if (loading) {
    return <p>Loading files...</p>;
  }

  // Show an error message if there is an error
  if (error) {
    return <p>Error: {error}</p>;
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
        <h2>Bucket</h2>
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View {file.name}
                </a>
                {' | '}
                <a href={file.url} download>
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files found.</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
