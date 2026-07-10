import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Menu = () => {
  const [username, setUsername] = useState("USER");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/profile"); 
        if (res.data.username) setUsername(res.data.username.toUpperCase());
      } catch (err) { console.error("Profile fetch error:", err); }
    };
    fetchUser();
  }, []);

  const styles = {
    navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 50px", background: "#ffffff", borderBottom: "1px solid #f0f0f0" },
    rightSection: { display: "flex", alignItems: "center", gap: "30px" },
    link: { textDecoration: "none", color: "#800020", fontWeight: "600", fontSize: "15px" },
    profile: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" },
    avatar: { background: "#fde6e6", color: "#800020", width: "35px", height: "35px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" },
    brand: { color: "#800020", margin: 0, letterSpacing: "2px" }
  };

  return (
    <div style={styles.navbar}>

      <div style={styles.rightSection}>
        <a href="https://synthesis-mmdv.vercel.app/" style={styles.link}>Home</a>
        <Link to="/portfolio" style={styles.link}>Portfolio</Link>
        
        <div style={styles.profile}>
          <div style={styles.avatar}>{username.slice(0, 2)}</div>
          <p style={{margin: 0, fontWeight: "500"}}>{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;