/* =========================
   APPLY THEME BEFORE REACT
========================= */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("theme-dark");
  document.documentElement.classList.remove("theme-light");
} else {
  document.documentElement.classList.add("theme-light");
  document.documentElement.classList.remove("theme-dark");
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthProvider";

/* 🔒 Global style system */
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";

/* ❌ DO NOT FORCE A THEME HERE */
/* theme-dark.css and theme-light.css are BOTH loaded via variables */
import "./styles/theme-dark.css";
import "./styles/theme-light.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);