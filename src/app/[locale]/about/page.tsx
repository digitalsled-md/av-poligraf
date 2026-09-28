import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const whyItems = t.raw("whyUsItems") as string[];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-8">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t("history")}
              </p>
              <p className="mt-4 font-medium text-[var(--color-primary)]">
                {t("director")}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                {t("whatWeDo")}
              </h2>
              <p className="text-slate-600 leading-relaxed">{t("whatWeDoText")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                {t("equipment")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {t("equipmentText")}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                {t("whyUs")}
              </h2>
              <ul className="space-y-4">
                {whyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <Check className="h-4 w-4 text-[var(--color-accent)]" />
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 aspect-video rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-500 text-sm">
              {locale === "ru" ? "Фото производства (плейсхолдер)" : "Foto producție (placeholder)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
