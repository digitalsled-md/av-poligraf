import { Link } from "@/i18n/routing";

type Props = {
  variant?: "header" | "footer";
  className?: string;
};

export default function Logo({ variant = "header", className = "" }: Props) {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className={`flex items-center gap-2.5 shrink-0 group ${className}`}>
      <span
        className={`relative flex items-center justify-center rounded-full bg-[var(--color-brand)] text-white overflow-hidden shrink-0 ${
          isFooter ? "h-10 w-10" : "h-9 w-9 sm:h-10 sm:w-10"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
          <text
            x="32"
            y="30"
            textAnchor="middle"
            fontFamily="system-ui, Arial, sans-serif"
            fontWeight="700"
            fontSize="18"
            fill="#fff"
            letterSpacing="-0.5"
          >
            AV
          </text>
          <path
            d="M16 36 C22 31, 27 41, 32 36 C37 31, 42 41, 48 36"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <text
            x="32"
            y="50"
            textAnchor="middle"
            fontFamily="system-ui, Arial, sans-serif"
            fontWeight="600"
            fontSize="5.5"
            fill="#fff"
            letterSpacing="1.2"
          >
            POLIGRAF
          </text>
        </svg>
      </span>

      <span className="flex flex-col leading-tight min-w-0">
        <span
          className={`font-bold tracking-tight ${
            isFooter ? "text-white text-base" : "text-[var(--color-brand)] text-base sm:text-lg"
          }`}
        >
          A&amp;V Poligraf
        </span>
        <span
          className={`text-[10px] sm:text-xs font-medium tracking-wide ${
            isFooter ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Comrat · 2008
        </span>
      </span>
    </Link>
  );
}
