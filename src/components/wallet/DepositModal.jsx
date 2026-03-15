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

      <div className="modal deposit-modal">

        <h3>Fund Wallet</h3>

        {/* INSTRUCTIONS */}

        <div className="deposit-guide">

          <p className="deposit-guide-title">
            How to deposit
          </p>

          <ol>

            <li>
              Enter the amount you want to deposit.
            </li>

            <li>
              Click <strong>Continue</strong>. You will be redirected to the secure Flutterwave payment page.
            </li>

            <li>
              On the payment page you can deposit using <strong>card, bank transfer, USSD, or other methods</strong>.
            </li>

            <li>
              If you don’t see your preferred option, click <strong>"Change payment method"</strong> to view more options.
            </li>

            <li>
              If you choose <strong>bank transfer</strong>, the account name may appear as:
              <strong> Trebetta Wallet</strong> or
              <strong> Horizon Blue Bliss Global</strong>.  
              <span className="deposit-note">
                Both names are correct and safe.
              </span>
            </li>

          </ol>

        </div>

        {/* INPUT */}

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

        {/* CTA */}

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