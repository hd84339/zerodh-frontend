// React import removed (automatic JSX runtime)

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 p-5">
          <img 
            src="media/images/largestBroker.svg" 
            alt="Largest Broker in India" 
            className="img-fluid" 
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6 p-5 mt-5 mt-md-0">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          <img 
            src="media/images/pressLogos.png" 
            alt="Press logos" 
            style={{ width: "90%" }} 
            className="mt-4 img-fluid" 
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
