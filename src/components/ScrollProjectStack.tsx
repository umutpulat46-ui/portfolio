"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { WorkCase } from "@/content/portfolio";
import { assetUrl } from "@/lib/assetUrl";
import { Brackets, Plate, Tag } from "./ui/Heritage";

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
      <article ref={cardRef} className="group will-change-transform">
        <Plate
          cut={22}
          edge="bg-energon/30 group-hover:bg-energon/75"
          inner="bg-racing"
          innerClassName="p-5 shadow-[0_-20px_54px_-22px_rgba(4,14,10,0.8)] sm:p-8 lg:p-9"
        >
          <div className="pointer-events-none absolute inset-3">
            <Brackets className="border-energon/25" size="h-3.5 w-3.5" />
          </div>
          {children}
        </Plate>
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
    <div className="relative z-10 grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-9">
      {/* Left 5 columns: Authentic project narrative */}
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="chamfer cut-xs bg-racing-3 px-2.5 py-1 font-mono text-xs font-semibold text-energon">
            {item.num} // 0{total}
          </span>
          <span className="chamfer cut-xs border border-energon/25 bg-racing-2/80 px-3 py-1 font-mono text-[11px] font-medium text-mint">
            {item.metricBadge}
          </span>
        </div>

        <p className="mt-3 font-mono text-[12px] uppercase tracking-wider text-mint-2/75">
          {item.client} · {item.year}
        </p>

        <h3
          onClick={() => onOpenCase(item, screenIdx)}
          className="mt-2 cursor-pointer text-xl font-bold leading-snug tracking-[-0.025em] text-ivory transition-colors hover:text-energon sm:text-[1.6rem]"
        >
          {item.title}
        </h3>

        <p className="mt-3.5 text-[14.5px] leading-[1.7] text-mint/90">
          {item.description}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-[1.68] text-mint-2/75">
          {item.detail}
        </p>

        <p className="mt-5 border-t border-energon/15 pt-4 font-mono text-[11px] leading-relaxed text-mint-2/80">
          {item.stackLine}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenCase(item, screenIdx)}
            className="chamfer cut-sm inline-flex items-center gap-2 bg-energon px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-racing-3 transition-transform hover:-translate-y-0.5"
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
              className="chamfer cut-sm inline-flex items-center gap-1.5 border border-energon/35 bg-racing-3 px-3.5 py-2.5 font-mono text-xs font-semibold text-ivory transition-colors hover:border-energon hover:text-energon"
            >
              <span>{item.liveLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          <Tag className="text-mint-2/70">
            {item.screens.length} {screensCountLabel}
          </Tag>
        </div>
      </div>

      {/* Right 7 columns: Real Multi-Screen Project Showcase */}
      <div className="lg:col-span-7">
        <Plate
          cut={16}
          edge="bg-energon/25"
          inner="bg-[#071D15]"
          className="shadow-[0_22px_48px_-18px_rgba(0,0,0,0.72)]"
        >
          {/* Machined HUD browser chrome bar */}
          <div className="flex items-center justify-between gap-3 border-b border-energon/15 bg-racing-3 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 bg-ivory/25" />
              <span className="h-2 w-2 bg-brass/75" />
              <span className="h-2 w-2 bg-energon" />
            </div>

            <p className="truncate font-mono text-[11px] text-mint/85">
              {currentScreen.caption}
            </p>

            <span className="shrink-0 font-mono text-[11px] text-energon">
              0{screenIdx + 1}/0{item.screens.length}
            </span>
          </div>

          {/* Real project screenshot */}
          <div
            onClick={() => onOpenCase(item, screenIdx)}
            className="relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-[#06150F]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl(currentScreen.src)}
              alt={currentScreen.caption}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
            />

            {/* Prev / Next arrows */}
            <button
              type="button"
              onClick={prevScreen}
              aria-label="Previous screenshot"
              className="chamfer cut-xs absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-energon/35 bg-racing-3/85 text-ivory backdrop-blur-xs transition-colors hover:bg-energon hover:text-racing-3"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextScreen}
              aria-label="Next screenshot"
              className="chamfer cut-xs absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-energon/35 bg-racing-3/85 text-ivory backdrop-blur-xs transition-colors hover:bg-energon hover:text-racing-3"
            >
              ›
            </button>
          </div>

          {/* Thumbnail selector strip */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-energon/15 bg-racing-3/95 p-2.5">
            {item.screens.map((scr, idx) => {
              const active = idx === screenIdx;
              return (
                <button
                  key={scr.src}
                  type="button"
                  onClick={() => setScreenIdx(idx)}
                  aria-label={scr.caption}
                  className={`chamfer cut-xs relative h-11 w-20 shrink-0 overflow-hidden border transition-all ${
                    active
                      ? "border-energon ring-2 ring-energon/40"
                      : "border-white/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetUrl(scr.src)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              );
            })}
          </div>
        </Plate>
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
