"use client";

import { useState, useRef, useEffect } from "react";
import { STATUS_QUOTES, type StatusQuote } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { Sparkles, Download, Share2, RefreshCw, Palette, Type, Smartphone, Square, Image as ImageIcon, Check } from "lucide-react";

interface AspectRatio {
  id: "9-16" | "1-1" | "4-5" | "16-9";
  label: string;
  width: number;
  height: number;
  icon: string;
}

const ASPECT_RATIOS: AspectRatio[] = [
  { id: "9-16", label: "Story (9:16)", width: 1080, height: 1920, icon: "Smartphone" },
  { id: "1-1", label: "Square (1:1)", width: 1080, height: 1080, icon: "Square" },
  { id: "4-5", label: "Portrait (4:5)", width: 1080, height: 1350, icon: "Smartphone" },
  { id: "16-9", label: "Banner (16:9)", width: 1920, height: 1080, icon: "ImageIcon" },
];

const THEMES = [
  { id: "saffron", name: "केसरिया (Saffron)", bg: "#D97706", text: "#FFFFFF", accent: "#FEF3C7" },
  { id: "maroon", name: "मैरून (Royal Maroon)", bg: "#651D32", text: "#FFFDF8", accent: "#FDE68A" },
  { id: "gold", name: "स्वर्ण (Antique Gold)", bg: "#22201E", text: "#FDE68A", accent: "#D97706" },
  { id: "ivory", name: "श्वेत (Warm Ivory)", bg: "#FAF8F2", text: "#22201E", accent: "#D97706" },
  { id: "night", name: "नील वर्ण (Cosmic Night)", bg: "#0F172A", text: "#F8FAFC", accent: "#38BDF8" },
];

export function StatusCanvasClient() {
  const [selectedQuote, setSelectedQuote] = useState<StatusQuote>(STATUS_QUOTES[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [customText, setCustomText] = useState(selectedQuote.hindi);
  const [customSanskrit, setCustomSanskrit] = useState(selectedQuote.sanskrit || "");
  const [customAuthor, setCustomAuthor] = useState("");
  const [showWatermark, setShowWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Update text when quote changes
  const handleQuoteChange = (q: StatusQuote) => {
    setSelectedQuote(q);
    setCustomText(q.hindi);
    setCustomSanskrit(q.sanskrit || "");
  };

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = aspectRatio;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, selectedTheme.bg);
    grad.addColorStop(1, selectedTheme.id === "gold" ? "#111" : selectedTheme.bg);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative spiritual border
    ctx.strokeStyle = selectedTheme.accent;
    ctx.lineWidth = width * 0.012;
    ctx.strokeRect(width * 0.04, height * 0.04, width * 0.92, height * 0.92);

    // Subtle inner corner accents
    const cornerSize = width * 0.06;
    ctx.lineWidth = width * 0.005;
    ctx.strokeRect(width * 0.055, height * 0.055, cornerSize, cornerSize);
    ctx.strokeRect(width * 0.945 - cornerSize, height * 0.055, cornerSize, cornerSize);
    ctx.strokeRect(width * 0.055, height * 0.945 - cornerSize, cornerSize, cornerSize);
    ctx.strokeRect(width * 0.945 - cornerSize, height * 0.945 - cornerSize, cornerSize, cornerSize);

    // Header Deity / Tag
    ctx.textAlign = "center";
    ctx.fillStyle = selectedTheme.accent;
    ctx.font = `600 ${Math.round(width * 0.038)}px system-ui, sans-serif`;
    ctx.fillText(`॥ ${selectedQuote.deity} ॥`, width / 2, height * 0.16);

    // Sanskrit Shloka (if present)
    let textY = height * 0.32;
    if (customSanskrit) {
      ctx.fillStyle = selectedTheme.accent;
      ctx.font = `bold ${Math.round(width * 0.042)}px 'Noto Serif Devanagari', serif`;
      wrapText(ctx, customSanskrit, width / 2, textY, width * 0.78, width * 0.065);
      textY += height * 0.14;
    }

    // Main Hindi Quote / Message
    ctx.fillStyle = selectedTheme.text;
    ctx.font = `bold ${Math.round(width * 0.052)}px 'Noto Sans Devanagari', sans-serif`;
    wrapText(ctx, `“${customText}”`, width / 2, textY, width * 0.8, width * 0.08);

    // Source Reference
    ctx.fillStyle = selectedTheme.accent;
    ctx.font = `italic ${Math.round(width * 0.032)}px system-ui, sans-serif`;
    ctx.fillText(`— स्रोत: ${selectedQuote.source}`, width / 2, height * 0.76);

    // Custom Devotee Name (if entered)
    if (customAuthor) {
      ctx.fillStyle = selectedTheme.text;
      ctx.font = `500 ${Math.round(width * 0.03)}px system-ui, sans-serif`;
      ctx.fillText(`सादर प्रेषित: ${customAuthor}`, width / 2, height * 0.82);
    }

    // Watermark
    if (showWatermark) {
      ctx.fillStyle = selectedTheme.accent;
      ctx.font = `600 ${Math.round(width * 0.034)}px 'Noto Serif Devanagari', serif`;
      ctx.fillText(`✨ ${brandConfig.nameHi} · ${brandConfig.tagline}`, width / 2, height * 0.91);
    }
  }, [selectedQuote, aspectRatio, selectedTheme, customText, customSanskrit, customAuthor, showWatermark]);

  // Helper function to wrap text on canvas
  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  }

  // Download Image
  const handleDownload = (format: "png" | "jpeg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);
    const link = document.createElement("a");
    link.download = `bhavlaya-status-${Date.now()}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`, 0.95);
    link.click();
    setTimeout(() => setIsExporting(false), 800);
  };

  // WhatsApp Share Direct
  const handleWhatsAppShare = () => {
    const text = `🌸 *${selectedQuote.deity} वंदना*\n\n"${customText}"\n\n— ${selectedQuote.source}\n\n📲 भावलय स्टेटस स्टूडियो से निर्मित: ${brandConfig.activeDomain}/status-maker`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Canvas Preview */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <div className="bg-charcoal/5 p-4 sm:p-6 rounded-3xl border border-gold/30 shadow-card flex items-center justify-center w-full overflow-hidden max-w-md">
          <canvas
            ref={canvasRef}
            className="rounded-2xl shadow-2xl max-w-full max-h-[550px] object-contain border border-gold/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 w-full justify-center">
          <button
            onClick={() => handleDownload("png")}
            disabled={isExporting}
            className="px-5 py-3 rounded-xl bg-saffron text-white font-semibold text-sm flex items-center gap-2 hover:bg-saffron-dark transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "डाउनलोड हो रहा है..." : "HD डाउनलोड (PNG)"}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#1EBE5D] transition-all shadow-md active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>
        </div>
      </div>

      {/* Right Controls Panel */}
      <div className="lg:col-span-5 bg-cream border border-gold/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
        {/* Aspect Ratio Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-maroon uppercase tracking-wider block">
            1. आकार चुनें (Aspect Ratio)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.id}
                onClick={() => setAspectRatio(ar)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center ${
                  aspectRatio.id === ar.id
                    ? "bg-maroon text-white border-maroon shadow-xs"
                    : "bg-ivory border-gold/30 text-charcoal hover:border-gold"
                }`}
              >
                {ar.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Theme Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-maroon uppercase tracking-wider block">
            2. पावन रंग थीम (Color Theme)
          </label>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setSelectedTheme(th)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                  selectedTheme.id === th.id
                    ? "border-maroon bg-white shadow-xs font-bold text-maroon"
                    : "border-gold/25 bg-ivory text-stone"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: th.bg }} />
                <span>{th.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Quote Presets */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-maroon uppercase tracking-wider">
              3. पावन संदेश चुनें
            </label>
            <span className="text-[11px] text-stone">6 उपलब्ध</span>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
            {STATUS_QUOTES.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuoteChange(q)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all line-clamp-2 ${
                  selectedQuote.id === q.id
                    ? "bg-saffron/10 border-saffron text-maroon font-semibold"
                    : "bg-ivory border-gold/20 text-stone hover:border-gold"
                }`}
              >
                <span className="font-bold block text-[11px] text-saffron">{q.deity}</span>
                <span className="line-clamp-1">{q.hindi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Customization Inputs */}
        <div className="space-y-3 pt-2 border-t border-gold/15">
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">
              हिंदी संदेश / भावार्थ:
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">
              आपका नाम / प्रेषक (Optional):
            </label>
            <input
              type="text"
              value={customAuthor}
              onChange={(e) => setCustomAuthor(e.target.value)}
              placeholder="उदा. राहुल शर्मा सपरिवार"
              className="w-full p-2 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-saffron"
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone">
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="rounded accent-saffron"
              />
              <span>भावलय वॉटरमार्क जोड़ें</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
