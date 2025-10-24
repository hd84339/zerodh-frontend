import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await axios.post("https://zerodh-backend.onrender.com/api/auth/login", {
        usernameOrEmail,
        password,
      });

      // Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user || null));

      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      
      // Navigate to home page after successful login with a slight delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5-mobile">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 card-responsive border rounded p-4">
          <h1 className="text-center-mobile mb-3-mobile">Login</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="usernameOrEmail" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                className="form-control"
                placeholder="Enter username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`btn btn-success btn-responsive mt-3 ${loading ? 'disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center-mobile mt-3">
            Don't have an account? <Link to="/signup" className="text-success text-decoration-none fw-bold">Sign up for free</Link>
          </p>

          {message && (
            <div className={`alert mt-3 ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
