import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSlip } from "../../context/SlipContext";

export default function QuestionCard({ q }) {

  const navigate = useNavigate();
  const { entries, addSelection } = useSlip();

  const selected = entries.find(
    e => e.question_id === q.id
  );

  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!q.closes_at_unix || !q.server_time)
      return;

    const startRemaining =
      q.closes_at_unix * 1000 -
      new Date(q.server_time).getTime();

    const startClient = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startClient;
      setRemaining(startRemaining - elapsed);
    }, 1000);

    return () => clearInterval(interval);

  }, [q.closes_at_unix, q.server_time]);

  const closed = remaining <= 0;

  function handleSelect(side) {
    if (closed) return;
    addSelection(q, side);
  }

  function formatCountdown(ms) {
    if (!ms || ms <= 0) return "Closed";
    const total = Math.floor(ms / 1000);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    return `${h}h ${m}m`;
  }

  return (
    <div className={`question-card ${selected ? "selected" : ""}`}>

      <div className="question-header">
        <div className="question-title">
          {q.title}
        </div>

        <div className={`countdown ${closed ? "closed" : ""}`}>
          {formatCountdown(remaining)}
        </div>
      </div>

      <div className="question-actions">

        <button
          className={`yes-btn ${selected?.side === "yes" ? "active" : ""}`}
          onClick={() => handleSelect("yes")}
          disabled={closed}
        >
          YES <strong>{Number(q.yes_odds).toFixed(2)}</strong>
        </button>

        <button
          className={`no-btn ${selected?.side === "no" ? "active" : ""}`}
          onClick={() => handleSelect("no")}
          disabled={closed}
        >
          NO <strong>{Number(q.no_odds).toFixed(2)}</strong>
        </button>

        <button
          className="view-btn"
          onClick={() => navigate(`/questions/${q.uuid}`)}
        >
          VIEW
        </button>

      </div>

    </div>
  );
}