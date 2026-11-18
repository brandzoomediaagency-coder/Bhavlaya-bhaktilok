"use client";

import { useState, useEffect, useCallback } from "react";

export type PlatformType = "chromium" | "safari_mac" | "ios" | "android" | "other";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [platform, setPlatform] = useState<PlatformType>("other");
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);

  // Check standalone mode & browser platform
  useEffect(() => {
    // 1. Standalone display check
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    // 2. Platform detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isMac = /macintosh|mac os x/.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isAndroidDevice = /android/.test(ua);

    if (isIOSDevice) {
      setPlatform("ios");
    } else if (isMac && isSafari) {
      setPlatform("safari_mac");
    } else if (isAndroidDevice) {
      setPlatform("android");
    } else {
      setPlatform("chromium");
    }

    // 3. beforeinstallprompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 4. appinstalled listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsModalOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // 5. Service Worker Registration & Update Detection
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((err) => console.error("SW registration error:", err));
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Trigger Install Action
  const triggerInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error("Install prompt error:", err);
      }
    } else {
      // If native prompt not supported or deferred event not captured, open instructions modal
      setIsModalOpen(true);
    }
  }, [deferredPrompt]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const applyUpdate = useCallback(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
          window.location.reload();
        }
      });
    }
  }, []);

  return {
    isInstalled,
    canPromptNative: !!deferredPrompt,
    isModalOpen,
    platform,
    isUpdateAvailable,
    triggerInstall,
    openModal,
    closeModal,
    applyUpdate,
  };
}
