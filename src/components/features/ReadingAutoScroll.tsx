"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, X, Sun, Moon, Sparkles } from "lucide-react";

interface ReadingAutoScrollProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPEEDS = [
  { label: "0.5x", value: 0.5, pxPerSec: 15 },
  { label: "1x", value: 1.0, pxPerSec: 32 },
  { label: "1.5x", value: 1.5, pxPerSec: 55 },
  { label: "2x", value: 2.0, pxPerSec: 90 },
  { label: "3x", value: 3.0, pxPerSec: 140 },
];

export function ReadingAutoScroll({ isOpen, onClose }: ReadingAutoScrollProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSpeed, setCurrentSpeed] = useState<number>(1.0);
  const [contrastMode, setContrastMode] = useState<"normal" | "warm">("normal");

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const currentSpeedRef = useRef<number>(currentSpeed);

  isPlayingRef.current = isPlaying;
  currentSpeedRef.current = currentSpeed;

  const stopScroll = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const scrollStep = useCallback(
    (timestamp: number) => {
      if (!isPlayingRef.current) {
        lastTimeRef.current = null;
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const speedObj = SPEEDS.find((s) => s.value === currentSpeedRef.current) || SPEEDS[1];
      const deltaPx = speedObj.pxPerSec * elapsed;

      // Check if reached bottom of page
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        setIsPlaying(false);
        stopScroll();
        return;
      }

      window.scrollBy({ top: deltaPx, behavior: "instant" as ScrollBehavior });
      animFrameRef.current = requestAnimationFrame(scrollStep);
    },
    [stopScroll]
  );

  const startScroll = useCallback(() => {
    stopScroll();
    animFrameRef.current = requestAnimationFrame(scrollStep);
  }, [scrollStep, stopScroll]);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopScroll();
    } else {
      setIsPlaying(true);
      startScroll();
    }
  };

  // Initialize scrolling when opened
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isOpen, startScroll, stopScroll]);

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlayingRef.current) {
        setIsPlaying(false);
        stopScroll();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [stopScroll]);

  // Toggle warm contrast reading appearance
  const toggleContrast = () => {
    if (contrastMode === "normal") {
      setContrastMode("warm");
      document.body.classList.add("reading-warm-mode");
    } else {
      setContrastMode("normal");
      document.body.classList.remove("reading-warm-mode");
    }
  };

  const handleClose = () => {
    stopScroll();
    document.body.classList.remove("reading-warm-mode");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#1C1B20]/95 backdrop-blur-md text-white border border-gold/40 shadow-2xl rounded-full px-3 py-2 flex items-center gap-1.5 sm:gap-2.5">
        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            isPlaying
              ? "bg-[#FF5500] hover:bg-[#FF6B1A] text-white"
              : "bg-saffron hover:bg-saffron-light text-white"
          }`}
          aria-label={isPlaying ? "स्क्रोल रोकें" : "स्क्रोल शुरू करें"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>रोकें</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>शुरू</span>
            </>
          )}
        </button>

        {/* Speed Multipliers */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white/10 rounded-full p-0.5 text-[11px] font-medium">
          {SPEEDS.map((sp) => (
            <button
              key={sp.label}
              onClick={() => setCurrentSpeed(sp.value)}
              className={`px-2 py-1 rounded-full transition-all ${
                currentSpeed === sp.value
                  ? "bg-[#FF6B00] text-white font-bold shadow-xs"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Contrast / Appearance Mode */}
        <button
          onClick={toggleContrast}
          className={`p-1.5 rounded-full transition-colors ${
            contrastMode === "warm"
              ? "bg-amber-400 text-charcoal font-bold"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title="वाचन अनुकूल मोड (Warm Reading Mode)"
          aria-label="वाचन मोड"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
          aria-label="ऑटो-स्क्रोल बंद करें"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
