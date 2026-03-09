import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../ui/Tooltip";

/* =========================
   COUNTDOWN USING SERVER TIME
========================= */

function getRemainingMs(closesAtUnix, serverTimeISO) {

  if (!closesAtUnix || !serverTimeISO)
    return null;

  const serverMs =
    new Date(serverTimeISO).getTime();

  const closeMs =
    closesAtUnix * 1000;

  return closeMs - serverMs;
}


function formatCountdown(ms) {

  if (!ms || ms <= 0)
    return "Closed";

  const totalSeconds =
    Math.floor(ms / 1000);

  const days =
    Math.floor(totalSeconds / 86400);

  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );

  return `${days}d ${hours}h ${minutes}m`;
}


/* =========================
   COMPONENT
========================= */

export default function QuestionCard({
  q,
  onYes,
  onNo
}) {

  const navigate = useNavigate();

  const [remaining, setRemaining] =
    useState(() =>
      getRemainingMs(
        q.closes_at_unix,
        q.server_time
      )
    );


  useEffect(() => {

    if (!q.closes_at_unix ||
        !q.server_time)
      return;

    const startRemaining =
      getRemainingMs(
        q.closes_at_unix,
        q.server_time
      );

    const startClient =
      Date.now();

    const interval =
      setInterval(() => {

        const elapsed =
          Date.now() - startClient;

        const newRemaining =
          startRemaining - elapsed;

        setRemaining(newRemaining);

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [
    q.closes_at_unix,
    q.server_time
  ]);


  const closed =
    remaining <= 0;


  function handleView() {

    navigate(
      `/questions/${q.uuid}`
    );

  }


  return (

    <div className="question-card">

      {/* HEADER */}
      <div className="question-header">

        <div className="question-title">
          {q.title}
        </div>

        <Tooltip content="Time remaining before entries close">

          <div className={`question-countdown ${closed ? "closed" : ""}`}>

            {formatCountdown(remaining)}

          </div>

        </Tooltip>

      </div>


      {/* ACTION ROW */}
      <div className="question-actions">

        {/* YES */}
        <button
          className="trade-btn yes"
          disabled={closed}
          onClick={() => onYes?.(q)}
        >

          <span>YES</span>

          <strong>
            {Number(q.yes_odds).toFixed(2)}
          </strong>

        </button>


        {/* NO */}
        <button
          className="trade-btn no"
          disabled={closed}
          onClick={() => onNo?.(q)}
        >

          <span>NO</span>

          <strong>
            {Number(q.no_odds).toFixed(2)}
          </strong>

        </button>


        {/* VIEW */}
        <button
          className="trade-btn view"
          onClick={handleView}
        >
          VIEW
        </button>

      </div>

    </div>

  );

}