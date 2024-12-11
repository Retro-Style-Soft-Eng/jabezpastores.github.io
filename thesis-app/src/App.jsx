import React, { useState, useEffect, useRef } from 'react';
import { supabase } from "./lib/helper/supabaseClient.js";
import Login from './login/Login.jsx';
import AdminLogin from './login/AdminLogin.jsx';
import StudentLogin from './login/StudentLogin.jsx';
import LibrarianLogin from './login/LibrarianLogin.jsx';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import Dashboard from './login/Dashboard.jsx';
import Upload from './login/Upload.jsx';
import neu from './Image/NEU.png';

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const alertShown = useRef(false);

  useEffect(() => {
    
    // Function to fetch role from PostgreSQL based on userID
    const fetchUserRole = async (userId) => {
      const { data, error } = await supabase
        .from('user_roles') // SQL Table name
        .select('role') // the uhhhh table component containing the roles
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching role:', error);
        return null;
      }

      return data[0]?.role; // Assuming only one role per user
    };

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          setUser(user);
          // Fetch role from the database (PostgreSQL)
          const userRole = await fetchUserRole(user.id);
          /*
          // If the user has no role, default to "student"
          if (!userRole) {
            await supabase.rpc('create_user_role', {
              user_id: user.id,
            });
            
            await supabase
              .from("user_roles")
              .insert({ 
                user_id: user.id, role: "student" 
              });

              const userRole = await fetchUserRole(user.id);
          }
          */
          setRole(userRole);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchUserRole(session.user.id).then(setRole); // Fetch role on session change
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  if(!user){
    return <Login />
  }
  if (user){
    if(!user.email.endsWith("@neu.edu.ph") && !alertShown.current){
      alertShown.current = true;
      logout();
      alert("Please use your NEU email to log in.");
    }
    if(role){
      if(role == "admin"){
        return <AdminLogin logout={logout} />
      }
      if(role == "librarian"){
        return(
          <><div>
            {/* Navigation Bar */}
            <nav className="navbar">
              <div className="nav-left">
                <img src={neu} alt="Logo" className="logo" />
                <ul className="nav-links">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><a href="#">Users</a></li>
                  <li><Link to="/upload">Theses</Link></li>
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
          </div>
          <Routes>
            <Route path='/' element={<LibrarianLogin logout={logout} />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/upload' element={<Upload />} />
          </Routes>
        </>  
        )
        
      }
      if(role == "student"){
        return <StudentLogin logout={logout} />
      }
      // IF NO ROLE ASSIGNED THRU SQL it defaults to the student dashboard
      
    }
    if(!role){
      return <StudentLogin logout={logout} />
    }
  }
  
}
