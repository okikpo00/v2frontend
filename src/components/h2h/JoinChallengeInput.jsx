import { useState } from "react";
import api from "../../api";

export default function JoinChallengeInput({ onChallengeLoaded }) {

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleJoin() {

    setError("");

    const formatted = code.trim().toUpperCase();

    if (!formatted) {
      setError("Enter a challenge code");
      return;
    }

    try {

      setLoading(true);

      const res = await api.get(
        `/user/head-to-head/challenge/${formatted}`
      );

      onChallengeLoaded?.(res?.data?.data);

    } catch (err) {

      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Invalid or unavailable challenge";

      setError(message);

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="join-box">

      <input
        placeholder="Enter challenge code (e.g. TREB-4V2A5U)"
        value={code}
        onChange={(e) =>
          setCode(e.target.value.toUpperCase())
        }
      />

      <button
        disabled={loading}
        onClick={handleJoin}
      >
        {loading ? "Checking..." : "Join"}
      </button>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

    </div>

  );
}