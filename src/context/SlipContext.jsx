import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";
import api from "../api";
import { useAuth } from "../auth/AuthProvider";

const STORAGE_KEY = "trebetta_slip_v3";

const SlipContext = createContext(null);

export function SlipProvider({ children }) {

  const { isAuthenticated, booting } = useAuth();

  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState([]);
  const [stake, setStake] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successSlip, setSuccessSlip] = useState(null);

  const hydrated = useRef(false);
  const saving = useRef(false);
  const saveTimer = useRef(null);

  /* =========================
     HYDRATE (AUTH AWARE)
  ========================= */
  useEffect(() => {

    if (booting) return;

    async function hydrate() {

      if (isAuthenticated) {

        try {

          const res = await api.get("/curated/draft");
          const draft = res.data.data;

          if (draft?.entries?.length) {

            // ✅ Deduplicate by question_id (critical)
            const map = new Map();
            draft.entries.forEach(e => {
              map.set(e.question_id, e);
            });

            setEntries(Array.from(map.values()));
            setStake(draft.stake || "");

          } else {
            setEntries([]);
            setStake("");
          }

        } catch {
          setEntries([]);
          setStake("");
        }

      } else {

        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return;

          const parsed = JSON.parse(raw);

          if (parsed?.version === 3) {
            setEntries(parsed.entries || []);
            setStake(parsed.stake || "");
          }

        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }

      }

      hydrated.current = true;
    }

    hydrate();

  }, [booting, isAuthenticated]);

  /* =========================
     LOCAL SAVE (GUEST)
  ========================= */
  useEffect(() => {

    if (!hydrated.current) return;
    if (isAuthenticated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 3,
          entries,
          stake
        })
      );
    } catch {}

  }, [entries, stake, isAuthenticated]);

  /* =========================
     BACKEND SAVE (AUTH)
  ========================= */
  useEffect(() => {

    if (!hydrated.current) return;
    if (!isAuthenticated) return;
    if (saving.current) return;

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(async () => {

      try {

        // Don't save empty draft
        if (!entries.length && !stake) return;

        saving.current = true;

        await api.post("/curated/draft", {
          stake: Number(stake) || 0,
          entries: entries.map(e => ({
            question_id: e.question_id,
            side: e.side
          }))
        });

      } catch {
        // silent fail
      } finally {
        saving.current = false;
      }

    }, 500);

    return () => clearTimeout(saveTimer.current);

  }, [entries, stake, isAuthenticated]);

  /* =========================
     ADD / TOGGLE
  ========================= */
  function addSelection(q, side) {

    if (!q?.id) return;

    setEntries(prev => {

      const exists = prev.find(
        e => e.question_id === q.id
      );

      const odds =
        side === "yes"
          ? Number(q.yes_odds)
          : Number(q.no_odds);

      if (!odds || isNaN(odds)) return prev;

      // Toggle same side
      if (exists && exists.side === side) {
        return prev.filter(
          e => e.question_id !== q.id
        );
      }

      // Switch side
      if (exists) {
        return prev.map(e =>
          e.question_id === q.id
            ? { ...e, side, odds }
            : e
        );
      }

      // Add new
      return [
        ...prev,
        {
          question_id: q.id,
          uuid: q.uuid,
          title: q.title,
          side,
          odds,
          added_at: Date.now()
        }
      ];
    });
  }

  function removeSelection(id) {
    setEntries(prev =>
      prev.filter(e => e.question_id !== id)
    );
  }

  async function clearSlip() {

    setEntries([]);
    setStake("");
    setError(null);
    setExpanded(false);

    if (isAuthenticated) {
      try {
        await api.delete("/curated/draft");
      } catch {}
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /* =========================
     COMPUTATIONS
  ========================= */
  const totalOdds = useMemo(() => {
    if (!entries.length) return 0;

    if (entries.length === 1) {
      return Number(entries[0].odds || 0);
    }

    return entries.reduce(
      (acc, e) => acc * Number(e.odds || 1),
      1
    );
  }, [entries]);

  const potentialPayout = useMemo(() => {
    if (!stake || !entries.length) return 0;

    const numericStake = Number(stake);
    if (isNaN(numericStake)) return 0;

    return numericStake * totalOdds;
  }, [stake, totalOdds, entries]);

  return (
    <SlipContext.Provider
      value={{
        entries,
        stake,
        setStake,
        addSelection,
        removeSelection,
        clearSlip,
        totalOdds,
        potentialPayout,
        expanded,
        setExpanded,
        loading,
        setLoading,
        error,
        setError,
        successSlip,
        setSuccessSlip
      }}
    >
      {children}
    </SlipContext.Provider>
  );
}

export function useSlip() {
  return useContext(SlipContext);
}