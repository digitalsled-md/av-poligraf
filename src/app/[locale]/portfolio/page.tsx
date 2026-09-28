"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const categories = ["all", "cards", "banners", "print", "design"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [filter, setFilter] = useState<string>("all");
  const items = t.raw("items") as {
    id: number;
    title: string;
    category: string;
    desc: string;
  }[];

  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);

  const colors = [
    "from-blue-500 to-blue-700",
    "from-orange-400 to-orange-600",
    "from-emerald-500 to-emerald-700",
    "from-violet-500 to-violet-700",
    "from-rose-400 to-rose-600",
    "from-cyan-500 to-cyan-700",
    "from-amber-400 to-amber-600",
    "from-indigo-500 to-indigo-700",
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t(`filters.${cat}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colors[i % colors.length]} opacity-90 group-hover:opacity-100 transition-opacity`}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-white/80 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
