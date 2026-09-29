import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, MapPin, Clock, Star, Phone } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/Z3qaFEzNdTTpVja17";
const MAP_EMBED =
  "https://www.google.com/maps?q=Strada+Lenin+192%2F8,+MD-3800,+Comrat,+Moldova&hl=ru&z=17&output=embed";

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
  const tContact = await getTranslations("contact.info");
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

            <div className="rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {tContact("address")}
                  </div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 font-medium hover:text-[var(--color-accent)]"
                  >
                    {tContact("addressValue")}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {tContact("hours")}
                  </div>
                  <p className="text-slate-800">{tContact("hoursValue")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">Google</div>
                  <p className="text-slate-800">4.3 ★ · {t("ratingNote")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <a
                    href="tel:+37379955020"
                    className="block text-slate-800 font-medium hover:text-[var(--color-accent)]"
                  >
                    +373 79 955 020
                  </a>
                  <a
                    href="tel:+37379033961"
                    className="block text-slate-800 font-medium hover:text-[var(--color-accent)]"
                  >
                    +373 79 033 961
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
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

            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="A&V Poligraf — Comrat"
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              {tContact("openInMaps")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
