import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5 py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 p-5">
          <h2 style={{ color: "#541A1A" }}>{productName}</h2>
          <p style={{ fontSize: "1.2rem", opacity: "0.8" }}>{productDesription}</p>
          <div className="mt-4">
            <a href={learnMore} style={{ color: "#810B38", fontWeight: "600", textDecoration: "none" }}>Learn More →</a>
          </div>
        </div>
        <div className="col-lg-6">
          <img src={imageURL} style={{ width: "100%", borderRadius: "12px" }} alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;