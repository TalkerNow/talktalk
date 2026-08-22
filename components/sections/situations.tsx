import type { LandingContent, Situation } from "@/lib/content/types";
import { TalkerMark } from "@/components/brand/mark";

export function Situations({ content }: { content: LandingContent }) {
  return (
    <section id="situations" className="scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[13px] tracking-wide text-muted">Exemples</p>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">
          {content.situationsTitle}
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-8 text-muted">
          {content.situationsBody}
        </p>

        <div className="relative mx-auto mt-16 h-[540px] max-w-3xl">
          {content.situations.map((situation, index) => (
            <div
              key={situation.id}
              className="absolute left-1/2 w-[min(100%,420px)]"
              style={{
                top: index * 46,
                transform: `translateX(calc(-50% + ${(index - 1) * 28}px)) rotate(${(index - 1) * 2.4}deg)`,
                zIndex: index + 1,
              }}
            >
              <SiteWindow situation={situation} />
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-3">
          {content.situations.map((situation) => (
            <li key={situation.id}>
              <p className="text-[12px] tracking-wide text-muted-2">
                {situation.label}
              </p>
              <p className="mt-1 text-[15px] font-medium">{situation.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SiteWindow({ situation }: { situation: Situation }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_18px_50px_rgba(22,19,16,0.12)]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-[#e4ddd4]" />
        <span className="size-2 rounded-full bg-[#e4ddd4]" />
        <span className="size-2 rounded-full bg-[#e4ddd4]" />
        <span className="ml-2 truncate text-[11px] text-muted-2">
          {situation.siteName.toLowerCase().replace(/ /g, "")}.fr
        </span>
      </div>
      <div className="grid grid-cols-[1fr_150px] gap-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-2">
            {situation.siteKind === "resto"
              ? "Carte du soir"
              : situation.siteKind === "plombier"
                ? "Intervention"
                : "Le cabinet"}
          </p>
          <p className="mt-2 font-serif text-2xl leading-tight">
            {situation.siteName}
          </p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-4/5 rounded bg-[#efe8de]" />
            <div className="h-2 w-3/5 rounded bg-[#efe8de]" />
            <div className="h-2 w-2/3 rounded bg-[#efe8de]" />
          </div>
        </div>
        <div className="rounded-xl border border-line bg-background p-2">
          <div className="mb-2 flex items-center gap-1.5">
            <TalkerMark className="size-4" />
            <span className="text-[10px] font-medium">Talker</span>
          </div>
          <p className="rounded-lg bg-[#f1ece5] px-2 py-1.5 text-[10px] leading-4">
            {situation.botLine}
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {situation.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line px-2 py-0.5 text-center text-[9px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
