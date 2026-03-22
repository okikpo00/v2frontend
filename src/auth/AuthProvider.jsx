import { createContext, useContext, useEffect, useState } from "react";
import authService from "./auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [booting, setBooting] = useState(true);

  const isAuthenticated = Boolean(user);

  /* =========================
     LOAD USER
  ========================= */

  const loadUser = async () => {
    const res = await authService.getMe();
    const data = res.data.data;

    setUser(data);
   setBalance(data.wallet?.balance || 0);
  };

  /* =========================
     AUTH BOOTSTRAP
  ========================= */

  useEffect(() => {

    let mounted = true;

    const bootstrap = async () => {

      try {

        await authService.refresh();

        const res = await authService.getMe();

        if (!mounted) return;

        const data = res.data.data;

        setUser(data);
        setBalance(data.wallet?.available_balance || 0);

      } catch {

        if (!mounted) return;

        setUser(null);
        setBalance(0);

      } finally {

        if (mounted) setBooting(false);

      }

    };

    bootstrap();

    return () => (mounted = false);

  }, []);

  /* =========================
     REFRESH USER (NEW)
  ========================= */

  const refreshUser = async () => {
    try {
      await loadUser();
    } catch (err) {
      console.log("User refresh failed");
    }
  };

  

  /* =========================
     ACTIONS
  ========================= */

  const login = async (payload) => {

    await authService.login(payload);

    await loadUser();

  };

  const logout = async () => {

    try {

      await authService.logout();

    } finally {

      setUser(null);
      setBalance(0);

    }

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        balance,
        isAuthenticated,
        booting,

        login,
        logout,

        
        refreshUser // ✅ NEW
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;

}