import React from 'react';
import neu from '../Image/NEU.png';
import './css/Dashboard-Libriarian-Style.css'; // Assuming the CSS file is in the same directory

const LibrarianLogin = ({ logout }) => {
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

      {/* Logout Button */}
      <div className="dashboard-container">
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default LibrarianLogin;
