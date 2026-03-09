import { useState } from "react";
import api from "../../api";
import { useAuth } from "../../auth/AuthProvider";
export default function AcceptChallengeModal({
  challenge,
  onClose,
  onSuccess
}) {

  const [loading, setLoading] = useState(false);

  if (!challenge) return null;

  const {
    invite_code,
    title,
    category,
    stake,
    potential_win,
    creator_side,
    creator_username
  } = challenge;

  const yourSide =
    creator_side === "yes" ? "no" : "yes";

  const stakeAmount = Number(stake || 0);
  const potentialWinAmount = Number(potential_win || 0);
  const netGain = potentialWinAmount - stakeAmount;

const { refreshUser } = useAuth();
  async function handleAccept() {

    try {

      setLoading(true);

      const res = await api.post(
        "/user/head-to-head/challenge/accept",
        { invite_code }
      );

      onSuccess?.({
        ...res?.data?.data,
        
      });
refreshUser();
    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Unable to accept challenge"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="duel-modal-backdrop" onClick={onClose}>

      <div
        className="duel-accept-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="accept-header">
          Join Duel
        </div>

        {/* TITLE */}
        <div className="accept-title">
          {title}
        </div>

        <div className="accept-category">
          {category}
        </div>

        {/* USERS */}
        <div className="accept-users">
          <span>{creator_username}</span>
          <span className="vs-icon">⚔</span>
          <span>You</span>
        </div>

        {/* PICKS */}
        <div className="accept-picks">

          <div className="pick-row">
            <span>Creator Pick</span>
            <span className={`pick-badge ${creator_side}`}>
              {creator_side?.toUpperCase()}
            </span>
          </div>

          <div className="pick-row">
            <span>Your Side</span>
            <span className={`pick-badge ${yourSide}`}>
              {yourSide?.toUpperCase()}
            </span>
          </div>

          

        </div>

        {/* FINANCIAL BOX */}
        <div className="accept-financial-box">

          <div className="accept-row">
            <span>Stake</span>
            <span>
              ₦{stakeAmount.toLocaleString()}
            </span>
          </div>

          <div className="accept-divider" />

          <div className="accept-row highlight">
            <span>Potential Win</span>
            <span className="accept-win">
              ₦{potentialWinAmount.toLocaleString()}
            </span>
          </div>

          

        </div>

        {/* CTA */}
        <button
          className="accept-primary-btn"
          disabled={loading}
          onClick={handleAccept}
        >
          {loading ? "Locking Duel..." : "Lock Duel"}
        </button>

        <button
          className="accept-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}