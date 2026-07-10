import React, { useContext, useState } from "react";
import { GeneralContext } from "./GeneralContext";
import API from "../api"; 
import "./OrderWindow.css";

const OrderWindow = () => {
  const { selectedStock, actionType, closeBuyWindow } = useContext(GeneralContext);
  const [quantity, setQuantity] = useState(1);

  if (!selectedStock) return null;

  const price = parseFloat(selectedStock.price) || 0;
  const total = (quantity * price).toFixed(2);

  const handleOrder = async () => {
    try {
      await API.post("/newOrder", {
        name: selectedStock.name,
        qty: quantity,
        price: price,
        mode: actionType
      });
      
      alert(`${actionType} order successful!`);
      closeBuyWindow();
      window.location.reload(); 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Order failed! Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="regular-order">
        <div className="header">
          <h3>{actionType} {selectedStock.name}</h3>
        </div>
        
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input type="text" value={price} readOnly />
          </fieldset>
        </div>

        <div className="buttons">
          <span>{actionType === "BUY" ? "Margin required" : "Proceeds"}: ₹{total}</span>
          <div>
            <button className="btn btn-buy" onClick={handleOrder}>{actionType}</button>
            <button className="btn btn-cancel" onClick={closeBuyWindow}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWindow;