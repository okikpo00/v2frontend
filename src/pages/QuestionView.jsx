import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useSlip } from "../context/SlipContext";
import "../styles/question-view.css";

function formatCountdown(ms) {
  if (!ms || ms <= 0) return "Locked";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function QuestionView() {
  const { uuid } = useParams();

  const { entries, addSelection, removeSelection } = useSlip();

  const [question, setQuestion] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     FETCH QUESTION
  ========================= */
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await api.get(`/curated/questions/${uuid}`);
        if (!mounted) return;

        setQuestion(res.data.data);
      } catch {
        if (!mounted) return;
        setError("Unable to load question");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [uuid]);

  /* =========================
     COUNTDOWN
  ========================= */
  useEffect(() => {
    if (!question?.lock_time) return;

    const lockMs = new Date(question.lock_time).getTime();

    const interval = setInterval(() => {
      const diff = lockMs - Date.now();
      setRemaining(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  const locked =
    question?.status !== "published" || remaining <= 0;

  /* =========================
     SLIP SYNC
  ========================= */
  const existing = useMemo(() => {
    if (!question) return null;
    return entries.find(e => e.question_id === question.id);
  }, [entries, question]);

  function handleSelect(side) {
    if (locked) return;

    if (existing && existing.side === side) {
      removeSelection(question.id);
    } else {
      addSelection(question, side);
    }
  }

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <div className="question-view-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="question-view-error">
        {error || "Question not found"}
      </div>
    );
  }

  return (
    <div className="question-view">

      {/* TOP INFO ROW */}
      <div className="qv-top-row">
        <div className="qv-category">
          {question.category}
        </div>

        <div className={`qv-countdown ${locked ? "locked" : ""}`}>
          {formatCountdown(remaining)}
        </div>
      </div>

      {/* TITLE */}
      <h1 className="qv-title">
        {question.title}
      </h1>

      {/* COMBO SECTION */}
      {question.is_combo === 1 && (
        <div className="qv-combo-section">

          <div className="qv-combo-header">
            🔥 {question.combo_count}-Leg Combo Market
          </div>

          <div className="qv-combo-sub">
            All listed matches are evaluated together.
          </div>

          <div className="qv-combo-list">
            {question.combo_items?.map(item => (
              <div key={item.id} className="qv-combo-item">
                • {item.label}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* DESCRIPTION */}
      {question.description && (
        <div className="qv-description">
          {question.description}
        </div>
      )}

      {/* YES CARD */}
      <div
        className={`qv-card yes 
          ${existing?.side === "yes" ? "selected" : ""}
          ${locked ? "disabled" : ""}
        `}
        onClick={() => handleSelect("yes")}
      >
        <div className="qv-card-left">
          <div className="qv-card-label">YES</div>
          <div className="qv-card-sub">
            You believe this condition will happen
          </div>
        </div>

        <div className="qv-card-odds">
          {Number(question.yes_odds).toFixed(2)}
        </div>
      </div>

      {/* NO CARD */}
      <div
        className={`qv-card no 
          ${existing?.side === "no" ? "selected" : ""}
          ${locked ? "disabled" : ""}
        `}
        onClick={() => handleSelect("no")}
      >
        <div className="qv-card-left">
          <div className="qv-card-label">NO</div>
          <div className="qv-card-sub">
            You believe this condition will not happen
          </div>
        </div>

        <div className="qv-card-odds">
          {Number(question.no_odds).toFixed(2)}
        </div>
      </div>

      {/* META */}
      <div className="qv-meta">
        <div><strong>Status:</strong> {question.status}</div>
        <div>
          <strong>Locks:</strong>{" "}
          {new Date(question.lock_time).toLocaleString()}
        </div>
      </div>

    </div>
  );
}