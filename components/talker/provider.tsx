"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type TalkerIntent = "horaires" | "question" | "rdv";

type TalkerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openTalker: (intent?: TalkerIntent) => void;
  closeTalker: () => void;
  intent: TalkerIntent | null;
  resetKey: number;
};

const TalkerContext = createContext<TalkerContextValue | null>(null);

export function TalkerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<TalkerIntent | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const openTalker = useCallback((nextIntent?: TalkerIntent) => {
    setIntent(nextIntent ?? null);
    setResetKey((key) => key + 1);
    setOpen(true);
  }, []);

  const closeTalker = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetOpen = useCallback((next: boolean) => {
    setOpen(next);
    if (next) {
      setResetKey((key) => key + 1);
    }
  }, []);

  const value = useMemo(
    () => ({
      open,
      setOpen: handleSetOpen,
      openTalker,
      closeTalker,
      intent,
      resetKey,
    }),
    [open, handleSetOpen, openTalker, closeTalker, intent, resetKey],
  );

  return (
    <TalkerContext.Provider value={value}>{children}</TalkerContext.Provider>
  );
}

export function useTalker() {
  const ctx = useContext(TalkerContext);
  if (!ctx) {
    throw new Error("useTalker must be used within TalkerProvider");
  }
  return ctx;
}
