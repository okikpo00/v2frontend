import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  LogOut,
  HelpCircle,
  Info,
  FileText,
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const [copied, setCopied] = useState(false);

  const initials = user?.display_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const referralCode = user?.referral_code || "—";

  const copyReferral = async () => {
    if (!referralCode || referralCode === "—") return;

    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  };

  return (
    <div className="profile-page">
      {/* =========================
         IDENTITY
      ========================= */}
      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div>
          <h2>{user?.display_name}</h2>
          <p className="muted">@{user?.username}</p>
        </div>
      </div>

      {/* =========================
         ACCOUNT STATUS
      ========================= */}
      <div className="profile-section">
        <div className="row">
          <Mail size={18} />
          <span>{user?.email}</span>
          {user?.email_verified && (
            <ShieldCheck size={16} className="success" />
          )}
        </div>
      </div>

      {/* =========================
         REFERRAL
      ========================= */}
      <div className="profile-section">
        <div className="row">
          <span>Referral code</span>

          <span className="referral-code">{referralCode}</span>

          <button
            className="copy-btn"
            onClick={copyReferral}
            aria-label="Copy referral code"
            disabled={referralCode === "—"}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <div className="referral-note">
          Share this code with friends to earn rewards when they join Trebetta.
        </div>
      </div>

      {/* =========================
         ACTIONS
      ========================= */}
      <div className="profile-section">
        <button className="row danger" onClick={() => setShowLogout(true)}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>

      {/* =========================
         HELP & LEGAL
      ========================= */}
      <div className="profile-section">
        <button className="row" onClick={() => navigate("/support")}>
          <HelpCircle size={18} />
          <span>Support</span>
          <ChevronRight size={16} />
        </button>

        <button className="row" onClick={() => navigate("/how-it-works")}>
          <Info size={18} />
          <span>How Trebetta Works</span>
          <ChevronRight size={16} />
        </button>

        <button className="row" onClick={() => navigate("/terms")}>
          <FileText size={18} />
          <span>Terms & Conditions</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="profile-note">
        Your account activity is monitored for security.
      </p>

      {/* =========================
         LOGOUT CONFIRM
      ========================= */}
      <ConfirmModal
        open={showLogout}
        title="Log out"
        message="Are you sure you want to log out of your account?"
        confirmText="Log out"
        onCancel={() => setShowLogout(false)}
        onConfirm={logout}
      />
    </div>
  );
}