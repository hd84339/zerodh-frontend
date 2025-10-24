import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} alt={productName} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a
              href={tryDemo || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Demo
            </a>
            <a
              href={learnMore || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "50px" }}
            >
              Learn More
            </a>
          </div>
          <div className="mt-3">
            <a
              href={googlePlay || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="media/images/googlePlayBadge.svg" alt="Google Play Store" />
            </a>
            <a
              href={appStore || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "50px" }}
            >
              <img src="media/images/appstoreBadge.svg" alt="Apple App Store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
