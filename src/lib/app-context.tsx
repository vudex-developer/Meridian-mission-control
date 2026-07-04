"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PersonaId } from "@/lib/types";
import { founders } from "@/data/seed";

interface AppContextValue {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  togglePersona: () => void;
  founder: (typeof founders)[string];
  cmdOpen: boolean;
  setCmdOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<PersonaId>("luke");
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("meridian:persona") : null;
    if (saved === "luke" || saved === "jeff") setPersonaState(saved);
  }, []);

  const setPersona = (p: PersonaId) => {
    setPersonaState(p);
    try {
      window.localStorage.setItem("meridian:persona", p);
    } catch {
      /* ignore */
    }
  };

  const togglePersona = () => setPersona(persona === "luke" ? "jeff" : "luke");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        togglePersona,
        founder: founders[persona],
        cmdOpen,
        setCmdOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
