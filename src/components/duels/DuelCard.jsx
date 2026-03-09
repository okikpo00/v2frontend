import { useNavigate } from "react-router-dom";

export default function DuelCard({ duel }) {

  const navigate = useNavigate();

  return (
    <div
      className="duel-card"
      onClick={() => navigate(`/duel/${duel.uuid}`)}
    >

      <div className="duel-header">

        <span>{duel.title}</span>

        <span className={`badge badge--${duel.result || duel.status}`}>
          {(duel.result || duel.status).toUpperCase()}
        </span>

      </div>

      <div className="duel-stake">

        <label>Stake</label>

        <strong>
          ₦{Number(duel.stake).toLocaleString()}
        </strong>

      </div>

      <div className="payout-bar">

        <span>
          {duel.result ? "Payout" : "Potential Win"}
        </span>

        <strong>
          ₦{Number(
            duel.result
              ? duel.payout
              : duel.potential_win
          ).toLocaleString()}
        </strong>

      </div>

    </div>
  );
}