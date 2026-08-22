"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type TalkerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openTalker: () => void;
  closeTalker: () => void;
  resetKey: number;
};

const TalkerContext = createContext<TalkerContextValue | null>(null);

export function TalkerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const openTalker = useCallback(() => {
    setOpen(true);
  }, []);

  const closeTalker = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetOpen = useCallback((next: boolean) => {
    setOpen(next);
    if (next) {
      setResetKey((key) => key);
    }
  }, []);

  const value = useMemo(
    () => ({
      open,
      setOpen: handleSetOpen,
      openTalker,
      closeTalker,
      resetKey,
    }),
    [open, handleSetOpen, openTalker, closeTalker, resetKey],
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
