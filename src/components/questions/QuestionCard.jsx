import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSlip } from "../../context/SlipContext";

export default function QuestionCard({ q }) {

  const navigate = useNavigate();
  const { entries, addSelection } = useSlip();

  const selected = entries.find(e => e.question_id === q.id);

  const [remaining, setRemaining] = useState(null);

  /* =========================
     COUNTDOWN
  ========================= */

  useEffect(() => {

    if (!q.closes_at_unix) return;

    const lockTime = Number(q.closes_at_unix) * 1000;

    function update() {
      const diff = lockTime - Date.now();
      setRemaining(diff);
    }

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);

  }, [q.closes_at_unix]);

  /* =========================
     LOCK STATE
  ========================= */

  const locked =
    q.status === "locked" ||
    q.status === "settled" ||
    (remaining !== null && remaining <= 0);

  /* =========================
     SELECTION
  ========================= */

  function handleSelect(side) {
    if (locked) return;
    addSelection(q, side);
  }

  /* =========================
     COUNTDOWN FORMAT
  ========================= */

  function formatCountdown(ms) {

    if (ms === null || Number.isNaN(ms)) return "...";

    if (ms <= 0) return "LOCKED";

    const total = Math.floor(ms / 1000);

    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);

    return `${h}h ${m}m`;
  }

  return (

    <div className={`question-card ${selected ? "selected" : ""} ${locked ? "locked" : ""}`}>

      <div className="question-header">

        <div className="question-title">
          {q.title}
        </div>

        <div className={`countdown ${locked ? "locked" : ""}`}>
          {formatCountdown(remaining)}
        </div>

      </div>

      <div className="question-actions">

        <button
          className={`yes-btn ${selected?.side === "yes" ? "active" : ""}`}
          onClick={() => handleSelect("yes")}
          disabled={locked}
        >
          YES <strong>{Number(q.yes_odds).toFixed(2)}</strong>
        </button>

        <button
          className={`no-btn ${selected?.side === "no" ? "active" : ""}`}
          onClick={() => handleSelect("no")}
          disabled={locked}
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