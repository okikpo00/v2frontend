import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import DuelSummary from "../components/details/DuelSummary";
import DuelBattleCard from "../components/details/DuelBattleCard";
import "../styles/details.css";

export default function DuelDetails() {
  const { uuid } = useParams();
  const [duel, setDuel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [uuid]);

  async function load() {
    try {
      const res = await api.get(`/user/duels/${uuid}`);
      setDuel(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="details-page">Loading...</div>;
  }

  if (!duel) {
    return <div className="details-page">Duel not found.</div>;
  }

  return (
    <div className="details-page">
      <DuelSummary duel={duel} />
      <DuelBattleCard duel={duel} />
    </div>
  );
}