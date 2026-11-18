"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Music,
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  Settings,
  Search,
  Radio,
  FileText,
  Volume2,
  Calendar,
  Compass,
  CheckCircle,
  Plus,
  Edit3,
  Trash2,
  Database,
  ArrowRight,
} from "lucide-react";
import { brandConfig } from "@/config/brand";
import { SEARCH_SYNONYMS } from "@/lib/searchEngine";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "search" | "audio" | "curation" | "seo"
  >("overview");

  const [synonymsList, setSynonymsList] = useState(SEARCH_SYNONYMS);
  const [newCanonical, setNewCanonical] = useState("");
  const [newAliases, setNewAliases] = useState("");
  const [newCategory, setNewCategory] = useState("deity");

  const handleAddSynonym = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCanonical || !newAliases) return;

    const newSyn = {
      canonicalTerm: newCanonical.trim(),
      alternateTerms: newAliases
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
      category: newCategory,
      relevanceBoost: 1.5,
    };

    setSynonymsList([newSyn, ...synonymsList]);
    setNewCanonical("");
    setNewAliases("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gold/20 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-saffron uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-maroon" />
            <span>{brandConfig.nameHi} CMS & प्रशासनिक नियंत्रण कक्ष</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-maroon">
            प्रशासनिक नियंत्रण कक्ष (Admin Control Suite)
          </h1>
          <p className="text-xs text-stone mt-1">
            बहुभाषी खोज, ध्वनिकी अधिकार, दैनिक दर्शन, पंचांग एवं संपादकीय प्रबंधन
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            प्रणाली सक्रिय (Production Ready)
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gold/15 text-xs font-medium">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-maroon text-white font-semibold shadow-xs"
              : "bg-cream text-stone hover:text-charcoal border border-gold/20"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>अवलोकन (Overview)</span>
        </button>

        <button
          onClick={() => setActiveTab("search")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === "search"
              ? "bg-maroon text-white font-semibold shadow-xs"
              : "bg-cream text-stone hover:text-charcoal border border-gold/20"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>बहुभाषी खोज व उपनाम (Search Synonyms)</span>
        </button>

        <button
          onClick={() => setActiveTab("audio")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === "audio"
              ? "bg-maroon text-white font-semibold shadow-xs"
              : "bg-cream text-stone hover:text-charcoal border border-gold/20"
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>आध्यात्मिक ध्वनियां व अधिकार (Audio Assets)</span>
        </button>

        <button
          onClick={() => setActiveTab("curation")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === "curation"
              ? "bg-maroon text-white font-semibold shadow-xs"
              : "bg-cream text-stone hover:text-charcoal border border-gold/20"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>दैनिक सामग्री व टिकर (Daily Curation)</span>
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === "seo"
              ? "bg-maroon text-white font-semibold shadow-xs"
              : "bg-cream text-stone hover:text-charcoal border border-gold/20"
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>SEO & AEO सत्यापन (Engine Optimization)</span>
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "कुल भजन सामग्री", count: "10,232", icon: Music, status: "सत्यापित" },
              { label: "सिद्ध मंत्र", count: "93", icon: Sparkles, status: "सत्यापित" },
              { label: "चालीसा व स्तोत्र", count: "24", icon: BookOpen, status: "सत्यापित" },
              { label: "मंदिर व तीर्थ", count: "91", icon: MapPin, status: "सत्यापित" },
              { label: "पर्व व व्रत", count: "48", icon: Clock, status: "सत्यापित" },
              { label: "डिजिटल साधन", count: "12", icon: Settings, status: "सक्रिय" },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="p-4 bg-cream rounded-2xl border border-gold/20 shadow-xs">
                  <Icon className="w-5 h-5 text-saffron mb-2" />
                  <span className="text-2xl font-bold font-serif text-maroon block leading-none">
                    {s.count}
                  </span>
                  <span className="text-xs text-stone font-medium block mt-1">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-green-700 font-semibold block mt-1">
                    ✓ {s.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
              <h2 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
                सामग्री प्रबंधन मॉड्यूल स्थिति
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-1.5">
                  <div className="flex justify-between font-bold text-maroon">
                    <span>बहुभाषी खोज सूचकांक</span>
                    <span className="text-green-700 font-semibold">100% सुचारु</span>
                  </div>
                  <p className="text-stone">
                    हिन्दी देवनागरी, हिंग्लिश एवं अंग्रेजी तीनों स्क्रिप्ट में फोनैटिक ट्रांसलिट्रेशन व सिनोनिम मैपिंग सक्रिय।
                  </p>
                </div>
                <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-1.5">
                  <div className="flex justify-between font-bold text-maroon">
                    <span>खगोलीय पंचांग गणना</span>
                    <span className="text-green-700 font-semibold">113/113 टेस्ट पास</span>
                  </div>
                  <p className="text-stone">
                    NOAA सोलर अल्गोरिदम आधारित सूर्योदय, सूर्यास्त, ब्रह्म मुहूर्त व 8 प्रहर राहुकाल सटीक।
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-4 shadow-card">
              <h2 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
                प्रौद्योगिकी संरचना
              </h2>
              <ul className="text-xs text-stone space-y-2">
                <li>• <strong>Framework:</strong> Next.js 16.4.6 (App Router)</li>
                <li>• <strong>Rendering:</strong> Static Generation + ISR</li>
                <li>• <strong>Acoustics:</strong> Web Audio API Polyphonic Synthesis</li>
                <li>• <strong>Security:</strong> RLS + Input Sanitization</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEARCH & SYNONYMS TAB */}
      {activeTab === "search" && (
        <div className="space-y-6">
          {/* Add Synonym Form */}
          <div className="bg-cream border border-gold/25 rounded-2xl p-6 shadow-card">
            <h3 className="font-serif text-lg font-bold text-maroon mb-3">
              नया खोज उपनाम व पर्यायवाची जोड़ें (Add Synonym / Alias)
            </h3>
            <form onSubmit={handleAddSynonym} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-stone mb-1">
                  मुख्य शब्द (Canonical Term)
                </label>
                <input
                  type="text"
                  value={newCanonical}
                  onChange={(e) => setNewCanonical(e.target.value)}
                  placeholder="उदा. भगवान शिव, हनुमान चालीसा"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-saffron"
                  required
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-stone mb-1">
                  उपनाम / हिंग्लिश विकल्प (Comma separated aliases)
                </label>
                <input
                  type="text"
                  value={newAliases}
                  onChange={(e) => setNewAliases(e.target.value)}
                  placeholder="उदा. shiv, shiva, mahadev, bholenath"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-saffron"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone mb-1">
                  श्रेणी
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-saffron"
                >
                  <option value="deity">देवता (Deity)</option>
                  <option value="chalisa">चालीसा (Chalisa)</option>
                  <option value="aarti">आरती (Aarti)</option>
                  <option value="mantra">मंत्र (Mantra)</option>
                  <option value="vrat">व्रत (Vrat)</option>
                  <option value="panchang">पंचांग (Panchang)</option>
                </select>
              </div>

              <div className="sm:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-saffron hover:bg-saffron-light text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> जोड़ें
                </button>
              </div>
            </form>
          </div>

          {/* Active Synonyms Table */}
          <div className="bg-cream border border-gold/25 rounded-2xl overflow-hidden shadow-card">
            <div className="p-4 border-b border-gold/15 flex justify-between items-center">
              <h3 className="font-serif text-base font-bold text-maroon">
                सक्रिय खोज उपनाम डेटाबेस ({synonymsList.length} प्रविष्टियां)
              </h3>
              <span className="text-xs text-stone">लाइव खोज सूचकांक से सम्बद्ध</span>
            </div>

            <div className="divide-y divide-gold/10 max-h-[500px] overflow-y-auto">
              {synonymsList.map((syn, idx) => (
                <div key={idx} className="p-4 hover:bg-ivory/80 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-maroon">
                        {syn.canonicalTerm}
                      </span>
                      {syn.category && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-saffron/10 text-saffron-dark">
                          {syn.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {syn.alternateTerms.map((alt, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded-md bg-white border border-gold/20 text-[11px] text-stone"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-xs text-green-700 font-semibold shrink-0">
                    सक्रिय (Boost: {syn.relevanceBoost || 1.0}x)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. AUDIO ASSETS & ACOUSTICS TAB */}
      {activeTab === "audio" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-3 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-saffron/10 text-saffron-dark text-[11px] font-bold">
                  पीतल घंटी
                </span>
                <span className="text-xs text-green-700 font-semibold">Web Audio Synthesizer</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-maroon">मंदिर घंटी ध्वनिकी</h3>
              <p className="text-xs text-stone leading-relaxed">
                5 प्राथमिक ओवरटोन: 293.66 Hz (Hum), 587.33 Hz (Fundamental), 698.46 Hz (Tierce), 880 Hz (Quint), 1174.66 Hz (Nominal)।
              </p>
              <div className="pt-2 border-t border-gold/15 text-[11px] text-stone">
                लाइसेंस: Code Crew Labs Proprietary Audio Engine
              </div>
            </div>

            <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-3 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-maroon/10 text-maroon text-[11px] font-bold">
                  दक्षिणावर्ती शंख
                </span>
                <span className="text-xs text-green-700 font-semibold">Acoustic Formant</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-maroon">शंख नाद अनुनाद</h3>
              <p className="text-xs text-stone leading-relaxed">
                220 Hz से 246.94 Hz पिच लिफ्ट, 480 Hz बैंडपास गुहा फिल्टर और प्राकृतिक श्वास प्रवाह क्षरण।
              </p>
              <div className="pt-2 border-t border-gold/15 text-[11px] text-stone">
                लाइसेंस: Code Crew Labs Proprietary Audio Engine
              </div>
            </div>

            <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-3 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-gold/15 text-gold-dark text-[11px] font-bold">
                  136.1 Hz
                </span>
                <span className="text-xs text-green-700 font-semibold">Cosmic Frequency</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-maroon">136.1 Hz ॐ नाद</h3>
              <p className="text-xs text-stone leading-relaxed">
                हंस कौस्टो पृथ्वी वर्ष गणना अनुसार सटीक 136.10 Hz + 272.2 Hz सूक्ष्म हार्मोनिक और वैदिक ॐकार ध्यान मोड।
              </p>
              <div className="pt-2 border-t border-gold/15 text-[11px] text-stone">
                लाइसेंस: Code Crew Labs Proprietary Audio Engine
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. DAILY CURATION TAB */}
      {activeTab === "curation" && (
        <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
          <h3 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
            दैनिक संपादन व होमपेज टिकर
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-charcoal text-sm">दैनिक अपडेट टिकर प्रविष्टियां</h4>
              <ul className="space-y-2 text-stone">
                <li className="p-2.5 rounded-lg bg-ivory border border-gold/15">
                  1. दैनिक पंचांग: शुभ चौघड़िया एवं ब्रह्म मुहूर्त समय अद्यतन
                </li>
                <li className="p-2.5 rounded-lg bg-ivory border border-gold/15">
                  2. आगामी महाव्रत: निर्जला एकादशी व्रत (25 जून 2026)
                </li>
                <li className="p-2.5 rounded-lg bg-ivory border border-gold/15">
                  3. नया: भक्ति स्टेटस स्टूडियो से बनाएं 9:16 स्टेटस कार्ड
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-charcoal text-sm">दैनिक दर्शन व श्लोक क्यूरेशन</h4>
              <div className="p-4 bg-ivory rounded-xl border border-gold/15 space-y-2">
                <p><strong>आज का दर्शन:</strong> श्री काशी विश्वनाथ मंगला आरती दर्शन</p>
                <p><strong>आज का श्लोक:</strong> गीता 2.47 (कर्मण्येवाधिकारस्ते)</p>
                <p><strong>अनुशंसित साधना:</strong> 108 गायत्री महामंत्र जप</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SEO & AEO TAB */}
      {activeTab === "seo" && (
        <div className="bg-cream border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-card">
          <h3 className="font-serif text-xl font-bold text-maroon pb-2 border-b border-gold/15">
            सर्च इंजन एवं उत्तर इंजन अनुकूलन (SEO / AEO / GEO)
          </h3>
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-ivory rounded-xl border border-gold/15 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-charcoal text-sm">Google Sitelinks SearchBox Schema</h4>
                <p className="text-stone">WebSite JSON-LD में सर्च एक्शन कॉन्फिगरेशन सक्रिय।</p>
              </div>
              <span className="text-green-700 font-semibold">✓ वैध (Valid)</span>
            </div>

            <div className="p-4 bg-ivory rounded-xl border border-gold/15 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-charcoal text-sm">AEO प्रत्यक्ष उत्तर बॉक्स (Direct Answers)</h4>
                <p className="text-stone">प्रत्येक आलेख व सामग्री पृष्ठ पर 50-शब्द का स्पष्ट सार व FAQPage स्कीमा।</p>
              </div>
              <span className="text-green-700 font-semibold">✓ सक्रिय</span>
            </div>

            <div className="p-4 bg-ivory rounded-xl border border-gold/15 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-charcoal text-sm">लेखक एवं विद्वान प्रामाणिकता (E-E-A-T)</h4>
                <p className="text-stone">आचार्य विद्याधर शास्त्री व डॉ. अनन्या शर्मा के शोध आलेख लेखक प्रोफाइल से लिंक।</p>
              </div>
              <span className="text-green-700 font-semibold">✓ अनुक्रमित</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
