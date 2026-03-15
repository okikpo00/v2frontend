import { useEffect, useState } from "react";
import walletService from "../../wallet/wallet.service";
import DepositRow from "./DepositRow";

export default function DepositList() {

  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* COLLAPSE STATE */
  const [open, setOpen] = useState(false);

  const load = async (reset = false) => {

    if (loading) return;

    setLoading(true);

    try {

      const res = await walletService.listDeposits({
        cursor: reset ? null : cursor
      });

      const { items: data, next_cursor } = res.data.data;

      setItems(prev => (reset ? data : [...prev, ...data]));

      setCursor(next_cursor);

      setHasMore(Boolean(next_cursor));

    } finally {

      setLoading(false);

    }

  };

  /* INITIAL LOAD */

  useEffect(() => {
    load(true);
  }, []);

  return (

    <div className="wallet-section">

      {/* HEADER (COLLAPSIBLE) */}

      <div
        className="wallet-section-header"
        onClick={() => setOpen(v => !v)}
      >

        <h3>Deposits</h3>

        <span className={`wallet-collapse-icon ${open ? "open" : ""}`}>
          ▾
        </span>

      </div>


      {/* BODY */}

      {open && (

        <div className="wallet-section-body">

          {items.length === 0 && !loading && (
            <p className="wallet-empty">
              No deposits yet.
            </p>
          )}

          {items.map(d => (
            <DepositRow key={d.id} deposit={d} />
          ))}

          {hasMore && (
            <button
              className="btn btn-ghost"
              onClick={() => load(false)}
              disabled={loading}
            >
              {loading ? "Loading…" : "Load more"}
            </button>
          )}

        </div>

      )}

    </div>

  );

}