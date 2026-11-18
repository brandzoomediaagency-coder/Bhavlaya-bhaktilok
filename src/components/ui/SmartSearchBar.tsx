"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Sparkles, Clock, ArrowRight, CornerDownLeft } from "lucide-react";
import { SearchResultItem } from "@/lib/searchEngine";
import { brandConfig } from "@/config/site";

interface SmartSearchBarProps {
  placeholder?: string;
  variant?: "hero" | "header" | "compact";
  onClose?: () => void;
}

const STORAGE_KEY = "bhavlaya_recent_searches";

export function SmartSearchBar({
  placeholder,
  variant = "hero",
  onClose,
}: SmartSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentSearches([]);
    } catch {
      // ignore
    }
  };

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query.trim())}&mode=suggest&limit=6`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setSelectedIndex(-1);
        }
      } catch (err) {
        console.error("Search suggestion error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        saveRecentSearch(query);
        router.push(suggestions[selectedIndex].href);
        setIsOpen(false);
        if (onClose) onClose();
      } else if (query.trim()) {
        saveRecentSearch(query);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
        if (onClose) onClose();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsOpen(false);
    if (onClose) onClose();
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            saveRecentSearch(query);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            if (onClose) onClose();
          }
        }}
        className={`relative ${
          isHero
            ? "shadow-dropdown rounded-2xl bg-white border border-gold/30 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/20 transition-all"
            : "rounded-xl bg-ivory border border-gold/25 focus-within:border-saffron transition-all"
        }`}
      >
        <Search
          className={`text-stone absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
            isHero ? "w-5 h-5" : "w-4 h-4"
          } ${isOpen ? "text-saffron" : ""}`}
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            `${brandConfig.nameHi} में खोजें: श्री कृष्ण भजन, हनुमान चालीसा, गायत्री मंत्र...`
          }
          className={`w-full bg-transparent text-charcoal placeholder-stone-light focus:outline-none ${
            isHero
              ? "pl-12 pr-28 py-4 text-base sm:text-lg"
              : "pl-10 pr-20 py-2.5 text-sm"
          }`}
          autoComplete="off"
          spellCheck="false"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="absolute right-24 sm:right-28 top-1/2 -translate-y-1/2 p-1 text-stone hover:text-charcoal rounded-full"
            aria-label="खोज साफ़ करें"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-saffron hover:bg-saffron-light text-white font-medium rounded-xl transition-all shadow-xs flex items-center gap-1 ${
            isHero ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-xs"
          }`}
        >
          <span>खोजें</span>
          <CornerDownLeft className="w-3.5 h-3.5 opacity-80 hidden sm:inline" />
        </button>
      </form>

      {/* Live Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cream rounded-2xl shadow-dropdown border border-gold/25 p-2 z-50 overflow-hidden text-left divide-y divide-gold/10">
          {/* Real-time Suggestions */}
          {suggestions.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-stone uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-saffron" />
                <span>सुझाव</span>
              </div>
              <div className="space-y-0.5">
                {suggestions.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      saveRecentSearch(item.titleHi);
                      setIsOpen(false);
                      if (onClose) onClose();
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-sm ${
                      selectedIndex === idx
                        ? "bg-saffron/15 text-saffron-dark font-medium"
                        : "hover:bg-saffron/5 text-charcoal"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-saffron/10 text-saffron-dark shrink-0">
                        {item.categoryHi}
                      </span>
                      <span className="truncate font-serif text-sm">
                        {item.titleHi}
                      </span>
                      {item.title && item.title !== item.titleHi && (
                        <span className="text-xs text-stone truncate font-sans hidden sm:inline">
                          ({item.title})
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone shrink-0 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !query.trim() && (
            <div className="py-2">
              <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold text-stone uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  हालिया खोजें
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-stone hover:text-maroon transition-colors text-[10px] normal-case"
                >
                  इतिहास साफ़ करें
                </button>
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5 px-3">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectRecent(term)}
                    className="px-2.5 py-1 rounded-lg bg-ivory border border-gold/20 text-xs text-charcoal hover:border-saffron hover:text-saffron transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Popular Topics */}
          {!query.trim() && (
            <div className="py-2 px-3">
              <span className="text-[11px] font-semibold text-stone uppercase tracking-wider block mb-1.5">
                लोकप्रिय विषय
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["हनुमान चालीसा", "शिव आरती", "महामृत्युंजय मंत्र", "कृष्ण भजन", "निर्जला एकादशी", "ब्रह्म मुहूर्त"].map(
                  (pop) => (
                    <button
                      key={pop}
                      onClick={() => handleSelectRecent(pop)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gold/15 text-xs text-stone hover:text-saffron hover:border-saffron transition-colors"
                    >
                      {pop}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
