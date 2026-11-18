import Link from "next/link";
import { brandConfig } from "@/config/brand";

interface BrandLogoProps {
  variant?: "full" | "compact" | "icon-only" | "footer";
  theme?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export function BrandLogo({
  variant = "full",
  theme = "dark",
  showTagline = true,
  className = "",
  href = "/",
}: BrandLogoProps) {
  const isLight = theme === "light";

  const LogoIcon = (
    <div className="relative shrink-0 flex items-center justify-center">
      {/* Outer Divine Aura Ring */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-saffron via-gold to-maroon p-[2px] shadow-sm">
        {/* Inner Sacred Sun-Lotus Chakra */}
        <div className="w-full h-full rounded-full bg-cream flex items-center justify-center relative overflow-hidden">
          {/* Subtle radiating petals */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/30 via-transparent to-transparent" />
          {/* Sacred 'भा' Symbol */}
          <span className="font-serif text-maroon font-bold text-xl sm:text-2xl leading-none select-none relative z-10">
            भा
          </span>
        </div>
      </div>
      {/* Subtle Dot of Divine Consciousness (बिंदु) */}
      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-saffron rounded-full border-2 border-cream" />
    </div>
  );

  if (variant === "icon-only") {
    return href ? (
      <Link href={href} className={`inline-block ${className}`} aria-label={brandConfig.name}>
        {LogoIcon}
      </Link>
    ) : (
      <div className={className}>{LogoIcon}</div>
    );
  }

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif text-2xl sm:text-2xl font-bold tracking-tight leading-none ${
              isLight ? "text-white" : "text-maroon"
            }`}
          >
            {brandConfig.nameHi}
          </span>
          <span
            className={`text-[11px] font-inter font-semibold tracking-widest uppercase leading-none ${
              isLight ? "text-white/80" : "text-stone"
            }`}
          >
            {brandConfig.name}
          </span>
        </div>

        {showTagline && variant !== "compact" && (
          <span
            className={`text-[10px] font-sans tracking-wide mt-1 leading-none ${
              isLight ? "text-white/70" : "text-saffron-dark font-medium"
            }`}
          >
            {variant === "footer" ? brandConfig.tagline : brandConfig.taglineHi}
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="inline-block transition-opacity hover:opacity-95">
      {content}
    </Link>
  ) : (
    content
  );
}
