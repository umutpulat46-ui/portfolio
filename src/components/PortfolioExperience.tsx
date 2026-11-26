"use client";

import { useEffect, useState } from "react";
import { SITE_CONTENT, type Locale, type WorkCase } from "@/content/portfolio";
import { assetUrl } from "@/lib/assetUrl";
import { CaseDrawer } from "./CaseDrawer";
import { HeroSplineScene } from "./HeroSplineScene";
import { ScrollProjectStack } from "./ScrollProjectStack";
import { ScrollReveal } from "./ScrollReveal";
import { Brackets, CountUp, Plate, Tag } from "./ui/Heritage";

const CONTACT_EMAIL = "umutpulat46@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/kenan-umut-pulat-984869361";
const GITHUB_URL = "https://github.com/umutpulat46-ui";

const TELEMETRY_TICKER = [
  "NEXT.JS 16 · REACT 19",
  "600+ PROGRAMMATIC SEO PAGES",
  "100+ LANDING TEMPLATES",
  "RAVION DIGITAL MEDIA LLC",
  "FOODACTOR",
  "KINETIC FUEL GROUP",
  "SUNBEAM INNOVATIONS",
  "MARITIME AIS / CII ENGINE",
  "SUPABASE · POSTGRESQL",
  "VPS · NGINX · SSL/TLS",
  "3D WEBGL · SPLINE",
];

type SectionId = "work" | "process" | "background" | "contact";

function useLocalClock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat("tr-TR", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setClock(formatted);
      } catch {
        setClock("UTC+3");
      }
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
}

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5L11.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 4.5H11.5V10.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 2.5V10.5M8 10.5L5 7.5M8 10.5L11 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 13H13" strokeLinecap="round" />
    </svg>
  );
}

export function PortfolioExperience() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<WorkCase | null>(null);
  const [drawerScreenIdx, setDrawerScreenIdx] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId | "">("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedIntentId, setSelectedIntentId] = useState<string>("project");
  const clock = useLocalClock();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("lang");
    if (q === "en" || q === "tr") {
      setLocale(q);
      return;
    }
    const saved = window.localStorage.getItem("kup_lang");
    if (saved === "en" || saved === "tr") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    const current = SITE_CONTENT[locale];
    document.documentElement.lang = locale;
    document.title = current.meta.title;
  }, [locale]);

  useEffect(() => {
    const ids: SectionId[] = ["work", "process", "background", "contact"];

    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, pct)));

      if (window.scrollY < 260) {
        setActiveSection("");
        return;
      }

      const probe = window.scrollY + window.innerHeight * 0.34;
      let current: SectionId | "" = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: Locale) => {
    setLocale(next);
    if (activeCase) {
      const updated = SITE_CONTENT[next].work.cases.find(
        (c) => c.id === activeCase.id
      );
      if (updated) setActiveCase(updated);
    }
    try {
      window.localStorage.setItem("kup_lang", next);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore storage errors
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const t = SITE_CONTENT[locale];
  const activeIntent =
    t.contact.intents.find((i) => i.id === selectedIntentId) ??
    t.contact.intents[0];

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    activeIntent.subject
  )}&body=${encodeURIComponent(activeIntent.bodyPrompt + "\n\n")}`;

  const navItems: Array<{ id: SectionId; label: string; code: string }> = [
    { id: "work", label: t.nav.work, code: "01" },
    { id: "process", label: t.nav.process, code: "02" },
    { id: "background", label: t.nav.experience, code: "03" },
    { id: "contact", label: t.nav.contact, code: "04" },
  ];

  return (
    <div id="top" className="paper-grain min-h-screen bg-ivory text-ink">
      {/* Floating Heritage × Machine navigation bar */}
      <header className="no-print sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Plate
            cut={14}
            edge="bg-racing/25"
            inner="bg-ivory/92 backdrop-blur-md"
            className="shadow-[0_12px_32px_-16px_rgba(15,59,44,0.2)]"
            innerClassName="px-5 py-3"
          >
            <div className="flex items-center justify-between gap-4">
              <a
                href="#top"
                className="group flex items-center gap-3 text-[15px] font-bold tracking-[-0.02em] text-ink"
              >
                <span className="chamfer cut-xs inline-flex h-7 w-7 items-center justify-center bg-racing font-serif text-sm italic text-ivory transition-colors group-hover:bg-energon group-hover:text-racing-3">
                  K
                </span>
                <span className="flex items-center gap-2">
                  <span>Kenan Umut Pulat</span>
                  <span
                    aria-hidden="true"
                    className="blink h-1.5 w-1.5 bg-energon shadow-[0_0_8px_#2ee38a]"
                  />
                </span>
              </a>

              <nav
                aria-label={locale === "tr" ? "Gezinme" : "Navigation"}
                className="hidden items-center gap-1 lg:flex"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`chamfer cut-xs inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13.5px] font-medium transition-all ${
                        isActive
                          ? "bg-racing text-ivory shadow-xs"
                          : "text-ink-soft hover:bg-mint/75 hover:text-racing"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          isActive ? "text-energon" : "text-brass"
                        }`}
                      >
                        {item.code}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href={assetUrl(t.cvHref)}
                  download
                  className="chamfer cut-xs hidden items-center gap-1.5 border border-rule bg-paper px-3 py-1.5 font-mono text-[11px] font-medium text-ink transition-colors hover:border-racing hover:bg-mint/60 sm:inline-flex"
                >
                  <DownloadIcon className="h-3.5 w-3.5 text-racing" />
                  <span>{t.nav.cvButton}</span>
                </a>

                <div
                  role="group"
                  aria-label="Language"
                  className="chamfer cut-xs inline-flex border border-rule bg-paper p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => switchLocale("tr")}
                    aria-pressed={locale === "tr"}
                    className={`chamfer cut-xs px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                      locale === "tr"
                        ? "bg-racing text-energon"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    TR
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLocale("en")}
                    aria-pressed={locale === "en"}
                    className={`chamfer cut-xs px-2.5 py-1 font-mono text-[11px] font-semibold transition-all ${
                      locale === "en"
                        ? "bg-racing text-energon"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    EN
                  </button>
                </div>

                <a
                  href="#contact"
                  className="btn-sweep chamfer cut-xs hidden bg-racing px-4 py-2 text-[13px] font-semibold text-ivory transition-colors hover:text-racing-3 sm:inline-flex"
                >
                  {t.nav.talkCta}
                </a>

                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-label="Menu"
                  className="chamfer cut-xs inline-flex h-9 w-9 items-center justify-center border border-rule bg-paper text-ink lg:hidden"
                >
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    {menuOpen ? (
                      <path d="M4 4L14 14M14 4L4 14" strokeLinecap="round" />
                    ) : (
                      <path d="M3 5.5H15M3 9H15M3 12.5H15" strokeLinecap="round" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              aria-hidden="true"
              style={{ width: `${scrollProgress}%` }}
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-energon transition-[width] duration-150"
            />
          </Plate>
        </div>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl lg:hidden">
            <Plate cut={12} edge="bg-racing/30" inner="bg-ivory" innerClassName="p-5 shadow-lg">
              <nav className="flex flex-col gap-3 text-[15px] font-medium text-ink">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-1"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-brass">{item.code}</span>
                      <span>{item.label}</span>
                    </span>
                    {activeSection === item.id && (
                      <span className="h-2 w-2 bg-energon" />
                    )}
                  </a>
                ))}
                <a
                  href={assetUrl(t.cvHref)}
                  download
                  onClick={() => setMenuOpen(false)}
                  className="chamfer cut-xs mt-2 inline-flex items-center justify-center gap-2 border border-racing/30 bg-mint py-2.5 text-sm font-semibold text-racing"
                >
                  <DownloadIcon className="h-4 w-4 text-racing" />
                  <span>{t.hero.cvDownloadCta}</span>
                </a>
              </nav>
            </Plate>
          </div>
        )}
      </header>

      <main>
        {/* CHAPTER 1: HERITAGE × CYBERTRON HERO + MULTI-MODE INTERACTIVE 3D SCULPTURE */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="blueprint blueprint-fade pointer-events-none absolute inset-0"
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:pb-24 lg:pt-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                {/* Telemetry Crest Pill */}
                <div className="reveal-1 inline-flex items-center gap-2.5 border-l-2 border-energon bg-mint/75 px-3.5 py-1.5">
                  <Tag className="text-racing">
                    EDITION // BURDUR{clock ? ` · ${clock}` : " · UTC+3"}
                  </Tag>
                  <span className="font-mono text-[10px] text-brass">◆</span>
                  <span className="font-serif text-sm italic text-brass">
                    {t.hero.greeting}
                  </span>
                </div>

                <h1 className="reveal-2 mt-4 text-[2.35rem] font-bold leading-[1.07] tracking-[-0.035em] text-ink sm:text-[3.15rem] lg:text-[3.5rem]">
                  {t.hero.headline}{" "}
                  <span className="relative inline-block font-serif font-normal italic tracking-[-0.015em] text-racing">
                    {t.hero.headlineAccent}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 320 12"
                      fill="none"
                      className="pointer-events-none absolute -bottom-1 left-0 w-full"
                    >
                      <path
                        d="M2 8.5C78 2.5 215 2.5 318 7.5"
                        stroke="#2EE38A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="draw-line"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="reveal-2 mt-6 max-w-[54ch] text-[15.5px] leading-[1.75] text-ink-soft sm:text-[16.5px]">
                  {t.hero.bio}
                </p>

                <div className="reveal-3 mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="btn-sweep chamfer cut-sm inline-flex items-center gap-2 bg-racing px-5 py-3.5 text-[14px] font-semibold text-ivory shadow-[0_14px_28px_-12px_rgba(15,59,44,0.5)] transition-all hover:-translate-y-0.5 hover:text-racing-3"
                  >
                    <span>{t.hero.primaryCta}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#work"
                    className="chamfer cut-sm inline-flex items-center gap-2 border border-racing/30 bg-ivory px-5 py-3.5 text-[14px] font-semibold text-racing transition-colors hover:border-racing hover:bg-mint/70"
                  >
                    <span>{t.hero.secondaryCta}</span>
                  </a>
                  <a
                    href={assetUrl(t.cvHref)}
                    download
                    className="chamfer cut-sm inline-flex items-center gap-2 border border-rule bg-paper px-4 py-3.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:border-brass hover:text-ink"
                  >
                    <DownloadIcon className="h-4 w-4 text-brass" />
                    <span>{t.hero.cvDownloadCta}</span>
                  </a>
                </div>

                {/* Machined Stat Plates with Animated CountUp */}
                <div className="reveal-3 mt-11 grid grid-cols-3 gap-3 sm:gap-4">
                  {t.hero.stats.map((st, idx) => (
                    <Plate
                      key={st.label}
                      cut={12}
                      edge="bg-racing/20"
                      inner="bg-paper/90"
                      innerClassName="p-3.5 sm:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-brass">
                          0{idx + 1}
                        </span>
                        <span className="h-1.5 w-1.5 bg-energon" />
                      </div>
                      <p className="mt-1 text-xl font-bold tracking-[-0.03em] text-racing sm:text-2xl">
                        <CountUp value={st.number} />
                      </p>
                      <p className="mt-1 text-[11.5px] leading-snug text-ink-soft sm:text-[12.5px]">
                        {st.label}
                      </p>
                    </Plate>
                  ))}
                </div>
              </div>

              <div className="reveal-2 lg:col-span-6">
                <HeroSplineScene locale={locale} />
              </div>
            </div>
          </div>
        </section>

        {/* HERITAGE × CYBERTRON TELEMETRY MARQUEE BAND */}
        <div
          aria-label="Shipped systems & capabilities ticker"
          className="no-print relative overflow-hidden border-y border-energon/25 bg-racing-3 py-3.5 text-ivory"
        >
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11.5px] font-medium uppercase tracking-[0.2em]">
            {[...TELEMETRY_TICKER, ...TELEMETRY_TICKER].map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center gap-8">
                <span className="text-mint/90">{item}</span>
                <span className="text-energon" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* CHAPTER 2: REAL PRODUCTION PROJECTS (Scroll-Stacking Multi-Screen Galleries) */}
        <section
          id="work"
          className="blueprint-dark scroll-mt-24 bg-racing-3 py-20 text-ivory sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 bg-energon" />
                    <Tag className="text-energon">CH.01 // PRODUCTION ARCHIVE</Tag>
                  </div>
                  <p className="mt-2 font-serif text-lg italic text-brass">
                    {t.work.kicker}
                  </p>
                  <h2 className="mt-1.5 text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[2.65rem]">
                    {t.work.heading}
                  </h2>
                </div>
                <p className="max-w-md text-[15px] leading-relaxed text-mint-2/85">
                  {t.work.sub}
                </p>
              </div>
            </ScrollReveal>

            <ScrollProjectStack
              cases={t.work.cases}
              inspectCta={t.work.inspectCta}
              screensCountLabel={t.work.screensCountLabel}
              onOpenCase={(item, screenIdx = 0) => {
                setDrawerScreenIdx(screenIdx);
                setActiveCase(item);
              }}
            />

            {/* Open-Source GitHub Engineering Highlight (Maritime Safety Tracker) */}
            <ScrollReveal delayMs={100} className="mt-14">
              <Plate
                cut={20}
                edge="bg-energon/35"
                inner="bg-[#071F17]"
                innerClassName="p-6 sm:p-8 lg:p-9"
              >
                <div className="pointer-events-none absolute inset-3">
                  <Brackets className="border-energon/25" size="h-3.5 w-3.5" />
                </div>

                <div className="relative z-10 grid grid-cols-1 items-center gap-7 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="chamfer cut-xs border border-energon/30 bg-racing-2 px-3 py-1 font-mono text-[11px] font-medium text-energon">
                        {t.work.openSource.badge}
                      </span>
                      <span className="font-mono text-xs text-mint-2/75">
                        {t.work.openSource.repoName}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.02em] text-ivory sm:text-2xl">
                      {t.work.openSource.title}
                    </h3>

                    <p className="mt-2.5 max-w-2xl text-[14.5px] leading-[1.7] text-mint/85">
                      {t.work.openSource.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.work.openSource.stack.map((tech) => (
                        <span
                          key={tech}
                          className="chamfer cut-xs border border-energon/20 bg-racing px-2.5 py-1 font-mono text-[11px] text-mint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex lg:col-span-4 lg:justify-end">
                    <a
                      href={t.work.openSource.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chamfer cut-sm inline-flex items-center gap-2 bg-energon px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-racing-3 transition-transform hover:-translate-y-0.5"
                    >
                      <span>{t.work.openSource.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Plate>
            </ScrollReveal>
          </div>
        </section>

        {/* CHAPTER 3: MID-PAGE EDITORIAL PORTRAIT + WORKING PHILOSOPHY (Light Mint Polo Club × Cybertron HUD) */}
        <section
          id="process"
          className="blueprint scroll-mt-24 border-y border-rule bg-mint/70 py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <ScrollReveal className="mx-auto w-full max-w-[390px] lg:col-span-5 lg:max-w-none">
                <div className="group relative">
                  {/* Offset machined racing-green armor shadow plate */}
                  <div
                    aria-hidden="true"
                    className="chamfer cut-lg absolute -bottom-3.5 -right-3.5 h-full w-full bg-racing transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  />

                  <Plate
                    cut={22}
                    edge="bg-racing/40"
                    inner="bg-racing-3"
                    className="shadow-[0_24px_50px_-18px_rgba(15,59,44,0.35)]"
                  >
                    <div className="relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetUrl("/kenan-portrait-v2.jpg")}
                        alt="Kenan Umut Pulat"
                        width={900}
                        height={1200}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-[center_20%] contrast-[1.03] saturate-[0.96] transition-transform duration-700 group-hover:scale-[1.02]"
                      />

                      {/* Subtle HUD scan line & corner brackets over portrait */}
                      <div
                        aria-hidden="true"
                        className="scan pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-energon/15 to-transparent"
                      />
                      <div className="pointer-events-none absolute inset-3.5">
                        <Brackets className="border-ivory/50" size="h-4 w-4" />
                      </div>

                      {/* Top telemetry stamp */}
                      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 bg-racing-3/70 px-2.5 py-1 backdrop-blur-xs">
                        <span className="blink h-1.5 w-1.5 bg-energon" />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-ivory">
                          ID // KUP-2026
                        </span>
                      </div>

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-racing-3 via-racing-3/70 to-transparent"
                      />

                      <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[15.5px] font-bold tracking-tight text-ivory">
                              Kenan Umut Pulat
                            </p>
                            <p className="text-[12.5px] text-mint-2">
                              {t.hero.portraitRole}
                            </p>
                          </div>
                          <span className="chamfer cut-xs border border-energon/30 bg-racing/80 px-2.5 py-1 font-mono text-[11px] text-energon backdrop-blur-xs">
                            {t.hero.portraitLocation}
                            {clock ? ` · ${clock}` : ""}
                          </span>
                        </div>
                        <p className="mt-2.5 border-t border-energon/20 pt-2.5 text-[12.5px] text-mint">
                          {t.process.portraitCaption}
                        </p>
                      </div>
                    </div>
                  </Plate>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-7">
                <ScrollReveal delayMs={80}>
                  <div className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 bg-racing" />
                    <Tag className="text-racing">CH.02 // OPERATING DOCTRINE</Tag>
                  </div>
                  <p className="mt-2 font-serif text-lg italic text-brass">
                    {t.process.kicker}
                  </p>
                  <blockquote className="mt-2 font-serif text-[1.65rem] leading-[1.3] tracking-[-0.015em] text-racing sm:text-[2.05rem]">
                    &ldquo;{t.process.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                    {t.process.sub}
                  </p>
                </ScrollReveal>

                <div className="mt-8 space-y-4">
                  {t.process.points.map((pt, i) => (
                    <ScrollReveal key={pt.num} delayMs={120 + i * 70}>
                      <Plate
                        cut={14}
                        edge="bg-racing/20 hover:bg-racing/55"
                        inner="bg-ivory"
                        className="shadow-[0_10px_28px_-18px_rgba(15,59,44,0.18)]"
                        innerClassName="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6"
                      >
                        <span className="chamfer cut-xs inline-flex h-8 w-10 shrink-0 items-center justify-center bg-racing font-mono text-[11.5px] font-semibold text-energon">
                          {pt.num}
                        </span>
                        <div>
                          <h3 className="text-[1.08rem] font-bold leading-snug tracking-[-0.015em] text-ink">
                            {pt.title}
                          </h3>
                          <p className="mt-1.5 text-[14px] leading-[1.68] text-ink-soft">
                            {pt.body}
                          </p>
                        </div>
                      </Plate>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 4: EXPERIENCE, EDUCATION & CRAFT DOSSIER */}
        <section
          id="background"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 bg-brass" />
                  <Tag className="text-racing">CH.03 // FIELD RECORD</Tag>
                </div>
                <h2 className="mt-2 text-[1.9rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
                  {t.background.experienceHeading}
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                  {t.background.experienceSub}
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-5">
                {t.background.entries.map((entry, idx) => (
                  <ScrollReveal key={entry.company} delayMs={idx * 90}>
                    <Plate
                      cut={16}
                      edge="bg-rule hover:bg-racing/45"
                      inner="bg-paper"
                      innerClassName="p-6 sm:p-7"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold tracking-[-0.02em] text-ink sm:text-xl">
                          {entry.role}
                        </h3>
                        <span className="chamfer cut-xs bg-racing px-2.5 py-1 font-mono text-[11.5px] font-medium text-energon">
                          {entry.period}
                        </span>
                      </div>

                      <p className="mt-1 text-[14px] font-semibold text-brass">
                        {entry.company}{" "}
                        <span className="font-normal text-ink-muted">
                          · {entry.meta}
                        </span>
                      </p>

                      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                        {entry.summary}
                      </p>

                      <ul className="mt-4 space-y-2 border-t border-rule pt-4">
                        {entry.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-[14px] leading-[1.65] text-ink"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 bg-racing"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </Plate>
                  </ScrollReveal>
                ))}

                <ScrollReveal delayMs={160}>
                  <Plate
                    cut={16}
                    edge="bg-racing/25"
                    inner="bg-mint/55"
                    innerClassName="p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brass">
                        {t.background.educationLabel}
                      </span>
                      <span className="chamfer cut-xs bg-ivory px-2.5 py-0.5 font-mono text-[11.5px] text-racing">
                        {t.background.education.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-[-0.015em] text-ink">
                      {t.background.education.degree}
                    </h3>
                    <p className="mt-1 text-[14.5px] font-semibold text-racing">
                      {t.background.education.school}
                    </p>
                    <p className="text-[13.5px] text-ink-muted">
                      {t.background.education.department}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                      {t.background.education.details}
                    </p>
                  </Plate>
                </ScrollReveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delayMs={100} className="lg:sticky lg:top-24">
                <Plate
                  cut={20}
                  edge="bg-racing/30"
                  inner="bg-paper"
                  innerClassName="p-7 sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-3">
                    <Brackets className="border-racing/25" size="h-3.5 w-3.5" />
                  </div>

                  <Tag className="text-brass">SPEC // TECHNICAL ARSENAL</Tag>
                  <h2 className="mt-1.5 text-[1.6rem] font-bold tracking-[-0.025em] text-ink">
                    {t.background.craftHeading}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {t.background.craftSub}
                  </p>

                  <div className="mt-6 divide-y divide-rule">
                    {t.background.tracks.map((track, idx) => (
                      <div key={track.title} className="py-5 first:pt-2 last:pb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-semibold text-brass">
                            0{idx + 1}
                          </span>
                          <h3 className="text-[15.5px] font-bold text-racing">
                            {track.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                          {track.description}
                        </p>
                        <p className="mt-2.5 border-l-2 border-energon pl-3 font-mono text-[12px] leading-relaxed text-ink">
                          {track.tools}
                        </p>
                      </div>
                    ))}
                  </div>
                </Plate>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CHAPTER 5: SMART INTENT CONTACT CONSOLE */}
        <section
          id="contact"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-24"
        >
          <ScrollReveal>
            <Plate
              cut={24}
              edge="bg-energon/40"
              inner="blueprint-dark bg-racing-3 text-ivory"
              className="shadow-[0_28px_60px_-22px_rgba(10,42,31,0.55)]"
              innerClassName="p-7 sm:p-10 lg:p-14"
            >
              <div className="pointer-events-none absolute inset-4">
                <Brackets className="border-energon/30" size="h-4 w-4" />
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2">
                    <span className="blink h-2 w-2 bg-energon" />
                    <Tag className="text-energon">CH.04 // DIRECT TRANSMISSION</Tag>
                  </div>
                  <p className="mt-2 font-serif text-xl italic text-brass">
                    {t.contact.kicker}
                  </p>
                  <h2 className="mt-1.5 text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[2.6rem]">
                    {t.contact.heading}
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.7] text-mint/85">
                    {t.contact.sub}
                  </p>

                  <div className="no-print mt-7">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-energon">
                      {t.contact.intentTitle}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {t.contact.intents.map((intent) => {
                        const selected = intent.id === activeIntent.id;
                        return (
                          <button
                            key={intent.id}
                            type="button"
                            onClick={() => setSelectedIntentId(intent.id)}
                            aria-pressed={selected}
                            className={`chamfer cut-xs px-3.5 py-2 text-[13px] font-semibold transition-all ${
                              selected
                                ? "bg-energon text-racing-3 shadow-sm"
                                : "border border-energon/25 bg-racing text-mint hover:border-energon"
                            }`}
                          >
                            {intent.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="chamfer cut-xs mt-3 border border-energon/20 bg-[#071D15] px-4 py-2.5 font-mono text-[11.5px] text-mint-2">
                      <span className="text-energon">SUBJECT //</span>{" "}
                      {activeIntent.subject}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Plate
                    cut={16}
                    edge="bg-energon/30"
                    inner="bg-racing"
                    innerClassName="p-6 sm:p-7"
                  >
                    <div className="mb-5 flex items-center gap-3.5 border-b border-energon/20 pb-4">
                      <div className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={assetUrl("/kenan-portrait-v2.jpg")}
                          alt="Kenan Umut Pulat"
                          width={96}
                          height={96}
                          loading="lazy"
                          className="chamfer cut-xs h-12 w-12 border border-energon/40 object-cover object-[center_20%]"
                        />
                        <span
                          aria-hidden="true"
                          className="blink absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-energon ring-2 ring-racing"
                        />
                      </div>
                      <div>
                        <p className="text-[14.5px] font-bold text-ivory">
                          Kenan Umut Pulat
                        </p>
                        <p className="font-mono text-[11px] text-energon">
                          ONLINE // DIRECT CHANNEL
                        </p>
                      </div>
                    </div>

                    <a
                      href={mailtoHref}
                      className="block break-all font-mono text-base font-semibold text-ivory transition-colors hover:text-energon sm:text-lg"
                    >
                      {CONTACT_EMAIL}
                    </a>

                    <div className="no-print mt-5 flex flex-wrap gap-2.5">
                      <a
                        href={mailtoHref}
                        className="chamfer cut-xs inline-flex items-center gap-2 bg-energon px-5 py-3 text-[13.5px] font-semibold text-racing-3 transition-transform hover:-translate-y-0.5"
                      >
                        <span>{t.contact.sendEmail}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="chamfer cut-xs border border-energon/30 bg-racing-3 px-4 py-3 font-mono text-[12.5px] font-medium text-ivory transition-colors hover:border-energon"
                      >
                        {copied ? `✓ ${t.contact.copiedEmail}` : t.contact.copyEmail}
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-energon/20 pt-5 text-[14px] font-medium">
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="studio-link text-ivory hover:text-energon"
                      >
                        <span>LinkedIn</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-energon" />
                      </a>
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="studio-link text-ivory hover:text-energon"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-energon" />
                      </a>
                      <a
                        href={assetUrl(t.cvHref)}
                        download
                        className="no-print inline-flex items-center gap-1.5 text-energon hover:underline"
                      >
                        <DownloadIcon className="h-3.5 w-3.5" />
                        <span>{t.contact.downloadCv}</span>
                      </a>
                    </div>

                    <p className="mt-5 font-mono text-[11.5px] text-mint-2/80">
                      {t.contact.timezoneNote}
                    </p>
                  </Plate>
                </div>
              </div>
            </Plate>
          </ScrollReveal>
        </section>
      </main>

      <CaseDrawer
        activeCase={activeCase}
        initialScreenIndex={drawerScreenIdx}
        allCases={t.work.cases}
        prevLabel={t.work.drawerPrev}
        nextLabel={t.work.drawerNext}
        closeLabel={t.work.drawerClose}
        discussCta={t.work.drawerDiscussCta}
        galleryTitle={t.work.drawerGalleryTitle}
        onSelectCase={(next) => {
          setDrawerScreenIdx(0);
          setActiveCase(next);
        }}
        onClose={() => setActiveCase(null)}
      />

      <footer className="no-print border-t border-rule bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 bg-racing" />
            <p className="font-medium">{t.footer.rights}</p>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => switchLocale(locale === "tr" ? "en" : "tr")}
              className="studio-link font-mono text-xs font-medium text-ink-soft hover:text-racing"
            >
              {locale === "tr" ? "EN // ENGLISH" : "TR // TÜRKÇE"}
            </button>
            <a
              href="#top"
              className="studio-link font-mono text-xs font-semibold text-racing hover:text-brass"
            >
              {t.footer.top} ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
