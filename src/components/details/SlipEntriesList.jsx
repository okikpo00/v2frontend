import { Check, X, Ban, Circle } from "lucide-react";

export default function SlipEntriesList({ entries }) {

  function getResultIcon(status) {

    if (status === "won")
      return <Check size={18} className="entry-icon entry-icon--won" />;

    if (status === "lost")
      return <X size={18} className="entry-icon entry-icon--lost" />;

    if (status === "voided")
      return <Ban size={18} className="entry-icon entry-icon--voided" />;

    return <Circle size={14} className="entry-icon entry-icon--open" />;
  }

  function getStatusClass(status) {

    if (status === "won") return "entry--won";
    if (status === "lost") return "entry--lost";
    if (status === "voided") return "entry--voided";

    return "entry--open";
  }

  return (

    <div className="entries-list">

      {entries.map((entry, index) => (

        <div
          key={index}
          className={`entry ${getStatusClass(entry.status)}`}
        >

          <div className="entry-left">

            <div className="entry-title">
              {entry.title}
            </div>

            <div className="entry-meta">
              Pick: {entry.side.toUpperCase()} • Odds {Number(entry.odds).toFixed(2)}
            </div>

          </div>

          <div className="entry-result">
            {getResultIcon(entry.status)}
          </div>

        </div>

      ))}

    </div>

  );
}