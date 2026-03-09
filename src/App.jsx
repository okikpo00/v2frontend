import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { SlipProvider } from "./context/SlipContext";



/* AUTH PAGES */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
/* APP PAGES */
import Feed from "./pages/Feed";
import Calls from "./pages/Calls";
import SlipDetails from "./pages/SlipDetails";
import DuelDetails from "./pages/DuelDetails";
import Arena from "./pages/Arena";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import QuestionView from "./pages/QuestionView";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
const router = createBrowserRouter([
  /* =========================
     AUTH ROUTES (NO TOPBAR)
     ========================= */
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
 
    { path: "/verify-email", element: <VerifyEmail /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
  
    ],
  },

  /* =========================
     APP ROUTES
     ========================= */
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Feed /> },
      {
  path: "/questions/:uuid",
  element: <QuestionView />
},
  
      { path: "/how-it-works", element: <HowItWorks /> },

      { path: "/support", element: <Support /> },

      { path: "/terms", element: <Terms /> },

    
      { path: "arena", element: <Arena /> },

      /* 🔒 PROTECTED */
      {
        element: <ProtectedRoute />,
        children: [
          { path: "wallet", element: <Wallet /> },
          { path: "profile", element: <Profile /> },
          { path: "calls", element: <Calls /> },
{ path: "/slip/:uuid", element: <SlipDetails /> },
    { path: "/duel/:uuid", element: <DuelDetails /> },
  {
  path: "/notifications",
  element: <NotificationsPage />
},
        ],
      },
    ],
  },
]);


export default function App() {
  return (
    <AuthProvider>
      <SlipProvider>
        <RouterProvider router={router} />
      </SlipProvider>
    </AuthProvider>
  );
}