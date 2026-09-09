const { parseTranscript, nextMessageSeq } = await import(
  new URL("../lib/talker/transcript.ts", import.meta.url).href
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(parseTranscript(null) === null, "empty raw is null");
assert(parseTranscript("{") === null, "invalid json is null");
assert(parseTranscript(JSON.stringify({ v: 2, mode: "llm", messages: [] })) === null, "bad version");
assert(
  parseTranscript(
    JSON.stringify({
      v: 1,
      mode: "llm",
      messages: [{ id: "m0", from: "bot", text: "   " }],
    }),
  ) === null,
  "blank messages rejected",
);

const saved = parseTranscript(
  JSON.stringify({
    v: 1,
    mode: "scripted",
    stepId: "horaires",
    messages: [
      { id: "m0", from: "bot", text: "Bonjour" },
      { id: "u-2", from: "user", text: "Horaires ?" },
      { id: "noise", from: "system", text: "drop" },
    ],
  }),
);

assert(saved?.mode === "scripted", "mode kept");
assert(saved?.stepId === "horaires", "step kept");
assert(saved?.messages.length === 2, "invalid rows dropped");
assert(nextMessageSeq(saved.messages) === 2, "seq from last numeric id");

console.log("smoke-talker-session: ok");
