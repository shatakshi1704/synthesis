import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Refresh, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allStocks, setAllStocks] = useState([]);
  
  // Context functions directly yahan access karo
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3002/allWatchlist", { withCredentials: true });
      setAllStocks(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = async () => {
    try {
      await axios.get("http://localhost:3002/refreshWatchlist", { withCredentials: true });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const filtered = allStocks.filter((s) => s.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  const data = {
    labels: filtered.map((s) => s.name),
    datasets: [{
      data: filtered.map((s) => s.price),
      backgroundColor: ["#810B38", "#541A1A", "#DCC3AA"],
      borderWidth: 0,
    }],
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h4 style={{ margin: 0, color: "#333" }}>Market Watch</h4>
        <Refresh onClick={handleRefresh} style={{ cursor: "pointer", color: "#666" }} />
      </div>

      <input 
        placeholder="Search stocks..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} 
      />

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {filtered.map((stock, i) => (
          <WatchListItem 
            key={i} 
            stock={stock} 
            onBuy={() => openBuyWindow(stock)} 
            onSell={() => openSellWindow(stock)} 
          />
        ))}
      </ul>

      <div style={{ marginTop: "30px" }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

const WatchListItem = ({ stock, onBuy, onSell }) => {
  const [show, setShow] = useState(false);
  const color = stock.isDown ? "#d32f2f" : "#388e3c";

  return (
    <li 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)} 
      style={{ padding: "12px 0", borderBottom: "1px solid #eee", position: "relative" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: "600", fontSize: "14px", color: color }}>{stock.name}</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: color }}>
          <span style={{ fontWeight: "500" }}>{stock.percent}</span>
          {stock.isDown ? <KeyboardArrowDown style={{ fontSize: "16px" }}/> : <KeyboardArrowUp style={{ fontSize: "16px" }}/>}
          <span style={{ color: "#333", fontWeight: "600" }}>₹{stock.price}</span>
        </div>
      </div>
      
      {show && (
        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
          <button onClick={onBuy} style={{ background: "#e3f2fd", color: "#1976d2", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>BUY</button>
          <button onClick={onSell} style={{ background: "#ffebee", color: "#d32f2f", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}>SELL</button>
        </div>
      )}
    </li>
  );
};

export default WatchList;