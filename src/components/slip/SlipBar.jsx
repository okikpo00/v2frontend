import { useState, useEffect } from "react";
import { useSlip } from "../../context/SlipContext";
import SlipDrawer from "./SlipDrawer";

export default function SlipBar() {

  const { entries, potentialPayout } = useSlip();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (entries.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
      setOpen(false);
    }
  }, [entries]);

  if (!visible) return null;

  return (
    <>
      <div
        className="slip-bar"
        onClick={() => setOpen(true)}
      >
        <div className="slip-bar-left">
          {entries.length} Selection{entries.length > 1 ? "s" : ""}
        </div>

        <div className="slip-bar-right">
          ₦{potentialPayout.toLocaleString()}
        </div>
      </div>

      {open && (
        <SlipDrawer onClose={() => setOpen(false)} />
      )}
    </>
  );
}