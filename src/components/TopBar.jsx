import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

import "./TopBar.css";

export default function TopBar() {
  const navigate = useNavigate();
  const { isAuthenticated, balance, booting } = useAuth();

  const [theme, setTheme] = useState("light");

  /* =========================
     INIT THEME STATE (ONCE)
     ========================= */
  useEffect(() => {
    const current =
      document.documentElement.classList.contains("theme-dark")
        ? "dark"
        : "light";
    setTheme(current);
  }, []);

  /* =========================
     TOGGLE THEME (PERSISTED)
     ========================= */
  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.remove("theme-dark");
      root.classList.add("theme-light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      root.classList.remove("theme-light");
      root.classList.add("theme-dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="topbar">
      {/* LEFT — WORDMARK (ALWAYS VISIBLE, CLICKABLE) */}
      <Link to="/" className="topbar-wordmark">
        Trebetta
      </Link>

      {/* RIGHT — ACTIONS */}
      <div className="topbar-actions">
        {/* 🌗 THEME TOGGLE — ALWAYS VISIBLE */}
        <button
          className="icon-btn"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* ⏳ WAIT FOR AUTH BOOTSTRAP */}
        {booting ? null : !isAuthenticated ? (
          <>
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Join
            </button>
          </>
        ) : (
          <>
            <button
              className="icon-btn"
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
            >
              <Bell size={18} />
            </button>

            <button
              className="wallet-pill"
              onClick={() => navigate("/wallet")}
            >
              ₦{Number(balance || 0).toLocaleString()}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
