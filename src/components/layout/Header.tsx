"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

const locales = [
  { code: "ru", label: "RU" },
  { code: "ro", label: "RO" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close menus on route/locale change
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname, locale]);

  const nav = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-200 supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-[var(--color-primary)] bg-slate-100"
                    : "text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+37379955020"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{t("phone")}</span>
            </a>

            {/* Language switcher — click-based (works on mobile + desktop) */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 active:bg-slate-100"
              >
                {locale.toUpperCase()}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    langOpen && "rotate-180"
                  )}
                />
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[88px]"
                >
                  {locales.map((l) => (
                    <Link
                      key={l.code}
                      href={pathname}
                      locale={l.code}
                      role="option"
                      aria-selected={locale === l.code}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        "block px-3 py-2 text-sm hover:bg-slate-50",
                        locale === l.code
                          ? "font-semibold text-[var(--color-primary)] bg-slate-50"
                          : "text-slate-700"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              {t("getQuote")}
            </Link>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-base font-medium rounded-lg",
                  pathname === item.href
                    ? "bg-slate-100 text-[var(--color-primary)]"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Language in mobile menu */}
            <div className="flex gap-2 px-3 pt-3 pb-1">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={pathname}
                  locale={l.code}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex-1 text-center py-2.5 text-sm font-semibold rounded-lg border transition-colors",
                    locale === l.code
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block mt-2 px-3 py-2.5 text-center text-base font-semibold text-white bg-[var(--color-accent)] rounded-lg"
            >
              {t("getQuote")}
            </Link>
            <a
              href="tel:+37379955020"
              className="flex items-center justify-center gap-2 mt-2 px-3 py-2.5 text-[var(--color-primary)] font-medium"
            >
              <Phone className="h-4 w-4" />
              {t("phone")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
