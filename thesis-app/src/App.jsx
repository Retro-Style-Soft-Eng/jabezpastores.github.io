import React, { useState, useEffect } from 'react';
import { supabase } from "./lib/helper/supabaseClient.js";
import Login from './login/Login.jsx';
import AdminLogin from './login/AdminLogin.jsx';
import StudentLogin from './login/StudentLogin.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

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

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <div>
        {user ? (
          <div>
            {role ? (
              role === "admin" ? (
                <div>
                  <AdminLogin logout={logout}/>
                </div>
              ) : ( // else it defaults to StudentLogin dashboard
                <div>
                  <StudentLogin logout={logout}/>
                </div>
              )
            ) : ( // yes it's redundant but it works. I don't know how to make it work otherwise
              <div>
                <StudentLogin logout={logout}/>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )}

    </div>
  );
}
