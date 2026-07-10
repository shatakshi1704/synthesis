import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { GeneralContext, GeneralContextProvider } from "./GeneralContext";
import TopBar from "./TopBar";
import WatchList from "./WatchList";
import Welcome from "./Welcome";
import Apps from "./Apps";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import OrderWindow from "./OrderWindow";
import PortfolioAssistant from './PortfolioAssistant';

const DashboardWrapper = () => {
  // 1. Context se state lo
  const { isBuyWindowOpen } = useContext(GeneralContext);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ flex: "0 0 40%", borderRight: "1px solid #eee" }}>
        <WatchList />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        
        {/* 2. Window ko yahan render karo (Jab open ho tabhi dikhe) */}
        {isBuyWindowOpen && <OrderWindow />}
        
      </div>
      {/* <PortfolioAssistant /> */}
    </div>
  );
};

const Dashboard = () => (
  <GeneralContextProvider>
    <DashboardWrapper />
  </GeneralContextProvider>
);

export default Dashboard;