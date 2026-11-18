"use client";

import { Download, Smartphone, Check } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { PWAInstallModal } from "./PWAInstallModal";

interface PWAInstallButtonProps {
  variant?: "header" | "footer" | "mobile" | "hero";
  className?: string;
}

export function PWAInstallButton({
  variant = "header",
  className = "",
}: PWAInstallButtonProps) {
  const {
    isInstalled,
    canPromptNative,
    isModalOpen,
    platform,
    triggerInstall,
    openModal,
    closeModal,
  } = usePWAInstall();

  if (isInstalled) {
    if (variant === "header") {
      return (
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-green-500/10 text-green-700 text-xs font-semibold border border-green-500/20">
          <Check className="w-3.5 h-3.5" />
          <span>ऐप सक्रिय</span>
        </span>
      );
    }
    return null;
  }

  const handleClick = () => {
    if (canPromptNative) {
      triggerInstall();
    } else {
      openModal();
    }
  };

  return (
    <>
      {variant === "header" && (
        <button
          onClick={handleClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-saffron text-white text-xs font-semibold hover:bg-saffron-light transition-all shadow-xs ${className}`}
          aria-label="ऐप इंस्टॉल करें"
          title="Bhavlaya ऐप इंस्टॉल करें"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ऐप इंस्टॉल करें</span>
        </button>
      )}

      {variant === "footer" && (
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 text-xs text-stone hover:text-saffron transition-colors ${className}`}
        >
          <Download className="w-4 h-4 text-saffron" />
          <span>Bhavlaya ऐप इंस्टॉल करें</span>
        </button>
      )}

      {variant === "mobile" && (
        <button
          onClick={handleClick}
          className={`w-full py-2.5 px-4 rounded-xl bg-saffron text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Bhavlaya ऐप इंस्टॉल करें</span>
        </button>
      )}

      {/* Instructional Modal */}
      <PWAInstallModal
        isOpen={isModalOpen}
        onClose={closeModal}
        platform={platform}
        canPromptNative={canPromptNative}
        onTriggerInstall={triggerInstall}
      />
    </>
  );
}
