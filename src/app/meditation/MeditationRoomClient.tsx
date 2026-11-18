"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles, Bell, Clock } from "lucide-react";

export function MeditationRoomClient() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(10 * 60); // seconds
  const [bellInterval, setBellInterval] = useState(5); // interval bell in mins
  const [soundMode, setSoundMode] = useState<"om" | "tanpura" | "bell-only">("om");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const omOscRef = useRef<OscillatorNode | null>(null);
  const omGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play Bell Chime (Web Audio API synthesis)
  const playBellChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const harmonics = [587, 880, 1174, 1760];
      const now = ctx.currentTime;

      harmonics.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        const amp = 0.2 / (idx + 1);
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch {}
  };

  // Start / Stop Continuous Om Drone (136.1 Hz Sadja)
  const toggleSound = (start: boolean) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      if (start) {
        playBellChime();
        if (soundMode === "om" || soundMode === "tanpura") {
          // Fundamental 136.1 Hz
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(136.1, ctx.currentTime);
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2.0);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          omOscRef.current = osc;
          omGainRef.current = gain;
        }
      } else {
        if (omGainRef.current && ctx) {
          omGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
          setTimeout(() => {
            omOscRef.current?.stop();
            omOscRef.current?.disconnect();
            omOscRef.current = null;
            omGainRef.current = null;
          }, 1000);
        }
      }
    } catch {}
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            toggleSound(false);
            playBellChime();
            return 0;
          }
          // Periodic Interval Bell
          if (bellInterval > 0 && (selectedDuration * 60 - prev + 1) % (bellInterval * 60) === 0) {
            playBellChime();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bellInterval, selectedDuration]);

  const handleStartPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      toggleSound(false);
    } else {
      setIsPlaying(true);
      toggleSound(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    toggleSound(false);
    setTimeLeft(selectedDuration * 60);
  };

  const handleDurationSelect = (mins: number) => {
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
    if (isPlaying) {
      setIsPlaying(false);
      toggleSound(false);
    }
  };

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  const progressPercent = Math.round(((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100);

  return (
    <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card max-w-xl mx-auto text-center space-y-8">
      {/* Visual Meditation Orb */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
        {/* Pulsing Aura */}
        <div
          className={`absolute inset-0 rounded-full bg-saffron/15 transition-all duration-1000 ${
            isPlaying ? "scale-110 animate-pulse" : "scale-100"
          }`}
        />
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-maroon via-saffron to-gold p-1 shadow-2xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-cream flex flex-col items-center justify-center space-y-1">
            <span className="font-serif text-3xl font-bold text-maroon">
              {formatMinSec(timeLeft)}
            </span>
            <span className="text-[11px] font-semibold text-saffron uppercase tracking-widest">
              {isPlaying ? "साधना रत..." : "शांत बैठें"}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Control Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleStartPause}
          className="px-8 py-3.5 rounded-2xl bg-saffron text-white font-semibold text-base flex items-center gap-2 hover:bg-saffron-dark transition-all shadow-md active:scale-95"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              <span>विराम दें</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>ध्यान प्रारंभ करें</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-3.5 rounded-2xl bg-ivory border border-gold/30 text-stone hover:text-maroon transition-colors"
          title="रीसेट करें"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Duration Presets */}
      <div className="space-y-2 pt-4 border-t border-gold/20">
        <label className="text-xs font-bold text-maroon uppercase tracking-wider block">
          ध्यान अवधि (Duration)
        </label>
        <div className="flex justify-center gap-2">
          {[5, 10, 15, 21, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => handleDurationSelect(mins)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedDuration === mins
                  ? "bg-maroon text-white border-maroon shadow-xs"
                  : "bg-ivory border-gold/25 text-stone hover:border-gold"
              }`}
            >
              {mins} मिनट
            </button>
          ))}
        </div>
      </div>

      {/* Sound Experience Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-maroon uppercase tracking-wider block">
          ध्वनि परिवेश (Harmonic Ambient Sound)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "om", label: "ॐ 136.1Hz" },
            { id: "tanpura", label: "तानपुरा नाद" },
            { id: "bell-only", label: "केवल घंटी" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setSoundMode(mode.id as typeof soundMode);
                if (isPlaying) {
                  toggleSound(false);
                  setTimeout(() => toggleSound(true), 300);
                }
              }}
              className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all ${
                soundMode === mode.id
                  ? "bg-saffron/15 text-saffron-dark border-saffron font-bold"
                  : "bg-ivory border-gold/20 text-stone"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
