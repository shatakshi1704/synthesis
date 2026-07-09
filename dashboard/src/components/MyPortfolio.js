import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; 
import axios from "axios"; 
import { PieChart, Pie, Cell, LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import "./MyPortfolio.css";
import html2canvas from 'html2canvas';

const MyPortfolio = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ holdings: [], orders: [] });
  const [username, setUsername] = useState("USER");
  
  // AI Intel states
  const [intelData, setIntelData] = useState([]);
  const [loadingIntel, setLoadingIntel] = useState(true);
  
  const burgundyPalette = ['#800020', '#A52A2A', '#BC4A3C', '#E34234'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, hRes, oRes] = await Promise.all([
          API.get("/user/profile"),
          API.get("/allHoldings"),
          API.get("/allOrders")
        ]);
        if (profileRes.data?.username) setUsername(profileRes.data.username);
        setData({ holdings: hRes.data || [], orders: oRes.data || [] });
      } catch (err) { console.error("Data Fetch Error:", err); }
    };
    fetchData();
  }, []);

  // Alpha Intel Fetch
  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const response = await axios.get("https://synthesis-backend.onrender.com/api/alpha-intel");
        // 🔥 Changed slice to 15
        setIntelData(response.data.slice(0, 15)); 
        setLoadingIntel(false);
      } catch (error) {
        console.error("Error fetching intel:", error);
        setLoadingIntel(false);
      }
    };

    fetchIntel();
    const interval = setInterval(fetchIntel, 30000); 
    return () => clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    if (!data.holdings || data.holdings.length === 0) 
      return { totalInvested: 0, totalPL: 0, netWorth: 0, todaysReturns: 0 };

    const totalInvested = data.holdings.reduce((acc, h) => acc + (parseFloat(h.avg || 0) * parseFloat(h.qty || 0)), 0);
    const totalCurrentValue = data.holdings.reduce((acc, h) => acc + (parseFloat(h.price || 0) * parseFloat(h.qty || 0)), 0);
    
    const now = new Date();
    const todaysReturns = data.orders.reduce((acc, o) => {
      const orderDate = new Date(o.date);
      const isSameDay = orderDate.getDate() === now.getDate() && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      return isSameDay ? acc + (parseFloat(o.price || 0) * parseFloat(o.qty || 0)) : acc;
    }, 0);

    return { totalInvested, totalPL: totalCurrentValue - totalInvested, netWorth: totalCurrentValue, todaysReturns };
  }, [data.holdings, data.orders]);

  const handlePrint = async () => {
    const charts = document.querySelectorAll('.chart-box');
    for (let chart of charts) {
      const canvas = await html2canvas(chart);
      chart.innerHTML = `<img src="${canvas.toDataURL()}" style="width:100%" />`;
    }
    window.print();
    window.location.reload();
  };

  return (
    <div className="custom-portfolio-container">
      <div className="portfolio-header">
        <div className="title-section">
          <h2>{username.toUpperCase()}'S PREMIUM PORTFOLIO</h2>
          <span className="subtitle">Real-Time Wealth Dashboard</span>
        </div>
        <div className="header-actions no-print">
          <button className="download-btn" onClick={() => window.location.href = 'https://synthesis-mmdv.vercel.app'}>HOME</button>
          <button className="download-btn" onClick={() => navigate("/dashboard")}>DASHBOARD</button>
          <button className="download-btn" onClick={handlePrint}>EXPORT REPORT</button>
          <div className="live-indicator"><div className="live-dot"></div> MARKET OPEN</div>
        </div>
      </div>

      <div className="floating-metrics-row">
        <div className="floating-card"><span className="card-label">Total Net Worth</span><h3>₹{metrics.netWorth.toLocaleString()}</h3></div>
        <div className="floating-card"><span className="card-label">Invested Capital</span><h3>₹{metrics.totalInvested.toLocaleString()}</h3></div>
        <div className="floating-card highlight-card"><span className="card-label">All-Time P&L</span><h3 className={metrics.totalPL >= 0 ? "profit" : "loss"}>₹{metrics.totalPL.toLocaleString()}</h3></div>
        <div className="floating-card highlight-card"><span className="card-label">Today's Returns</span><h3 className="profit">₹{metrics.todaysReturns.toLocaleString()}</h3></div>
      </div>

      <div className="dashboard-layout">
        <div className="primary-column">
          <div className="clean-panel">
            <div className="panel-header"><h4>Performance Analytics</h4><span className="time-filter">1Y Trend</span></div>
            <div className="charts-grid">
              <div className="chart-box" style={{ width: "100%", height: "150px" }}>
                <span className="chart-title">Asset Allocation</span>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.holdings} dataKey="qty" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                      {data.holdings.map((entry, index) => <Cell key={index} fill={burgundyPalette[index % burgundyPalette.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-box" style={{ width: "100%", height: "150px" }}>
                <span className="chart-title">Portfolio Growth</span>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.holdings}>
                    <XAxis dataKey="name" hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#800020" strokeWidth={3} dot={{r: 4, fill: '#800020'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="clean-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Synthesis Alpha Intelligence</h4>
              <span style={{ fontSize: '10px', color: '#ff4757', fontWeight: 'bold' }}>● LIVE AI</span>
            </div>
            
            {/* 🔥 Added maxHeight and overflowY for scrolling 15 items cleanly */}
            <div className="news-list" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
              {loadingIntel ? (
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Fetching live AI insights...</p>
              ) : intelData.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>No intelligence signals active right now.</p>
              ) : (
                intelData.map((intel) => {
                  let accentColor = '#800020'; 
                  let badgeBg = '#f1f3f4';
                  
                  if (intel.sentiment === "BULLISH") {
                    accentColor = '#137333';
                    badgeBg = '#e6f4ea';
                  } else if (intel.sentiment === "BEARISH") {
                    accentColor = '#c5221f';
                    badgeBg = '#fce8e6';
                  }

                  return (
                    <div key={intel._id} className="news-row" style={{ display: 'flex', gap: '15px', alignItems: 'stretch' }}>
                      <div className="news-accent" style={{ width: '4px', minHeight: '100%', backgroundColor: accentColor, borderRadius: '2px' }}></div>
                      <div style={{ flex: 1, paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                        
                        {/* 🔥 Added proper Sentiment Badge next to the title */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                          <h5 style={{ margin: '0', fontSize: '13px', lineHeight: '1.4' }}>
                            <a href={intel.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1E293B' }}>
                              {intel.title}
                            </a>
                          </h5>
                          <span style={{ 
                            fontSize: '10px', 
                            padding: '3px 6px', 
                            borderRadius: '4px', 
                            backgroundColor: badgeBg,
                            color: accentColor,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                          }}>
                            {intel.sentiment === "BULLISH" ? "🚀 " : intel.sentiment === "BEARISH" ? "📉 " : "⚖️ "}
                            {intel.sentiment}
                          </span>
                        </div>

                        <p style={{ 
                          margin: 0, 
                          fontSize: '11px', 
                          color: '#64748B',
                          lineHeight: '1.5'
                        }}>
                          {intel.snippet}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="secondary-column">
          {/* Core Positions Panel */}
          <div className="clean-panel">
            <h4>Core Positions</h4>
            {/* 🔥 Added maxHeight and scroll to Holdings */}
            <div className="holdings-list" style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '8px' }}>
              {data.holdings.length > 0 ? data.holdings.map((h, i) => (
                <div key={i} className="holding-list-item">
                  <div className="h-left"><span className="h-ticker">{h.name}</span><span className="h-qty">{h.qty} Qty</span></div>
                  <div className="h-right"><span className="h-price">₹{h.price}</span><span className="h-pnl">{h.net || "+0.0%"}</span></div>
                </div>
              )) : <p style={{fontSize: '12px', color: '#94A3B8'}}>No holdings yet.</p>}
            </div>
          </div>

          {/* Recent Orders Panel */}
          <div className="clean-panel">
            <h4>Recent Orders</h4>
            {/* 🔥 Added maxHeight and scroll to Orders (Height set to match left column perfectly) */}
            <div className="orders-list" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
              {data.orders.length > 0 ? data.orders.map((o, i) => (
                <div key={i} className="order-list-item">
                  <div className="o-left"><span className={`o-type ${o.mode ? o.mode.toLowerCase() : ''}`}>{o.mode}</span><span className="o-ticker">{o.name}</span></div>
                  <div className="o-right"><span className="o-price">₹{o.price}</span><span className="o-date">{o.date || "Today"}</span></div>
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