import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Logout = () => {
   
    removeCookie("token", { path: "/" });
    navigate("/");
  
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom py-3" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">

        <Link className="navbar-brand" to="/">
          <img src="media/images/fulllogo.png" alt="Synthesis Logo" style={{ width: "200px" }} />
        </Link>
        
    
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-4">
            <li className="nav-item"><Link className="nav-link text-dark" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/product">Product</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/pricing">Pricing</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/support">Support</Link></li>
            

            {cookies.token ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="https://synthesis-peach.vercel.app" style={{ fontWeight: "600" }}>Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="https://synthesis-peach.vercel.app/portfolio" style={{ fontWeight: "600" }}>Portfolio</a>
                </li>
                <li className="nav-item">
                  <button onClick={Logout} className="btn" style={{ backgroundColor: "#810B38", color: "#FFFFFF", borderRadius: "6px" }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn" to="/signup" style={{ backgroundColor: "#810B38", color: "#FFFFFF", borderRadius: "6px" }}>Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;