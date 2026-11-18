"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from "lucide-react";
import { MANTRAS } from "@/data/devotionalData";

export function JapMalaCounter() {
  const [count, setCount] = useState(0);
  const [completedMalas, setCompletedMalas] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0].id);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Load from local storage (with backwards compatibility)
  useEffect(() => {
    const savedCount = localStorage.getItem("bhavlaya_jap_count") || localStorage.getItem("bhaktilok_jap_count");
    const savedMalas = localStorage.getItem("bhavlaya_jap_malas") || localStorage.getItem("bhaktilok_jap_malas");
    if (savedCount) setCount(parseInt(savedCount, 10));
    if (savedMalas) setCompletedMalas(parseInt(savedMalas, 10));
  }, []);

  // Play subtle bell sound using Web Audio API (synthesized temple chime)
  const playChime = (isCompletedMala: boolean = false) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Higher resonant harmonic for mala completion, softer for bead
      osc.frequency.setValueAtTime(isCompletedMala ? 880 : 528, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isCompletedMala ? 1.5 : 0.4));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (isCompletedMala ? 1.5 : 0.4));
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  const handleBeadClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }

    if (count + 1 === 108) {
      playChime(true);
      setCount(0);
      const newMalas = completedMalas + 1;
      setCompletedMalas(newMalas);
      localStorage.setItem("bhavlaya_jap_count", "0");
      localStorage.setItem("bhavlaya_jap_malas", newMalas.toString());
    } else {
      playChime(false);
      const nextCount = count + 1;
      setCount(nextCount);
      localStorage.setItem("bhavlaya_jap_count", nextCount.toString());
    }
  };

  const resetCounter = () => {
    if (window.confirm("क्या आप वर्तमान जप गिनती को रीसेट करना चाहते हैं?")) {
      setCount(0);
      localStorage.setItem("bhavlaya_jap_count", "0");
    }
  };

  const currentMantraObj = MANTRAS.find((m) => m.id === selectedMantra) || MANTRAS[0];

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card max-w-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gold/15">
        <div>
          <span className="text-xs font-semibold text-saffron uppercase tracking-wider block">
            डिजिटल जप माला
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
            108 मनका जप साधना
          </h3>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2.5 rounded-xl bg-ivory border border-gold/20 text-stone hover:text-maroon transition-colors"
          title={soundEnabled ? "ध्वनि बंद करें" : "ध्वनि चालू करें"}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-saffron" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Mantra Selector */}
      <div className="mt-4">
        <label className="text-xs text-stone font-medium block mb-1.5">
          जप हेतु मंत्र चुनें:
        </label>
        <select
          value={selectedMantra}
          onChange={(e) => setSelectedMantra(e.target.value)}
          className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xl text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
        >
          {MANTRAS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title} ({m.deity})
            </option>
          ))}
        </select>
      </div>

      {/* Selected Mantra Display Box */}
      <div className="mt-4 p-4 bg-ivory/80 rounded-xl border border-gold/20 text-center">
        <p className="font-serif text-maroon text-lg sm:text-xl font-bold leading-relaxed text-sanskrit">
          {currentMantraObj.sanskritText}
        </p>
        <p className="text-xs text-stone mt-2 italic">
          {currentMantraObj.meaning}
        </p>
      </div>

      {/* Big Interactive Bead Circle Button */}
      <div className="my-8 flex flex-col items-center justify-center">
        <button
          onClick={handleBeadClick}
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-saffron via-gold to-maroon p-1.5 shadow-lg hover:shadow-xl active:scale-95 transition-all transform flex items-center justify-center group cursor-pointer focus:outline-none"
          aria-label="जप मनका आगे बढ़ाएं"
        >
          <div className="w-full h-full rounded-full bg-cream flex flex-col items-center justify-center border-4 border-gold/30 group-hover:border-gold/60 transition-colors p-4">
            <Sparkles className="w-5 h-5 text-gold mb-1 opacity-70 group-hover:opacity-100" />
            <span className="font-serif text-5xl sm:text-6xl font-bold text-maroon leading-none">
              {count}
            </span>
            <span className="text-xs font-semibold text-stone uppercase tracking-widest mt-1">
              / 108 मनके
            </span>
            <span className="text-[11px] text-saffron mt-2 font-medium">
              टैप करें या जपें
            </span>
          </div>
        </button>
      </div>

      {/* Progress & Stats Bar */}
      <div className="bg-ivory rounded-xl p-4 border border-gold/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <span className="text-xs text-stone block">पूर्ण हुई माला</span>
            <span className="font-bold text-base text-charcoal">{completedMalas} माला ({completedMalas * 108} मंत्र)</span>
          </div>
        </div>

        <button
          onClick={resetCounter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 text-stone hover:text-red-700 hover:border-red-300 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          रीसेट
        </button>
      </div>
    </div>
  );
}
