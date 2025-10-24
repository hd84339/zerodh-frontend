// Use named React hooks
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Universe() {
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
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our partner platforms
        </p>

        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 p-3 mt-3 mt-md-5">
            <img
              src="media/images/smallcaseLogo.png"
              alt={`Partner Platform ${idx + 1}`}
              className="img-fluid"
              style={{ maxWidth: '200px' }}
            />
            <p className="text-small text-muted mt-2">Thematic investment platform</p>
          </div>
        ))}

        <div className="w-100 mt-4 px-3">
          {isLoggedIn ? (
            <button 
              className="btn btn-success fs-5 d-block mx-auto py-2 px-4 w-100 w-md-auto"
              onClick={openDashboard}
              style={{ maxWidth: '300px' }}
            >
              <i className="fa-solid fa-chart-line me-2"></i>
              Go to Dashboard
            </button>
          ) : (
            <Link to="/signup" className="d-block w-100" style={{ maxWidth: '300px', margin: '0 auto' }}>
              <button className="btn btn-primary fs-5 d-block w-100 py-2 px-4">
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

export default Universe;
