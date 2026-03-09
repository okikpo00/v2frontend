import { useState } from "react";
import WithdrawalStatusBadge from "./WithdrawalStatusBadge";
import walletService from "../../wallet/wallet.service";
import ConfirmModal from "../ConfirmModal";

const CAN_CANCEL = ["otp_pending", "pending_admin"];

function maskAccount(num) {
  return num.slice(0, 3) + "****" + num.slice(-3);
}

export default function WithdrawalRow({ withdrawal, onRefresh }) {
  const canCancel = CAN_CANCEL.includes(withdrawal.status);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancel = async () => {
    setLoading(true);
    try {
      await walletService.cancelWithdrawal(withdrawal.uuid);
      onRefresh();
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="withdraw-row">
        <div>
          <strong>₦{withdrawal.amount.toLocaleString()}</strong>

          <div className="muted">
            {withdrawal.bank_name} ·{" "}
            {maskAccount(withdrawal.account_number)}
          </div>

          <div className="muted">
            {new Date(withdrawal.created_at).toLocaleString()}
          </div>
        </div>

        <div className="withdraw-actions">
          <WithdrawalStatusBadge status={withdrawal.status} />

          {canCancel && (
            <button
              className="btn btn-ghost"
              onClick={() => setConfirmOpen(true)}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        title="Cancel withdrawal?"
        message="This will unlock your funds and stop the withdrawal request."
        confirmText="Yes, cancel"
        danger
        loading={loading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={cancel}
      />
    </>
  );
}