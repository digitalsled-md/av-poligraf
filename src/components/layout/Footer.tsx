"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");

  return (
    <footer className="bg-[var(--color-primary-dark)] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              A&V <span className="text-[var(--color-accent)]">Poligraf</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">{t("tagline")}</p>
            <p className="mt-4 text-sm">с 2008 · Комрат, Гагаузия</p>
            <p className="mt-2 text-xs text-slate-500">★ 4.3 на Google Maps</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {tNav("services")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  {tNav("portfolio")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
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
                <a href="mailto:avpoligraf@gmail.com" className="hover:text-white">
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
          <span>{t("rights")}</span>
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
