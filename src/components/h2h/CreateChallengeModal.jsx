import { useState } from "react";
import api from "../../api";
import { useAuth } from "../../auth/AuthProvider";

export default function CreateChallengeModal({
  question,
  onClose,
  onSuccess
}) {

  const [stake, setStake] = useState("");
  const [side, setSide] = useState("yes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MIN_STAKE = 100;
  const MAX_STAKE = 50000;
const { refreshUser } = useAuth();
  async function handleCreate() {

    setError("");

    const value = Number(stake);

    /* SIMPLE VALIDATION */

    if (value < MIN_STAKE) {
      setError(`Stake below minimum ₦${MIN_STAKE}`);
      return;
    }

    if (value > MAX_STAKE) {
      setError(`Stake above maximum ₦${MAX_STAKE}`);
      return;
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/user/head-to-head/challenge/create",
        {
          question_id: question.id,
          stake: value,
          side
        }
      );

      onSuccess?.({
        ...res?.data?.data,
        title: question.title,
        category: question.category,
        description: question.description,
        creator_username: "You"
      });
refreshUser();
    } catch (err) {

      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Unable to create challenge"
      );

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="modal-backdrop" onClick={onClose}>

      <div
        className="modal create-challenge-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="modal-header">
          <h3 className="modal-title">{question.title}</h3>
          <span className="modal-category">{question.category}</span>
        </div>

        {/* DESCRIPTION */}

        {question.description && (
          <div className="modal-description">
            {question.description}
          </div>
        )}

        {/* SIDE PICK */}

        <div className="side-toggle">

          <button
            className={`side-btn yes ${side === "yes" ? "active" : ""}`}
            onClick={() => setSide("yes")}
          >
            YES
          </button>

          <button
            className={`side-btn no ${side === "no" ? "active" : ""}`}
            onClick={() => setSide("no")}
          >
            NO
          </button>

        </div>

        {/* STAKE */}

        <div className="stake-input">

          <label>Stake Amount</label>

          <input
            type="number"
            min={MIN_STAKE}
            max={MAX_STAKE}
            placeholder={`Enter stake (₦${MIN_STAKE} - ₦${MAX_STAKE})`}
            value={stake}
            onChange={(e) => setStake(e.target.value)}
          />

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

        </div>

        {/* CTA */}

        <button
          className="primary-btn lock-btn"
          disabled={loading || !stake}
          onClick={handleCreate}
        >
          {loading ? "Locking Duel..." : "Lock Duel"}
        </button>

      </div>

    </div>

  );
}