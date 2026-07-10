import React from "react";

function Footer() {
  const linkStyle = { color: "#541A1A", textDecoration: "none", opacity: "0.7" };
  const headerStyle = { color: "#541A1A", fontWeight: "700" };

  return (
    <footer style={{ backgroundColor: "#F9F9F9", borderTop: "1px solid #DCC3AA" }}>
      <div className="container py-5">
        <div className="row mt-4">
          
          <div className="col-lg-3 mb-4">
            <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="media/images/letterlogo.png"
            alt="Synthesis Logo"
            style={{ width: "200px", objectFit: "contain" }}
          />
        </a>
            <p className="mt-3" style={{ opacity: "0.6", fontSize: "0.9rem" }}>
              &copy; 2026 Synthesis Financial Technologies. <br />
              All rights reserved.
            </p>
          </div>

 
          <div className="col-lg-3 mb-4">
            <p style={headerStyle}>Company</p>
            <a href="/about" style={linkStyle}>About</a><br />
            <a href="/careers" style={linkStyle}>Careers</a><br />
            <a href="/press" style={linkStyle}>Press</a><br />
          </div>


          <div className="col-lg-3 mb-4">
            <p style={headerStyle}>Support</p>
            <a href="/contact" style={linkStyle}>Contact</a><br />
            <a href="/docs" style={linkStyle}>Documentation</a><br />
            <a href="/status" style={linkStyle}>System Status</a><br />
          </div>

    
          <div className="col-lg-3 mb-4">
            <p style={headerStyle}>Account</p>
            <a href="/signup" style={linkStyle}>Open an account</a><br />
            <a href="/login" style={linkStyle}>Login</a><br />
          </div>
        </div>

        <div className="mt-5 pt-4 border-top" style={{ fontSize: "12px", color: "#541A1A", opacity: "0.5" }}>
          <p>
            Synthesis Financial Technologies is a technology-first platform. Investments in the securities market are subject to market risks; 
            read all related documents carefully before investing. 
          </p>
          <p>
            Please ensure you carefully read the Risk Disclosure Document as prescribed by regulatory authorities. 
            Synthesis does not provide investment advice or stock tips. 
          </p>
          <p>
            Registered Address: Synthesis Financial Technologies, [Insert Your Address], [Insert City], [Insert State]. 
            For compliance and grievances, contact: compliance@synthesis.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;