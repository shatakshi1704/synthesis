import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyPortfolio.css";

const MyPortfolio = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ holdings: [], orders: [] });
  const [username, setUsername] = useState("USER");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, hRes, oRes] = await Promise.all([
          axios.get("http://localhost:3002/user/profile", { withCredentials: true }),
          axios.get("http://localhost:3002/allHoldings", { withCredentials: true }),
          axios.get("http://localhost:3002/allOrders", { withCredentials: true })
        ]);
        
        // Console log for debugging
        console.log("Profile Data from API:", profileRes.data);
        
        // Correct dynamic name assignment
        if (profileRes.data && profileRes.data.username) {
          setUsername(profileRes.data.username);
        }
        
        setData({ 
          holdings: hRes.data || [], 
          orders: oRes.data || [] 
        });
      } catch (err) { 
        console.error("Data Fetch Error:", err); 
      }
    };
    fetchData();
  }, []);

  return (
    <div className="custom-portfolio-container">
      {/* HEADER */}
      <div className="portfolio-header">
        <div className="title-section">
          <h2>{username.toUpperCase()}'S PREMIUM PORTFOLIO</h2>
          <span className="subtitle">Real-Time Wealth Dashboard</span>
        </div>
        <div className="header-actions no-print">
          <button className="download-btn" onClick={() => window.location.href = 'http://localhost:3000/'}>HOME</button>
          <button className="download-btn" onClick={() => navigate("/dashboard")}>DASHBOARD</button>
          <button className="download-btn" onClick={() => window.print()}>EXPORT REPORT</button>
          <div className="live-indicator"><div className="live-dot"></div> MARKET OPEN</div>
        </div>
      </div>

      {/* METRICS */}
      <div className="floating-metrics-row">
        <div className="floating-card"><span className="card-label">Total Net Worth</span><h3>₹12,85,450.00</h3></div>
        <div className="floating-card"><span className="card-label">Invested Capital</span><h3>₹10,50,000.00</h3></div>
        <div className="floating-card highlight-card"><span className="card-label">All-Time P&L</span><h3 className="profit">₹2,35,450.00</h3></div>
        <div className="floating-card highlight-card"><span className="card-label">Today's Returns</span><h3 className="profit">₹18,750.00</h3></div>
      </div>

      {/* DASHBOARD LAYOUT */}
      <div className="dashboard-layout">
        <div className="primary-column">
          <div className="clean-panel">
            <div className="panel-header"><h4>Performance Analytics</h4><span className="time-filter">1Y Trend</span></div>
            <div className="charts-grid">
              <div className="chart-box"><span className="chart-title">Asset Allocation</span><div className="chart-placeholder">[ Pie Chart Engine ]</div></div>
              <div className="chart-box"><span className="chart-title">Portfolio Growth</span><div className="chart-placeholder">[ Line Graph Engine ]</div></div>
            </div>
          </div>
          <div className="clean-panel">
            <h4>Synthesis Alpha Intelligence</h4>
            <div className="news-list" style={{marginTop: '20px'}}>
               <div className="news-row"><div className="news-accent"></div><div><h5>HDFC Bank Institutional Buying</h5><p>Volume algorithms indicate accumulation patterns.</p></div></div>
               <div className="news-row"><div className="news-accent"></div><div><h5>IT Sector Rotation</h5><p>Capital flowing into INFY following breakout signals.</p></div></div>
            </div>
          </div>
        </div>

        <div className="secondary-column">
          <div className="clean-panel">
            <h4>Core Positions</h4>
            <div className="holdings-list">
              {data.holdings.length > 0 ? data.holdings.map((h, i) => (
                <div key={i} className="holding-list-item">
                  <div className="h-left"><span className="h-ticker">{h.name}</span><span className="h-qty">{h.qty} Qty</span></div>
                  <div className="h-right"><span className="h-price">₹{h.price}</span><span className="h-pnl">{h.net || "+0.0%"}</span></div>
                </div>
              )) : <p style={{fontSize: '12px', color: '#94A3B8'}}>No holdings yet.</p>}
            </div>
          </div>

          <div className="clean-panel">
            <h4>Recent Orders</h4>
            <div className="orders-list">
              {data.orders.length > 0 ? data.orders.map((o, i) => (
                <div key={i} className="order-list-item">
                  <div className="o-left">
                    <span className={`o-type ${o.mode ? o.mode.toLowerCase() : ''}`}>{o.mode}</span>
                    <span className="o-ticker">{o.name}</span>
                  </div>
                  <div className="o-right">
                    <span className="o-price">₹{o.price}</span>
                    <span className="o-date">{o.date || "Today"}</span>
                  </div>
                </div>
              )) : <p style={{fontSize: '12px', color: '#94A3B8'}}>No recent orders.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPortfolio;