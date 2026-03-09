import { useState } from "react";
import walletService from "../../wallet/wallet.service";
import WithdrawOtpModal from "./WithdrawOtpModal";
import BankSelect from "./BankSelect";

export default function WithdrawModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    bank_name: "",
    account_number: "",
    account_name: "",
  });

  const [otpData, setOtpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const submit = async () => {
    setError("");

    if (!/^\d{10}$/.test(form.account_number)) {
      setError("Account number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const res = await walletService.requestWithdrawal({
        ...form,
        amount: Number(form.amount),
      });

      setOtpData(res.data.data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Withdrawal request failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade-in">
        <div className="modal slide-up">
          <h3>Withdraw funds</h3>

          {error && <div className="auth-error">{error}</div>}

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <BankSelect
            value={form.bank_name}
            onChange={(bank_name) =>
              setForm({ ...form, bank_name })
            }
          />

          <input
            placeholder="Account number"
            inputMode="numeric"
            maxLength={10}
            value={form.account_number}
            onChange={(e) =>
              setForm({
                ...form,
                account_number: e.target.value.replace(/\D/g, ""),
              })
            }
          />

          <input
            placeholder="Account name"
            value={form.account_name}
            onChange={(e) =>
              setForm({ ...form, account_name: e.target.value })
            }
          />

          {/* ✅ WITHDRAWAL RULES */}
          <div className="withdraw-rules">
            <p><strong>Important</strong></p>
            <ul>
              <li>
                Bank account name must match your Trebetta account name.
              </li>
              <li>
                Incorrect details may cause delays or rejection.
              </li>
              <li>
                Withdrawals are reviewed and processed within
                <strong> 30 minutes</strong>.
              </li>
              <li>
                Failed withdrawals are returned to your wallet balance.
              </li>
            </ul>
          </div>

          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Processing…" : "Continue"}
          </button>

          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>

      <WithdrawOtpModal
        data={otpData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </>
  );
}