"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { calculatePanchang, CITIES, CityLocation } from "@/lib/panchangEngine";
import { brandConfig } from "@/config/brand";
import { Sunrise, Sunset, Clock, MapPin, Calendar, Share2, Printer, ChevronRight, Sparkles } from "lucide-react";

export function PanchangWidget({ showFullDetails = false }: { showFullDetails?: boolean }) {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES[0]);
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date("2026-11-18T06:00:00+05:30"));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const panchang = useMemo(() => {
    return calculatePanchang(currentDate, selectedCity);
  }, [currentDate, selectedCity]);

  const changeDateBy = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
  };

  const handleShare = () => {
    const shareUrl = `${brandConfig.activeDomain}/panchang`;
    const text = `📅 आज का पंचांग (${panchang.city.nameHi}) - ${panchang.dateFormatted}\n\n` +
      `✨ तिथि: ${panchang.tithi} (${panchang.paksha})\n` +
      `⭐ नक्षत्र: ${panchang.nakshatra}\n` +
      `🌅 सूर्योदय: ${panchang.sunrise} | सूर्यास्त: ${panchang.sunset}\n` +
      `⏳ अभिजित मुहूर्त: ${panchang.abhijitMuhurat}\n` +
      `⚠️ राहुकाल: ${panchang.rahukaal}\n\n` +
      `🔗 ${brandConfig.nameHi} पर देखें: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({ title: `आज का पंचांग | ${brandConfig.nameHi}`, text, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls: City Selector & Date Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gold/15 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-saffron uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>दैनिक सनातन पंचांग</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            आज का पंचांग
          </h2>
          <p className="text-stone text-xs sm:text-sm mt-0.5">
            {panchang.dateFormatted} · {panchang.hinduMonth} · संवत {panchang.vikramSamvat}
          </p>
        </div>

        {/* City and Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <MapPin className="w-4 h-4 text-maroon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITIES.find((c) => c.name === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="w-full sm:w-auto pl-9 pr-8 py-2 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron appearance-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.nameHi}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-ivory border border-gold/30 text-stone hover:text-maroon hover:border-gold transition-colors"
            title="पंचांग साझा करें"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copied && (
            <span className="text-xs text-saffron font-medium animate-fade-in absolute right-6 -bottom-5">
              कॉपी हो गया!
            </span>
          )}
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between gap-2 py-4 border-b border-gold/10 text-xs sm:text-sm">
        <button
          onClick={() => changeDateBy(-1)}
          className="px-3 py-1.5 rounded-lg bg-ivory border border-gold/20 text-stone hover:text-maroon hover:border-gold transition-colors"
        >
          ← कल (बीता हुआ)
        </button>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-1.5 rounded-lg bg-saffron text-white font-medium shadow-xs"
        >
          आज
        </button>
        <button
          onClick={() => changeDateBy(1)}
          className="px-3 py-1.5 rounded-lg bg-ivory border border-gold/20 text-stone hover:text-maroon hover:border-gold transition-colors"
        >
          कल (आने वाला) →
        </button>
      </div>

      {/* Panchang Main Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
        <div className="bg-ivory/80 rounded-xl p-4 border border-gold/15">
          <span className="text-[11px] text-stone uppercase tracking-wide block">तिथि</span>
          <span className="font-serif font-bold text-lg text-maroon block mt-1">
            {panchang.tithi}
          </span>
          <span className="text-xs text-saffron font-medium">{panchang.paksha}</span>
        </div>

        <div className="bg-ivory/80 rounded-xl p-4 border border-gold/15">
          <span className="text-[11px] text-stone uppercase tracking-wide block">नक्षत्र</span>
          <span className="font-serif font-bold text-lg text-maroon block mt-1">
            {panchang.nakshatra}
          </span>
          <span className="text-xs text-stone">चंद्रमा का गोचर</span>
        </div>

        <div className="bg-ivory/80 rounded-xl p-4 border border-gold/15">
          <span className="text-[11px] text-stone uppercase tracking-wide block">वार / दिन</span>
          <span className="font-serif font-bold text-lg text-maroon block mt-1">
            {panchang.vara.hi}
          </span>
          <span className="text-xs text-stone">{panchang.vara.en}</span>
        </div>

        <div className="bg-ivory/80 rounded-xl p-4 border border-gold/15">
          <span className="text-[11px] text-stone uppercase tracking-wide block">योग व करण</span>
          <span className="font-serif font-bold text-base text-maroon block mt-1 truncate">
            {panchang.yoga}
          </span>
          <span className="text-xs text-stone">करण: {panchang.karana}</span>
        </div>
      </div>

      {/* Sun & Muhurat Timings Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 bg-gradient-to-r from-ivory via-cream to-ivory rounded-xl p-4 border border-gold/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
            <Sunrise className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-stone block">सूर्योदय</span>
            <span className="text-sm font-semibold text-charcoal">{panchang.sunrise}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center text-maroon">
            <Sunset className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-stone block">सूर्यास्त</span>
            <span className="text-sm font-semibold text-charcoal">{panchang.sunset}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-700">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-stone block">अभिजित मुहूर्त</span>
            <span className="text-xs font-semibold text-green-800">{panchang.abhijitMuhurat}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-stone block">राहुकाल (अशुभ)</span>
            <span className="text-xs font-semibold text-red-700">{panchang.rahukaal}</span>
          </div>
        </div>
      </div>

      {/* Extra details if full page */}
      {showFullDetails && (
        <div className="mt-6 pt-6 border-t border-gold/20 space-y-6">
          {/* Brahma Muhurat */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-serif font-bold text-maroon text-sm">
                ब्रह्म मुहूर्त (साधना एवं ध्यान का पावन समय)
              </h4>
              <p className="text-xs text-stone mt-0.5">
                प्रातःकाल ध्यान, मंत्र जाप और योग साधना के लिए सर्वोत्तम समय।
              </p>
            </div>
            <span className="font-semibold text-saffron text-sm bg-white px-3 py-1.5 rounded-lg shadow-xs border border-amber-200">
              {panchang.brahmaMuhurat}
            </span>
          </div>

          {/* Today's Choghadiya Table */}
          <div>
            <h4 className="font-serif font-bold text-maroon text-base mb-3">
              आज का दिन का चौघड़िया (Day Choghadiya)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {panchang.choghadiya.map((ch, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs ${
                    ch.type === "shubh" || ch.type === "amrit" || ch.type === "labh"
                      ? "bg-green-50/70 border-green-200 text-green-900"
                      : ch.type === "char"
                      ? "bg-blue-50/70 border-blue-200 text-blue-900"
                      : "bg-red-50/60 border-red-200 text-red-900"
                  }`}
                >
                  <span className="font-bold block text-sm">{ch.name}</span>
                  <span className="text-[11px] block mt-0.5 opacity-80">
                    {ch.startTime} – {ch.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Link */}
      <div className="mt-5 pt-4 border-t border-gold/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone">
        <span className="italic leading-relaxed">{panchang.disclaimer}</span>
        {!showFullDetails && (
          <Link
            href="/panchang"
            className="text-saffron hover:text-saffron-dark font-semibold inline-flex items-center gap-1 transition-colors shrink-0"
          >
            संपूर्ण पंचांग व चौघड़िया देखें <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
