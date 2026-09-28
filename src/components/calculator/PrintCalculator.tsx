"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calculator } from "lucide-react";

type ServiceType =
  | "business-cards"
  | "banners"
  | "flyers"
  | "design"
  | "laminating"
  | "canvas";

export default function PrintCalculator({
  defaultService = "business-cards",
}: {
  defaultService?: ServiceType;
}) {
  const t = useTranslations("calculator");
  const [service, setService] = useState<ServiceType>(defaultService);
  const [qty, setQty] = useState(100);
  const [sides, setSides] = useState<1 | 2>(1);
  const [material, setMaterial] = useState("std");
  const [lamination, setLamination] = useState("none");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [size, setSize] = useState("a5");
  const [designType, setDesignType] = useState("simple");

  const price = useMemo(() => {
    let total = 0;

    if (service === "business-cards") {
      const paperMul = material === "350" ? 1.25 : 1;
      const sideMul = sides === 2 ? 1.6 : 1;
      const lamMul =
        lamination === "matte" || lamination === "glossy" ? 1.4 : 1;
      const unit = 1.5 * paperMul * sideMul * lamMul;
      total = Math.max(150, Math.round(qty * unit));
    } else if (service === "banners") {
      const area = Math.max(0.25, width * height);
      let perM2 = 45;
      if (material === "premium") perM2 = 65;
      if (material === "oracal") perM2 = 80;
      if (material === "mesh") perM2 = 55;
      total = Math.round(area * perM2);
    } else if (service === "flyers") {
      let base = 0.8;
      if (size === "a6") base = 0.5;
      if (size === "a4") base = 1.2;
      if (material === "130") base *= 1.3;
      if (material === "170") base *= 1.6;
      if (sides === 2) base *= 1.7;
      let disc = 1;
      if (qty >= 1000) disc = 0.7;
      else if (qty >= 500) disc = 0.8;
      else if (qty >= 200) disc = 0.9;
      total = Math.max(80, Math.round(qty * base * disc));
    } else if (service === "design") {
      if (designType === "simple") total = 300;
      else if (designType === "logo") total = 800;
      else total = 1500;
    } else if (service === "laminating") {
      const perSheet = material === "125" ? 8 : 5;
      total = Math.max(20, Math.round(qty * perSheet));
    } else if (service === "canvas") {
      const area = Math.max(0.1, width * height);
      let perM2 = 350;
      if (material === "premium") perM2 = 480;
      if (material === "wallpaper") perM2 = 220;
      total = Math.round(area * perM2);
    }

    return total;
  }, [service, qty, sides, material, lamination, width, height, size, designType]);

  const services: { id: ServiceType; label: string }[] = [
    { id: "business-cards", label: t("businessCards") },
    { id: "banners", label: t("banners") },
    { id: "flyers", label: t("flyers") },
    { id: "design", label: t("design") },
    { id: "laminating", label: t("laminating") },
    { id: "canvas", label: t("canvas") },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-[var(--color-primary)] text-white px-6 py-4 flex items-center gap-3">
        <Calculator className="h-5 w-5 text-[var(--color-accent)]" />
        <div>
          <h3 className="font-semibold text-lg">{t("title")}</h3>
          <p className="text-sm text-slate-300">{t("subtitle")}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {t("service")}
          </label>
          <select
            value={service}
            onChange={(e) => {
              const s = e.target.value as ServiceType;
              setService(s);
              if (s === "business-cards") setQty(100);
              if (s === "flyers") setQty(200);
              if (s === "laminating") setQty(10);
              if (s === "banners" || s === "canvas") {
                setWidth(1);
                setHeight(1);
              }
            }}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {service === "business-cards" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("quantity")}
              </label>
              <input
                type="number"
                min={50}
                step={50}
                value={qty}
                onChange={(e) => setQty(Math.max(50, Number(e.target.value) || 50))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("sides")}
                </label>
                <select
                  value={sides}
                  onChange={(e) => setSides(Number(e.target.value) as 1 | 2)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
                >
                  <option value={1}>{t("oneSide")}</option>
                  <option value={2}>{t("twoSides")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("material")}
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
                >
                  <option value="300">{t("paper300")}</option>
                  <option value="350">{t("paper350")}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("lamination")}
              </label>
              <select
                value={lamination}
                onChange={(e) => setLamination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
              >
                <option value="none">{t("none")}</option>
                <option value="matte">{t("matte")}</option>
                <option value="glossy">{t("glossy")}</option>
              </select>
            </div>
          </>
        )}

        {service === "banners" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("width")}
                </label>
                <input
                  type="number"
                  min={0.3}
                  step={0.1}
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.3, Number(e.target.value) || 0.3))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("height")}
                </label>
                <input
                  type="number"
                  min={0.3}
                  step={0.1}
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.3, Number(e.target.value) || 0.3))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {t("area")}: {(width * height).toFixed(2)} м²
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("material")}
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
              >
                <option value="std">{t("bannerStd")}</option>
                <option value="premium">{t("bannerPremium")}</option>
                <option value="oracal">{t("oracal")}</option>
                <option value="mesh">{t("mesh")}</option>
              </select>
            </div>
          </>
        )}

        {service === "flyers" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("quantity")}
              </label>
              <input
                type="number"
                min={50}
                step={50}
                value={qty}
                onChange={(e) => setQty(Math.max(50, Number(e.target.value) || 50))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("size")}
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
                >
                  <option value="a6">{t("a6")}</option>
                  <option value="a5">{t("a5")}</option>
                  <option value="a4">{t("a4")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("sides")}
                </label>
                <select
                  value={sides}
                  onChange={(e) => setSides(Number(e.target.value) as 1 | 2)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
                >
                  <option value={1}>{t("oneSide")}</option>
                  <option value={2}>{t("twoSides")}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("material")}
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
              >
                <option value="80">{t("paper80")}</option>
                <option value="130">{t("paper130")}</option>
                <option value="170">{t("paper170")}</option>
              </select>
            </div>
          </>
        )}

        {service === "design" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("service")}
            </label>
            <select
              value={designType}
              onChange={(e) => setDesignType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
            >
              <option value="simple">{t("designSimple")}</option>
              <option value="logo">{t("designLogo")}</option>
              <option value="brand">{t("designBrand")}</option>
            </select>
          </div>
        )}

        {service === "laminating" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("quantity")} (A4)
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("material")}
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
              >
                <option value="80">{t("film80")}</option>
                <option value="125">{t("film125")}</option>
              </select>
            </div>
          </>
        )}

        {service === "canvas" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("width")}
                </label>
                <input
                  type="number"
                  min={0.2}
                  step={0.1}
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.2, Number(e.target.value) || 0.2))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t("height")}
                </label>
                <input
                  type="number"
                  min={0.2}
                  step={0.1}
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.2, Number(e.target.value) || 0.2))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {t("area")}: {(width * height).toFixed(2)} м²
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("material")}
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white outline-none"
              >
                <option value="std">{t("canvasStd")}</option>
                <option value="premium">{t("canvasPremium")}</option>
                <option value="wallpaper">{t("wallpaper")}</option>
              </select>
            </div>
          </>
        )}

        <div className="rounded-xl bg-orange-50 border border-orange-100 p-5 text-center">
          <p className="text-sm text-slate-600 mb-1">{t("result")}</p>
          <p className="text-3xl font-bold text-[var(--color-primary)]">
            {t("from")} {price.toLocaleString("ru-RU")} {t("lei")}
          </p>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">{t("note")}</p>
        </div>

        <Link
          href="/contact"
          className="block w-full text-center px-6 py-3.5 text-base font-semibold text-white bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
