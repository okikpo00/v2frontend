import { useSlip } from "../../context/SlipContext";

export default function SlipEntryItem({ entry }) {

  const { removeSelection } = useSlip();

  return (
    <div className="slip-entry">

      <div>
        <div className="slip-entry-title">
          {entry.title}
        </div>
        <div className={`side ${entry.side}`}>
          {entry.side.toUpperCase()}
        </div>
      </div>

      <div className="slip-entry-right">
        <span>{entry.odds.toFixed(2)}</span>
        <button
          onClick={() => removeSelection(entry.question_id)}
        >
          ✕
        </button>
      </div>

    </div>
  );
}