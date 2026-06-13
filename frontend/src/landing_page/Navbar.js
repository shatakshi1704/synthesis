import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom py-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          {/* Adjust the width as needed depending on your exact image resolution */}
          <img
            src="media/images/fulllogo.png"
            alt="Synthesis Logo"
            style={{ width: "200px", objectFit: "contain" }}
          />
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4">
            <li className="nav-item">
              <a className="nav-link text-dark" href="/about" style={{ fontWeight: "500", transition: "color 0.2s" }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/product" style={{ fontWeight: "500", transition: "color 0.2s" }}>Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/pricing" style={{ fontWeight: "500", transition: "color 0.2s" }}>Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/support" style={{ fontWeight: "500", transition: "color 0.2s" }}>Support</a>
            </li>
            <li className="nav-item ms-3">
              <a 
                className="btn px-4 py-2" 
                href="/signup" 
                style={{ 
                  backgroundColor: "#810B38", 
                  color: "#FFFFFF", 
                  fontWeight: "600", 
                  borderRadius: "6px" 
                }}
              >
                Signup
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;