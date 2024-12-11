import React from 'react';
import icon from "./img/xdd.jpg";
import './css/Dashboard-Admin-Style.css';
//just ask chatgpt how the frontend works i have no idea

const AdminLogin = ({ logout }) => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={icon} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#" className="active">Dashboard, You're a ADMIN/LIBRARIAN!</a></li>
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

        {/* Add the Logout button */}
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
