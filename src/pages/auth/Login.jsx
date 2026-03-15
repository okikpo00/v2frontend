import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../auth/AuthProvider";
import api from "../../api";

import "../../styles/login.css";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showResend, setShowResend] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [resendLoading, setResendLoading] = useState(false);



  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setShowResend(false);
    setResendMsg("");

    const cleanIdentifier = identifier.trim().toLowerCase();

    if (!cleanIdentifier) {
      setError("Enter your email or username.");
      return;
    }

    if (!password) {
      setError("Enter your password.");
      return;
    }

    setLoading(true);

    try {

      await login({
        identifier: cleanIdentifier,
        password
      });

      navigate(from, { replace: true });

    } catch (err) {

      const status = err?.response?.status;
      const code = err?.response?.data?.code;
      const message = err?.response?.data?.message;

      let displayError = "Unable to sign in. Please try again.";

      /* =========================
         AUTH ERROR MAPPING
      ========================= */

      if (status === 401 || code === "INVALID_CREDENTIALS") {
        displayError = "Incorrect email or password.";
      }

      else if (status === 403 || code === "EMAIL_NOT_VERIFIED") {
        displayError = "Your email has not been verified.";
        setShowResend(true);
      }

      else if (status === 500) {
        displayError = "Server error. Please try again later.";
      }

      else if (message) {
        displayError = message;
      }

      setError(displayError);

    } finally {
      setLoading(false);
    }

  };



  async function resendVerification() {

    const cleanIdentifier = identifier.trim().toLowerCase();

    if (!cleanIdentifier) return;

    setResendLoading(true);
    setResendMsg("");

    try {

      await api.post("/auth/send-verify-email", {
        email: cleanIdentifier
      });

      setResendMsg(
        "Verification email sent. Please check your inbox."
      );

    } catch {
      setResendMsg(
        "Unable to resend verification email."
      );
    } finally {
      setResendLoading(false);
    }

  }



  return (

    <div className="login-page">

      <h2>Welcome back</h2>
      <p>Sign in to continue to your account.</p>

      {error && (
        <div className="auth-error">{error}</div>
      )}

      {showResend && (

        <div className="verify-resend">

          <button
            type="button"
            className="resend-btn"
            disabled={resendLoading}
            onClick={resendVerification}
          >
            {resendLoading ? "Sending..." : "Resend verification email"}
          </button>

          {resendMsg && (
            <div className="resend-msg">{resendMsg}</div>
          )}

        </div>

      )}

      <form onSubmit={handleSubmit}>

        <input
          autoFocus
          placeholder="Email or username"
          value={identifier}
          onChange={(e) =>
            setIdentifier(
              e.target.value.trimStart().toLowerCase()
            )
          }
          required
        />

        <div className="auth-password">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>

        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

      </form>

      <div className="login-links">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Don’t have an account? Register</Link>
      </div>

      <p className="auth-secure-note">
        Your session is encrypted and protected.
      </p>

    </div>

  );
}