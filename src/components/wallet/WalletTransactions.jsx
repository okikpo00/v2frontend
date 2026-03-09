

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TransactionRow from "./TransactionRow";

export default function WalletTransactions({ items = [], loading }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="wallet-section">
      <button
        type="button"
        className="section-header"
        onClick={() => setOpen((v) => !v)}
      >
        <span>Recent Activity</span>
        <ChevronDown className={open ? "rotated" : ""} />
      </button>

      {open && (
        <div className="section-body">
          {loading && <p className="muted">Loading…</p>}

          {!loading && items.length === 0 && (
            <p className="muted">No activity yet.</p>
          )}

          {!loading &&
            items.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
        </div>
      )}
    </section>
  );
}