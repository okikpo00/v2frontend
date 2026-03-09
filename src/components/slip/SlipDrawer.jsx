import { useSlip } from "../../context/SlipContext";
import SlipEntryItem from "./SlipEntryItem";
import SlipConfirmSection from "./SlipConfirmSection";
import SlipHeaderTabs from "./SlipHeaderTabs";
import SlipErrorBanner from "./SlipErrorBanner";

export default function SlipDrawer({ onClose }) {

  const { entries, error } = useSlip();

  return (
    <div className="slip-backdrop" onClick={onClose}>

      <div
        className="slip-drawer"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="slip-grab-handle" />

        <SlipHeaderTabs />

        {error && <SlipErrorBanner />}

        <div className="slip-entry-list">
          {entries.map(entry => (
            <SlipEntryItem
              key={entry.question_id}
              entry={entry}
            />
          ))}
        </div>

        <SlipConfirmSection onClose={onClose} />

      </div>

    </div>
  );
}