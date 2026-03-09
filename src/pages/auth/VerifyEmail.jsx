import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import authService from "../../auth/auth.service";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const sent = params.get("sent");

  const [status, setStatus] = useState("idle");
  // idle | loading | success | error

  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  /* =========================
     AUTO VERIFY (TOKEN MODE)
     ========================= */
  useEffect(() => {
    if (!token) {
      if (sent) {
        setStatus("idle");
        return;
      }

      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    setStatus("loading");

    authService
      .verifyEmail({ token })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Verification link is invalid or expired.");
      });
  }, [token, sent]);

  /* =========================
     RESEND HANDLER
     ========================= */
  const handleResend = async () => {
    setResending(true);
    setResendSuccess(false);

    try {
      await authService.sendVerifyEmail();
      setResendSuccess(true);
    } catch {
      // backend always responds success for security
      setResendSuccess(true);
    } finally {
      setResending(false);
    }
  };

  /* =========================
     STATES
     ========================= */

  if (status === "loading") {
    return <p>Verifying your email…</p>;
  }

  if (status === "success") {
    return (
      <>
        <h2>Email verified</h2>
        <p>Your account is now active.</p>
        <Link to="/login">Continue to login</Link>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <h2>Verification failed</h2>
        <p>{message}</p>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Sending link…" : "Resend verification email"}
        </button>

        {resendSuccess && (
          <p className="auth-secure-note">
            If the email exists, a new verification link has been sent.
          </p>
        )}
      </>
    );
  }

  /* =========================
     DEFAULT — EMAIL SENT
     ========================= */

  return (
    <>
      <h2>Check your email</h2>
      <p>
        We’ve sent a verification link to your email address.  
        Please click the link to activate your account.
      </p>

      <button
        type="button"
        onClick={handleResend}
        disabled={resending}
      >
        {resending ? "Sending link…" : "Resend verification email"}
      </button>

      {resendSuccess && (
        <p className="auth-secure-note">
          If the email exists, a new verification link has been sent.
        </p>
      )}
    </>
  );
}