"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { WorkCase } from "@/content/portfolio";

interface ScrollProjectStackProps {
  cases: WorkCase[];
  inspectCta: string;
  screensCountLabel: string;
  onOpenCase: (item: WorkCase, initialScreenIndex?: number) => void;
}

function ScrollAnimatedCard({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.style.opacity = "1";
      card.style.transform = "none";
      return;
    }

    let rafId = 0;

    const update = () => {
      if (!wrapper || !card) return;
      const rect = wrapper.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);

      const enterRaw = (vh * 0.98 - rect.top) / (vh * 0.42);
      const enter = Math.max(0, Math.min(1, enterRaw));
      const eased = 1 - Math.pow(1 - enter, 3);

      const stickyTop = 88 + index * 22;
      let stackScale = 1;
      let stackBrightness = 1;
      if (index < total - 1 && rect.top <= stickyTop + 4) {
        const scrolledPast = Math.min(
          1,
          Math.max(0, (stickyTop + 4 - rect.top) / 380)
        );
        stackScale = 1 - scrolledPast * 0.035;
        stackBrightness = 1 - scrolledPast * 0.14;
      }

      const translateY = (1 - eased) * 56;
      const enterScale = 0.93 + eased * 0.07;
      const rotateX = (1 - eased) * 5.5;
      const finalScale = enterScale * stackScale;

      card.style.opacity = `${0.25 + eased * 0.75}`;
      card.style.transform = `perspective(1200px) translate3d(0, ${translateY.toFixed(
        1
      )}px, 0) scale(${finalScale.toFixed(4)}) rotateX(${rotateX.toFixed(2)}deg)`;
      card.style.filter =
        stackBrightness < 0.99
          ? `brightness(${stackBrightness.toFixed(3)})`
          : "none";
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [index, total]);

  return (
    <div
      ref={wrapperRef}
      style={{ top: `${88 + index * 22}px` }}
      className="lg:sticky"
    >
      <article
        ref={cardRef}
        className="group rounded-3xl border border-cypress-border bg-cypress-elevated p-5 shadow-[0_-18px_48px_-20px_rgba(8,15,13,0.7)] transition-colors duration-300 will-change-transform hover:border-[#4D776A] sm:p-8 lg:p-9"
      >
        {children}
      </article>
    </div>
  );
}

function ProjectCardContent({
  item,
  total,
  inspectCta,
  screensCountLabel,
  onOpenCase,
}: {
  item: WorkCase;
  total: number;
  inspectCta: string;
  screensCountLabel: string;
  onOpenCase: (item: WorkCase, initialScreenIndex?: number) => void;
}) {
  const [screenIdx, setScreenIdx] = useState(0);
  const currentScreen = item.screens[screenIdx] ?? item.screens[0];

  const prevScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenIdx((i) => (i - 1 + item.screens.length) % item.screens.length);
  };

  const nextScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenIdx((i) => (i + 1) % item.screens.length);
  };

  return (
    <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-9">
      {/* Left 5 columns: Authentic project narrative */}
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-cypress px-2.5 py-1 font-mono text-xs font-semibold text-[#E39A74]">
            {item.num} / 0{total}
          </span>
          <span className="rounded-full bg-[#29463D] px-3 py-1 font-mono text-[11px] font-medium text-[#9ED1BE]">
            {item.metricBadge}
          </span>
        </div>

        <p className="mt-3 text-[13px] font-medium text-[#9EB5AC]">
          {item.client} · {item.year}
        </p>

        <h3
          onClick={() => onOpenCase(item, screenIdx)}
          className="mt-2 cursor-pointer text-xl font-bold leading-snug tracking-[-0.025em] text-parchment transition-colors hover:text-[#E39A74] sm:text-[1.6rem]"
        >
          {item.title}
        </h3>

        <p className="mt-3.5 text-[14.5px] leading-[1.7] text-[#D2E0DA]">
          {item.description}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-[1.68] text-[#9EB5AC]">
          {item.detail}
        </p>

        <p className="mt-5 border-t border-cypress-border pt-4 font-mono text-[11px] leading-relaxed text-[#8FB0A3]">
          {item.stackLine}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenCase(item, screenIdx)}
            className="inline-flex items-center gap-2 rounded-xl bg-clay px-4 py-2.5 text-xs font-semibold text-parchment transition-colors hover:bg-clay-hover"
          >
            <span>{inspectCta}</span>
            <span aria-hidden="true">→</span>
          </button>
          {item.liveUrl && item.liveLabel && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#497063] bg-cypress px-3.5 py-2.5 text-xs font-semibold text-[#DCE8E2] transition-colors hover:border-[#E39A74] hover:text-white"
            >
              <span>{item.liveLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          <span className="font-mono text-[11px] text-[#9AB4A9]">
            {item.screens.length} {screensCountLabel}
          </span>
        </div>
      </div>

      {/* Right 7 columns: Real Multi-Screen Project Showcase */}
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-2xl border border-cypress-border bg-[#0E1815] shadow-[0_20px_44px_-18px_rgba(0,0,0,0.65)]">
          {/* Minimal browser chrome bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#13211D] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E39A74]/80" />
            </div>

            <p className="truncate font-mono text-[11px] text-[#B8CCC3]">
              {currentScreen.caption}
            </p>

            <span className="shrink-0 font-mono text-[11px] text-[#8FB0A3]">
              {screenIdx + 1}/{item.screens.length}
            </span>
          </div>

          {/* Real project screenshot */}
          <div
            onClick={() => onOpenCase(item, screenIdx)}
            className="relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-[#0B1310]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentScreen.src}
              alt={currentScreen.caption}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
            />

            {/* Prev / Next arrows overlaid subtly */}
            <button
              type="button"
              onClick={prevScreen}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-xs transition-colors hover:bg-clay"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextScreen}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-xs transition-colors hover:bg-clay"
            >
              ›
            </button>
          </div>

          {/* Thumbnail selector strip */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-white/10 bg-[#121F1B] p-2.5">
            {item.screens.map((scr, idx) => {
              const active = idx === screenIdx;
              return (
                <button
                  key={scr.src}
                  type="button"
                  onClick={() => setScreenIdx(idx)}
                  aria-label={scr.caption}
                  className={`relative h-11 w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${
                    active
                      ? "border-[#E39A74] ring-2 ring-[#E39A74]/40"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={scr.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScrollProjectStack({
  cases,
  inspectCta,
  screensCountLabel,
  onOpenCase,
}: ScrollProjectStackProps) {
  return (
    <div className="mt-12 space-y-8 lg:space-y-12">
      {cases.map((item, idx) => (
        <ScrollAnimatedCard key={item.id} index={idx} total={cases.length}>
          <ProjectCardContent
            item={item}
            total={cases.length}
            inspectCta={inspectCta}
            screensCountLabel={screensCountLabel}
            onOpenCase={onOpenCase}
          />
        </ScrollAnimatedCard>
      ))}
    </div>
  );
}
