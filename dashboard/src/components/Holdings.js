import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    // 🔥 FIX 1: Added withCredentials so the backend knows WHO is asking
    axios.get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.error("Authentication error or server issue:", err);
      });
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(129, 11, 56, 0.7)",
      },
    ],
  };

  // 🔥 FIX 2: Dynamic Calculations for the Hero Section
  let totalInvestment = 0;
  let currentValue = 0;

  allHoldings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const totalPnL = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;
  const isOverallProfit = totalPnL >= 0;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 The Live Hero Section */}
      <div className="row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={isOverallProfit ? "profit" : "loss"}>
            ₹{Math.abs(totalPnL).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
            ({isOverallProfit ? "+" : ""}{pnlPercentage}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;