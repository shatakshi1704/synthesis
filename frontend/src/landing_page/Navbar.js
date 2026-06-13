import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom py-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="media/images/fulllogo.png"
            alt="Synthesis Logo"
            style={{ width: "200px", objectFit: "contain" }}
          />
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4">
            <li className="nav-item"><Link className="nav-link text-dark" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/product">Product</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/pricing">Pricing</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/support">Support</Link></li>

            {/* Conditional Rendering logic */}
            {cookies.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="http://localhost:3001" style={{ fontWeight: "600" }}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/portfolio" style={{ fontWeight: "600" }}>Portfolio</Link>
                </li>
                <li className="nav-item ms-3">
                  <button 
                    onClick={Logout}
                    className="btn px-4 py-2" 
                    style={{ backgroundColor: "#810B38", color: "#FFFFFF", borderRadius: "6px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <Link 
                  className="btn px-4 py-2" 
                  to="/signup" 
                  style={{ backgroundColor: "#810B38", color: "#FFFFFF", fontWeight: "600", borderRadius: "6px" }}
                >
                  Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;