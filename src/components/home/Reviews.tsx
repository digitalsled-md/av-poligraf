"use client";

import { useTranslations } from "next-intl";
import { Star, ExternalLink } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/Z3qaFEzNdTTpVja17";

type Review = {
  name: string;
  text: string;
  stars: number;
};

export default function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Review[];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-brand)]">
              {t("title")}
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-400/40 text-amber-400/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-slate-800">4.3</span>
              <span className="text-sm text-slate-500">{t("onGoogle")}</span>
            </div>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-accent)]"
          >
            {t("viewAll")}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-5 sm:p-6 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < r.stars
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1">
                «{r.text}»
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--color-brand)]">
                {r.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Google Maps</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
