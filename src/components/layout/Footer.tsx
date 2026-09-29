"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "@/components/layout/Logo";

const SERVICE_SLUGS = [
  "business-cards",
  "banners",
  "flyers",
  "design",
  "laminating",
  "canvas",
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const isRo = locale === "ro";
  const serviceItems = tServices.raw("items") as { id: string; title: string }[];

  const navLinks = [
    { href: "/", label: tNav("home") },
    { href: "/services", label: tNav("services") },
    { href: "/portfolio", label: tNav("portfolio") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
    {
      href: "/privacy",
      label: isRo ? "Politica de confidențialitate" : "Политика конфиденциальности",
    },
  ];

  return (
    <footer className="bg-[var(--color-primary-dark)] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-sm text-slate-400">{t("tagline")}</p>
            <p className="mt-2 text-xs text-slate-500">★ 4.3 на Google Maps</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("navTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceItems
                .filter((s) =>
                  (SERVICE_SLUGS as readonly string[]).includes(s.id)
                )
                .map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.id}`}
                      className="hover:text-white transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {tNav("contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <div>
                  <a href="tel:+37379955020" className="hover:text-white">
                    +373 79 955 020
                  </a>
                  <br />
                  <a href="tel:+37379033961" className="hover:text-white">
                    +373 79 033 961
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                <a
                  href="mailto:avpoligraf@gmail.com"
                  className="hover:text-white"
                >
                  avpoligraf@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <a
                  href="https://maps.app.goo.gl/Z3qaFEzNdTTpVja17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {tContact("addressValue")}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-accent)]" />
                <span>{tContact("hoursValue")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>{t("rights")}</span>
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isRo ? "Politica de confidențialitate" : "Политика конфиденциальности"}
            </Link>
          </div>
          <span>
            {t("madeBy")}{" "}
            <a
              href="https://www.instagram.com/digitalsled.md/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[var(--color-accent)] transition-colors"
            >
              Digital Sled
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
