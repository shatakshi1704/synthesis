import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { GeneralContext, GeneralContextProvider } from "./GeneralContext";

import Welcome from "./Welcome";
import Apps from "./Apps";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import WatchList from "./WatchList";
import OrderWindow from "./OrderWindow";

const DashboardWrapper = () => {
  const { isBuyWindowOpen } = useContext(GeneralContext);
  return (
    <div className="dashboard-container">
      <WatchList />
      <div className="content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          {/* <Route path="/apps" element={<Apps />} /> */}
        </Routes>
      </div>
      {isBuyWindowOpen && <OrderWindow />}
    </div>
  );
};

const Dashboard = () => (
  <GeneralContextProvider>
    <DashboardWrapper />
  </GeneralContextProvider>
);

export default Dashboard;