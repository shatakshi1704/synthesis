import React, { useContext, useState } from "react";
import { GeneralContext } from "./GeneralContext";

const OrderWindow = () => {
  const { selectedStock, actionType, closeBuyWindow } = useContext(GeneralContext);
  const [quantity, setQuantity] = useState(1);

  if (!selectedStock) return null;

  const price = parseFloat(selectedStock.price) || 0;
  const total = (quantity * price).toFixed(2);

  return (
    <div className="buy-window-overlay">
      <div className="buy-window">
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3>{actionType} {selectedStock.name}</h3>
          <button onClick={closeBuyWindow} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
        </div>

        <div className="inputs">
          <div className="input-group">
            <label>Qty.</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} 
            />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input type="text" value={price} readOnly />
          </div>
        </div>

        <p className="margin-info">
          {actionType === "BUY" ? "Margin required" : "Proceeds"}: ₹{total}
        </p>

        <div className="actions">
          <button 
            className={actionType === "BUY" ? "buy-btn" : "sell-btn"} 
            onClick={closeBuyWindow}
          >
            {actionType}
          </button>
          <button className="cancel-btn" onClick={closeBuyWindow}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default OrderWindow;