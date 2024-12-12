import React from 'react';
import './css/Dashboard-Student-Style.css';  // Assuming your CSS is in the same directory
import neu from '../Image/NEU.png';

const Dashboard = () => {
  return (
    <div>

      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="search-bar">
          <img src={neu} alt="Search Icon" className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
