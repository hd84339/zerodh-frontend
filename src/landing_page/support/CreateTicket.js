import React from "react";

const topics = [
  "Online Account Opening",
  "Offline Account Opening",
  "Company, Partnership and HUF Account",
  "Opening",
  "NRI Account Opening",
  "Charges at Zerodha",
  "Zerodha IDFC FIRST Bank 3-in-1 Account",
  "Getting Started",
];

function CreateTicket() {
  const sections = Array(6).fill("Account Opening"); // 6 repeated sections

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">
          To create a ticket, select a relevant topic
        </h1>

        {sections.map((section, idx) => (
          <div key={idx} className="col-4 p-5 mt-2 mb-2">
            <h4>
              <i className="fa fa-plus-circle" aria-hidden="true"></i> {section}
            </h4>
            {topics.map((topic, tIdx) => (
              <div key={tIdx}>
                <a
                  href="#"
                  style={{ textDecoration: "none", lineHeight: "2.5" }}
                >
                  {topic}
                </a>
                <br />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
