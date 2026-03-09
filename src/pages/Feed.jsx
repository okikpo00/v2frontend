import { useEffect, useState, useMemo } from "react";
import api from "../api";

import BillboardCarousel from "../components/home/BillboardCarousel";
import RecentActivityTicker from "../components/home/RecentActivityTicker";
import LiveDuelsSection from "../components/h2h/LiveDuelsSection";
import CategoryTabs from "../components/home/CategoryTabs";
import QuestionFeed from "../components/questions/QuestionFeed";
import WinnerTicker from "../components/home/WinnerTicker";

import "../styles/home.css";
import "../styles/question.css";
import "../styles/slip.css";

export default function Home() {

  /* =========================
     STATE
  ========================= */

  const [homepage, setHomepage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("sports");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  /* =========================
     FETCH HOMEPAGE
  ========================= */

  useEffect(() => {

    let mounted = true;

    async function loadHomepage() {

      try {

        setLoading(true);
        setError(null);

        const res = await api.get("/homepage");

        if (!mounted) return;

        setHomepage(res?.data?.data || {});

      }
      catch (err) {

        console.error("[HOMEPAGE_LOAD_FAILED]", err);

        if (!mounted) return;

        setError(
          err?.response?.data?.message ||
          "Failed to load homepage"
        );

      }
      finally {

        if (mounted)
          setLoading(false);

      }

    }

    loadHomepage();

    return () => {
      mounted = false;
    };

  }, []);


  /* =========================
     SAFE DATA EXTRACTION
  ========================= */

  const billboards =
    homepage?.billboards || [];

  const recentActivity =
    homepage?.recent_activity || [];

  const trending1v1 =
  homepage?.trending_1v1_questions || [];

  const categories =
    homepage?.categories || {};

  const winnerTicker =
    homepage?.winner_ticker || [];


  /* =========================
     NORMALIZE QUESTIONS
  ========================= */

  const questions = useMemo(() => {

    const list =
      categories?.[activeCategory];

    if (!Array.isArray(list))
      return [];

    return list.map(q => ({

      ...q,

      uuid:
        q.uuid ||
        q.id,

      closes_at:
        q.closes_at || null,

      server_time:
        homepage?.server_time ||
        new Date().toISOString()

    }));

  },
  [categories, activeCategory, homepage?.server_time]);


  /* =========================
     LOADING UI
  ========================= */

  if (loading) {

    return (
      <div className="home-loading">
        <div className="spinner" />
      </div>
    );

  }


  /* =========================
     ERROR UI
  ========================= */

  if (error) {

    return (

      <div className="home-error">

        <div className="home-error-card">

          <div className="home-error-title">
            Failed to load homepage
          </div>

          <div className="home-error-sub">
            Please try again
          </div>

          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>

        </div>

      </div>

    );

  }


  /* =========================
     HANDLERS
  ========================= */





  /* =========================
     RENDER
  ========================= */

  return (

    <div className="home">

      {/* BILLBOARD */}
      <BillboardCarousel
        items={billboards}
      />


      {/* ACTIVITY TICKER */}
      <RecentActivityTicker
        items={recentActivity}
      />


  {/* =====================
   1v1 DUELS
===================== */}
<section className="home-1v1">

  <div className="home-1v1-header">
    <h2>⚔ 1v1 Challenge</h2>
    <p>
      Challenge your friend. Lock your stake. Winner takes all.
    </p>
  </div>

  <LiveDuelsSection
    questions={trending1v1}
  />

</section>

      {/* CATEGORY TABS */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />


      {/* QUESTIONS */}
      <QuestionFeed questions={questions} />

      {/* WINNER TICKER */}
      <WinnerTicker
        items={winnerTicker}
      />


      {/* SAFE AREA */}
      <div className="home-bottom-safe" />

    </div>

  );

}