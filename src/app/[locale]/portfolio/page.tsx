"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { images } from "@/lib/images";

const categories = ["all", "cards", "banners", "print", "design"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [filter, setFilter] = useState<(typeof categories)[number]>("all");
  const items = t.raw("items") as {
    id: number;
    title: string;
    category: string;
    desc: string;
  }[];

  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);

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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
            >
              <Image
                src={images.portfolio[i % images.portfolio.length]}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-white/85 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
