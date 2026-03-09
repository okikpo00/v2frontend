import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomNav from "./BottomNav";
import SlipContainer from "../components/slip/SlipContainer";
import SlipSuccessTicket from "../components/slip/SlipSuccessTicket";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">

      <TopBar />

      <main className="app-main">
        <Outlet />
      </main>

      {/* 🔥 Persistent Betting Slip System */}
      <SlipContainer />
      <SlipSuccessTicket />

      <BottomNav />

    </div>
  );
}