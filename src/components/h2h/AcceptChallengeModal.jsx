import { useState } from "react";
import api from "../../api";
import { useAuth } from "../../auth/AuthProvider";
export default function AcceptChallengeModal({
  challenge,
  onClose,
  onSuccess
}) {

  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
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
setError("");
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

  const status = err?.response?.status;
  const code = err?.response?.data?.code;
  const message = err?.response?.data?.message;

  if (status === 409 || code === "INSUFFICIENT_BALANCE") {
    setError("Insufficient wallet balance");
  }

  else if (status === 409 || code === "CHALLENGE_ALREADY_ACCEPTED") {
    setError("This duel has already been accepted");
  }

  else if (status === 409 || code === "CHALLENGE_EXPIRED") {
    setError("This duel has expired");
  }

  else if (status === 400 || code === "INVALID_INVITE_CODE") {
    setError("Invalid duel code");
  }

  else if (message) {
    setError(message);
  }

  else {
    setError("Unable to accept challenge");
  }

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
        {error && (
  <div className="form-error">
    {error}
  </div>
)}
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