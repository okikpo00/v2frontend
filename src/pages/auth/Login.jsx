import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../auth/AuthProvider";
import { LOGIN_ERRORS, GENERIC_ERROR } from "../../auth/auth.errors";

import "../../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🔑 redirect memory (safe default)
  const from = location.state?.from || "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ identifier, password });
      navigate(from, { replace: true });
    } catch (e) {
      const code = e?.response?.data?.message;
      setError(LOGIN_ERRORS[code] || GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Welcome back</h2>
      <p>Sign in to continue to your account.</p>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          placeholder="Email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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