"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Heart, Globe, Sparkles } from "lucide-react";
import { navigation, siteConfig, brandConfig } from "@/config/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

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
      {/* Top bar */}
      <div className="hidden lg:block bg-maroon text-white/90 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <p className="text-xs font-light flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-saffron-light" />
            <span>{brandConfig.nameHi} — {brandConfig.taglineHi}</span>
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/panchang" className="hover:text-saffron-light transition-colors">
              आज का पंचांग
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/festivals" className="hover:text-saffron-light transition-colors">
              आगामी त्योहार
            </Link>
            <span className="text-white/30">|</span>
            <button className="flex items-center gap-1 hover:text-saffron-light transition-colors">
              <Globe className="w-3 h-3" />
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Bhavlaya Logo */}
          <BrandLogo variant="full" showTagline={true} />

          {/* Desktop Navigation */}
          <nav ref={menuRef} className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  "megaMenu" in item ? setActiveMenu(item.href) : setActiveMenu(null)
                }
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-saffron/5 hover:text-saffron",
                    activeMenu === item.href ? "text-saffron bg-saffron/5" : "text-charcoal"
                  )}
                >
                  {item.label}
                  {"megaMenu" in item && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        activeMenu === item.href ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                {/* Mega Menu */}
                {"megaMenu" in item && activeMenu === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-cream rounded-xl shadow-dropdown border border-gold/15 p-4 mega-menu-enter">
                    {item.megaMenu?.map((section) => (
                      <div key={section.title} className="mb-3 last:mb-0">
                        <h3 className="text-xs font-semibold text-stone uppercase tracking-wider mb-2 px-2">
                          {section.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-1">
                          {section.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="px-2 py-1.5 text-sm text-charcoal hover:text-saffron hover:bg-saffron/5 rounded-md transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gold/10">
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-saffron hover:text-saffron-dark transition-colors"
                      >
                        सभी {item.label} देखें →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-saffron/5 text-stone hover:text-saffron transition-colors"
              aria-label="खोजें"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favourites */}
            <Link
              href="/tools/108-jap-mala-counter"
              className="hidden sm:flex p-2 rounded-lg hover:bg-saffron/5 text-stone hover:text-saffron transition-colors"
              title="जप माला साधना"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-saffron/5 text-stone hover:text-saffron transition-colors"
              aria-label={isMenuOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b border-gold/15 shadow-dropdown animate-slide-down">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <form action="/search" method="GET" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
              <input
                type="search"
                name="q"
                placeholder={`${brandConfig.nameHi} में भजन, मंत्र, आरती, मंदिर या ग्रंथ खोजें...`}
                className="w-full pl-12 pr-4 py-3 bg-ivory border border-gold/20 rounded-xl text-charcoal placeholder-stone-light focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron/30 text-lg"
                autoFocus
              />
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-stone">लोकप्रिय:</span>
              {["हनुमान चालीसा", "गायत्री मंत्र", "आज का पंचांग", "शिव आरती", "श्रीमद्भगवद्गीता"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-xs px-3 py-1 bg-saffron/5 text-saffron rounded-full hover:bg-saffron/10 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gold/10 bg-cream animate-slide-down max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-charcoal hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-gold/10 my-2" />
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm text-stone hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors"
            >
              हमारे बारे में ({brandConfig.name})
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm text-stone hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors"
            >
              संपर्क करें
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
