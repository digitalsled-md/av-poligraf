import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://av-poligraf.vercel.app"),
  title: "A&V Poligraf — Типография в Комрате",
  description:
    "Типография A&V Poligraf в Комрате (Гагаузия). Печать, дизайн, баннеры с 2008 года.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
