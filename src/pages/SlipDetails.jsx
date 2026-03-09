import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import SlipSummary from "../components/details/SlipSummary";
import SlipEntriesList from "../components/details/SlipEntriesList";
import "../styles/details.css";

export default function SlipDetails() {

  const { uuid } = useParams();

  const [slip, setSlip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [uuid]);

  async function load() {
    try {
      const res = await api.get(`/user/curated/slip/${uuid}`);
      setSlip(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="details-page">Loading...</div>;
  }

  if (!slip) {
    return <div className="details-page">Slip not found.</div>;
  }

  /* SAFE VOID CHECK */

  const hasVoided = slip.entries?.some(
    entry => entry.status === "voided"
  );

  return (

    <div className="details-page">

      <SlipSummary slip={slip} />

      {slip.result && hasVoided && (
        <div className="voided-note">

          <div className="voided-note-icon">
            ⚠
          </div>

          <div className="voided-note-text">
            One or more selections in this slip were voided.
            Their odds were adjusted to <strong>1.00</strong>.
          </div>

        </div>
      )}

      <SlipEntriesList entries={slip.entries} />

    </div>

  );
}