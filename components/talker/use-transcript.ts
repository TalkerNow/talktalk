"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import {
  readTranscript,
  subscribeTranscript,
  writeTranscript,
  type TalkerMessage,
  type TalkerTranscript,
} from "@/lib/talker/transcript";

type Draft = {
  messages: TalkerMessage[];
  stepId: string;
};

export function useTalkerTranscript(
  mode: TalkerTranscript["mode"],
  initialMessages: TalkerMessage[],
  initialStepId = "start",
) {
  const persisted = useSyncExternalStore(
    subscribeTranscript,
    readTranscript,
    () => null,
  );
  const matched = persisted?.mode === mode ? persisted : null;
  const [draft, setDraft] = useState<Draft | null>(null);

  const messages = draft?.messages ?? matched?.messages ?? initialMessages;
  const stepId = draft?.stepId ?? matched?.stepId ?? initialStepId;
  const restored = Boolean(!draft && matched);

  const setMessages = useCallback(
    (update: TalkerMessage[] | ((current: TalkerMessage[]) => TalkerMessage[])) => {
      setDraft((prev) => {
        const current = prev?.messages ?? matched?.messages ?? initialMessages;
        const next = typeof update === "function" ? update(current) : update;
        const nextStepId = prev?.stepId ?? matched?.stepId ?? initialStepId;
        writeTranscript({
          v: 1,
          mode,
          messages: next,
          stepId: mode === "scripted" ? nextStepId : undefined,
        });
        return { messages: next, stepId: nextStepId };
      });
    },
    [initialMessages, initialStepId, matched, mode],
  );

  const setStepId = useCallback(
    (nextStepId: string) => {
      setDraft((prev) => {
        const nextMessages = prev?.messages ?? matched?.messages ?? initialMessages;
        writeTranscript({
          v: 1,
          mode,
          messages: nextMessages,
          stepId: mode === "scripted" ? nextStepId : undefined,
        });
        return { messages: nextMessages, stepId: nextStepId };
      });
    },
    [initialMessages, matched, mode],
  );

  return useMemo(
    () => ({
      messages,
      setMessages,
      stepId,
      setStepId,
      restored,
    }),
    [messages, restored, setMessages, setStepId, stepId],
  );
}
