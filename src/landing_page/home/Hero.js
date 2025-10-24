// Use named React hooks
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";


function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dashboardWinRef = useRef(null);

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for storage events
    const handleStorage = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const openDashboard = () => {
    const dashboardUrl = "https://zerodh-dashboard.netlify.app";
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
    <div className="container p-5 mb-5">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <img
            src="media/images/homeHero.png"
            alt="Investment platform illustration"
            className="img-fluid mb-5"
            style={{ maxWidth: "600px" }}
          />
        </div>

        <div className="col-12">
          <h1 className="mt-3 fw-bold">Invest in everything</h1>
          <p className="text-muted">
            Online platform to invest in stocks, derivatives, mutual funds, and more.
          </p>
          {isLoggedIn ? (
            <button
              type="button"
              className="btn btn-success fs-5 px-4 mt-3"
              onClick={openDashboard}
            >
              <i className="fa-solid fa-chart-line me-2"></i>
              Go to Dashboard
            </button>
          ) : (
            <Link to="/signup">
              <button
                type="button"
                className="btn btn-primary fs-5 px-4 mt-3"
              >
                <i className="fa-solid fa-user-plus me-2"></i>
                Sign Up Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
