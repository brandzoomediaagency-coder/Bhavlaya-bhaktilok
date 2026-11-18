"use client";

import { useState } from "react";
import { Copy, Share2, Printer, Bookmark, Check, ZoomIn, ZoomOut } from "lucide-react";

interface ContentActionsProps {
  title: string;
  url?: string;
  contentToCopy?: string;
  onFontSizeChange?: (size: number) => void;
}

export function ContentActions({ title, url, contentToCopy }: ContentActionsProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 1 = 100%, 1.15 = 115%, 1.3 = 130%

  const handleCopy = () => {
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const toggleBookmark = () => {
    setSaved(!saved);
  };

  const adjustFont = (direction: "up" | "down") => {
    let newSize = fontSize;
    if (direction === "up" && fontSize < 1.3) newSize = Math.min(1.3, fontSize + 0.15);
    if (direction === "down" && fontSize > 0.85) newSize = Math.max(0.85, fontSize - 0.15);
    setFontSize(newSize);

    // Adjust content container font
    const contentEl = document.getElementById("devotional-content-body");
    if (contentEl) {
      contentEl.style.fontSize = `${newSize * 1.0625}rem`;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-ivory rounded-xl border border-gold/20 no-print my-6">
      {/* Font scale buttons */}
      <div className="flex items-center gap-1 text-xs text-stone">
        <span className="mr-1 hidden sm:inline">अक्षर आकार:</span>
        <button
          onClick={() => adjustFont("down")}
          className="p-1.5 rounded-lg border border-gold/20 hover:border-gold hover:text-maroon transition-colors"
          title="फॉन्ट छोटा करें"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-xs px-1.5">{Math.round(fontSize * 100)}%</span>
        <button
          onClick={() => adjustFont("up")}
          className="p-1.5 rounded-lg border border-gold/20 hover:border-gold hover:text-maroon transition-colors"
          title="फॉन्ट बड़ा करें"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 text-xs">
        {contentToCopy && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gold/25 text-stone hover:text-maroon hover:border-gold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "कॉपी हुआ" : "कॉपी"}</span>
          </button>
        )}

        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gold/25 text-stone hover:text-maroon hover:border-gold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>साझा करें</span>
        </button>

        <button
          onClick={handlePrint}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gold/25 text-stone hover:text-maroon hover:border-gold transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>प्रिंट</span>
        </button>

        <button
          onClick={toggleBookmark}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${
            saved
              ? "bg-amber-100 border-saffron text-saffron-dark font-medium"
              : "border-gold/25 text-stone hover:text-maroon hover:border-gold"
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-saffron" : ""}`} />
          <span>{saved ? "सहेजा गया" : "सहेजें"}</span>
        </button>
      </div>
    </div>
  );
}
