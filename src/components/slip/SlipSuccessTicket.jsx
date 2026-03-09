import { useRef } from "react";
import html2canvas from "html2canvas";
import { useSlip } from "../../context/SlipContext";

export default function SlipSuccessTicket() {

  const { successSlip, setSuccessSlip } = useSlip();
  const ticketRef = useRef();

  if (!successSlip) return null;

  async function handleDownload() {
    const canvas = await html2canvas(ticketRef.current);
    const link = document.createElement("a");
    link.download = "trebetta-ticket.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Trebetta Bet Ticket",
        text: `I just locked this bet on Trebetta 🔥`,
        url: "https://trebetta.com"
      });
    }
  }

  return (
    <div className="success-overlay">

      <div className="success-wrapper">

        <div className="success-ticket" ref={ticketRef}>

          {/* WATERMARK */}
          <div className="ticket-watermark">
            TREBETTA
          </div>

          <div className="ticket-header">
            BET CONFIRMED
          </div>

          <div className="ticket-body">

            <div className="ticket-row">
              <span>Slip ID</span>
              <span>{successSlip.slip_uuid}</span>
            </div>

            <div className="ticket-row">
              <span>Total Stake</span>
              <span>₦{Number(successSlip.total_stake).toLocaleString()}</span>
            </div>

            <div className="ticket-row">
              <span>Total Odds</span>
              <span>{Number(successSlip.total_odds).toFixed(2)}</span>
            </div>

            <div className="ticket-row payout-row">
              <span>Potential Win</span>
              <span>
                ₦{Number(successSlip.potential_payout).toLocaleString()}
              </span>
            </div>

          </div>

          <div className="ticket-footer">
            trebetta.com
          </div>

        </div>

        <div className="success-actions">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleShare}>Share</button>
          <button onClick={() => setSuccessSlip(null)}>Done</button>
        </div>

      </div>

    </div>
  );
}