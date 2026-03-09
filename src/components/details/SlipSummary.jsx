export default function SlipSummary({ slip }) {

  const result = slip.result;

  const isOpen = !result;

  function getStatusClass() {

    if (result === "won") return "summary--won";
    if (result === "lost") return "summary--lost";
    if (result === "voided") return "summary--voided";

    return "summary--open";
  }

  function getStatusLabel() {

    if (!result) return "OPEN";

    if (result === "voided") return "VOIDED";

    return result.toUpperCase();
  }

  return (

    <div className={`details-summary ${getStatusClass()}`}>

      <div className="summary-top">

        <span className="summary-status">
          {getStatusLabel()}
        </span>

        <span className="summary-date">
          {new Date(slip.created_at).toLocaleString()}
        </span>

      </div>

      <div className="summary-grid">

        <div>
          <label>Stake</label>

          <strong>
            ₦{Number(slip.total_stake).toLocaleString()}
          </strong>
        </div>

        <div>
          <label>Total Odds</label>

          <strong>
            {Number(slip.total_odds).toFixed(2)}
          </strong>
        </div>

      </div>

      {/* POTENTIAL OR PAYOUT */}

      {isOpen ? (

        <div className="summary-payout-bar potential">

          <span>Potential Win</span>

          <strong>
            ₦{Number(slip.potential_payout).toLocaleString()}
          </strong>

        </div>

      ) : (

        <div className="summary-payout-bar payout">

          <span>
            {result === "voided" ? "Refund" : "Payout"}
          </span>

          <strong>
            ₦{Number(slip.payout).toLocaleString()}
          </strong>

        </div>

      )}

    </div>

  );
}
