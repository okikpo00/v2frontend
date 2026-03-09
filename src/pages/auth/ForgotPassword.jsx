import { useState } from "react";
import authService from "../../auth/auth.service";
import "../../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* basic email sanity check (NOT existence check) */
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await authService.forgotPassword({ email });
      setSent(true);
    } catch {
      // backend always responds success for security
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS STATE
     ========================= */
  if (sent) {
    return (
      <>
        <h2>Check your email</h2>
        <p>
          If an account exists for <strong>{email}</strong>,  
          a password reset link has been sent.
        </p>

        <button
          type="button"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Sending…" : "Resend reset link"}
        </button>

        <p className="auth-secure-note">
          Didn’t receive the email? Check spam or try again in a few minutes.
        </p>
      </>
    );
  }

  /* =========================
     FORM STATE
     ========================= */
  return (
    <>
      <h2>Reset your password</h2>
      <p>
        Enter the email associated with your account and we’ll
        send you a reset link.
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="auth-secure-note">
        For security reasons, we don’t confirm whether an email exists.
      </p>
    </>
  );
}