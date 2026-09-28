"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";

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

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
    reset();
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
        <p className="text-lg font-medium text-slate-800">{t("success")}</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-[var(--color-accent)] hover:underline"
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
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

      {!compact && (
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
        </div>
      )}

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
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
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
              type="file"
              accept=".pdf,.jpg,.png,.ai,.psd,.cdr"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-[var(--color-accent)] hover:file:bg-orange-100"
            />
          </div>
        </>
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
