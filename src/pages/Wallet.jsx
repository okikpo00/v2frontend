import { useEffect, useState } from "react";
import walletService from "../wallet/wallet.service";

import WalletBalanceCard from "../components/wallet/WalletBalanceCard";
import WalletActions from "../components/wallet/WalletActions";
import DepositList from "../components/wallet/DepositList";
import WithdrawalList from "../components/wallet/WithdrawalList";

import "../styles/wallet.css";
import "../components/wallet/withdraw.css";

export default function Wallet() {

  const [deposits, setDeposits] = useState([]);
  const [depCursor, setDepCursor] = useState(null);
  const [depLoading, setDepLoading] = useState(false);
  const [depHasMore, setDepHasMore] = useState(true);

  const [withdrawals, setWithdrawals] = useState([]);
  const [wdLoading, setWdLoading] = useState(false);

  /* =========================
     LOAD DEPOSITS
  ========================= */

  const loadDeposits = async (reset = false) => {

    if (depLoading) return;

    setDepLoading(true);

    try {

      const res = await walletService.listDeposits({
        cursor: reset ? null : depCursor
      });

      const items = res.data.data.items;
      const nextCursor = res.data.data.next_cursor;

      setDeposits(prev =>
        reset ? items : [...prev, ...items]
      );

      setDepCursor(nextCursor);
      setDepHasMore(Boolean(nextCursor));

    } finally {

      setDepLoading(false);

    }

  };

  /* =========================
     LOAD WITHDRAWALS
  ========================= */

  const loadWithdrawals = async () => {

    setWdLoading(true);

    try {

      const res = await walletService.listWithdrawals();
      setWithdrawals(res.data.data);

    } finally {

      setWdLoading(false);

    }

  };

  /* =========================
     REFRESH WALLET
  ========================= */

  const refreshWallet = () => {
    loadDeposits(true);
    loadWithdrawals();
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    refreshWallet();
  }, []);

  /* =========================
     REFRESH WHEN USER RETURNS
  ========================= */

  useEffect(() => {

    function handleFocus() {
      refreshWallet();
    }

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };

  }, []);

  return (

    <div className="wallet-page">

      <WalletBalanceCard />

      <WalletActions
        onSuccess={refreshWallet}
      />

      <DepositList
        items={deposits}
        loading={depLoading}
        hasMore={depHasMore}
        onLoadMore={loadDeposits}
      />

      <WithdrawalList
        items={withdrawals}
        loading={wdLoading}
        onRefresh={refreshWallet}
      />

    </div>

  );
}