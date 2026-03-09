import { useEffect, useRef, useState } from "react";

function formatAmount(amount) {
  const n = Number(amount);
  if (!n) return "₦0";
  return "₦" + n.toLocaleString();
}

function formatAction(a) {
  if (a === "placed_call") return "placed";
  if (a === "won_call") return "won";
  return a;
}

export default function RecentActivityTicker({ items }) {

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [paused, setPaused] = useState(false);

  /* =========================
     AUTO SCROLL ENGINE
  ========================= */
  useEffect(() => {

    if (!items?.length) return;

    const track = trackRef.current;

    let animationFrame;
    let x = 0;

    function animate() {

      if (!paused) {

        x -= 0.35;

        if (Math.abs(x) >= track.scrollWidth / 2) {
          x = 0;
        }

        track.style.transform =
          `translateX(${x}px)`;
      }

      animationFrame =
        requestAnimationFrame(animate);

    }

    animate();

    return () =>
      cancelAnimationFrame(animationFrame);

  }, [items, paused]);

  if (!items?.length) return null;

  /* duplicate items for seamless loop */
  const loopItems =
    [...items, ...items];

  return (
    <div
      className="activity-ticker"
      ref={containerRef}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <div
        className="activity-track"
        ref={trackRef}
      >

        {loopItems.map((a, i) => (

          <div
            key={i}
            className={`activity-item ${a.source}`}
          >

            <span className="activity-user">
              {a.display_name}
            </span>

            <span className="activity-action">
              {formatAction(a.action_type)}
            </span>

            <span className="activity-amount">
              {formatAmount(a.amount)}
            </span>

            <span className="activity-question">
              {a.question_title}
            </span>

          </div>

        ))}

      </div>

    </div>
  );

}