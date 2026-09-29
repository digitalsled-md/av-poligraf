"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_URL, TELEGRAM_URL } from "@/lib/images";

export default function MobileFab() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2.5 md:hidden">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2AABEE] text-white shadow-lg shadow-sky-900/25 transition-transform active:scale-95 hover:brightness-110"
      >
        <Send className="h-5 w-5" strokeWidth={2.2} />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/25 transition-transform active:scale-95 hover:brightness-110"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
      </a>
      <a
        href={`tel:${PHONE_PRIMARY}`}
        aria-label="Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-orange-900/30 transition-transform active:scale-95 hover:brightness-110"
      >
        <Phone className="h-5 w-5" strokeWidth={2.2} />
      </a>
    </div>
  );
}
