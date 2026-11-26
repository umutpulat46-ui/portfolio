"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface PlateProps {
  children: ReactNode;
  cut?: number;
  edge?: string;
  inner?: string;
  className?: string;
  innerClassName?: string;
}

/** Machined chamfer plate with a 1px edge (border that survives clip-path). */
export function Plate({
  children,
  cut = 14,
  edge = "bg-rule",
  inner = "bg-ivory",
  className = "",
  innerClassName = "",
}: PlateProps) {
  const style = { "--cut": `${cut}px` } as CSSProperties;
  return (
    <div className={`chamfer p-px transition-colors duration-300 ${edge} ${className}`} style={style}>
      <div className={`chamfer relative h-full ${inner} ${innerClassName}`} style={style}>
        {children}
      </div>
    </div>
  );
}

/** HUD corner brackets. Parent must be `relative`. */
export function Brackets({
  className = "border-racing/45",
  size = "h-3.5 w-3.5",
}: {
  className?: string;
  size?: string;
}) {
  const base = `pointer-events-none absolute ${size} ${className}`;
  return (
    <>
      <span aria-hidden="true" className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export function Tag({
  children,
  className = "text-racing/70",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono text-[10.5px] uppercase tracking-[0.22em] ${className}`}>
      {children}
    </span>
  );
}

/** Animated counter for values like "600+" — non-numeric values render as-is. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const parsed = value.match(/^(\D*)(\d+)(.*)$/);
  const [display, setDisplay] = useState(parsed ? `${parsed[1]}0${parsed[3]}` : value);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    if (!m) {
      setDisplay(value);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const target = parseInt(m[2], 10);
    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${m[1]}${Math.round(target * eased)}${m[3]}`);
          if (p < 1) raf = window.requestAnimationFrame(tick);
        };
        raf = window.requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
