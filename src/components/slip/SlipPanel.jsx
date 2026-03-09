import { useSlip } from "../../context/SlipContext";
import SlipEntryItem from "./SlipEntryItem";
import SlipConfirmSection from "./SlipConfirmSection";

export default function SlipPanel({ onClose }) {

  const { entries } = useSlip();

  return (
    <div
      className="slip-backdrop"
      onClick={onClose}
    >
      <div
        className="slip-panel"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="slip-header">
          <span>Your Slip</span>
          <button
            className="slip-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="slip-entry-list">
          {entries.map(e => (
            <SlipEntryItem
              key={e.question_id}
              entry={e}
            />
          ))}
        </div>

        <SlipConfirmSection onClose={onClose} />

      </div>
    </div>
  );
}