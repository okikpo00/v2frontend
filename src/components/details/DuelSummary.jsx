export default function DuelSummary({ duel }) {
  const result = duel.result;
  const isOpen = !result;

  const statusClass =
    result === "won"
      ? "summary--won"
      : result === "lost"
      ? "summary--lost"
      : result === "voided"
      ? "summary--void"
      : "summary--open";

  const statusLabel = result
    ? result
    : duel.status;

  return (
    <div className={`details-summary ${statusClass}`}>
      <div className="summary-top">
        <span className="summary-status">
          {statusLabel.toUpperCase()}
        </span>

        <span className="summary-date">
          {new Date(
            duel.created_at
          ).toLocaleString()}
        </span>
      </div>

      <div className="summary-grid">
        <div>
          <label>Stake</label>

          <strong>
            ₦{Number(duel.stake).toLocaleString()}
          </strong>
        </div>
      </div>

      {isOpen ? (
        <div className="summary-payout-bar potential">
          <span>Potential Win</span>

          <strong>
            ₦{Number(
              duel.potential_win
            ).toLocaleString()}
          </strong>
        </div>
      ) : (
        <div className="summary-payout-bar payout">
          <span>Payout</span>

          <strong>
            ₦{Number(
              duel.payout
            ).toLocaleString()}
          </strong>
        </div>
      )}
    </div>
  );
}