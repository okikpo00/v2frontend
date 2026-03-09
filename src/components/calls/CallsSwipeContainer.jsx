import CuratedSection from "../curated/CuratedSection";
import DuelSection from "../duels/DuelSection";

export default function CallsSwipeContainer({ mainTab }) {

  const offset = mainTab === "curated" ? 0 : -100;

  return (
    <div className="calls-swipe-root">

      <div
        className="calls-swipe-track"
        style={{
          transform: `translateX(${offset}%)`
        }}
      >

        <div className="calls-swipe-page">
          <CuratedSection />
        </div>

        <div className="calls-swipe-page">
          <DuelSection />
        </div>

      </div>

    </div>
  );
}