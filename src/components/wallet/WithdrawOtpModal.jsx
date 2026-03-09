import { useEffect, useState } from "react";
import walletService from "../../wallet/wallet.service";
import { useAuth } from "../../auth/AuthProvider";

export default function WithdrawOtpModal({ data, onClose, onSuccess }) {
  const { updateBalance } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!data || cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown, data]);

  if (!data) return null;

  const submit = async () => {
    if (otp.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      await walletService.verifyWithdrawalOtp({
        withdrawal_uuid: data.withdrawal_uuid,
        otp,
      });

      updateBalance(-Number(data.amount)); // ✅ instant
      onSuccess?.();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Verify withdrawal</h3>

        {error && <p className="error-text">{error}</p>}

        <input
          className="otp-input"
          placeholder="••••••"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          inputMode="numeric"
        />

        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying…" : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
