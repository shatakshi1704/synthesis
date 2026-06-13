import React from "react";

function Hero() {
  return (
    <div className="container py-5 mt-5">
      <div className="row text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ color: "#541A1A" }}>Pricing</h1>
        <p className="lead" style={{ opacity: 0.7 }}>Simple, institutional-grade pricing for everyone.</p>
      </div>

      <div className="row g-4 mt-5">
        {[
          { title: "Equity Delivery", price: "₹0", desc: "No brokerage on long-term investments." },
          { title: "Intraday & F&O", price: "₹20", desc: "Flat fee per executed order, flat and clear." },
          { title: "Direct Funds", price: "₹0", desc: "Zero commissions on all fund investments." }
        ].map((item, index) => (
          <div key={index} className="col-lg-4">
            <div className="p-5 text-center" style={{ border: "1px solid #DCC3AA", borderRadius: "20px" }}>
              <h3 className="mb-3" style={{ color: "#541A1A" }}>{item.title}</h3>
              <h1 className="display-3 fw-bold" style={{ color: "#810B38" }}>{item.price}</h1>
              <p className="mt-3 text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;