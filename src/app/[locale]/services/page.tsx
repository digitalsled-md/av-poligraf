import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PrintCalculator from "@/components/calculator/PrintCalculator";
import { images } from "@/lib/images";

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={images.services[s.id] || images.portfolio[0]}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-semibold text-slate-900 group-hover:text-[var(--color-brand)] transition-colors">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--color-primary)]">
                        {s.priceFrom}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                        {locale === "ru" ? "Подробнее" : "Detalii"}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <PrintCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
