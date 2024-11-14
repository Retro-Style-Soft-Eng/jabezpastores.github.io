import supabase from './supabaseClient';

const login = async (email, password) => {
  // Using Supabase's signIn method to authenticate
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Error logging in:", error.message);
    return null;
  }

  console.log("User logged in:", user);
  console.log("Session:", session);
  return session;
};
