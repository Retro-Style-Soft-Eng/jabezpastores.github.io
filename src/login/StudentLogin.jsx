import React from 'react';
import './css/Dashboard-Student-Style.css'; 
import neu from '../Image/NEU.png';
import user from '../Image/User.png';
import bell from '../Image/Bell.png';
import searchicon from '../Image/SearchIcon.png';
import downbutton from '../Image/DownButton.png';

const StudentLogin = ({logout}) => {
  
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={neu} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#" className="active">Dashboard, You're a STUDENT!</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Theses</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="notification-icon">
            <img src={bell} alt="Bell Icon" className="bell-icon" />
          </div>
          <div className="profile-icon">
            <img src={user} alt="User Icon" />
            <button className="down-button">
              <img src={downbutton} alt="Down Arrow" />
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="search-bar">
          <img src={searchicon} alt="Search Icon" className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        {/* Logout Button */}
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default StudentLogin;
