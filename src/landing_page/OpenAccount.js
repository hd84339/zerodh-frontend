import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dashboardWinRef = useRef(null);

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for storage events (for multi-tab sync)
    const handleStorage = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const openDashboard = () => {
    const dashboardUrl = "http://localhost:3001";
    const win = window.open(dashboardUrl, "_blank");
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
        }, "http://localhost:3001");
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
    <div className="container py-5 mb-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {!isLoggedIn ? (
            <>
              <h1 className="mt-4 fw-bold">Open a Zerodha Account</h1>
              <p className="text-muted fs-5 mt-3">
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
                F&O trades.
              </p>
              <Link to="/signup">
                <button
                  type="button"
                  className="btn btn-primary fs-5 px-4 mt-4"
                >
                  <i className="fa-solid fa-user-plus me-2"></i>
                  Sign Up Now
                </button>
              </Link>
            </>
          ) : (
            <>
              <h1 className="mt-4 fw-bold">Welcome to Your Zerodha Account</h1>
              <p className="text-muted fs-5 mt-3">
                Access your portfolio, track investments, and trade with ease.
              </p>
              <button
                type="button"
                className="btn btn-success fs-5 px-4 mt-4"
                onClick={openDashboard}
              >
                <i className="fa-solid fa-chart-line me-2"></i>
                Go to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
