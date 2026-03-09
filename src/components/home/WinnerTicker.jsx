import { useEffect, useRef, useState } from "react";

function formatAmount(amount) {
  const n = Number(amount);
  if (!n) return "₦0";
  return "₦" + n.toLocaleString();
}

export default function WinnerTicker({ items }) {

  const trackRef = useRef(null);

  const [paused, setPaused] = useState(false);

  useEffect(() => {

    if (!items?.length) return;

    const track = trackRef.current;

    let x = 0;
    let frame;

    function animate() {

      if (!paused) {

        x -= 0.4;

        if (Math.abs(x) >= track.scrollWidth / 2) {
          x = 0;
        }

        track.style.transform =
          `translateX(${x}px)`;

      }

      frame =
        requestAnimationFrame(animate);

    }

    animate();

    return () =>
      cancelAnimationFrame(frame);

  }, [items, paused]);

  if (!items?.length) return null;

  const loopItems =
    [...items, ...items];

  return (
    <div
      className="winner-ticker"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <div
        className="winner-track"
        ref={trackRef}
      >

        {loopItems.map((w, i) => (

          <div
            key={i}
            className={`winner-item ${w.source}`}
          >

            <span className="winner-user">
              {w.display_name}
            </span>

            <span className="winner-text">
              won
            </span>

            <span className="winner-amount">
              {formatAmount(w.amount_won)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );

}