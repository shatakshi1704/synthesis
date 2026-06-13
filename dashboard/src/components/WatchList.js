import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const labels = filteredWatchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [{
      label: "Price",
      data: filteredWatchlist.map((stock) => stock.price),
      backgroundColor: [
        "rgba(129, 11, 56, 0.7)",
        "rgba(84, 26, 26, 0.7)",
        "rgba(241, 226, 209, 0.7)",
      ],
      borderColor: ["#810B38", "#541A1A", "#DCC3AA"],
      borderWidth: 1,
    }],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {/* Yeh chart ab list ke niche fixed rahega */}
      <div className="doughnut-chart-container" style={{ marginTop: "20px" }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);
  const stockColor = stock.isDown ? { color: "rgb(250, 118, 78)" } : { color: "rgb(72, 194, 55)" };

  return (
    <li onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      <div className="item">
        <p style={stockColor}>{stock.name}</p>
        <div className="item-info">
          <span style={stockColor}>{stock.percent}</span>
          {stock.isDown ? <KeyboardArrowDown style={stockColor} /> : <KeyboardArrowUp style={stockColor} />}
          <span style={stockColor}>{stock.price}</span>
        </div>
      </div>
      {showActions && <WatchListActions stock={stock} />}
    </li>
  );
};

const WatchListActions = ({ stock }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);
  
  return (
    <span className="actions">
      <Tooltip title="Buy (B)" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => openBuyWindow(stock)} style={{ padding: "8px 16px", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}>Buy</button>
      </Tooltip>
      <Tooltip title="Sell (S)" arrow TransitionComponent={Grow}>
        <button className="sell" onClick={() => openSellWindow(stock)} style={{ padding: "8px 16px", fontSize: "0.9rem", fontWeight: "600", cursor: "pointer" }}>Sell</button>
      </Tooltip>
    </span>
  );
};

export default WatchList;