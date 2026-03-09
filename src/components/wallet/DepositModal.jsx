import { useState } from "react";
import walletService from "../../wallet/wallet.service";

export default function DepositModal({ open, onClose }) {

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MIN_DEPOSIT = 100;

  if (!open) return null;

  const submit = async () => {

    setError("");

    const value = Number(amount);

    /* FRONTEND VALIDATION */

    if (!value) {
      setError("Enter a deposit amount");
      return;
    }

    if (value < MIN_DEPOSIT) {
      setError(`Minimum deposit is ₦${MIN_DEPOSIT}`);
      return;
    }

    setLoading(true);

    try {

      const res = await walletService.initDeposit(value);

      window.location.href = res.data.data.checkout_url;

    } catch (err) {

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to start deposit";

      setError(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="modal-backdrop">

      <div className="modal">

        <h3>Fund wallet</h3>

        <input
          type="number"
          placeholder="Amount (₦)"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
          }}
        />

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Redirecting…" : "Continue"}
        </button>

        <button
          className="btn btn-ghost"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>

  );
}