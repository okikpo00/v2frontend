import { useRef, useEffect, useState } from "react";
import H2HStoryCard from "./H2HStoryCard";

export default function H2HStoryStrip({ items, onSelect }) {

  const trackRef = useRef();
  const [paused, setPaused] = useState(false);

  // drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
  const track = trackRef.current;
  if (!track) return;

  let frame;

  function animate() {
    if (!paused && !isDown.current) {

      // only move if content is actually wider
      if (track.scrollWidth > track.clientWidth) {

        track.scrollLeft += 0.5;

        // safe reset
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
    }

    frame = requestAnimationFrame(animate);
  }

  frame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frame);

}, [paused]);

  function handleMouseDown(e) {
    isDown.current = true;
    setPaused(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  }

  function handleMouseLeave() {
    isDown.current = false;
    setTimeout(() => setPaused(false), 1000);
  }

  function handleMouseUp() {
    isDown.current = false;
    setTimeout(() => setPaused(false), 1000);
  }

  function handleMouseMove(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft =
      scrollLeftStart.current - walk;
  }

  function handleTouchStart(e) {
    isDown.current = true;
    setPaused(true);
    startX.current = e.touches[0].pageX;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  }

  function handleTouchMove(e) {
    if (!isDown.current) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft =
      scrollLeftStart.current - walk;
  }

  function handleTouchEnd() {
    isDown.current = false;
    setTimeout(() => setPaused(false), 1000);
  }

  if (!items?.length) return null;

  const loopItems = [...items, ...items];

  return (
    <div className="h2h-strip">
      <div
        className="h2h-track"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loopItems.map((q, i) => (
          <H2HStoryCard
            key={q.uuid + "_" + i}
            item={q}
            onClick={() => onSelect?.(q)}
          />
        ))}
      </div>
    </div>
  );
}