import { useSlip } from "../../context/SlipContext";
import SlipEntryItem from "./SlipEntryItem";
import SlipConfirmSection from "./SlipConfirmSection";
import SlipSuccessTicket from "./SlipSuccessTicket";

export default function SlipContainer() {

  const {
    entries,
    expanded,
    setExpanded,
    totalOdds,
    clearSlip
  } = useSlip();
const { error } = useSlip();
  if (!entries.length) return null;

  return (
    <>
      <div className={`slip-container ${expanded ? "expanded" : ""}`}>

        {/* COLLAPSED BAR */}
        <div
          className="slip-collapsed"
          onClick={() => setExpanded(true)}
        >
          <div className="slip-summary-left">
            {entries.length} Selection{entries.length > 1 ? "s" : ""}
          </div>

          <div className="slip-summary-right">
            Odds {Number(totalOdds).toFixed(2)}
          </div>
        </div>

        {/* DRAWER */}
        <div className="slip-drawer">

          {/* HEADER */}
         <div className="slip-drawer-header">

  {/* CHEVRON / DRAW HANDLE */}
  <div
    className="slip-drawer-toggle"
    onClick={() => setExpanded(false)}
  >
    <span className="chevron" />
  </div>

  <div className="slip-header-main">
    <div className="slip-header-title">
      {entries.length === 1 ? "Single Bet" : "Multiple Bet"}
    </div>

    <div className="slip-header-actions">
      <button
        className="slip-clear-btn"
        onClick={clearSlip}
      >
        Clear All
      </button>

      <button
        className="slip-close"
        onClick={() => setExpanded(false)}
      >
        ×
      </button>
    </div>
  </div>

</div>
{error && (
  <div className="slip-error">
    {error}
  </div>
)}
          {/* ENTRIES */}
          <div className="slip-entry-list">
            {entries.map(e => (
              <SlipEntryItem
                key={e.question_id}
                entry={e}
              />
            ))}
          </div>

          {/* CONFIRM SECTION */}
          <SlipConfirmSection />

        </div>
      </div>

      <SlipSuccessTicket />
    </>
  );
}