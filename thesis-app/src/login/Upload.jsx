import React from 'react';
import './css/Upload-Style.css';
import neu from '../Image/NEU.png';

const Upload = () => {
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
    </div>
  );
};

export default Upload;
