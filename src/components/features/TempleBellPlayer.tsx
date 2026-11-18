"use client";

import { useState, useRef } from "react";
import { Bell, Volume2, Sparkles, Music } from "lucide-react";

export function TempleBellPlayer() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play Pure Brass Temple Bell
  const playTempleBell = () => {
    setIsPlaying("bell");
    const ctx = getAudioContext();

    // Harmonics for brass bell
    const frequencies = [587.33, 1174.66, 1760.0, 2349.32, 2936.65];
    const gains = [0.4, 0.25, 0.15, 0.08, 0.04];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gains[idx], ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5 - idx * 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.5);
    });

    setTimeout(() => setIsPlaying(null), 3500);
  };

  // Play Sacred Shankh Sound
  const playShankh = () => {
    setIsPlaying("shankh");
    const ctx = getAudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    // Pitch envelope of Shankh blowing: starts slightly low, rises to full blast, then tapers off
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(245, ctx.currentTime + 0.6);
    osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + 3.8);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.2);

    // Filter to simulate hollow acoustic conch resonance
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(3.0, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 4.2);

    setTimeout(() => setIsPlaying(null), 4200);
  };

  // Play Om Resonance (136.1 Hz Cosmic Om / Sadja)
  const playOmResonance = () => {
    setIsPlaying("om");
    const ctx = getAudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(136.1, ctx.currentTime); // Cosmic Om frequency
    osc2.frequency.setValueAtTime(272.2, ctx.currentTime); // 1st harmonic

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.0);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 4.0);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.0);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 6.0);
    osc2.stop(ctx.currentTime + 6.0);

    setTimeout(() => setIsPlaying(null), 6000);
  };

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          पवित्र आध्यात्मिक ध्वनियां
        </div>
        <h3 className="font-serif text-2xl font-bold text-maroon">
          डिजिटल मंदिर घंटी एवं शंख नाद
        </h3>
        <p className="text-stone text-xs sm:text-sm mt-1 mb-6">
          पूजा, आरती एवं ध्यान के समय वातावरण को सकारात्मक ऊर्जा व शुद्ध तरंगों से परिपूर्ण करने के लिए स्पर्श करें।
        </p>

        {/* 3 Interactive Sound Triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Temple Bell */}
          <button
            onClick={playTempleBell}
            className={`p-5 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
              isPlaying === "bell"
                ? "bg-amber-100/80 border-saffron scale-95 shadow-inner"
                : "bg-ivory border-gold/30 hover:border-saffron hover:shadow-md"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-saffron/15 text-saffron flex items-center justify-center group-hover:bg-saffron group-hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-maroon text-sm">
              मंदिर घंटी
            </span>
            <span className="text-[11px] text-stone">पीतल की घंटिका</span>
          </button>

          {/* Shankh */}
          <button
            onClick={playShankh}
            className={`p-5 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
              isPlaying === "shankh"
                ? "bg-amber-100/80 border-saffron scale-95 shadow-inner"
                : "bg-ivory border-gold/30 hover:border-saffron hover:shadow-md"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-maroon/15 text-maroon flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-colors">
              <Volume2 className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-maroon text-sm">
              शंख नाद
            </span>
            <span className="text-[11px] text-stone">मंगलकारी ध्वनि</span>
          </button>

          {/* Om Resonance */}
          <button
            onClick={playOmResonance}
            className={`p-5 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
              isPlaying === "om"
                ? "bg-amber-100/80 border-saffron scale-95 shadow-inner"
                : "bg-ivory border-gold/30 hover:border-saffron hover:shadow-md"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-gold/15 text-gold-light flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
              <Music className="w-6 h-6" />
            </div>
            <span className="font-serif font-bold text-maroon text-sm">
              ॐ नाद (136.1Hz)
            </span>
            <span className="text-[11px] text-stone">ब्रह्मांडीय कंपन</span>
          </button>
        </div>

        {isPlaying && (
          <p className="mt-4 text-xs font-medium text-saffron animate-pulse">
            ध्वनि प्रवाहित हो रही है...
          </p>
        )}
      </div>
    </div>
  );
}
