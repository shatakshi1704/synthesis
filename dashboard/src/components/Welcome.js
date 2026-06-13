import React from "react";

const Welcome = () => {
  const facts = [
    "Buying a stock means purchasing a fraction of ownership in a company.",
    "Stock prices are primarily driven by the fundamental laws of supply and demand.",
    "Short-term market volatility is a standard and expected part of long-term investing.",
    "Indices like Nifty 50 or Sensex act as benchmarks for the overall market health.",
    "Diversification across sectors is the most effective way to mitigate individual stock risk.",
    "Stock exchanges operate during fixed daily hours for executing buy and sell orders."
  ];

  return (
    <div style={{ padding: "40px", color: "#541A1A" }}>
      <h2 style={{ color: "#810B38", marginBottom: "25px" }}>Welcome to Synthesis</h2>
      
      {/* 2 columns per row layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
        {facts.map((fact, index) => (
          <div key={index} style={{ border: "1px solid #F1E2D1", padding: "20px", borderRadius: "8px" }}>
            <p style={{ fontSize: "0.95rem", margin: 0 }}>{fact}</p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #F1E2D1", paddingTop: "30px", textAlign: "center" }}>
        <h4 style={{ color: "#541A1A", marginBottom: "15px" }}>Need help getting started?</h4>
        <a 
          href="/path-to-your-documentation.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            backgroundColor: "#810B38", 
            color: "#fff", 
            padding: "12px 24px", 
            borderRadius: "4px", 
            textDecoration: "none",
            fontWeight: "600",
            display: "inline-block"
          }}
        >
          Read Documentation
        </a>
      </div>
    </div>
  );
};

export default Welcome;