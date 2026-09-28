import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { SERVICE_IDS, isValidServiceId, type ServiceId } from "@/lib/services-data";
import PrintCalculator from "@/components/calculator/PrintCalculator";

export function generateStaticParams() {
  return SERVICE_IDS.flatMap((slug) =>
    ["ru", "ro"].map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidServiceId(slug)) return {};
  const t = await getTranslations({ locale, namespace: "serviceDetails" });
  const detail = t.raw(slug) as {
    metaTitle: string;
    metaDescription: string;
  };
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      locale: locale === "ru" ? "ru_MD" : "ro_MD",
      type: "website",
    },
    alternates: {
      languages: {
        ru: `/ru/services/${slug}`,
        ro: `/ro/services/${slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidServiceId(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("serviceDetails");
  const tServices = await getTranslations("services");

  const detail = t.raw(slug) as {
    h1: string;
    intro: string;
    features: string[];
    process: string[];
    faq: { q: string; a: string }[];
    cta: string;
  };

  const items = tServices.raw("items") as {
    id: string;
    title: string;
    priceFrom: string;
  }[];
  const current = items.find((i) => i.id === slug);
  const other = items.filter((i) => i.id !== slug);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-[var(--color-accent)]">
            {locale === "ru" ? "Главная" : "Acasă"}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-[var(--color-accent)]">
            {locale === "ru" ? "Услуги" : "Servicii"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{current?.title ?? slug}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
                {detail.h1}
              </h1>
              {current && (
                <p className="mt-3 text-lg font-semibold text-[var(--color-accent)]">
                  {current.priceFrom}
                </p>
              )}
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {detail.intro}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {locale === "ru" ? "Что входит" : "Ce include"}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <Check className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    </span>
                    <span className="text-slate-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {locale === "ru" ? "Как мы работаем" : "Cum lucrăm"}
              </h2>
              <ol className="space-y-3">
                {detail.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[var(--color-accent)]" />
                FAQ
              </h2>
              <div className="space-y-4">
                {detail.faq.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 p-4 bg-[var(--color-surface)]"
                  >
                    <h3 className="font-medium text-slate-900">{item.q}</h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {locale === "ru" ? "Другие услуги" : "Alte servicii"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {other.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-[var(--color-accent)] hover:shadow-sm transition-all group"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-[var(--color-accent)]">
                      {s.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[var(--color-accent)]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <PrintCalculator defaultService={slug as ServiceId} />
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3.5 text-base font-semibold text-white bg-[var(--color-primary)] rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                {detail.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
