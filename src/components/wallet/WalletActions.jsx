import { useState } from "react";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { useAuth } from "../../auth/AuthProvider";

export default function WalletActions({ onSuccess }) {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { updateBalance } = useAuth();

  return (
    <>
      <div className="wallet-actions">
        <button
          className="btn btn-primary"
          onClick={() => setDepositOpen(true)}
        >
          Deposit
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => setWithdrawOpen(true)}
        >
          Withdraw
        </button>
      </div>

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        onSuccess={(amount) => {
          updateBalance(amount);     // ✅ instant
          onSuccess?.();
        }}
      />

      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        onSuccess={(amount) => {
          updateBalance(-amount);    // ✅ instant
          onSuccess?.();
        }}
      />
    </>
  );
}
