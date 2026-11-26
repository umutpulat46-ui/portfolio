"use client";

import { useEffect, useState } from "react";
import { SITE_CONTENT, type Locale, type WorkCase } from "@/content/portfolio";
import { assetUrl } from "@/lib/assetUrl";
import { CaseDrawer } from "./CaseDrawer";
import { HeroSplineScene } from "./HeroSplineScene";
import { ScrollProjectStack } from "./ScrollProjectStack";
import { ScrollReveal } from "./ScrollReveal";

const CONTACT_EMAIL = "umutpulat46@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/kenan-umut-pulat-984869361";
const GITHUB_URL = "https://github.com/umutpulat46-ui";

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

  const navItems: Array<{ id: SectionId; label: string }> = [
    { id: "work", label: t.nav.work },
    { id: "process", label: t.nav.process },
    { id: "background", label: t.nav.experience },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div id="top" className="paper-grain studio-stone-bg min-h-screen text-ink">
      {/* Floating warm stone navigation bar */}
      <header className="no-print sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line/90 bg-[#EDE6D9]/92 px-5 py-3 shadow-[0_8px_30px_-16px_rgba(22,38,33,0.18)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.02em] text-ink"
            >
              <span className="h-2 w-2 rounded-full bg-clay" aria-hidden="true" />
              <span>Kenan Umut Pulat</span>
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
                    className={`rounded-xl px-3.5 py-1.5 text-[13.5px] font-medium transition-all ${
                      isActive
                        ? "bg-cypress text-parchment shadow-xs"
                        : "text-ink-soft hover:bg-stone-deep/65 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={assetUrl(t.cvHref)}
                download
                className="hidden items-center gap-1.5 rounded-xl border border-line bg-parchment px-3 py-1.5 font-mono text-[11px] font-medium text-ink transition-colors hover:border-cypress sm:inline-flex"
              >
                <DownloadIcon className="h-3.5 w-3.5 text-clay" />
                <span>{t.nav.cvButton}</span>
              </a>

              <div
                role="group"
                aria-label="Language"
                className="inline-flex rounded-xl border border-line bg-stone-deep/70 p-0.5"
              >
                <button
                  type="button"
                  onClick={() => switchLocale("tr")}
                  aria-pressed={locale === "tr"}
                  className={`rounded-[9px] px-2.5 py-1 font-mono text-[11px] font-medium transition-all ${
                    locale === "tr"
                      ? "bg-cypress text-parchment shadow-xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  TR
                </button>
                <button
                  type="button"
                  onClick={() => switchLocale("en")}
                  aria-pressed={locale === "en"}
                  className={`rounded-[9px] px-2.5 py-1 font-mono text-[11px] font-medium transition-all ${
                    locale === "en"
                      ? "bg-cypress text-parchment shadow-xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  EN
                </button>
              </div>

              <a
                href="#contact"
                className="hidden rounded-xl bg-cypress px-4 py-2 text-[13px] font-semibold text-parchment transition-colors hover:bg-cypress-elevated sm:inline-flex"
              >
                {t.nav.talkCta}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label="Menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-parchment text-ink lg:hidden"
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
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-clay transition-[width] duration-150"
          />
        </div>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-parchment p-5 shadow-lg lg:hidden">
            <nav className="flex flex-col gap-3 text-[15px] font-medium text-ink">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-1"
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="h-2 w-2 rounded-full bg-clay" />
                  )}
                </a>
              ))}
              <a
                href={assetUrl(t.cvHref)}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-stone py-2.5 text-sm font-semibold text-cypress"
              >
                <DownloadIcon className="h-4 w-4 text-clay" />
                <span>{t.hero.cvDownloadCta}</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* CHAPTER 1: CLEAN HERO + MULTI-MODE INTERACTIVE 3D SCULPTURE */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:pb-28 lg:pt-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p className="reveal-1 font-serif text-xl italic text-clay sm:text-2xl">
                {t.hero.greeting}
              </p>

              <h1 className="reveal-2 mt-3 text-[2.35rem] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[3.15rem] lg:text-[3.5rem]">
                {t.hero.headline}{" "}
                <span className="font-serif font-normal italic tracking-[-0.015em] text-cypress">
                  {t.hero.headlineAccent}
                </span>
              </h1>

              <p className="reveal-2 mt-6 max-w-[54ch] text-[15.5px] leading-[1.75] text-ink-soft sm:text-[16.5px]">
                {t.hero.bio}
              </p>

              <div className="reveal-3 mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-cypress px-5 py-3.5 text-[14px] font-semibold text-parchment shadow-[0_10px_24px_-10px_rgba(22,38,33,0.45)] transition-all hover:-translate-y-0.5 hover:bg-cypress-elevated"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-parchment px-5 py-3.5 text-[14px] font-semibold text-ink transition-colors hover:border-cypress hover:bg-parchment/70"
                >
                  <span>{t.hero.secondaryCta}</span>
                </a>
                <a
                  href={assetUrl(t.cvHref)}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-stone-deep/65 px-4 py-3.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:border-clay hover:text-ink"
                >
                  <DownloadIcon className="h-4 w-4 text-clay" />
                  <span>{t.hero.cvDownloadCta}</span>
                </a>
              </div>

              <div className="reveal-3 mt-11 grid grid-cols-3 gap-4 border-t border-line pt-7 sm:gap-7">
                {t.hero.stats.map((st) => (
                  <div key={st.label}>
                    <p className="text-2xl font-bold tracking-[-0.03em] text-cypress sm:text-3xl">
                      {st.number}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug text-ink-soft sm:text-[13px]">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-2 lg:col-span-6">
              <HeroSplineScene locale={locale} />
            </div>
          </div>
        </section>

        {/* CHAPTER 2: REAL PRODUCTION PROJECTS (Scroll-Stacking Multi-Screen Galleries) */}
        <section
          id="work"
          className="scroll-mt-24 bg-cypress py-20 text-parchment sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <p className="font-serif text-lg italic text-[#E39A74]">
                    {t.work.kicker}
                  </p>
                  <h2 className="mt-2 text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-parchment sm:text-[2.65rem]">
                    {t.work.heading}
                  </h2>
                </div>
                <p className="max-w-md text-[15px] leading-relaxed text-[#B7CBC2]">
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
              <div className="rounded-3xl border border-cypress-border bg-[#12201C] p-6 sm:p-8 lg:p-9">
                <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-[#244239] px-3 py-1 font-mono text-[11px] font-medium text-[#9ED1BE]">
                        {t.work.openSource.badge}
                      </span>
                      <span className="font-mono text-xs text-[#92B0A4]">
                        {t.work.openSource.repoName}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.02em] text-parchment sm:text-2xl">
                      {t.work.openSource.title}
                    </h3>

                    <p className="mt-2.5 max-w-2xl text-[14.5px] leading-[1.7] text-[#C2D4CC]">
                      {t.work.openSource.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.work.openSource.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-cypress-border bg-cypress-elevated px-2.5 py-1 font-mono text-[11px] text-[#B8CEC5]"
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
                      className="inline-flex items-center gap-2 rounded-xl border border-[#4D776A] bg-cypress-elevated px-5 py-3.5 text-sm font-semibold text-parchment transition-all hover:-translate-y-0.5 hover:border-[#E39A74] hover:bg-clay"
                    >
                      <span>{t.work.openSource.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CHAPTER 3: MID-PAGE EDITORIAL PORTRAIT + WORKING PHILOSOPHY */}
        <section
          id="process"
          className="scroll-mt-24 border-y border-[#BCCBC3] bg-sage py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <ScrollReveal className="mx-auto w-full max-w-[390px] lg:col-span-5 lg:max-w-none">
                <div className="group relative">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-cypress transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-2.5 h-16 w-16 rounded-2xl border border-clay/45 bg-clay/15"
                  />

                  <div className="relative overflow-hidden rounded-3xl border border-cypress/20 bg-cypress shadow-[0_22px_46px_-18px_rgba(22,38,33,0.32)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetUrl("/kenan-portrait.jpg")}
                      alt="Kenan Umut Pulat"
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-[center_20%] contrast-[1.03] saturate-[0.95] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#101C18] via-[#101C18]/55 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-parchment sm:p-6">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[15px] font-semibold tracking-tight text-parchment">
                            Kenan Umut Pulat
                          </p>
                          <p className="text-[12.5px] text-[#B9CEC5]">
                            {t.hero.portraitRole}
                          </p>
                        </div>
                        <span className="rounded-lg border border-white/15 bg-black/25 px-2.5 py-1 font-mono text-[11px] text-[#DCE8E2] backdrop-blur-xs">
                          {t.hero.portraitLocation}
                          {clock ? ` · ${clock}` : ""}
                        </span>
                      </div>
                      <p className="mt-2.5 border-t border-white/12 pt-2.5 text-[12.5px] text-[#D1E0D9]">
                        {t.process.portraitCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-7">
                <ScrollReveal delayMs={80}>
                  <p className="font-serif text-lg italic text-clay">
                    {t.process.kicker}
                  </p>
                  <blockquote className="mt-2.5 font-serif text-[1.65rem] leading-[1.3] tracking-[-0.015em] text-cypress sm:text-[2.05rem]">
                    &ldquo;{t.process.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                    {t.process.sub}
                  </p>
                </ScrollReveal>

                <div className="mt-8 space-y-4">
                  {t.process.points.map((pt, i) => (
                    <ScrollReveal key={pt.num} delayMs={120 + i * 70}>
                      <div className="flex flex-col gap-3 rounded-2xl border border-[#C3D0C9] bg-parchment p-5 shadow-[0_8px_24px_-16px_rgba(22,38,33,0.14)] sm:flex-row sm:items-start sm:gap-4 sm:p-6">
                        <span className="inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-deep font-mono text-[11.5px] font-semibold text-clay">
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
                      </div>
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
                <h2 className="text-[1.9rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.25rem]">
                  {t.background.experienceHeading}
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                  {t.background.experienceSub}
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-5">
                {t.background.entries.map((entry, idx) => (
                  <ScrollReveal key={entry.company} delayMs={idx * 90}>
                    <div className="rounded-2xl border border-line bg-parchment p-6 sm:p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold tracking-[-0.02em] text-ink sm:text-xl">
                          {entry.role}
                        </h3>
                        <span className="rounded-md bg-stone-deep px-2.5 py-1 font-mono text-[11.5px] font-medium text-cypress">
                          {entry.period}
                        </span>
                      </div>

                      <p className="mt-1 text-[14px] font-semibold text-clay">
                        {entry.company}{" "}
                        <span className="font-normal text-ink-muted">
                          · {entry.meta}
                        </span>
                      </p>

                      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                        {entry.summary}
                      </p>

                      <ul className="mt-4 space-y-2 border-t border-line/80 pt-4">
                        {entry.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-[14px] leading-[1.65] text-ink"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cypress"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}

                <ScrollReveal delayMs={160}>
                  <div className="rounded-2xl border border-line bg-stone-deep/65 p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-clay">
                        {t.background.educationLabel}
                      </span>
                      <span className="font-mono text-[11.5px] text-ink-soft">
                        {t.background.education.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-[-0.015em] text-ink">
                      {t.background.education.degree}
                    </h3>
                    <p className="mt-1 text-[14.5px] font-medium text-cypress">
                      {t.background.education.school}
                    </p>
                    <p className="text-[13.5px] text-ink-muted">
                      {t.background.education.department}
                    </p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                      {t.background.education.details}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delayMs={100} className="lg:sticky lg:top-24">
                <div className="rounded-3xl border border-line bg-parchment p-7 sm:p-8">
                  <h2 className="text-[1.6rem] font-bold tracking-[-0.025em] text-ink">
                    {t.background.craftHeading}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {t.background.craftSub}
                  </p>

                  <div className="mt-6 divide-y divide-line">
                    {t.background.tracks.map((track) => (
                      <div key={track.title} className="py-5 first:pt-2 last:pb-1">
                        <h3 className="text-[15.5px] font-bold text-cypress">
                          {track.title}
                        </h3>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                          {track.description}
                        </p>
                        <p className="mt-2.5 font-mono text-[12px] leading-relaxed text-ink">
                          {track.tools}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CHAPTER 5: SMART INTENT CONTACT CARD */}
        <section
          id="contact"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8 lg:pb-24"
        >
          <ScrollReveal>
            <div className="overflow-hidden rounded-3xl bg-cypress p-7 text-parchment shadow-[0_28px_60px_-22px_rgba(22,38,33,0.45)] sm:p-10 lg:p-14">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="font-serif text-xl italic text-[#E39A74]">
                    {t.contact.kicker}
                  </p>
                  <h2 className="mt-2 text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-parchment sm:text-[2.6rem]">
                    {t.contact.heading}
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.7] text-[#C2D4CC]">
                    {t.contact.sub}
                  </p>

                  <div className="no-print mt-7">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#9ED1BE]">
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
                            className={`rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all ${
                              selected
                                ? "bg-clay text-parchment shadow-sm"
                                : "border border-cypress-border bg-cypress-elevated text-[#D0E0D9] hover:border-[#527A6C]"
                            }`}
                          >
                            {intent.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-3 rounded-xl border border-cypress-border/80 bg-[#12201C] px-4 py-2.5 font-mono text-[11.5px] text-[#A9C5BA]">
                      <span className="text-[#E39A74]">Subject:</span>{" "}
                      {activeIntent.subject}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-cypress-border bg-cypress-elevated p-6 sm:p-7 lg:col-span-5">
                  <div className="mb-5 flex items-center gap-3.5 border-b border-cypress-border pb-4">
                    <div className="relative shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetUrl("/kenan-portrait.jpg")}
                        alt="Kenan Umut Pulat"
                        width={96}
                        height={96}
                        loading="lazy"
                        className="h-12 w-12 rounded-full border border-parchment/25 object-cover object-[center_20%]"
                      />
                    </div>
                    <div>
                      <p className="text-[14.5px] font-semibold text-parchment">
                        Kenan Umut Pulat
                      </p>
                      <p className="font-mono text-[11px] text-[#93B3A6]">
                        Direct E-mail
                      </p>
                    </div>
                  </div>

                  <a
                    href={mailtoHref}
                    className="block break-all text-lg font-semibold text-parchment hover:text-[#E39A74]"
                  >
                    {CONTACT_EMAIL}
                  </a>

                  <div className="no-print mt-5 flex flex-wrap gap-2.5">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-clay px-5 py-3 text-[13.5px] font-semibold text-parchment transition-colors hover:bg-clay-hover"
                    >
                      <span>{t.contact.sendEmail}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="rounded-xl border border-cypress-border bg-cypress px-4 py-3 text-[13.5px] font-medium text-parchment transition-colors hover:border-[#6A8E80]"
                    >
                      {copied ? `✓ ${t.contact.copiedEmail}` : t.contact.copyEmail}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-cypress-border pt-5 text-[14px] font-medium">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-link text-parchment hover:text-[#E39A74]"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#93B3A6]" />
                    </a>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-link text-parchment hover:text-[#E39A74]"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#93B3A6]" />
                    </a>
                    <a
                      href={assetUrl(t.cvHref)}
                      download
                      className="no-print inline-flex items-center gap-1.5 text-[#E39A74] hover:underline"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      <span>{t.contact.downloadCv}</span>
                    </a>
                  </div>

                  <p className="mt-5 text-[12.5px] text-[#93B3A6]">
                    {t.contact.timezoneNote}
                  </p>
                </div>
              </div>
            </div>
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

      <footer className="no-print border-t border-line bg-stone-deep/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:px-8">
          <p className="font-medium">{t.footer.rights}</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => switchLocale(locale === "tr" ? "en" : "tr")}
              className="studio-link font-medium text-ink-soft hover:text-ink"
            >
              {locale === "tr" ? "Switch to English" : "Türkçe görünüm"}
            </button>
            <a
              href="#top"
              className="studio-link font-medium text-cypress hover:text-clay"
            >
              {t.footer.top} ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
