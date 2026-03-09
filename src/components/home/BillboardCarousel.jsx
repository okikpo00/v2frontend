import { useState, useEffect } from "react";

export default function BillboardCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const timer = setInterval(() => {
      setIndex(i => (i + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) return null;

  const item = items[index];

  return (
    <div className="billboard">
      <img src={item.image_url} alt="" />

      <div className="billboard-overlay">
        <h2>{item.title}</h2>
        <p>{item.subtitle}</p>
      </div>

      <div className="billboard-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}