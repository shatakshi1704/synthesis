import React, { useState, useEffect } from "react";
import API from "../api"; // 🔥 Import the API instance

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // 🔥 Ab axios ki jagah API.get use karenge
    API.get("/allPositions")
      .then((res) => {
        setPositions(res.data);
      })
      .catch((err) => console.error("Positions Fetch Error:", err));
  }, []);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - (stock.avg * stock.qty) >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.day.startsWith("-") ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{parseFloat(stock.avg).toFixed(2)}</td>
                  <td>{parseFloat(stock.price).toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - (stock.avg * stock.qty)).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;