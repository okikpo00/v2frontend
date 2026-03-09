import { useNavigate } from "react-router-dom";

export default function CuratedCard({ slip }) {

  const navigate = useNavigate();

  return (
    <div
      className="call-card"
      onClick={() => navigate(`/slip/${slip.slip_uuid}`)}
    >

      <div className="call-card-header">

        <span>
          {slip.entries_count} Selection
        </span>

        <span className={`badge badge--${slip.result || "open"}`}>
          {(slip.result || "open").toUpperCase()}
        </span>

      </div>

      <div className="call-card-grid">

        <div>
          <label>Stake</label>
          <strong>₦{slip.total_stake}</strong>
        </div>

        <div>
          <label>Odds</label>
          <strong>{Number(slip.total_odds).toFixed(2)}</strong>
        </div>

      </div>

      <div className="payout-bar">

        <span>
          {slip.result ? "Payout" : "Potential"}
        </span>

        <strong>
          ₦{Number(
            slip.result
              ? slip.payout
              : slip.potential_payout
          ).toLocaleString()}
        </strong>

      </div>

    </div>
  );
}