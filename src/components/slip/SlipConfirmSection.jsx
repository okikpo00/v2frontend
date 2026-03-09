import { useState } from "react";
import api from "../../api";
import { useSlip } from "../../context/SlipContext";
import { useAuth } from "../../auth/AuthProvider";


export default function SlipConfirmSection() {

  const {
    entries,
    stake,
    setStake,
    totalOdds,
    potentialPayout,
    setSuccessSlip,
    clearSlip,
    setExpanded,
    setError
  } = useSlip();

  const [placing, setPlacing] = useState(false);
const { refreshUser } = useAuth();

  const MIN_STAKE = 10;
  const MAX_STAKE = 50000;

  async function handleConfirm() {

    setError?.("");

    const numericStake = Number(stake);

    /* ===== VALIDATION ===== */

    if (!entries.length) {
      setError?.("No selections in slip");
      return;
    }

    if (!numericStake) {
      setError?.("Enter a stake amount");
      return;
    }

    if (numericStake < MIN_STAKE) {
      setError?.(`Stake below minimum ₦${MIN_STAKE}`);
      return;
    }

    if (numericStake > MAX_STAKE) {
      setError?.(`Stake above maximum ₦${MAX_STAKE}`);
      return;
    }

    /* ===== BUILD PAYLOAD ===== */

    const map = new Map();

    for (const e of entries) {
      map.set(e.question_id, {
        question_id: e.question_id,
        side: e.side
      });
    }

    const payload = {
      stake: numericStake,
      entries: Array.from(map.values())
    };

    try {

      setPlacing(true);

      const res = await api.post(
        "/curated/entry",
        payload
      );

      setSuccessSlip(res.data.data);

      await clearSlip();
      setExpanded(false);
refreshUser();
    } catch (err) {

      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Unable to place bet";

      setError?.(message);

    } finally {

      setPlacing(false);

    }
  }

  return (

    <div className="slip-confirm">

      <input
        type="number"
        min={MIN_STAKE}
        max={MAX_STAKE}
        placeholder={`Enter stake (₦${MIN_STAKE} - ₦${MAX_STAKE})`}
        value={stake}
        onChange={(e) => setStake(e.target.value)}
      />

      <div className="slip-summary">

        <div>
          Total Odds: {Number(totalOdds || 0).toFixed(4)}
        </div>

        <div className="payout">
          ₦{Number(potentialPayout || 0).toLocaleString()}
        </div>

      </div>

      <button
        className="confirm-btn"
        disabled={placing || !entries.length}
        onClick={handleConfirm}
      >
        {placing ? "Placing..." : "Place Bet"}
      </button>

    </div>

  );
}