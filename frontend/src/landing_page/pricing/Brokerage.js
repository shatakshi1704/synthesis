import React from "react";

function Brokerage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="p-5" style={{ backgroundColor: "#FAFAFA", borderRadius: "20px", border: "1px solid #F1E2D1" }}>
            <h4 style={{ color: "#541A1A" }} className="mb-4">Why Synthesis Pricing?</h4>
            <ul style={{ listStyleType: "none", padding: 0, lineHeight: "2" }}>
              <li style={{ color: "#541A1A" }}>● No hidden platform fees or "maintenance" charges.</li>
              <li style={{ color: "#541A1A" }}>● We don't monetize your data or push "gamification" trades.</li>
              <li style={{ color: "#541A1A" }}>● Flat-fee model: Whether you trade ₹1,000 or ₹1,00,000, your cost is identical.</li>
            </ul>
            <a href="#" className="btn mt-3" style={{ color: "#810B38", fontWeight: "600", textDecoration: "none" }}>Download Full Fee Schedule →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;