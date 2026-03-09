import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import authService from "../../auth/auth.service";
import "../../styles/auth.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({ token, password });
      setSuccess(true);
    } catch {
      setError("Reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS STATE
     ========================= */
  if (success) {
    return (
      <>
        <h2>Password updated</h2>
        <p>Your password has been changed successfully.</p>

        <button onClick={() => navigate("/login")}>
          Continue to login
        </button>
      </>
    );
  }

  /* =========================
     FORM STATE
     ========================= */
  return (
    <>
      <h2>Set a new password</h2>
      <p>Choose a strong password you haven’t used before.</p>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={submit}>
        <div className="auth-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword((v) => !v)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="auth-password">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating password…" : "Reset password"}
        </button>
      </form>

      <p className="auth-secure-note">
        This link expires shortly for security reasons.
      </p>
    </>
  );
}