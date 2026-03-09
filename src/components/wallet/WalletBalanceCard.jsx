import { useAuth } from "../../auth/AuthProvider";

export default function WalletBalanceCard() {
  const { balance } = useAuth();

  return (
    <div className="wallet-balance-card">
      <p className="wallet-label">Available balance</p>
      <h1 className="wallet-amount">
        ₦{Number(balance || 0).toLocaleString()}
      </h1>
    </div>
  );
}

