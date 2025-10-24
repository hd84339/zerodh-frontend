import React from "react";

function Hero() {
  const quickLinks = [
    "Track account opening",
    "Track segment activation",
    "Intraday margins",
    "Kite user manual",
  ];

  const featuredArticles = [
    "Current Takeovers and Delisting - January 2024",
    "Latest Intraday leverages - MIS & CO",
  ];

  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="#" style={{ textDecoration: "none" }}>
          Track Tickets
        </a>
      </div>

      <div className="row p-5 m-3">
        <div className="col-6 p-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            type="text"
            placeholder="Eg. how do I activate F&O"
            className="form-control mt-3 mb-3"
          />

          {quickLinks.map((link, idx) => (
            <div key={idx} className="mb-2">
              <a href="#" style={{ textDecoration: "none" }}>
                {link}
              </a>
            </div>
          ))}
        </div>

        <div className="col-6 p-3">
          <h1 className="fs-3">Featured</h1>
          <ol>
            {featuredArticles.map((article, idx) => (
              <li key={idx}>
                <a href="#" style={{ textDecoration: "none" }}>
                  {article}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
