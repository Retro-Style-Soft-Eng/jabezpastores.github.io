import React, { useState } from "react";
import { supabase } from "../lib/helper/supabaseClient.js";
import "./Style.css";
import libBackground from "../Image/Wallpaper.jpg";
import google from "../Image/Google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const loginEmail = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  return (
    <div
      className="background-wrapper"
      style={{
        backgroundImage: `url(${libBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Ensures full-page height
        width: "100vw", // Ensures full-page width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-box" id="signIn">
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
            <img src={google} className="input-icon" alt="Google Icon" />
            <span>Sign in with Google</span>
          </div>
        </div>
        <p className="terms">
          By continuing, you agree to our{" "}
          <a href="#">Terms & Conditions</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
