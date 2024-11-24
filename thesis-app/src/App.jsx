import React, { useState, useEffect } from 'react';
import { supabase } from "./lib/helper/supabaseClient.js";
import LoginPage from './login/Login.jsx';
import Login from './login/Login.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for an authenticated user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
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
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.user_metadata?.name || "User"}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
