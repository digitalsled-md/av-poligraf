import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const info = t.raw("info") as Record<string, string>;

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-slate-200 space-y-5">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {info.phones}
                  </div>
                  <a
                    href="tel:+37379955020"
                    className="block text-[var(--color-primary)] font-medium hover:text-[var(--color-accent)]"
                  >
                    +373 79 955 020
                  </a>
                  <a
                    href="tel:+37379033961"
                    className="block text-[var(--color-primary)] font-medium hover:text-[var(--color-accent)]"
                  >
                    +373 79 033 961
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {info.email}
                  </div>
                  <a
                    href="mailto:avpoligraf@gmail.com"
                    className="block text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                  >
                    avpoligraf@gmail.com
                  </a>
                  <a
                    href="mailto:designavpoligraf@mail.ru"
                    className="block text-sm text-slate-600 hover:text-[var(--color-accent)]"
                  >
                    designavpoligraf@mail.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {info.address}
                  </div>
                  <p className="text-slate-700">{info.addressValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {info.hours}
                  </div>
                  <p className="text-slate-700">{info.hoursValue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-500">
                    {info.messengers}
                  </div>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="viber://chat?number=%2B37379955020"
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      Viber
                    </a>
                    <a
                      href="https://wa.me/37379955020"
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://t.me/"
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="Comrat map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.5!2d28.655!3d46.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b85c5e5e5e5e5e%3A0x0!2sComrat!5e0!3m2!1sen!2smd!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
