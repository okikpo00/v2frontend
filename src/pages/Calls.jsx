import { useState } from "react";
import CuratedSection from "../components/curated/CuratedSection";
import DuelSection from "../components/duels/DuelSection";
import "../styles/calls.css";


export default function Calls() {

  const [type, setType] = useState("curated");

  return (
    <div className="calls-page">

      <div className="calls-main-tabs">

        <button
          className={type === "curated" ? "active" : ""}
          onClick={() => setType("curated")}
        >
          Curated
        </button>

        <button
          className={type === "duels" ? "active" : ""}
          onClick={() => setType("duels")}
        >
          1v1
        </button>

      </div>

      {type === "curated"
        ? <CuratedSection/>
        : <DuelSection/>
      }

    </div>
  );
}