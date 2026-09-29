import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-brand)] mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-slate-500 mb-10">{t("updated")}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <p className="text-slate-700 leading-relaxed text-base">{t("intro")}</p>
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-[var(--color-brand)] mb-2">
                {s.title}
              </h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
