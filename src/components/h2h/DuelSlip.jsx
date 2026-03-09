import { useRef, useState } from "react";
import html2canvas from "html2canvas";
export default function DuelSlip({ data }) {

  const slipRef = useRef();
  const [copied, setCopied] = useState(false);

  const {
    creator_username,
    opponent_username,
    creator_side,
    opponent_side,
    stake,
    potential_win,
    invite_code,
    title,
    status
  } = data;

  const displayOpponent =
    opponent_username || "Awaiting Opponent";

  async function handleDownload() {
    const canvas = await html2canvas(slipRef.current);
    const link = document.createElement("a");
    link.download = "trebetta-duel.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  async function handleShare() {

    if (navigator.share) {
      await navigator.share({
        title: "Trebetta Duel",
        text: `I just locked this duel on Trebetta. Code: ${invite_code}`,
        url: "https://trebetta.com"
      });
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(invite_code);
  
  setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (

    <div className="duel-ticket" ref={slipRef}>

      {/* WATERMARK */}
      <div className="duel-watermark">
        TREBETTA
      </div>

      {/* HEADER */}
      <div className="duel-header">
        ⚔ DUEL TICKET
      </div>

      {/* TITLE */}
      <div className="duel-title">
        {title}
      </div>

      {/* USERS */}
      <div className="duel-users">
        <span>{creator_username}</span>
        <span className="duel-vs">⚔</span>
        <span>{displayOpponent}</span>
      </div>

      {/* PICK */}
      {/* PICKS SECTION */}
<div className="duel-picks">

  <div className="pick-line">
    <span>{creator_username} picked</span>
    <span className={`pick-badge ${creator_side}`}>
      {creator_side?.toUpperCase()}
    </span>
  </div>

  {opponent_side && (
    <div className="pick-line">
      <span>{opponent_username} picked</span>
      <span className={`pick-badge ${opponent_side}`}>
        {opponent_side?.toUpperCase()}
      </span>
    </div>
  )}

</div>

      {/* FINANCIALS */}
      <div className="duel-financial-box">

        <div className="duel-row">
          <span>Stake</span>
          <span>₦{Number(stake).toLocaleString()}</span>
        </div>

        <div className="duel-divider" />

        <div className="duel-row">
          <span>Potential Win</span>
          <span className="win-amount">
            ₦{Number(potential_win).toLocaleString()}
          </span>
        </div>

      </div>

      {/* INVITE CODE */}
      {invite_code && (
        <div className="duel-code-section">

          <div className="duel-code-box">
            <span>{invite_code}</span>
        <button
    className={`copy-btn ${copied ? "copied" : ""}`}
    onClick={handleCopy}
  >
    {copied ? "Copied ✓" : "Copy"}
  </button>
</div>
          <div className="duel-call-text">
            Think you can beat me?
            Enter this code on <strong>trebetta.com</strong>
            and prove it.
          </div>

        </div>
      )}

      {/* ACTIONS */}
      <div className="duel-actions">
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleShare}>Share</button>
      </div>

      <div className="duel-footer">
        trebetta.com
      </div>

    </div>
  );
}