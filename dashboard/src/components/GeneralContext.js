import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [actionType, setActionType] = useState("BUY");

  const openBuyWindow = (stock) => {
    setSelectedStock(stock);
    setActionType("BUY");
    setIsBuyWindowOpen(true);
  };

  const openSellWindow = (stock) => {
    setSelectedStock(stock);
    setActionType("SELL");
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        selectedStock,
        isBuyWindowOpen,
        actionType,
        openBuyWindow,
        openSellWindow,
        closeBuyWindow,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;