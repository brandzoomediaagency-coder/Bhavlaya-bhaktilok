"use client";

import { Sparkles, RefreshCw } from "lucide-react";

interface PWAUpdateNotificationProps {
  isUpdateAvailable: boolean;
  onApplyUpdate: () => void;
}

export function PWAUpdateNotification({
  isUpdateAvailable,
  onApplyUpdate,
}: PWAUpdateNotificationProps) {
  if (!isUpdateAvailable) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-[#18171C]/95 backdrop-blur-md border border-gold/40 text-cream p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs max-w-sm">
        <div className="w-8 h-8 rounded-full bg-saffron/20 text-saffron flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>

        <div>
          <p className="font-semibold text-white">नया संस्करण उपलब्ध है</p>
          <p className="text-[11px] text-stone-light">नवीनतम सामग्री व सुधार प्राप्त करने के लिए अपडेट करें।</p>
        </div>

        <button
          onClick={onApplyUpdate}
          className="px-3 py-1.5 bg-saffron hover:bg-saffron-light text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>अपडेट</span>
        </button>
      </div>
    </div>
  );
}
