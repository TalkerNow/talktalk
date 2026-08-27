import { TalkerMark, TalkerWordmark } from "@/components/brand/mark";
import type { Messages } from "@/lib/i18n/fr";
import { cn } from "@/lib/utils";
import { ChatPanel } from "./chat-panel";
import { DesktopWindow } from "./desktop-window";

type Copy = Messages["installer"]["vignette"];

export function ChatScene({ copy }: { copy: Copy }) {
  return (
    <DesktopWindow
      app="chat"
      className="left-0 top-[6%] z-30 w-[min(100%,320px)] md:w-[min(42%,340px)]"
      innerClassName="h-[240px] md:h-[400px] lg:h-[460px]"
    >
      <ChatPanel copy={copy} compact />
    </DesktopWindow>
  );
}

export function BrowserScene({ copy }: { copy: Copy }) {
  return (
    <DesktopWindow
      app="browser"
      className="left-[14%] top-[3%] z-10 w-[78%] md:left-[18%] md:w-[72%]"
      innerClassName="h-[250px] md:h-[410px] lg:h-[470px]"
      header={
        <div className="flex min-w-0 flex-1 items-center gap-1 pr-2">
          <span className="truncate rounded-t-md bg-white px-2 py-0.5 text-[8px] text-[#111111] shadow-sm md:text-[11px]">
            {copy.tab}
          </span>
        </div>
      }
    >
      <div className="relative flex h-full flex-col bg-[#F7F6F4]">
        <div className="flex items-center gap-2 border-b border-black/8 bg-[#F1F3F4] px-2 py-1.5">
          <span className="hidden text-[#6B6B73] sm:inline">
            <ChromeNavIcons />
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] text-[#3c4043] md:text-[12px]">
            <LockIcon />
            <span data-v="address" className="truncate">
              {copy.address}
            </span>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div data-v="page-talker" className="absolute inset-0">
            <MiniTalkerSite copy={copy} />
          </div>
          <div data-v="page-live" className="absolute inset-0 opacity-0">
            <MiniLiveSite copy={copy} />
          </div>
        </div>

        <div
          data-v="shelf"
          className="absolute inset-x-2 bottom-2 z-10 flex items-center gap-2 rounded-lg border border-black/8 bg-white px-2 py-1.5 opacity-0 shadow-[0_8px_24px_rgba(17,17,17,0.12)] md:inset-x-3 md:px-3"
        >
          <ZipGlyph />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-medium text-[#111111] md:text-[12px]">
              {copy.downloadFile}
            </p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#EDEBE3]">
              <div
                data-v="progress"
                className="h-full origin-left rounded-full bg-[#1B5FA8]"
              />
            </div>
          </div>
          <span
            data-v="download-done"
            className="text-[9px] text-[#1F7A4D] opacity-0 md:text-[11px]"
          >
            {copy.downloadDone}
          </span>
        </div>
      </div>
    </DesktopWindow>
  );
}

export function WpAdminScene({ copy }: { copy: Copy }) {
  return (
    <DesktopWindow
      app="wp"
      className="top-[10%] right-0 z-[5] w-[68%] opacity-0 md:w-[60%]"
      innerClassName="h-[230px] md:h-[380px] lg:h-[430px]"
    >
      <div className="flex h-full bg-[#f0f0f1]">
        <aside className="flex w-[72px] shrink-0 flex-col bg-[#1d2327] text-[8px] text-[#c3c4c7] md:w-[132px] md:text-[11px]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-2 py-2 md:px-3">
            <WpMark />
            <span className="hidden font-medium text-white md:inline">
              WordPress
            </span>
          </div>
          <WpItem label={copy.menuDash} />
          <WpItem label={copy.menuPosts} />
          <WpItem label={copy.menuPlugins} current />
          <WpItem label={copy.menuAppearance} />
        </aside>
        <div className="relative min-w-0 flex-1">
          <div className="border-b border-black/8 bg-white px-3 py-2">
            <p className="text-[8px] text-[#646970] md:text-[10px]">
              {copy.wpScreen} › {copy.wpAdd}
            </p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <h3 className="text-[12px] font-semibold text-[#1d2327] md:text-[16px]">
                {copy.wpTitle}
              </h3>
              <span className="rounded-sm bg-[#2271b1] px-2 py-0.5 text-[8px] text-white md:text-[10px]">
                {copy.wpUpload}
              </span>
            </div>
          </div>

          <div data-v="wp-upload" className="absolute inset-x-0 top-[52px] bottom-0 p-3 md:top-[64px]">
            <div
              data-v="dropzone"
              className="flex h-full flex-col items-center justify-center rounded-md border-2 border-dashed border-[#c3c4c7] bg-white px-3 text-center"
            >
              <p
                data-v="drop-hint"
                className="text-[10px] text-[#646970] md:text-[13px]"
              >
                {copy.wpDrop}
              </p>
              <p className="mt-1 hidden text-[10px] text-[#8c8f94] md:block">
                {copy.wpHint}
              </p>
              <div
                data-v="drop-file"
                className="mt-2 flex items-center gap-2 rounded-md border border-black/10 bg-[#F7F6F4] px-2 py-1 opacity-0"
              >
                <ZipGlyph />
                <span className="text-[10px] font-medium text-[#111111] md:text-[12px]">
                  {copy.downloadFile}
                </span>
              </div>
              <span
                data-v="wp-install"
                className="mt-3 rounded-sm bg-[#2271b1] px-3 py-1 text-[10px] font-medium text-white opacity-0 md:text-[12px]"
              >
                {copy.wpInstall}
              </span>
            </div>
          </div>

          <div
            data-v="wp-installed"
            className="absolute inset-x-0 top-[52px] bottom-0 p-3 opacity-0 md:top-[64px]"
          >
            <div
              data-v="wp-row"
              className="flex items-center justify-between gap-2 rounded-md border border-black/8 bg-white px-3 py-2 opacity-0"
            >
              <div className="flex min-w-0 items-center gap-2">
                <TalkerMark className="size-7 shrink-0 md:size-8" />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#1d2327] md:text-[14px]">
                    {copy.wpPlugin}
                  </p>
                  <p className="truncate text-[9px] text-[#646970] md:text-[11px]">
                    {copy.downloadFile}
                  </p>
                </div>
              </div>
              <span
                data-v="wp-activate"
                className="shrink-0 rounded-sm bg-[#2271b1] px-2 py-1 text-[10px] font-medium text-white md:text-[12px]"
              >
                {copy.wpActivate}
              </span>
            </div>
            <div
              data-v="wp-notice"
              className="mt-2 rounded-sm border-l-4 border-[#1F7A4D] bg-[#E8F4EC] px-3 py-2 text-[10px] text-[#1F7A4D] opacity-0 md:text-[12px]"
            >
              {copy.wpNotice}
            </div>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}

export function DemoCursor() {
  return (
    <div
      data-v="cursor"
      className="pointer-events-none absolute top-0 left-0 z-50 origin-top-left opacity-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.28)]"
    >
      <svg
        data-v="cursor-arrow"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M4.2 2.4v16.6l4.1-3.7 2.7 6.4 2.5-1.1-2.8-6.5 5.6-.1z"
          fill="#111111"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        data-v="cursor-hand"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="absolute top-0 left-0 opacity-0"
      >
        <path
          d="M8 11V6.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V11m0-2a1.5 1.5 0 0 1 3 0V12.5M8 11c-1.4 0-2.5 1.3-2.5 3 0 3.2 2.2 6.5 6.5 6.5h1c2.8 0 5-1.8 5-4.5V12.5"
          stroke="#111111"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

export function FlyingZip({ label }: { label: string }) {
  return (
    <div
      data-v="zip"
      className="pointer-events-none absolute top-0 left-0 z-40 flex items-center gap-1.5 rounded-md border border-black/10 bg-white px-2 py-1 opacity-0 shadow-[0_10px_28px_rgba(17,17,17,0.16)]"
    >
      <ZipGlyph />
      <span className="text-[10px] font-medium text-[#111111] md:text-[12px]">
        {label}
      </span>
    </div>
  );
}

function MiniTalkerSite({ copy }: { copy: Copy }) {
  return (
    <div className="relative h-full bg-[#F7F6F4] px-4 pt-3 md:px-6 md:pt-5">
      <TalkerWordmark className="text-[12px] md:text-[16px]" />
      <p className="mt-3 max-w-[16rem] font-display text-[16px] leading-[1.05] font-semibold tracking-tight text-[#111111] md:mt-5 md:max-w-sm md:text-[28px]">
        {copy.siteTitle}
      </p>
      <span
        data-v="site-cta"
        className="mt-3 inline-flex rounded-full bg-[#111111] px-3 py-1.5 text-[10px] text-white md:mt-5 md:px-4 md:py-2 md:text-[12px]"
      >
        {copy.siteCta}
      </span>
      <div className="absolute right-3 bottom-16 flex flex-col items-end gap-1.5 md:right-4 md:bottom-20">
        <div data-v="site-chips" className="flex flex-col items-end gap-1">
          <span className="rounded-full border border-[#C43F17]/35 bg-white px-2 py-0.5 text-[9px] md:text-[11px]">
            {copy.chipTalker}
          </span>
          <span className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[9px] md:text-[11px]">
            {copy.chipQuestion}
          </span>
        </div>
        <TalkerMark className="size-10 drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)] md:size-12" />
      </div>
    </div>
  );
}

function MiniLiveSite({ copy }: { copy: Copy }) {
  return (
    <div className="relative h-full bg-white">
      <div className="flex items-center justify-between border-b border-black/8 px-4 py-2">
        <span className="text-[11px] font-semibold text-[#111111] md:text-[14px]">
          {copy.liveTitle}
        </span>
        <span className="text-[9px] text-[#6B6B73] md:text-[11px]">
          {copy.liveHost}
        </span>
      </div>
      <div className="space-y-2 px-4 pt-4 md:pt-6">
        <div className="h-2.5 w-2/3 rounded-full bg-[#EDEBE3]" />
        <div className="h-2 w-full rounded-full bg-[#F1ECE5]" />
        <div className="h-2 w-5/6 rounded-full bg-[#F1ECE5]" />
        <p className="pt-2 text-[10px] text-[#6B6B73] md:text-[12px]">
          {copy.liveBody}
        </p>
      </div>
      <div
        data-v="live-bubble"
        className="absolute right-3 bottom-16 opacity-0 md:right-4 md:bottom-20"
      >
        <div className="relative">
          <span className="talker-ripple is-on" />
          <TalkerMark className="size-11 drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)] md:size-14" />
          <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-[#E11D48] text-[9px] font-semibold text-white">
            1
          </span>
        </div>
      </div>
    </div>
  );
}

function WpItem({ label, current = false }: { label: string; current?: boolean }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 md:px-3",
        current ? "bg-[#2271b1] text-white" : "hover:bg-white/5",
      )}
    >
      {label}
    </div>
  );
}

function ZipGlyph() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded bg-[#111111] text-[8px] font-bold text-white md:size-6 md:text-[9px]">
      zip
    </span>
  );
}

function WpMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 text-white md:size-4" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        fill="#1d2327"
        d="M7.2 16.4 12 6.8l2.1 5.3H9.6L12 16.4h2.8L12 9.4 7.2 16.4Z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-[#6B6B73] md:size-3" aria-hidden>
      <path
        fill="currentColor"
        d="M9.5 5H9V3.8A3 3 0 0 0 6 .8 3 3 0 0 0 3 3.8V5h-.5A.5.5 0 0 0 2 5.5v5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5ZM4.2 3.8A1.8 1.8 0 0 1 6 2a1.8 1.8 0 0 1 1.8 1.8V5H4.2Z"
      />
    </svg>
  );
}

function ChromeNavIcons() {
  return (
    <svg viewBox="0 0 48 12" className="h-3 w-12" aria-hidden>
      <path
        d="M8 2.2 3.4 6 8 9.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16 2.2 20.6 6 16 9.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M32 3.2a4 4 0 1 1-1.2 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
