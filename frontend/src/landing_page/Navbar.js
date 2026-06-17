import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom py-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="media/images/fulllogo.png" alt="Synthesis Logo" style={{ width: "200px" }} />
        </Link>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4">
            <li className="nav-item"><Link className="nav-link text-dark" to="/about">About</Link></li>
            
            {/* Conditional Rendering logic */}
            {cookies.token ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="https://synthesis-peach.vercel.app" style={{ fontWeight: "600" }}>Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="https://synthesis-peach.vercel.app/portfolio" style={{ fontWeight: "600" }}>Portfolio</a>
                </li>
                <li className="nav-item">
                  <button onClick={Logout} className="btn" style={{ backgroundColor: "#810B38", color: "#FFFFFF" }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn" to="/signup" style={{ backgroundColor: "#810B38", color: "#FFFFFF" }}>Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;