"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "37379955020";

type FormData = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  description: string;
  deadline?: string;
  hasLayout: "yes" | "no";
};

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("contact.form");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const isRo = locale === "ro";
  const [success, setSuccess] = useState(false);
  const [lastWhatsApp, setLastWhatsApp] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(2, t("required")),
    phone: z.string().min(8, t("required")),
    email: z.string().email().optional().or(z.literal("")),
    service: z.string().min(1, t("required")),
    description: z.string().min(5, t("required")),
    deadline: z.string().optional(),
    hasLayout: z.enum(["yes", "no"], {
      required_error: t("required"),
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasLayout: undefined },
  });

  const hasLayout = useWatch({ control, name: "hasLayout" });

  const services = tServices.raw("items") as { id: string; title: string }[];

  const serviceTitle = (id: string) =>
    services.find((s) => s.id === id)?.title ?? id;

  const buildWhatsAppUrl = (data: FormData) => {
    const layoutLine =
      data.hasLayout === "yes"
        ? isRo
          ? "Machetă: am fișier — îl trimit în chat"
          : "Макет: есть файл — пришлю в чат"
        : isRo
          ? "Machetă: nu am — am nevoie de design"
          : "Макет: нет — нужен дизайн";

    const lines = [
      isRo
        ? "Bună! Solicitare de pe site-ul A&V Poligraf."
        : "Здравствуйте! Заявка с сайта A&V Poligraf.",
      isRo ? `Nume: ${data.name}` : `Имя: ${data.name}`,
      isRo ? `Telefon: ${data.phone}` : `Телефон: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      isRo
        ? `Serviciu: ${serviceTitle(data.service)}`
        : `Услуга: ${serviceTitle(data.service)}`,
      data.deadline
        ? isRo
          ? `Termen: ${data.deadline}`
          : `Срок: ${data.deadline}`
        : null,
      layoutLine,
      isRo
        ? `Descriere: ${data.description}`
        : `Описание: ${data.description}`,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const onSubmit = (data: FormData) => {
    const url = buildWhatsAppUrl(data);
    setLastWhatsApp(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccess(true);
    reset();
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
        <p className="text-lg font-medium text-slate-800">
          {isRo
            ? "Deschidem WhatsApp cu textul solicitării"
            : "Открываем WhatsApp с текстом заявки"}
        </p>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {isRo
            ? "Dacă chatul nu s-a deschis — apăsați butonul de mai jos."
            : "Если чат не открылся — нажмите кнопку ниже."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {lastWhatsApp && (
            <a
              href={lastWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-medium text-sm hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setLastWhatsApp(null);
            }}
            className="text-sm text-[var(--color-accent)] hover:underline px-3 py-2"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div
        className={
          compact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"
        }
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("name")} *
          </label>
          <input
            {...register("name")}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition"
            placeholder={t("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("phone")} *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition"
            placeholder="+373..."
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t("email")}
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition"
          placeholder="email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t("service")} *
        </label>
        <select
          {...register("service")}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition bg-white"
        >
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t("description")} *
        </label>
        <textarea
          {...register("description")}
          rows={compact ? 3 : 4}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition resize-none"
          placeholder={t("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {!compact && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {t("deadline")}
          </label>
          <input
            {...register("deadline")}
            type="text"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition"
            placeholder={isRo ? "de exemplu, 3 zile" : "например, 3 дня"}
          />
        </div>
      )}

      <fieldset>
        <legend className="block text-sm font-medium text-slate-700 mb-2">
          {isRo ? "Aveți machetă gata?" : "Есть готовый макет?"} *
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label
            className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-3 cursor-pointer transition ${
              hasLayout === "yes"
                ? "border-[var(--color-accent)] bg-orange-50/60 ring-1 ring-[var(--color-accent)]"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <input
              type="radio"
              value="yes"
              {...register("hasLayout")}
              className="accent-[var(--color-accent)]"
            />
            <span className="text-sm text-slate-800">
              {isRo ? "Da, am fișier" : "Да, есть файл"}
            </span>
          </label>
          <label
            className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-3 cursor-pointer transition ${
              hasLayout === "no"
                ? "border-[var(--color-accent)] bg-orange-50/60 ring-1 ring-[var(--color-accent)]"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <input
              type="radio"
              value="no"
              {...register("hasLayout")}
              className="accent-[var(--color-accent)]"
            />
            <span className="text-sm text-slate-800">
              {isRo ? "Nu, am nevoie de design" : "Нет, нужен дизайн"}
            </span>
          </label>
        </div>
        {errors.hasLayout && (
          <p className="mt-1 text-xs text-red-500">{errors.hasLayout.message}</p>
        )}
        {hasLayout === "yes" && (
          <p className="mt-2 text-xs text-slate-500 leading-snug">
            {isRo
              ? "După trimitere deschideți WhatsApp și atașați fișierul (📎) în chat."
              : "После отправки откройте WhatsApp и прикрепите файл (📎) в чате."}
          </p>
        )}
        {hasLayout === "no" && (
          <p className="mt-2 text-xs text-slate-500 leading-snug">
            {isRo
              ? "Vom pregăti macheta — descrieți ideea mai sus sau în chat."
              : "Подготовим макет — опишите идею выше или в чате."}
          </p>
        )}
      </fieldset>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#25D366] rounded-xl hover:brightness-110 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        {isRo ? "Trimite pe WhatsApp" : "Отправить в WhatsApp"}
      </button>
    </form>
  );
}
