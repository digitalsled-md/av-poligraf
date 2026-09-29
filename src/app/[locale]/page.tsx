import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Palette,
  Award,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import Reviews from "@/components/home/Reviews";
import ContactForm from "@/components/contact/ContactForm";
import { images } from "@/lib/images";

const icons = [Clock, MapPin, Palette, Award, Calendar, Layers];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      locale: locale === "ru" ? "ru_MD" : "ro_MD",
      type: "website",
    },
    alternates: {
      languages: { ru: "/ru", ro: "/ro" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const advantages = t.raw("advantages.items") as {
    title: string;
    desc: string;
  }[];
  const services = t.raw("services.items") as {
    id: string;
    title: string;
    short: string;
    priceFrom: string;
  }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "A&V Poligraf SRL",
    description:
      locale === "ru"
        ? "Типография полного цикла в Комрате"
        : "Tipografie cu ciclu complet în Comrat",
    url: "https://av-poligraf.vercel.app",
    telephone: ["+37379955020", "+37379033961"],
    email: "avpoligraf@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Lenin 192/8",
      addressLocality: "Comrat",
      addressRegion: "UTA Găgăuzia",
      postalCode: "MD-3800",
      addressCountry: "MD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      bestRating: "5",
    },
    foundingDate: "2008",
    sameAs: ["https://maps.app.goo.gl/Z3qaFEzNdTTpVja17"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[70vh] sm:min-h-[78vh] flex items-center overflow-hidden">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)]/95 via-[var(--color-primary)]/88 to-[var(--color-primary)]/55" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-orange-200 ring-1 ring-white/20 backdrop-blur">
              Comrat · 2008
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold bg-[var(--color-accent)] text-white rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-orange-500/30"
              >
                {t("hero.ctaQuote")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/25 backdrop-blur"
              >
                {t("hero.ctaWorks")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-12">
            {t("advantages.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-70 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-slate-700 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">
              {t("popularServices.title")}
            </h2>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              {t("popularServices.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={images.services[s.id] || images.portfolio[0]}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white bg-[var(--color-accent)] px-2.5 py-1 rounded-full">
                    {s.priceFrom}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[var(--color-brand)] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">
                    {s.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                    {locale === "ru" ? "Подробнее" : "Detalii"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)]">
                15+
              </div>
              <div className="mt-2 text-slate-300">{t("trust.years")}</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)]">
                5000+
              </div>
              <div className="mt-2 text-slate-300">{t("trust.orders")}</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)]">
                300+
              </div>
              <div className="mt-2 text-slate-300">{t("trust.clients")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-2">
            {t("contact.title")}
          </h2>
          <p className="text-center text-slate-600 mb-8">{t("contact.subtitle")}</p>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <ContactForm compact />
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm">
            <a
              href="tel:+37379955020"
              className="font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              +373 79 955 020
            </a>
            <a
              href="https://t.me/+37379955020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-[#2AABEE]"
            >
              Telegram
            </a>
            <a
              href="https://maps.app.goo.gl/Z3qaFEzNdTTpVja17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[var(--color-accent)]"
            >
              Strada Lenin 192/8, Комрат
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
