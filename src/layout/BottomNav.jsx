import { NavLink } from "react-router-dom";
import {
  Home,
  ListChecks,
  Wallet,
  User
} from "lucide-react";

import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Primary">
      <NavLink to="/" end className="nav-item">
        <Home size={22} />
        <span>Feed</span>
      </NavLink>

      <NavLink to="/calls" className="nav-item">
        <ListChecks size={22} />
        <span>Calls</span>
      </NavLink>

      <NavLink to="/wallet" className="nav-item">
        <Wallet size={22} />
        <span>Wallet</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
