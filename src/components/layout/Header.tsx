"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Flame,
  Radio,
  BookOpen,
} from "lucide-react";
import { navigation, siteConfig, brandConfig, NavItem } from "@/config/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SmartSearchBar } from "@/components/ui/SmartSearchBar";
import { cn } from "@/lib/utils";

const TICKER_ITEMS = [
  "दैनिक पंचांग: शुभ चौघड़िया एवं ब्रह्म मुहूर्त समय अद्यतन",
  "आगामी महाव्रत: निर्जला एकादशी व्रत (25 जून 2026)",
  "नया: भक्ति स्टेटस स्टूडियो से बनाएं 9:16 स्टेटस कार्ड",
  "द्वादश ज्योतिर्लिंग एवं 51 शक्तिपीठ ज्ञानकोश अब उपलब्ध",
  "साधना साधन: 108 जप माला काउंटर एवं 136.1 Hz ध्यान कक्ष",
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 no-print",
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-gold/15"
          : "bg-cream border-b border-gold/10"
      )}
    >
      {/* 1. ANIMATED LATEST UPDATES TICKER */}
      <div className="bg-maroon text-white/90 text-xs py-1.5 px-4 overflow-hidden border-b border-maroon-dark">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0 font-medium text-saffron-light">
            <span className="w-2 h-2 rounded-full bg-saffron animate-ping shrink-0" />
            <span className="hidden sm:inline font-semibold">दैनिक अपडेट:</span>
          </div>

          {/* Scrolling Marquee / Ticker */}
          <div className="overflow-hidden whitespace-nowrap w-full group relative">
            <div className="inline-block animate-marquee group-hover:[animation-play-state:paused] text-[11px] sm:text-xs">
              {TICKER_ITEMS.map((item, idx) => (
                <span key={idx} className="mx-6 text-white/85 inline-flex items-center gap-2">
                  <Sparkles className="w-2.5 h-2.5 text-gold" />
                  <span>{item}</span>
                  <span className="text-white/30 ml-4">✦</span>
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px]">
            <Link
              href="/panchang"
              className="text-saffron-light hover:underline font-medium"
            >
              आज का पंचांग
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/daily-darshan"
              className="text-white/80 hover:text-white"
            >
              दैनिक दर्शन
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <BrandLogo variant="full" showTagline={true} />

          {/* Desktop Navigation Items */}
          <nav ref={menuRef} className="hidden xl:flex items-center gap-0.5">
            {navigation.main.map((item) => {
              const hasMega = item.columns && item.columns.length > 0;
              const isActive = activeMenu === item.href;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => (hasMega ? setActiveMenu(item.href) : setActiveMenu(null))}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
                      isActive
                        ? "text-saffron bg-saffron/5 font-semibold"
                        : "text-charcoal hover:bg-saffron/5 hover:text-saffron"
                    )}
                  >
                    <span>{item.label}</span>
                    {hasMega && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform opacity-70",
                          isActive ? "rotate-180 text-saffron" : ""
                        )}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl bg-ivory border border-gold/25 hover:border-saffron text-stone hover:text-saffron transition-all flex items-center gap-1.5 text-xs font-medium"
              aria-label="खोजें"
            >
              <Search className="w-4 h-4 text-saffron" />
              <span className="hidden sm:inline">खोजें</span>
            </button>

            {/* Quick Status Studio link */}
            <Link
              href="/status-maker"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-saffron/10 border border-saffron/30 text-saffron-dark text-xs font-semibold hover:bg-saffron hover:text-white transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              <span>स्टेटस स्टूडियो</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-stone hover:text-charcoal hover:bg-saffron/5 xl:hidden"
              aria-label="मेनू खोलें"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. FULL-WIDTH 3-COLUMN + FEATURED CARD MEGA MENU DROPDOWN */}
      {activeMenu && (
        <div
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
          className="hidden xl:block absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md border-b border-gold/20 shadow-xl transition-all duration-200 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {navigation.main.map((navItem) => {
              if (navItem.href !== activeMenu || !navItem.columns) return null;

              return (
                <div key={navItem.href} className="grid grid-cols-12 gap-8">
                  {/* 3 Link Columns (takes 9 cols) */}
                  <div className="col-span-9 grid grid-cols-3 gap-6 divide-x divide-gold/15">
                    {navItem.columns.map((col, cIdx) => (
                      <div key={cIdx} className={cIdx > 0 ? "pl-6" : ""}>
                        <h4 className="text-xs font-bold text-maroon uppercase tracking-wider mb-4 pb-1 border-b border-gold/15 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                          <span>{col.title}</span>
                        </h4>
                        <ul className="space-y-2">
                          {col.items.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                href={sub.href}
                                onClick={() => setActiveMenu(null)}
                                className="text-xs text-charcoal hover:text-saffron hover:translate-x-1 transition-all inline-flex items-center justify-between w-full group py-0.5"
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-saffron/10 text-saffron group-hover:bg-saffron group-hover:text-white transition-colors">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* 1 Featured Card on the Right (takes 3 cols) */}
                  {navItem.featuredCard && (
                    <div className="col-span-3 bg-ivory rounded-2xl border border-gold/30 p-5 flex flex-col justify-between shadow-xs">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-saffron/15 text-saffron-dark text-[11px] font-semibold mb-2">
                          {navItem.featuredCard.badge}
                        </span>
                        <h4 className="font-serif text-base font-bold text-maroon line-clamp-2">
                          {navItem.featuredCard.title}
                        </h4>
                        <p className="text-xs text-stone mt-1.5 line-clamp-2 leading-relaxed">
                          {navItem.featuredCard.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gold/15">
                        <Link
                          href={navItem.featuredCard.href}
                          onClick={() => setActiveMenu(null)}
                          className="w-full py-2 px-3 rounded-xl bg-saffron hover:bg-saffron-light text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>{navItem.featuredCard.actionText}</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. EXPANDABLE SEARCH MODAL / OVERLAY */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-md border-b border-gold/25 p-4 sm:p-6 shadow-dropdown z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-stone flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-saffron" />
                <span>भावलय बहुभाषी खोज (हिन्दी, Hinglish, English)</span>
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-stone hover:text-maroon p-1"
                aria-label="खोज बंद करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SmartSearchBar
              variant="hero"
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 5. MOBILE ACCORDION DRAWER */}
      {isMenuOpen && (
        <div className="xl:hidden bg-cream border-b border-gold/20 px-4 py-6 max-h-[80vh] overflow-y-auto space-y-4">
          <div className="mb-4">
            <SmartSearchBar
              variant="compact"
              onClose={() => setIsMenuOpen(false)}
            />
          </div>

          <div className="divide-y divide-gold/10">
            {navigation.main.map((item) => (
              <div key={item.href} className="py-2">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif font-bold text-maroon text-base flex items-center justify-between py-1"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-stone" />
                </Link>

                {item.columns && (
                  <div className="pl-3 mt-1 space-y-1">
                    {item.columns.flatMap((c) => c.items).slice(0, 4).map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-xs text-stone hover:text-saffron py-1"
                      >
                        • {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
