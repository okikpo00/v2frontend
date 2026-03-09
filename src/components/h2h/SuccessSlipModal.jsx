import DuelSlip from "./DuelSlip";

export default function SuccessSlipModal({ data, onClose }) {

  return (
    <div className="duel-slip-backdrop">

      <div className="duel-slip-modal">

        <DuelSlip data={data} />

        <button
          className="duel-slip-close"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}