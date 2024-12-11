import React, { useState } from "react";
import { supabase } from "../lib/helper/supabaseClient.js";
import "./css/Login.css";
import lizBackground from "./img/liz.jpg";
import asdIcon from "./img/asd.png";
//just ask chatgpt how the frontend works i have no idea

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const loginGoogle = async () => {
    const { user } = await supabase.auth.signInWithOAuth({
        provider: "google",
    }); 
  };

  const loginEmail = async (e) => {
    e.preventDefault(); // pls fill out field 
    const { user, session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
  };
  // I have no idea how this stuff below works. I just asked chatgpt to make it so
  // uhhhhh basically hey make this html file into a jsx file ok poke?
  return (
    <div
      className="login-box"
      id="signIn"
      style={{
        backgroundImage: `url(${lizBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-header">
        <header>Login</header>
      </div>
      <form onSubmit={loginEmail}>
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot">
          <section className="checkbox-section">
            <input
              type="checkbox"
              id="check"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="check">Remember me</label>
          </section>
          <section>
            <a href="#">Forgot password?</a>
          </section>
        </div>
        
        <div className="input-submit">
          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </div>
      </form>
      <p className="or">-------------------- or --------------------</p>
      <div className="icons">
        <div className="google-signin" onClick={loginGoogle}>
        <img src={asdIcon} className="input-icon" alt="Google Icon" />
          <span>Sign in with Google</span>
        </div>
      </div>
      <p className="terms">
        By continuing, you agree to our <a href="#">Terms & Conditions</a> and{" "}
        <a href="#">Privacy Policy</a>
      </p>
    </div>
  );
};

export default Login;
