"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
};

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("contact.form");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const [success, setSuccess] = useState(false);
  const [lastWhatsApp, setLastWhatsApp] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(2, t("required")),
    phone: z.string().min(8, t("required")),
    email: z.string().email().optional().or(z.literal("")),
    service: z.string().min(1, t("required")),
    description: z.string().min(5, t("required")),
    deadline: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const services = tServices.raw("items") as { id: string; title: string }[];

  const serviceTitle = (id: string) =>
    services.find((s) => s.id === id)?.title ?? id;

  const buildWhatsAppUrl = (data: FormData) => {
    const lines = [
      locale === "ro"
        ? "Bună! Solicitare de pe site-ul A&V Poligraf."
        : "Здравствуйте! Заявка с сайта A&V Poligraf.",
      locale === "ro" ? `Nume: ${data.name}` : `Имя: ${data.name}`,
      locale === "ro" ? `Telefon: ${data.phone}` : `Телефон: ${data.phone}`,
      data.email
        ? locale === "ro"
          ? `Email: ${data.email}`
          : `Email: ${data.email}`
        : null,
      locale === "ro"
        ? `Serviciu: ${serviceTitle(data.service)}`
        : `Услуга: ${serviceTitle(data.service)}`,
      data.deadline
        ? locale === "ro"
          ? `Termen: ${data.deadline}`
          : `Срок: ${data.deadline}`
        : null,
      locale === "ro"
        ? `Descriere: ${data.description}`
        : `Описание: ${data.description}`,
      "",
      locale === "ro"
        ? "(Macheta o trimit în mesajul următor, dacă e nevoie.)"
        : "(Макет пришлю следующим сообщением, если нужно.)",
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
          {locale === "ro"
            ? "Deschidem WhatsApp cu textul solicitării"
            : "Открываем WhatsApp с текстом заявки"}
        </p>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {locale === "ro"
            ? "Dacă fereastra nu s-a deschis, apăsați butonul de mai jos. Macheta o atașați în chat."
            : "Если окно не открылось — нажмите кнопку ниже. Макет прикрепите уже в чате."}
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
            placeholder={
              locale === "ro" ? "de exemplu, 3 zile" : "например, 3 дня"
            }
          />
        </div>
      )}

      <div className="rounded-lg border border-emerald-100 bg-emerald-50/80 px-3.5 py-3 text-sm text-slate-700">
        <p className="font-medium text-emerald-800 mb-0.5">
          {locale === "ro" ? "Fișier / machetă" : "Файл / макет"}
        </p>
        <p className="text-slate-600 leading-snug">
          {locale === "ro"
            ? "După trimitere se deschide WhatsApp. Atașați macheta în chat (📎) — prin formular fișierele nu se trimit."
            : "После отправки откроется WhatsApp. Прикрепите макет в чате (📎) — через форму файлы не отправляются."}
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#25D366] rounded-xl hover:brightness-110 transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        {locale === "ro" ? "Trimite pe WhatsApp" : "Отправить в WhatsApp"}
      </button>
    </form>
  );
}
