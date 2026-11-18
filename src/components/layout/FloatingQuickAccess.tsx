"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleDot,
  Sparkles,
  Camera,
  Volume2,
  ClipboardCheck,
  Link2,
  Share2,
  CalendarDays,
  AudioLines,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Grid,
} from "lucide-react";
import { spiritualAudioEngine } from "@/lib/spiritualAudioEngine";
import { ReadingAutoScroll } from "@/components/features/ReadingAutoScroll";
import { ShareModal } from "@/components/ui/ShareModal";

interface QuickActionItem {
  id: string;
  label: string;
  icon: typeof CircleDot;
  bgColor: string;
  textColor: string;
  href?: string;
  onClick?: () => void;
  tooltip: string;
}

export function FloatingQuickAccess() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isAutoScrollOpen, setIsAutoScrollOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore collapsed state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bhavlaya_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    try {
      localStorage.setItem("bhavlaya_sidebar_collapsed", String(nextState));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Action Handlers
  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      showToast("लिंक सफलतापूर्वक कॉपी हो गया!");
    } catch {
      showToast("कॉपी करने में असमर्थ।");
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "भावलय — जहाँ भक्ति और ज्ञान का संगम होता है।",
          url: window.location.href,
        });
      } catch {
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleShankhSound = () => {
    spiritualAudioEngine.playShankh();
    showToast("मंगलकारी शंख नाद प्रवाहित हो रहा है...");
  };

  const handleOmDhyan = () => {
    spiritualAudioEngine.playOmTone(5);
    showToast("136.1 Hz ॐ नाद (5 मिनट) प्रारंभ हुआ...");
  };

  const handleToggleAutoScroll = () => {
    setIsAutoScrollOpen((prev) => !prev);
    if (!isAutoScrollOpen) {
      showToast("ऑटो-वाचन स्क्रोल प्रारंभ हुआ");
    }
  };

  const actions: QuickActionItem[] = [
    {
      id: "jap-mala",
      label: "जाप माला",
      icon: CircleDot,
      bgColor: "bg-[#FF6B00]",
      textColor: "text-white",
      href: "/tools/108-jap-mala-counter",
      tooltip: "108 मनकों वाली डिजिटल जप माला",
    },
    {
      id: "rashifal",
      label: "राशिफल",
      icon: Sparkles,
      bgColor: "bg-[#F59E0B]",
      textColor: "text-white",
      href: "/rashifal",
      tooltip: "द्वादश राशियां व वैदिक मार्गदर्शन",
    },
    {
      id: "status-studio",
      label: "स्टेटस स्टूडियो",
      icon: Camera,
      bgColor: "bg-[#10B981]",
      textColor: "text-white",
      href: "/status-maker",
      tooltip: "HD 9:16 व 1:1 भक्ति स्टेटस कार्ड बनाएं",
    },
    {
      id: "shankh",
      label: "शंख ध्वनि",
      icon: Volume2,
      bgColor: "bg-[#06B6D4]",
      textColor: "text-white",
      onClick: handleShankhSound,
      tooltip: "पवित्र दक्षिणावर्ती शंख नाद स्पर्श",
    },
    {
      id: "punya-khata",
      label: "पुण्य खाता",
      icon: ClipboardCheck,
      bgColor: "bg-[#059669]",
      textColor: "text-white",
      href: "/tools/daily-punya-ledger",
      tooltip: "दैनिक साधना, जप व स्वाध्याय खाता",
    },
    {
      id: "copy-link",
      label: "कॉपी लिंक",
      icon: Link2,
      bgColor: "bg-[#3B82F6]",
      textColor: "text-white",
      onClick: handleCopyLink,
      tooltip: "पृष्ठ का लिंक कॉपी करें",
    },
    {
      id: "share",
      label: "शेयर करें",
      icon: Share2,
      bgColor: "bg-[#EC4899]",
      textColor: "text-white",
      onClick: handleShare,
      tooltip: "WhatsApp व सोशल मीडिया पर साझा करें",
    },
    {
      id: "panchang",
      label: "पंचांग",
      icon: CalendarDays,
      bgColor: "bg-[#0284C7]",
      textColor: "text-white",
      href: "/panchang",
      tooltip: "आज का पंचांग, सूर्योदय, सूर्यास्त व राहुकाल",
    },
    {
      id: "om-dhyan",
      label: "ॐ ध्यान",
      icon: AudioLines,
      bgColor: "bg-[#8B5CF6]",
      textColor: "text-white",
      onClick: handleOmDhyan,
      tooltip: "136.1 Hz ब्रह्मांडीय ॐ नाद ध्यान",
    },
    {
      id: "auto-scroll",
      label: "ऑटो-स्क्रोल",
      icon: PlayCircle,
      bgColor: "bg-[#F97316]",
      textColor: "text-white",
      onClick: handleToggleAutoScroll,
      tooltip: "ग्रंथ व आलेख वाचन हेतु ऑटो-स्क्रोल बार",
    },
  ];

  return (
    <>
      {/* 1. DESKTOP / LAPTOP FIXED RIGHT DOCK */}
      <aside
        className={`hidden lg:flex fixed right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 flex-col items-center transition-all duration-300 no-print ${
          isCollapsed ? "translate-x-14" : "translate-x-0"
        }`}
        aria-label="त्वरित साधन बार (Quick Access Tools)"
      >
        <div className="relative bg-[#18171C]/95 backdrop-blur-md border border-gold/30 rounded-3xl p-1.5 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none flex flex-col items-center gap-1">
          {/* Collapse / Expand Toggle Tab */}
          <button
            onClick={toggleCollapse}
            className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-4 h-9 bg-[#18171C] border border-gold/30 rounded-l-md text-gold hover:text-white flex items-center justify-center transition-colors shadow-md z-10"
            title={isCollapsed ? "साधन बार खोलें" : "साधन बार छुपाएं"}
            aria-label={isCollapsed ? "साधन बार खोलें" : "साधन बार छुपाएं"}
          >
            {isCollapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {/* 10 Action Buttons */}
          {actions.map((act) => {
            const Icon = act.icon;
            const isActive = act.href && pathname === act.href;

            const buttonContent = (
              <div className="group relative flex flex-col items-center justify-center p-1 w-12 rounded-2xl transition-all hover:scale-105">
                {/* Circular Icon with Vibrant Color */}
                <div
                  className={`w-9 h-9 rounded-full ${act.bgColor} ${act.textColor} flex items-center justify-center shadow-md transition-all group-hover:ring-2 group-hover:ring-white/40 ${
                    isActive ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Hindi Label Underneath */}
                <span className="text-[9px] font-medium text-white/90 text-center leading-tight mt-1 truncate max-w-[48px] block">
                  {act.label}
                </span>

                {/* Desktop Tooltip */}
                <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#18171C] text-cream border border-gold/30 text-[11px] rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {act.tooltip}
                </div>
              </div>
            );

            if (act.href) {
              return (
                <Link key={act.id} href={act.href} aria-label={act.label}>
                  {buttonContent}
                </Link>
              );
            }

            return (
              <button
                key={act.id}
                onClick={act.onClick}
                type="button"
                aria-label={act.label}
                className="focus:outline-none"
              >
                {buttonContent}
              </button>
            );
          })}
        </div>
      </aside>

      {/* 2. MOBILE FLOATING LAUNCHER ICON */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40 no-print">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-12 h-12 rounded-full bg-maroon border border-gold/40 text-saffron-light shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          aria-label="त्वरित साधन मेनू"
        >
          <Grid className="w-5 h-5 text-gold-light" />
        </button>
      </div>

      {/* 3. MOBILE EXPANDABLE QUICK ACTIONS BOTTOM DRAWER */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200 no-print">
          <div className="w-full bg-[#18171C] border-t border-gold/30 rounded-t-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="font-serif text-base font-bold text-cream flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-saffron" />
                <span>त्वरित आध्यात्मिक साधन (Quick Tools)</span>
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white"
                aria-label="बंद करें"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              {actions.map((act) => {
                const Icon = act.icon;
                const handleClick = () => {
                  setIsMobileDrawerOpen(false);
                  if (act.onClick) act.onClick();
                  else if (act.href) router.push(act.href);
                };

                return (
                  <button
                    key={act.id}
                    onClick={handleClick}
                    className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-11 h-11 rounded-full ${act.bgColor} ${act.textColor} flex items-center justify-center shadow-md mb-1.5`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-white/90">
                      {act.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. READING AUTO-SCROLL FLOATING CONTROLLER BAR */}
      <ReadingAutoScroll
        isOpen={isAutoScrollOpen}
        onClose={() => setIsAutoScrollOpen(false)}
      />

      {/* 5. MULTI-CHANNEL SHARE MODAL */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* 6. GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#18171C] text-cream border border-gold/40 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-saffron" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
