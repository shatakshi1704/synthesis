import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AlphaIntel.css"; 

const AlphaIntel = () => {
  const [intelData, setIntelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        // Tumhara live Render backend URL
        const response = await axios.get("https://synthesis-backend.onrender.com/api/alpha-intel");
        setIntelData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching intel:", error);
        setLoading(false);
      }
    };

    fetchIntel();
    
    // Har 30 seconds mein background mein naya data check karega
    const interval = setInterval(fetchIntel, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alpha-intel-container">
      <div className="intel-header">
        <h2>🧠 Alpha Intel Live</h2>
        <span className="live-indicator">● LIVE</span>
      </div>
      
      <div className="intel-list">
        {loading ? (
          <p className="loading-text">Loading AI Analysis...</p>
        ) : intelData.length === 0 ? (
          <p className="loading-text">No Intel available. Go read some news!</p>
        ) : (
          intelData.map((intel) => (
            <div key={intel._id} className="intel-card">
              <a href={intel.url} target="_blank" rel="noopener noreferrer" className="intel-title">
                {intel.title}
              </a>
              <p className="intel-snippet">{intel.snippet}</p>
              
              <div className="intel-footer">
                <span className="intel-source">{intel.source}</span>
                <span className={`sentiment-badge ${intel.sentiment.toLowerCase()}`}>
                  {intel.sentiment === "BULLISH" ? "🚀 " : intel.sentiment === "BEARISH" ? "📉 " : "⚖️ "}
                  {intel.sentiment}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlphaIntel;