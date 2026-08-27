"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/components/i18n/locale-context";
import {
  BrowserScene,
  ChatScene,
  DemoCursor,
  FlyingZip,
  WpAdminScene,
} from "./scenes";

gsap.registerPlugin(useGSAP);

function point(root: HTMLElement, sel: string, ax = 0.5, ay = 0.5) {
  const el = root.querySelector(sel);
  if (!el) return { x: 0, y: 0 };
  const a = root.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return {
    x: b.left - a.left + b.width * ax,
    y: b.top - a.top + b.height * ay,
  };
}

function pose(vars: gsap.TweenVars) {
  return { duration: 0.75, ease: "power3.out" as const, ...vars };
}

export function InstallerVignette() {
  const { t, locale } = useLocale();
  const copy = t.installer.vignette;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};
          const q = (sel: string) => root.querySelector(sel);

          const chat = q('[data-v="chat"]');
          const browser = q('[data-v="browser"]');
          const wp = q('[data-v="wp"]');
          const cursor = q('[data-v="cursor"]');
          const arrow = q('[data-v="cursor-arrow"]');
          const hand = q('[data-v="cursor-hand"]');
          const zip = q('[data-v="zip"]');
          const chips = q('[data-v="chat-chips"]');
          const user = q('[data-v="chat-user"]');
          const typing = q('[data-v="chat-typing"]');
          const reply = q('[data-v="chat-reply"]');
          const shelf = q('[data-v="shelf"]');
          const progress = q('[data-v="progress"]');
          const done = q('[data-v="download-done"]');
          const dropzone = q('[data-v="dropzone"]');
          const dropHint = q('[data-v="drop-hint"]');
          const dropFile = q('[data-v="drop-file"]');
          const install = q('[data-v="wp-install"]');
          const upload = q('[data-v="wp-upload"]');
          const installed = q('[data-v="wp-installed"]');
          const row = q('[data-v="wp-row"]');
          const notice = q('[data-v="wp-notice"]');
          const pageTalker = q('[data-v="page-talker"]');
          const pageLive = q('[data-v="page-live"]');
          const liveBubble = q('[data-v="live-bubble"]');
          const address = q('[data-v="address"]');

          const still = () => {
            gsap.set(chat, {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              zIndex: 30,
            });
            gsap.set(browser, {
              x: 0,
              y: 0,
              scale: 0.97,
              autoAlpha: 1,
              filter: "blur(1.5px)",
              zIndex: 8,
            });
            gsap.set(wp, { autoAlpha: 0, scale: 0.9, filter: "blur(8px)" });
            gsap.set([cursor, zip, user, typing, reply, shelf, installed], {
              autoAlpha: 0,
            });
            gsap.set([chips, pageTalker], { autoAlpha: 1 });
            gsap.set(pageLive, { autoAlpha: 0 });
            gsap.set([dropFile, install, notice], { autoAlpha: 0 });
            gsap.set(hand, { autoAlpha: 0 });
            gsap.set(arrow, { autoAlpha: 1 });
          };

          if (!isDesktop || reduceMotion) {
            still();
            return;
          }

          const chipAt = point(root, '[data-v="chip-talker"]', 0.6, 0.55);
          const ctaAt = point(root, '[data-v="site-cta"]', 0.65, 0.5);
          const shelfAt = point(root, '[data-v="shelf"]', 0.22, 0.5);
          const dropAt = point(root, '[data-v="dropzone"]', 0.5, 0.45);
          const installAt = point(root, '[data-v="wp-install"]', 0.5, 0.5);
          const activateAt = point(root, '[data-v="wp-activate"]', 0.5, 0.5);

          const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "power2.out" },
          });

          const reset = () => {
            gsap.set(chat, {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              zIndex: 30,
            });
            gsap.set(browser, {
              x: 18,
              y: 8,
              scale: 0.94,
              autoAlpha: 0.78,
              filter: "blur(3px)",
              zIndex: 8,
            });
            gsap.set(wp, {
              x: 48,
              y: 12,
              scale: 0.9,
              autoAlpha: 0,
              filter: "blur(8px)",
              zIndex: 4,
            });
            gsap.set(cursor, {
              x: chipAt.x - 40,
              y: chipAt.y + 80,
              scale: 1,
              autoAlpha: 0,
              rotation: 0,
              transformOrigin: "0% 0%",
            });
            gsap.set(arrow, { autoAlpha: 1 });
            gsap.set(hand, { autoAlpha: 0 });
            gsap.set(zip, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
            gsap.set(chips, { autoAlpha: 1, scale: 1 });
            gsap.set([user, typing, reply], { autoAlpha: 0, y: 10 });
            gsap.set(shelf, { autoAlpha: 0, y: 16 });
            gsap.set(progress, { scaleX: 0, transformOrigin: "0% 50%" });
            gsap.set(done, { autoAlpha: 0 });
            gsap.set(dropHint, { autoAlpha: 1 });
            gsap.set([dropFile, install], { autoAlpha: 0 });
            gsap.set(upload, { autoAlpha: 1 });
            gsap.set(installed, { autoAlpha: 0 });
            gsap.set([row, notice], { autoAlpha: 0, y: 8 });
            gsap.set(pageTalker, { autoAlpha: 1 });
            gsap.set(pageLive, { autoAlpha: 0 });
            gsap.set(liveBubble, { autoAlpha: 0, scale: 0.4 });
            gsap.set(dropzone, {
              borderColor: "#c3c4c7",
              backgroundColor: "#ffffff",
            });
            if (address) address.textContent = copy.address;
          };

          reset();
          tl.call(reset, undefined, 0);

          tl.to(cursor, { autoAlpha: 1, duration: 0.35 }, 0.35);
          tl.to(cursor, { ...chipAt, duration: 0.7, ease: "power3.out" }, 0.5);
          tl.to(cursor, { scale: 0.84, duration: 0.08 }, 1.25);
          tl.to(q('[data-v="chip-talker"]'), { scale: 0.96, duration: 0.08 }, 1.25);
          tl.to(cursor, { scale: 1, duration: 0.12 }, 1.35);
          tl.to(q('[data-v="chip-talker"]'), { scale: 1, duration: 0.12 }, 1.35);

          tl.to(chips, { autoAlpha: 0, duration: 0.2 }, 1.45);
          tl.to(user, { autoAlpha: 1, y: 0, duration: 0.28 }, 1.5);
          tl.to(typing, { autoAlpha: 1, y: 0, duration: 0.22 }, 1.85);
          tl.to(typing, { autoAlpha: 0, duration: 0.15 }, 2.85);
          tl.to(reply, { autoAlpha: 1, y: 0, duration: 0.35 }, 2.95);

          tl.to(
            chat,
            pose({
              x: -28,
              y: 18,
              scale: 0.86,
              autoAlpha: 0.55,
              filter: "blur(4px)",
              zIndex: 6,
            }),
            4.1,
          );
          tl.to(
            browser,
            pose({
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              zIndex: 24,
            }),
            4.1,
          );
          tl.to(
            wp,
            pose({
              autoAlpha: 0.35,
              x: 28,
              scale: 0.92,
              filter: "blur(6px)",
              zIndex: 5,
            }),
            4.1,
          );

          tl.to(cursor, { ...ctaAt, duration: 0.7, ease: "power3.out" }, 4.7);
          tl.to(cursor, { scale: 0.84, duration: 0.08 }, 5.4);
          tl.to(q('[data-v="site-cta"]'), { scale: 0.96, duration: 0.08 }, 5.4);
          tl.to(cursor, { scale: 1, duration: 0.12 }, 5.5);
          tl.to(q('[data-v="site-cta"]'), { scale: 1, duration: 0.12 }, 5.5);

          tl.to(shelf, { autoAlpha: 1, y: 0, duration: 0.35 }, 5.6);
          tl.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.85,
              ease: "power1.inOut",
              transformOrigin: "0% 50%",
            },
            5.7,
          );
          tl.to(done, { autoAlpha: 1, duration: 0.2 }, 6.5);

          tl.to(
            wp,
            pose({
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              zIndex: 26,
            }),
            7.05,
          );
          tl.to(
            browser,
            pose({
              x: -36,
              y: 10,
              scale: 0.9,
              autoAlpha: 0.62,
              filter: "blur(3.5px)",
              zIndex: 10,
            }),
            7.05,
          );
          tl.to(
            chat,
            pose({
              x: -40,
              scale: 0.82,
              autoAlpha: 0.35,
              filter: "blur(6px)",
              zIndex: 4,
            }),
            7.05,
          );

          tl.to(cursor, { ...shelfAt, duration: 0.55 }, 7.7);
          tl.set(
            zip,
            { x: shelfAt.x - 18, y: shelfAt.y - 10, autoAlpha: 1, scale: 1 },
            8.15,
          );
          tl.to(arrow, { autoAlpha: 0, duration: 0.12 }, 8.15);
          tl.to(hand, { autoAlpha: 1, duration: 0.12 }, 8.15);

          tl.to(cursor, { ...dropAt, duration: 1.05, ease: "power2.inOut" }, 8.3);
          tl.to(
            zip,
            {
              x: dropAt.x - 24,
              y: dropAt.y - 12,
              duration: 1.05,
              ease: "power2.inOut",
            },
            8.3,
          );
          tl.to(
            dropzone,
            { borderColor: "#C43F17", backgroundColor: "#FAEDE7", duration: 0.2 },
            9.2,
          );
          tl.to(zip, { autoAlpha: 0, scale: 0.8, duration: 0.2 }, 9.35);
          tl.to(hand, { autoAlpha: 0, duration: 0.12 }, 9.35);
          tl.to(arrow, { autoAlpha: 1, duration: 0.12 }, 9.35);
          tl.to(dropHint, { autoAlpha: 0, duration: 0.15 }, 9.4);
          tl.to([dropFile, install], { autoAlpha: 1, duration: 0.25 }, 9.45);

          tl.to(cursor, { ...installAt, duration: 0.45 }, 9.9);
          tl.to(cursor, { scale: 0.84, duration: 0.08 }, 10.35);
          tl.to(cursor, { scale: 1, duration: 0.12 }, 10.45);

          tl.to(upload, { autoAlpha: 0, duration: 0.25 }, 10.6);
          tl.to(installed, { autoAlpha: 1, duration: 0.25 }, 10.6);
          tl.to(row, { autoAlpha: 1, y: 0, duration: 0.3 }, 10.7);

          tl.to(cursor, { ...activateAt, duration: 0.45 }, 11.15);
          tl.to(cursor, { scale: 0.84, duration: 0.08 }, 11.6);
          tl.to(cursor, { scale: 1, duration: 0.12 }, 11.7);
          tl.to(notice, { autoAlpha: 1, y: 0, duration: 0.3 }, 11.85);

          tl.to(
            browser,
            pose({
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              filter: "blur(0px)",
              zIndex: 28,
            }),
            12.35,
          );
          tl.to(
            wp,
            pose({
              x: 36,
              scale: 0.9,
              autoAlpha: 0.4,
              filter: "blur(5px)",
              zIndex: 8,
            }),
            12.35,
          );
          tl.call(() => {
            if (address) address.textContent = copy.liveHost;
          }, undefined, 12.4);
          tl.to(pageTalker, { autoAlpha: 0, duration: 0.35 }, 12.45);
          tl.to(pageLive, { autoAlpha: 1, duration: 0.35 }, 12.45);
          tl.to(
            liveBubble,
            { autoAlpha: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)" },
            12.75,
          );

          tl.to(
            [chat, browser, wp, cursor],
            { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" },
            14.6,
          );

          const onVis = () => {
            if (document.hidden) tl.pause();
            else tl.resume();
          };
          document.addEventListener("visibilitychange", onVis);
          const io = new IntersectionObserver(
            ([entry]) => {
              if (!entry) return;
              if (entry.isIntersecting && !document.hidden) tl.resume();
              else tl.pause();
            },
            { threshold: 0.2 },
          );
          io.observe(root);

          return () => {
            document.removeEventListener("visibilitychange", onVis);
            io.disconnect();
          };
        },
        root,
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale, copy.address, copy.liveHost], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={copy.ariaLabel}
      className="relative mx-auto mt-14 w-full max-w-[1080px] lg:mt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-8%] rounded-[40px] bg-[radial-gradient(ellipse_at_50%_18%,rgba(255,255,255,0.95),transparent_62%)]"
      />
      <div className="relative h-[300px] overflow-visible md:h-[460px] lg:h-[540px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <BrowserScene copy={copy} />
          <WpAdminScene copy={copy} />
          <ChatScene copy={copy} />
          <FlyingZip label={copy.downloadFile} />
          <DemoCursor />
        </div>
      </div>
    </div>
  );
}
