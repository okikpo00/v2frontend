import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import authService from "../../auth/auth.service";
import "../../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    referral_code: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("You must accept the Terms & Conditions to continue.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim().toLowerCase(),
        email: form.email.trim(),
        password: form.password,
        referral_code: form.referral_code || undefined,
        country_code: "NG",
      });

     navigate("/verify-email?sent=1");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Create account</h2>
      <p>Set up your account to start using Trebetta.</p>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          placeholder="john"
          value={form.first_name}
          onChange={(e) => update("first_name", e.target.value)}
          required
        />

        <input
          placeholder="doe"
          value={form.last_name}
          onChange={(e) => update("last_name", e.target.value)}
          required
        />

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            update(
              "username",
              e.target.value.replace(/\s/g, "").toLowerCase()
            )
          }
          required
        />

        <input
          type="email"
          placeholder="johndoe@gmail.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />

        {/* Country — locked */}
        <div className="auth-country">
          <span className="flag">🇳🇬</span>
          <span>Nigeria</span>
        </div>

        {/* Password */}
        <div className="auth-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
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

        {/* Confirm Password */}
        <div className="auth-password">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={form.confirm_password}
            onChange={(e) => update("confirm_password", e.target.value)}
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

        <input
          placeholder="Referral code (optional)"
          value={form.referral_code}
          onChange={(e) => update("referral_code", e.target.value)}
        />

        {/* Terms */}
        <label className="auth-check">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <span className="box" />
          <span>
            I am 18+ and accept the{" "}
            <Link to="/terms">Terms & Conditions</Link>
          </span>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}