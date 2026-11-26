"use client";

import { useEffect, useState } from "react";
import type { WorkCase } from "@/content/portfolio";
import { assetUrl } from "@/lib/assetUrl";
import { Plate } from "./ui/Heritage";

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
        className="fixed inset-0 bg-racing-3/75 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto border-l border-rule bg-ivory text-ink shadow-[-24px_0_60px_rgba(10,42,31,0.5)] animate-[drawerSlideIn_320ms_cubic-bezier(0.22,1,0.36,1)]">
        {/* Sticky top navigation */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ivory/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="chamfer cut-xs bg-racing px-2.5 py-1 font-mono text-xs font-semibold text-energon">
              {activeCase.num} // 0{allCases.length}
            </span>
            <button
              type="button"
              onClick={() => onSelectCase(prevCase)}
              className="chamfer cut-xs border border-rule bg-paper px-2.5 py-1 font-mono text-xs font-medium text-ink-soft transition-colors hover:border-racing hover:text-racing"
            >
              ← {prevLabel}
            </button>
            <button
              type="button"
              onClick={() => onSelectCase(nextCase)}
              className="chamfer cut-xs border border-rule bg-paper px-2.5 py-1 font-mono text-xs font-medium text-ink-soft transition-colors hover:border-racing hover:text-racing"
            >
              {nextLabel} →
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="chamfer cut-xs inline-flex items-center gap-1.5 border border-racing/30 bg-mint px-3.5 py-1.5 font-mono text-xs font-semibold text-racing transition-colors hover:bg-racing hover:text-ivory"
          >
            <span>{closeLabel}</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Real Screenshot Stage Header */}
        <div className="blueprint-dark bg-racing-3 p-6 text-ivory sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-mint-2/80">
              {activeCase.client} · {activeCase.year}
            </span>
            <span className="chamfer cut-xs border border-energon/30 bg-racing-2 px-3 py-1 font-mono text-[11px] text-energon">
              {activeCase.metricBadge}
            </span>
          </div>

          <h2
            id="case-drawer-title"
            className="mt-2.5 text-2xl font-bold leading-snug tracking-[-0.025em] text-ivory sm:text-[1.75rem]"
          >
            {activeCase.title}
          </h2>

          {/* Main featured real screenshot */}
          <Plate cut={14} edge="bg-energon/35" inner="bg-[#06150F]" className="mt-5">
            <button
              type="button"
              onClick={() => setLightboxSrc(assetUrl(activeShot.src))}
              className="block w-full cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetUrl(activeShot.src)}
                alt={activeShot.caption}
                className="aspect-[16/9] w-full object-cover object-top"
              />
            </button>
            <div className="flex items-center justify-between gap-3 border-t border-energon/15 bg-racing-3 px-4 py-2.5 text-xs text-mint">
              <span>{activeShot.caption}</span>
              <span className="shrink-0 font-mono text-[11px] text-energon">
                0{selectedScreen + 1}/0{activeCase.screens.length}
              </span>
            </div>
          </Plate>

          {/* All project screens grid */}
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-mint-2/75">
            {galleryTitle}
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
            {activeCase.screens.map((scr, idx) => (
              <button
                key={scr.src}
                type="button"
                onClick={() => setSelectedScreen(idx)}
                className={`chamfer cut-xs overflow-hidden border transition-all ${
                  idx === selectedScreen
                    ? "border-energon ring-2 ring-energon/45"
                    : "border-white/15 opacity-65 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetUrl(scr.src)}
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
              <Plate
                key={o.label}
                cut={10}
                edge="bg-rule"
                inner="bg-mint/45"
                innerClassName="p-4"
              >
                <p className="text-base font-bold tracking-tight text-racing sm:text-lg">
                  {o.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">
                  {o.label}
                </p>
              </Plate>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-brass">
              {activeCase.problemTitle}
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.75] text-ink-soft">
              {activeCase.problemBody}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-racing">
              {activeCase.stepsTitle}
            </h3>
            <ol className="mt-3.5 space-y-3">
              {activeCase.architectureSteps.map((step, i) => (
                <li key={step}>
                  <Plate
                    cut={10}
                    edge="bg-rule"
                    inner="bg-paper"
                    innerClassName="flex items-start gap-3.5 p-4"
                  >
                    <span className="chamfer cut-xs inline-flex h-6 w-7 shrink-0 items-center justify-center bg-racing font-mono text-[11px] font-semibold text-energon">
                      0{i + 1}
                    </span>
                    <span className="text-[14.5px] leading-[1.68] text-ink">
                      {step}
                    </span>
                  </Plate>
                </li>
              ))}
            </ol>
          </div>

          <Plate cut={14} edge="bg-racing/25" inner="bg-mint/55" innerClassName="p-5">
            <p className="font-mono text-[11.5px] text-racing">
              {activeCase.stackLine}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="btn-sweep chamfer cut-sm inline-flex items-center gap-2 bg-racing px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:text-racing-3"
              >
                <span>{discussCta} →</span>
              </a>
              {activeCase.liveUrl && activeCase.liveLabel && (
                <a
                  href={activeCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chamfer cut-sm inline-flex items-center gap-1.5 border border-racing bg-ivory px-4 py-2.5 text-sm font-semibold text-racing transition-colors hover:bg-racing hover:text-ivory"
                >
                  <span>{activeCase.liveLabel} ↗</span>
                </a>
              )}
            </div>
          </Plate>
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
            className="max-h-[90vh] max-w-[94vw] border border-energon/35 object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
