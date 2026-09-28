import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const items = t.raw("items") as {
    id: string;
    title: string;
    short: string;
    desc: string;
    priceFrom: string;
  }[];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-2 text-slate-600">{s.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {s.priceFrom}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  {locale === "ru" ? "Заказать" : "Comandă"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
