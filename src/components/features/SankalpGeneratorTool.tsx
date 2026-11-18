"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, BookOpen } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function SankalpGeneratorTool() {
  const [userName, setUserName] = useState("अमित शर्मा");
  const [gotra, setGotra] = useState("कश्यप");
  const [deity, setDeity] = useState("भगवान शिव");
  const [purpose, setPurpose] = useState("पारिवारिक सुख, शांति एवं सर्वकल्याण हेतु");
  const [city, setCity] = useState("नई दिल्ली");
  const [copied, setCopied] = useState(false);

  const sankalpText = `ॐ विष्णुर्विष्णुर्विष्णुः, श्रीमद्भगवतो महापुरुषस्य विष्णोराज्ञया प्रवर्तमानस्य अद्य श्रीब्रह्मणो द्वितीये परार्धे श्रीश्वेतवाराहकल्पे वैवस्वतमन्वन्तरे अष्टाविंशतितमे युगे कलियुगे कलिप्रथमचरणे जम्बूद्वीपे भारतवर्षे भरतखण्डे ${city} नगरे/क्षेत्रे...

${gotra} गोत्रोत्पन्नः ${userName} नामाहं मम आत्मनः श्रुतिस्मृतिपुराणोक्त फलप्राप्त्यर्थं, ${purpose}, ${deity} प्रीत्यर्थं यथाशक्ति पूजनं/जपं अहं करिष्ये।`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sankalpText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-1 pb-4 border-b border-gold/15">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
          वैदिक पूजा संकल्प जनरेटर
        </h3>
        <p className="text-stone text-xs">
          अपनी पूजा अथवा अनुष्ठान से पूर्व अपनी जानकारी भरें और शास्त्रीय संकल्प प्राप्त करें।
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-charcoal block mb-1">आपका नाम (Devotee Name):</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>
          <div>
            <label className="font-semibold text-charcoal block mb-1">गोत्र (Gotra):</label>
            <input
              type="text"
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              placeholder="उदा. भारद्वाज, कश्यप (अथवा कश्यप)"
              className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-charcoal block mb-1">इष्टदेव (Worshipped Deity):</label>
            <input
              type="text"
              value={deity}
              onChange={(e) => setDeity(e.target.value)}
              className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>
          <div>
            <label className="font-semibold text-charcoal block mb-1">स्थान / नगर (Current City):</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-charcoal block mb-1">पूजा का उद्देश्य (Purpose):</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
          />
        </div>
      </div>

      {/* Generated Sankalp Box */}
      <div className="bg-ivory border-2 border-gold/40 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center text-xs text-saffron font-bold">
          <span>॥ आपका शास्त्रीय संकल्प पाठ ॥</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-saffron hover:text-saffron-dark transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "कॉपी हुआ!" : "कॉपी करें"}</span>
          </button>
        </div>

        <p className="font-serif text-maroon text-sm sm:text-base leading-relaxed whitespace-pre-line text-devanagari">
          {sankalpText}
        </p>

        <p className="text-[11px] text-stone-light pt-2 border-t border-gold/15">
          विधि: दाहिने हाथ में जल, अक्षत, पुष्प और दक्षिणा लेकर इस संकल्प का पाठ करें और फिर जल को पूजा की थाली या भूमि पर छोड़ दें।
        </p>
      </div>
    </div>
  );
}
