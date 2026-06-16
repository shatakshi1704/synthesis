import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      height: "60px", 
      padding: "0 20px", 
      borderBottom: "1px solid #eee" 
    }}>
      {/* gap ko 20px se badhakar 40px ya jitna chahiye utna karo */}
      <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ fontWeight: "bold" }}>NIFTY 50</span>
          <span>100.2</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ fontWeight: "bold" }}>SENSEX</span>
          <span>100.2</span>
        </div>
      </div>
      <Menu />
    </div>
  );
};
export default TopBar;