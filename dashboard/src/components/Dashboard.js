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
  const { isBuyWindowOpen } = useContext(GeneralContext);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div style={{ flex: "0 0 40%", borderRight: "1px solid #eee" }}>
        <WatchList />
      </div>
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        {isBuyWindowOpen && <OrderWindow />}  
      </div>
    </div>
  );
};

const Dashboard = () => (
  <GeneralContextProvider>
    <DashboardWrapper />
  </GeneralContextProvider>
);

export default Dashboard;