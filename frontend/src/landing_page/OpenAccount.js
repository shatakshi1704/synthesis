import React from "react";

function OpenAccount() {
  return (
    <div className="container py-5 my-5">
      <div className="row text-center justify-content-center">
        <div className="col-lg-8">
          
          <h1 className="fw-bold mb-4" style={{ color: "#541A1A", fontSize: "3rem", letterSpacing: "-1px" }}>
            Start your journey with Synthesis
          </h1>
          
          <p className="lead mb-5" style={{ color: "#541A1A", opacity: "0.8", fontSize: "1.25rem" }}>
            Experience institutional-grade infrastructure, transparent access, and a platform built for your long-term success.
          </p>
          
          <a
            href="/signup"
            className="btn px-5 py-3 fs-5"
            style={{ 
              backgroundColor: "#810B38", 
              color: "#FFFFFF", 
              fontWeight: "600", 
              borderRadius: "8px",
              transition: "all 0.2s ease-in-out",
              border: "none",
              textDecoration: "none"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 10px 20px rgba(129, 11, 56, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            Create an Account
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;