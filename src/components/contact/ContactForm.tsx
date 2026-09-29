"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";

const WEB3FORMS_KEY = "3f338095-3800-4822-b996-d7239b7bc3dd";
const NOTIFY_EMAIL = "sled.admin@gmail.com";
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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<FormData | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("access_key", WEB3FORMS_KEY);
      body.append("subject", `Заявка A&V Poligraf — ${serviceTitle(data.service)}`);
      body.append("from_name", data.name);
      body.append("name", data.name);
      body.append("phone", data.phone);
      if (data.email) {
        body.append("email", data.email);
        body.append("replyto", data.email);
      }
      body.append("service", serviceTitle(data.service));
      body.append("deadline", data.deadline || "—");
      body.append(
        "message",
        [
          data.description,
          "",
          `Телефон: ${data.phone}`,
          data.email ? `Email: ${data.email}` : "",
          `Услуга: ${serviceTitle(data.service)}`,
          data.deadline ? `Срок: ${data.deadline}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );
      body.append("to_email_note", NOTIFY_EMAIL);
      body.append("botcheck", "");

      const file = fileRef.current?.files?.[0];
      if (file) {
        body.append("attachment", file);
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });

      const json = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submit failed");
      }

      setLastPayload(data);
      setSuccess(true);
      reset();
      if (fileRef.current) fileRef.current.value = "";
    } catch (e) {
      console.error(e);
      setError(
        t("error") ||
          "Не удалось отправить. Попробуйте WhatsApp или позвоните."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = () => {
    if (!lastPayload) {
      return `https://wa.me/${WHATSAPP_NUMBER}`;
    }
    const text = [
      "Здравствуйте! Заявка с сайта A&V Poligraf.",
      `Имя: ${lastPayload.name}`,
      `Телефон: ${lastPayload.phone}`,
      lastPayload.email ? `Email: ${lastPayload.email}` : null,
      `Услуга: ${serviceTitle(lastPayload.service)}`,
      lastPayload.deadline ? `Срок: ${lastPayload.deadline}` : null,
      `Описание: ${lastPayload.description}`,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
        <p className="text-lg font-medium text-slate-800">{t("success")}</p>
        <p className="text-sm text-slate-500">
          {t("successHint") ||
            "Мы получили заявку. При необходимости продублируйте в WhatsApp."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-medium text-sm hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setLastPayload(null);
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
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t("deadline")}
            </label>
            <input
              {...register("deadline")}
              type="text"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition"
              placeholder="например, 3 дня"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t("file")}
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.cdr,.zip"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-[var(--color-accent)] hover:file:bg-orange-100"
            />
          </div>
        </>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] disabled:opacity-70 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            ...
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
