"use client";

import { useState } from "react";
import {
  X,
  Smartphone,
  Laptop,
  Sparkles,
  Download,
  Share2,
  PlusSquare,
  Check,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { PlatformType } from "@/hooks/usePWAInstall";
import { brandConfig } from "@/config/brand";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformType;
  canPromptNative: boolean;
  onTriggerInstall: () => void;
}

export function PWAInstallModal({
  isOpen,
  onClose,
  platform,
  canPromptNative,
  onTriggerInstall,
}: PWAInstallModalProps) {
  const [activeTab, setActiveTab] = useState<PlatformType>(platform || "chromium");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-cream border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-charcoal">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-stone hover:text-maroon hover:bg-gold/10 transition-colors"
          aria-label="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-saffron-gradient text-white flex items-center justify-center mx-auto shadow-md">
            <span className="font-serif text-2xl font-bold">भा</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सुरक्षित एवं निःशुल्क वेब ऐप</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            {brandConfig.name} को अपने डिवाइस पर इंस्टॉल करें
          </h2>
          <p className="text-xs sm:text-sm text-stone leading-relaxed">
            भक्ति, मंत्र, आरती, दैनिक पंचांग और सनातन ज्ञान तक तेज़ और आसान पहुँच के लिए {brandConfig.nameHi} को अपने डेस्कटॉप अथवा मोबाइल स्क्रीन पर जोड़ें।
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex rounded-xl bg-ivory border border-gold/25 p-1 text-xs font-medium mb-6">
          <button
            onClick={() => setActiveTab("chromium")}
            className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "chromium" || activeTab === "android"
                ? "bg-saffron text-white shadow-xs font-semibold"
                : "text-stone hover:text-charcoal"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Chrome / Edge</span>
          </button>

          <button
            onClick={() => setActiveTab("ios")}
            className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "ios"
                ? "bg-saffron text-white shadow-xs font-semibold"
                : "text-stone hover:text-charcoal"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone / iPad</span>
          </button>

          <button
            onClick={() => setActiveTab("safari_mac")}
            className={`flex-1 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === "safari_mac"
                ? "bg-saffron text-white shadow-xs font-semibold"
                : "text-stone hover:text-charcoal"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mac Safari</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-white rounded-2xl border border-gold/20 p-5 mb-6 text-xs text-stone space-y-3">
          {(activeTab === "chromium" || activeTab === "android") && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>
                  नीचे दिए गए <strong>&ldquo;ऐप इंस्टॉल करें&rdquo;</strong> बटन पर क्लिक करें अथवा ब्राउज़र के सर्च बार में दाईं ओर ⊕/कंप्यूटर आइकन दबाएं।
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>ब्राउज़र पॉपअप संवाद में <strong>Install</strong> पर क्लिक करें।</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>{brandConfig.nameHi} आपके डिवाइस पर स्टैंडअलोन ऐप की भांति त्वरित खुलेगा।</p>
              </div>
            </div>
          )}

          {activeTab === "ios" && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p className="flex items-center gap-1.5 flex-wrap">
                  Safari में नीचे स्क्रीन के मध्य में स्थित <strong>Share</strong>
                  <Share2 className="w-3.5 h-3.5 text-blue-600 inline" />
                  आइकन पर टैप करें।
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p className="flex items-center gap-1.5 flex-wrap">
                  नीचे स्क्रॉल करके <strong>&ldquo;Add to Home Screen&rdquo;</strong>
                  <PlusSquare className="w-3.5 h-3.5 text-stone inline" />
                  विकल्प चुनें।
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>शीर्ष दाईं ओर <strong>Add</strong> पर टैप करें।</p>
              </div>
            </div>
          )}

          {activeTab === "safari_mac" && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>Safari मेनू बार में <strong>File (फ़ाइल)</strong> पर क्लिक करें।</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>ड्रॉपडाउन से <strong>&ldquo;Add to Dock...&rdquo;</strong> चुनें।</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-saffron/15 text-saffron-dark font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <p>नाम पुष्टि करें और <strong>Add</strong> पर क्लिक करें।</p>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Badges */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone mb-6">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span>त्वरित 1-टैप एक्सेस</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span>स्टैंडअलोन विंडो मोड</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span>ऑफलाइन स्तोत्र व जप माला</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span>शून्य विज्ञापन व सुरक्षित</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {canPromptNative ? (
            <button
              onClick={() => {
                onTriggerInstall();
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-saffron hover:bg-saffron-light text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Bhavlaya ऐप इंस्टॉल करें</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-saffron hover:bg-saffron-light text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>समझ गया</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-4 bg-ivory border border-gold/30 hover:border-gold text-stone text-xs sm:text-sm rounded-xl transition-colors"
          >
            अभी नहीं
          </button>
        </div>
      </div>
    </div>
  );
}
