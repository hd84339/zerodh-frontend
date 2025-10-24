import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container py-5-mobile">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 card-responsive border rounded p-4">
          <h1 className="text-center-mobile mb-3-mobile">Signup</h1>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-responsive mt-3">
              Signup
            </button>
          </form>

          <p className="text-center-mobile mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>

          {message && (
            <p className="text-center-mobile mt-3 text-success">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
