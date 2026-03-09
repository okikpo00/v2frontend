import { useSlip } from "../../context/SlipContext";

export default function SlipErrorBanner() {

  const { error, setError } = useSlip();

  if (!error) return null;

  return (
    <div className="slip-error">
      <span>{error}</span>
      <button onClick={() => setError(null)}>✕</button>
    </div>
  );
}