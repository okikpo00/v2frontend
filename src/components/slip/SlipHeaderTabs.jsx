import { useSlip } from "../../context/SlipContext";

export default function SlipHeaderTabs() {

  const { mode, setMode, clearSlip, setExpanded } = useSlip();

  return (
    <div className="slip-header">

      <div className="slip-modes">
        <button
          className={mode === "single" ? "active" : ""}
          onClick={() => setMode("single")}
        >
          Single
        </button>

        <button
          className={mode === "multiple" ? "active" : ""}
          onClick={() => setMode("multiple")}
        >
          Multiple
        </button>
      </div>

      <button
        className="slip-clear"
        onClick={() => {
          clearSlip();
          setExpanded(false);
        }}
      >
        Clear
      </button>

    </div>
  );
}