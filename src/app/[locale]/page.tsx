import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
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
      languages: {
        ru: "/ru",
        ro: "/ro",
      },
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
  const advantages = t.raw("advantages.items") as { title: string; desc: string }[];
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.3014,
      longitude: 28.6572,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      bestRating: "5",
    },
    foundingDate: "2008",
    founder: { "@type": "Person", name: "Anatoli Tomaili" },
    sameAs: ["https://maps.app.goo.gl/Z3qaFEzNdTTpVja17"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNC00LTRzLTQgMi00IDQgMiA0IDQgNCA0LTIgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold bg-[var(--color-accent)] text-white rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-orange-500/25"
              >
                {t("hero.ctaQuote")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20"
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
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
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
                className="group block bg-white rounded-2xl border border-slate-200 p-6 hover:border-[var(--color-accent)] hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[var(--color-accent)] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{s.short}</p>
                <p className="mt-4 text-sm font-medium text-[var(--color-primary)]">
                  {s.priceFrom}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]"
            >
              {t("popularServices.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
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
          <p className="text-center text-slate-600 mb-8">
            {t("contact.subtitle")}
          </p>
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
              className="flex items-center gap-2 font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              +373 79 955 020
            </a>
            <a
              href="mailto:avpoligraf@gmail.com"
              className="flex items-center gap-2 text-slate-600 hover:text-[var(--color-accent)]"
            >
              avpoligraf@gmail.com
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
