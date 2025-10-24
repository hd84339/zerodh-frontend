import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dashboardWinRef = useRef(null);

  useEffect(() => {
    // Check initial login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for storage events (for multi-tab sync)
    const onStorage = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };

    // Listen for messages from dashboard
    const onMessage = (event) => {
      if (event.origin !== "https://zerodh-dashboard.netlify.app") return;
      
      const data = event.data || {};
      if (data.type === "REQUEST_TOKEN") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) {
          try {
            event.source.postMessage({
              type: "AUTH_TOKEN",
              token,
              user: user ? JSON.parse(user) : null
            }, "https://zerodh-dashboard.netlify.app");
          } catch (e) {}
        }
      }
      if (data.type === "LOGOUT") {
        handleLogout();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    
    // Notify open dashboard window if exists
    const win = dashboardWinRef.current;
    if (win && !win.closed) {
      try {
        win.postMessage({ type: "LOGOUT" }, "https://zerodh-dashboard.netlify.app");
      } catch (e) {}
    }

    // Force a page refresh and redirect to home
    window.location.href = "/";
  };

  const openDashboard = () => {
    const dashboardUrl = "https://zerodh-dashboard.netlify.app";
    // Try to open in a new tab/window; include noopener to be safe.
    const win = window.open(dashboardUrl, "_blank", "noopener,noreferrer");
    // If popup blocked (win is null), fallback to same-tab navigation.
    if (!win) {
      window.location.assign(dashboardUrl);
      return;
    }
    dashboardWinRef.current = win;

    // Send token via postMessage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    const sendToken = () => {
      if (!win || win.closed) return;
      try {
        win.postMessage({
          type: "AUTH_TOKEN",
          token,
          user: user ? JSON.parse(user) : null
        }, "https://zerodh-dashboard.netlify.app");
      } catch (e) {}
    };

    // Try sending token repeatedly until dashboard loads
    const timer = setInterval(() => {
      if (win && !win.closed) {
        sendToken();
      } else {
        clearInterval(timer);
      }
    }, 500);
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "120px" }}
            alt="Zerodha Logo"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={openDashboard}>
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;