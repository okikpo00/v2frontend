import { useState } from "react";
import WithdrawalRow from "./WithdrawalRow";
import { ChevronDown } from "lucide-react";

export default function WithdrawalList({ items, loading, onRefresh }) {
  const [open, setOpen] = useState(false);

  // 🔒 HIDE otp_pending FROM UI
  const visibleWithdrawals = items.filter(
    (w) => w.status !== "otp_pending"
  );

  return (
    <section className="wallet-section">
      <button
        className="section-header"
        onClick={() => setOpen((v) => !v)}
      >
        <span>Withdrawals</span>
        <ChevronDown className={open ? "rotated" : ""} />
      </button>

      {open && (
        <div className="section-body">
          {loading && <p className="muted">Loading…</p>}

          {!loading && visibleWithdrawals.length === 0 && (
            <p className="muted">No withdrawals yet.</p>
          )}

          {visibleWithdrawals.map((w) => (
            <WithdrawalRow
              key={w.uuid}
              withdrawal={w}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </section>
  );
}