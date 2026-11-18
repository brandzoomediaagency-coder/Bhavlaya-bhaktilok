"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  Music,
  Square,
  Repeat,
  Clock,
  Radio,
  Play,
  Flame,
} from "lucide-react";
import {
  spiritualAudioEngine,
  AudioPlaybackState,
  SpiritualSoundId,
} from "@/lib/spiritualAudioEngine";

export function SpiritualAudioSection() {
  const [audioState, setAudioState] = useState<AudioPlaybackState>(
    spiritualAudioEngine.getState()
  );
  const [omMode, setOmMode] = useState<"tone" | "chant">("tone");
  const [selectedDuration, setSelectedDuration] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = spiritualAudioEngine.subscribe(setAudioState);
    return () => unsubscribe();
  }, []);

  const handlePlayBell = () => {
    spiritualAudioEngine.playTempleBell();
  };

  const handlePlayShankh = () => {
    spiritualAudioEngine.playShankh();
  };

  const handlePlayOm = (overrideMode?: "tone" | "chant") => {
    const targetMode = overrideMode || omMode;
    if (targetMode === "tone") {
      spiritualAudioEngine.playOmTone(selectedDuration);
    } else {
      spiritualAudioEngine.playOmChant(selectedDuration);
    }
  };

  const handleStop = () => {
    spiritualAudioEngine.stop();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    spiritualAudioEngine.setVolume(parseFloat(e.target.value));
  };

  const toggleLoop = () => {
    spiritualAudioEngine.setLooping(!audioState.isLooping);
  };

  const formatRemainingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isBellPlaying = audioState.activeSound === "bell";
  const isShankhPlaying = audioState.activeSound === "shankh";
  const isOmPlaying =
    audioState.activeSound === "om_tone" ||
    audioState.activeSound === "om_chant";

  return (
    <section className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card relative overflow-hidden">
      {/* Subtle mandala watermark in background */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-saffron/5 pointer-events-none blur-2xl" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>पवित्र आध्यात्मिक ध्वनियां</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
          डिजिटल मंदिर घंटी एवं शंख नाद
        </h2>
        <p className="text-stone text-xs sm:text-sm mt-2 leading-relaxed">
          पूजा, आरती एवं ध्यान के समय वातावरण को सकारात्मक ऊर्जा व शुद्ध तरंगों से परिपूर्ण करने के लिए स्पर्श करें। भौतिक ध्वनिकी सिद्धांतों पर आधारित शुद्ध पीतल घंटी, पारंपरिक शंख व 136.1 Hz ब्रह्मांडीय ॐ नाद।
        </p>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* 1. Mandir Ghanti */}
        <div
          className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
            isBellPlaying
              ? "bg-amber-50 border-saffron shadow-md ring-2 ring-saffron/30"
              : "bg-white/80 border-gold/25 hover:border-saffron/60 hover:shadow-sm"
          }`}
        >
          {isBellPlaying && (
            <div className="absolute inset-0 bg-saffron/5 animate-pulse pointer-events-none" />
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isBellPlaying
                    ? "bg-saffron text-white scale-105 shadow-sm rotate-6"
                    : "bg-saffron/10 text-saffron group-hover:bg-saffron/20"
                }`}
              >
                <Bell className={`w-7 h-7 ${isBellPlaying ? "animate-bounce" : ""}`} />
              </div>

              {isBellPlaying && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-saffron/15 text-saffron-dark text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
                  गुंजायमान
                </span>
              )}
            </div>

            <h3 className="font-serif text-xl font-bold text-maroon">
              मंदिर घंटी
            </h3>
            <p className="text-xs text-saffron-dark font-medium mt-0.5">
              पीतल की देव घंटिका (Brass Bell)
            </p>
            <p className="text-xs text-stone mt-2 leading-relaxed">
              पारंपरिक पंचधातु घंटी के 5 प्राकृतिक ओवरटोन (293Hz – 1760Hz) का सटीक हार्मोनिक प्रस्फुटन।
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
            <button
              onClick={isBellPlaying ? handleStop : handlePlayBell}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                isBellPlaying
                  ? "bg-maroon hover:bg-maroon-light text-white"
                  : "bg-saffron hover:bg-saffron-light text-white"
              }`}
            >
              {isBellPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>घंटी रोकें</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>घंटी बजाएं</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Shankh Nada */}
        <div
          className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
            isShankhPlaying
              ? "bg-amber-50 border-saffron shadow-md ring-2 ring-saffron/30"
              : "bg-white/80 border-gold/25 hover:border-saffron/60 hover:shadow-sm"
          }`}
        >
          {isShankhPlaying && (
            <div className="absolute inset-0 bg-maroon/5 animate-pulse pointer-events-none" />
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isShankhPlaying
                    ? "bg-maroon text-white scale-105 shadow-sm"
                    : "bg-maroon/10 text-maroon group-hover:bg-maroon/20"
                }`}
              >
                <Volume2 className={`w-7 h-7 ${isShankhPlaying ? "animate-pulse" : ""}`} />
              </div>

              {isShankhPlaying && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-maroon/15 text-maroon text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-maroon animate-ping" />
                  मंगल नाद
                </span>
              )}
            </div>

            <h3 className="font-serif text-xl font-bold text-maroon">
              शंख नाद
            </h3>
            <p className="text-xs text-saffron-dark font-medium mt-0.5">
              पावन दक्षिणावर्ती शंख (Conch Resonance)
            </p>
            <p className="text-xs text-stone mt-2 leading-relaxed">
              वातावरण शुद्धि और नकारात्मकता निवारक पारंपरिक शंख की प्राकृतिक वायु-गुंजन व हार्मोनिक आवृति।
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
            <button
              onClick={isShankhPlaying ? handleStop : handlePlayShankh}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                isShankhPlaying
                  ? "bg-maroon hover:bg-maroon-light text-white"
                  : "bg-maroon hover:bg-maroon-light text-white"
              }`}
            >
              {isShankhPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>शंख ध्वनि रोकें</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>शंख बजाएं</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. OM Nada 136.1 Hz */}
        <div
          className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
            isOmPlaying
              ? "bg-amber-50 border-saffron shadow-md ring-2 ring-saffron/30"
              : "bg-white/80 border-gold/25 hover:border-saffron/60 hover:shadow-sm"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isOmPlaying
                    ? "bg-gold text-white scale-105 shadow-sm"
                    : "bg-gold/15 text-gold-dark group-hover:bg-gold/25"
                }`}
              >
                <Music className={`w-7 h-7 ${isOmPlaying ? "animate-spin" : ""}`} />
              </div>

              {/* Mode Toggle */}
              <div className="inline-flex rounded-lg bg-ivory border border-gold/30 p-0.5 text-[10px]">
                <button
                  onClick={() => {
                    setOmMode("tone");
                    if (isOmPlaying) handlePlayOm("tone");
                  }}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                    omMode === "tone"
                      ? "bg-saffron text-white shadow-xs"
                      : "text-stone hover:text-charcoal"
                  }`}
                >
                  136.1Hz स्वर
                </button>
                <button
                  onClick={() => {
                    setOmMode("chant");
                    if (isOmPlaying) handlePlayOm("chant");
                  }}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                    omMode === "chant"
                      ? "bg-saffron text-white shadow-xs"
                      : "text-stone hover:text-charcoal"
                  }`}
                >
                  वैदिक ॐ
                </button>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-maroon">
              ॐ नाद (136.1 Hz)
            </h3>
            <p className="text-xs text-saffron-dark font-medium mt-0.5">
              {omMode === "tone"
                ? "पृथ्वी वर्ष षड्ज स्वर (Cosmic Earth Year Tone)"
                : "वैदिक ॐकार ध्यान ध्वनि (Vocal Om Drone)"}
            </p>
            <p className="text-xs text-stone mt-2 leading-relaxed">
              हंस कौस्टो ब्रह्मांडीय गणना के अनुसार 136.10 Hz सूक्ष्म नाड़ी संतुलन व गहरे ध्यान हेतु सर्वाधिक उपयोगी।
            </p>

            {/* Duration Selector */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px]">
              <span className="text-stone">अवधि:</span>
              {[0, 1, 5, 10].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setSelectedDuration(mins);
                    if (isOmPlaying) {
                      if (omMode === "tone") spiritualAudioEngine.playOmTone(mins);
                      else spiritualAudioEngine.playOmChant(mins);
                    }
                  }}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    selectedDuration === mins
                      ? "bg-saffron/15 text-saffron-dark border-saffron font-semibold"
                      : "bg-white text-stone border-gold/20 hover:text-charcoal"
                  }`}
                >
                  {mins === 0 ? "निरंतर" : `${mins} मि.`}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
            <button
              onClick={isOmPlaying ? handleStop : () => handlePlayOm()}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                isOmPlaying
                  ? "bg-maroon hover:bg-maroon-light text-white"
                  : "bg-gold hover:bg-gold-light text-white"
              }`}
            >
              {isOmPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>
                    ॐ नाद रोकें {audioState.remainingSeconds > 0 && `(${formatRemainingTime(audioState.remainingSeconds)})`}
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>ॐ नाद प्रारंभ करें</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Global Audio Controller Bar */}
      {audioState.isPlaying && (
        <div className="mt-6 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 bg-white/90 p-4 rounded-2xl shadow-xs animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-saffron animate-ping" />
            <div>
              <p className="text-xs font-semibold text-maroon flex items-center gap-1.5">
                <span>सक्रिय ध्वनि:</span>
                <span className="text-saffron-dark uppercase font-bold">
                  {audioState.activeSound === "bell" && "मंदिर घंटी"}
                  {audioState.activeSound === "shankh" && "शंख नाद"}
                  {audioState.activeSound === "om_tone" && "136.1 Hz ॐ स्वर"}
                  {audioState.activeSound === "om_chant" && "वैदिक ॐ ध्यान"}
                </span>
              </p>
              {audioState.remainingSeconds > 0 && (
                <p className="text-[11px] text-stone">
                  शेष समय: {formatRemainingTime(audioState.remainingSeconds)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Loop Toggle */}
            <button
              onClick={toggleLoop}
              title="पुनरावृत्ति (Loop)"
              className={`p-2 rounded-xl border transition-colors ${
                audioState.isLooping
                  ? "bg-saffron text-white border-saffron"
                  : "bg-ivory text-stone border-gold/30 hover:text-charcoal"
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              {audioState.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone" />
              ) : (
                <Volume2 className="w-4 h-4 text-stone" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioState.volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-28 accent-saffron cursor-pointer"
                aria-label="ध्वनि स्तर (Volume)"
              />
            </div>

            {/* Stop Button */}
            <button
              onClick={handleStop}
              className="px-3 py-1.5 rounded-xl bg-maroon/10 hover:bg-maroon/20 text-maroon text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>बंद करें</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
