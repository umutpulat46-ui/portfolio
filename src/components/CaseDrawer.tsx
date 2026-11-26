"use client";

import { useEffect, useState } from "react";
import type { WorkCase } from "@/content/portfolio";

interface CaseDrawerProps {
  activeCase: WorkCase | null;
  initialScreenIndex: number;
  allCases: WorkCase[];
  prevLabel: string;
  nextLabel: string;
  closeLabel: string;
  discussCta: string;
  galleryTitle: string;
  onSelectCase: (next: WorkCase) => void;
  onClose: () => void;
}

export function CaseDrawer({
  activeCase,
  initialScreenIndex,
  allCases,
  prevLabel,
  nextLabel,
  closeLabel,
  discussCta,
  galleryTitle,
  onSelectCase,
  onClose,
}: CaseDrawerProps) {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    setSelectedScreen(initialScreenIndex);
    setLightboxSrc(null);
  }, [activeCase, initialScreenIndex]);

  useEffect(() => {
    if (!activeCase) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxSrc) {
          setLightboxSrc(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCase, lightboxSrc, onClose]);

  if (!activeCase) return null;

  const currentIndex = allCases.findIndex((c) => c.id === activeCase.id);
  const prevCase =
    allCases[(currentIndex - 1 + allCases.length) % allCases.length];
  const nextCase = allCases[(currentIndex + 1) % allCases.length];
  const activeShot =
    activeCase.screens[selectedScreen] ?? activeCase.screens[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0D1714]/72 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto border-l border-line bg-parchment text-ink shadow-[-24px_0_60px_rgba(13,23,20,0.45)] animate-[drawerSlideIn_320ms_cubic-bezier(0.22,1,0.36,1)]">
        {/* Sticky top navigation */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-parchment/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-cypress px-2.5 py-1 font-mono text-xs font-medium text-parchment">
              {activeCase.num} / 0{allCases.length}
            </span>
            <button
              type="button"
              onClick={() => onSelectCase(prevCase)}
              className="rounded-lg border border-line bg-stone/60 px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-cypress hover:text-ink"
            >
              ← {prevLabel}
            </button>
            <button
              type="button"
              onClick={() => onSelectCase(nextCase)}
              className="rounded-lg border border-line bg-stone/60 px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-cypress hover:text-ink"
            >
              {nextLabel} →
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-stone px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-cypress hover:bg-cypress hover:text-parchment"
          >
            <span>{closeLabel}</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Real Screenshot Stage Header */}
        <div className="bg-cypress p-6 text-parchment sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#9EB5AC]">
              {activeCase.client} · {activeCase.year}
            </span>
            <span className="rounded-full bg-[#27443B] px-3 py-1 font-mono text-[11px] text-[#9ED1BE]">
              {activeCase.metricBadge}
            </span>
          </div>

          <h2
            id="case-drawer-title"
            className="mt-2.5 text-2xl font-bold leading-snug tracking-[-0.025em] text-parchment sm:text-[1.75rem]"
          >
            {activeCase.title}
          </h2>

          {/* Main featured real screenshot */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-cypress-border bg-[#0C1512]">
            <button
              type="button"
              onClick={() => setLightboxSrc(activeShot.src)}
              className="block w-full cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeShot.src}
                alt={activeShot.caption}
                className="aspect-[16/9] w-full object-cover object-top"
              />
            </button>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#12201C] px-4 py-2.5 text-xs text-[#C6D8D0]">
              <span>{activeShot.caption}</span>
              <span className="shrink-0 font-mono text-[11px] text-[#E39A74]">
                {selectedScreen + 1}/{activeCase.screens.length}
              </span>
            </div>
          </div>

          {/* All project screens grid */}
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-[#92B0A4]">
            {galleryTitle}
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
            {activeCase.screens.map((scr, idx) => (
              <button
                key={scr.src}
                type="button"
                onClick={() => setSelectedScreen(idx)}
                className={`overflow-hidden rounded-lg border transition-all ${
                  idx === selectedScreen
                    ? "border-[#E39A74] ring-2 ring-[#E39A74]/45"
                    : "border-white/15 opacity-65 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scr.src}
                  alt={scr.caption}
                  className="aspect-[16/9] w-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detailed narrative body */}
        <div className="flex-1 space-y-8 p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-3">
            {activeCase.outcomes.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl border border-line bg-stone/65 p-4"
              >
                <p className="text-base font-bold tracking-tight text-cypress sm:text-lg">
                  {o.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">
                  {o.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-clay">
              {activeCase.problemTitle}
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.75] text-ink-soft">
              {activeCase.problemBody}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-cypress">
              {activeCase.stepsTitle}
            </h3>
            <ol className="mt-3.5 space-y-3">
              {activeCase.architectureSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3.5 rounded-2xl border border-line/90 bg-stone/45 p-4"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cypress font-mono text-[11px] font-medium text-parchment">
                    0{i + 1}
                  </span>
                  <span className="text-[14.5px] leading-[1.68] text-ink">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-line bg-stone-deep/65 p-5">
            <p className="font-mono text-[11.5px] text-ink-soft">
              {activeCase.stackLine}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-cypress px-5 py-2.5 text-sm font-semibold text-parchment transition-colors hover:bg-cypress-elevated"
              >
                <span>{discussCta} →</span>
              </a>
              {activeCase.liveUrl && activeCase.liveLabel && (
                <a
                  href={activeCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cypress bg-parchment px-4 py-2.5 text-sm font-semibold text-cypress transition-colors hover:bg-cypress hover:text-parchment"
                >
                  <span>{activeCase.liveLabel} ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox when clicking main screenshot */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-60 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt={activeShot.caption}
            className="max-h-[90vh] max-w-[94vw] rounded-xl border border-white/15 object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
