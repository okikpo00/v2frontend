import { useState } from "react";
import authService from "../../auth/auth.service";
import "../../styles/auth.css";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  /* =========================
     SEND RESET
  ========================= */

  const submit = async (e) => {

    if (e) e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!isValidEmail(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {

      await authService.forgotPassword({
        email: cleanEmail
      });

      setSent(true);

    } catch (err) {

      const code = err?.response?.data?.code;

      if (code === "INVALID_EMAIL") {
        setError("Enter a valid email address.");
      } else {
        setSent(true);
      }

    } finally {
      setLoading(false);
    }

  };

  /* =========================
     RESEND LINK
  ========================= */

  const resend = async () => {

    const cleanEmail = email.trim().toLowerCase();

    if (!isValidEmail(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {

      await authService.forgotPassword({
        email: cleanEmail
      });

    } catch {
      // still silent for security
    } finally {
      setLoading(false);
    }

  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (sent) {
    return (
      <div className="auth-page">

        <h2>Check your email</h2>

        <p>
          If an account exists for <strong>{email}</strong>,
          a password reset link has been sent.
        </p>

        <button
          type="button"
          onClick={resend}
          disabled={loading}
        >
          {loading ? "Sending…" : "Resend reset link"}
        </button>

        <p className="auth-secure-note">
          Didn’t receive the email? Check your spam folder
          or try again in a few minutes.
        </p>

      </div>
    );
  }

  /* =========================
     FORM STATE
  ========================= */

  return (

    <div className="auth-page">

      <h2>Reset your password</h2>

      <p>
        Enter the email associated with your account
        and we’ll send you a reset link.
      </p>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={submit}>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value.trim().toLowerCase())
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>

      </form>

      <p className="auth-secure-note">
        For security reasons, we don’t confirm whether an email exists.
      </p>

    </div>

  );

}