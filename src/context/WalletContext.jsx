import React, { createContext, useState, useEffect } from "react";
import walletService from "../wallet/wallet.service";

export const WalletContext = createContext({
  refreshWallet: () => {}
});

export function WalletProvider({ children }) {

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshWallet = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <WalletContext.Provider
      value={{ refreshKey, refreshWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}