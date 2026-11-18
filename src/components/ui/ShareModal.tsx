"use client";

import { useState } from "react";
import { X, Copy, Check, MessageCircle, Send, Share2 } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
}

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const currentTitle = title || (typeof document !== "undefined" ? document.title : "Bhavlaya - Where Devotion Meets Knowledge");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${currentTitle}\n\n${currentUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-cream border border-gold/30 rounded-3xl p-6 shadow-2xl text-charcoal">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone hover:text-maroon hover:bg-gold/10 transition-colors"
          aria-label="बंद करें"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold/15">
          <Share2 className="w-5 h-5 text-saffron" />
          <h3 className="font-serif text-lg font-bold text-maroon">
            साझा करें (Share)
          </h3>
        </div>

        <p className="text-xs text-stone line-clamp-2 mb-5 font-medium leading-relaxed">
          {currentTitle}
        </p>

        {/* Share Channel Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white border border-gold/20 hover:border-green-500 hover:shadow-xs transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal group-hover:text-green-700">
              WhatsApp
            </span>
          </a>

          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white border border-gold/20 hover:border-sky-500 hover:shadow-xs transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal group-hover:text-sky-700">
              Telegram
            </span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white border border-gold/20 hover:border-blue-600 hover:shadow-xs transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal group-hover:text-blue-700">
              Facebook
            </span>
          </a>
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-ivory rounded-xl border border-gold/30">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent px-2 text-xs text-stone font-mono truncate focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-saffron hover:bg-saffron-light text-white text-xs font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>कॉपी हुआ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>कॉपी करें</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
