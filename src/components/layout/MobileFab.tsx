"use client";

import { Phone, MessageCircle } from "lucide-react";

const PHONE = "+37379955020";
const WHATSAPP = "https://wa.me/37379955020?text=" + encodeURIComponent(
  "Здравствуйте! Хочу узнать стоимость печати / получить просчёт."
);

export default function MobileFab() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 md:hidden">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/25 transition-transform active:scale-95 hover:brightness-110"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      </a>
      <a
        href={`tel:${PHONE}`}
        aria-label="Позвонить"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-orange-900/30 transition-transform active:scale-95 hover:brightness-110"
      >
        <Phone className="h-6 w-6" strokeWidth={2.2} />
      </a>
    </div>
  );
}
