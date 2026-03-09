import api from "../../api";
import { useAuth } from "../../auth/AuthProvider";



export default function DuelBattleCard({ duel }) {
  const isCreator = duel.user_side === duel.creator_side;
  const isSettled = duel.result !== null;
  const isPending = duel.status === "pending";
const { refreshUser } = useAuth();
  const amount = isSettled
    ? duel.payout
    : duel.potential_win;

  const label = isSettled
    ? "Payout"
    : "Potential Win";

  async function cancelChallenge(e) {
    e.stopPropagation();

    if (!duel?.invite_code) {
      console.error("Missing invite code", duel);
      return;
    }

    try {

      const payload = {
        invite_code: String(duel.invite_code)
      };

      console.log("Cancel payload:", payload);

      const res = await api.post(
        "/user/head-to-head/challenge/cancel",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Cancel response:", res.data);
refreshUser();
      window.location.reload();

    } catch (err) {

      console.error(
        "Cancel error:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
        "Unable to cancel challenge"
      );

    }
  }

  return (
    <div className="duel-battle-card">

      <div className="duel-title">
        {duel.title}
      </div>

      <div className="duel-battle">

        <div className={`battle-side ${isCreator ? "battle-you" : ""}`}>
          <div className="battle-username">
            {duel.creator_username}
          </div>

          <div className="battle-choice">
            {duel.creator_side.toUpperCase()}
          </div>

          {isCreator && (
            <div className="battle-you-label">YOU</div>
          )}
        </div>

        <div className="battle-vs">VS</div>

        <div className={`battle-side ${!isCreator ? "battle-you" : ""}`}>
          <div className="battle-username">
            {duel.opponent_username || "Waiting for opponent"}
          </div>

          <div className="battle-choice">
            {duel.opponent_side
              ? duel.opponent_side.toUpperCase()
              : "-"}
          </div>

          {!isCreator && duel.opponent_username && (
            <div className="battle-you-label">YOU</div>
          )}
        </div>

      </div>

      <div className="duel-stake">
        <label>Stake</label>
        <strong>
          ₦{Number(duel.stake).toLocaleString()}
        </strong>
      </div>

      <div className="payout-bar">
        <span className="payout-label">{label}</span>

        <span className="payout-value">
          ₦{Number(amount).toLocaleString()}
        </span>
      </div>

      {isPending && isCreator && (
        <button
          className="duel-cancel-btn"
          onClick={cancelChallenge}
        >
          Cancel Challenge
        </button>
      )}

    </div>
  );
}