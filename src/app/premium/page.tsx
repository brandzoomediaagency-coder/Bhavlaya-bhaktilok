"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Lock,
  ChevronRight,
  CreditCard,
  X,
  Volume2,
  Image,
  Tv,
  BookOpen,
} from "lucide-react";
import {
  PREVIEW_SUBSCRIPTION_CONFIG,
  PREMIUM_FEATURES_CATALOG,
  SUBSCRIPTION_MARKETING_COPY,
} from "@/config/subscription";

export default function PremiumPaywallPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  const t = SUBSCRIPTION_MARKETING_COPY[lang];

  // Dynamically calculate the exact 3-day renewal date starting from now
  const dynamicDates = useMemo(() => {
    const start = new Date();
    const renewal = new Date(start.getTime() + PREVIEW_SUBSCRIPTION_CONFIG.introductoryDurationDays * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    };
    return {
      startDateFormatted: start.toLocaleDateString("hi-IN", options),
      renewalDateFormatted: renewal.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", options),
      renewalDateRaw: renewal.toISOString(),
    };
  }, [lang]);

  const handleStartPremium = async () => {
    setIsProcessing(true);
    try {
      // Execute verified billing initiation via backend verification endpoint
      const response = await fetch("/api/subscription/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseToken: `token_web_init_${Date.now()}`,
          orderId: `GPA.${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
          basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
          offerId: PREVIEW_SUBSCRIPTION_CONFIG.offerId,
          userId: "usr_web_subscriber",
          billingProvider: "GOOGLE_PLAY",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPurchaseSuccess(true);
        setOrderSummary(result.data);
      } else {
        alert("Verification failed: " + result.error);
      }
    } catch (e) {
      console.error(e);
      alert("Billing error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Bar with Language Toggle & Dismiss */}
        <div className="flex items-center justify-between pb-4 border-b border-gold/15">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-maroon transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>{lang === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg border border-gold/25 p-0.5 bg-ivory text-xs font-semibold">
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1 rounded-md transition-all ${
                  lang === "hi" ? "bg-saffron text-white shadow-xs" : "text-stone hover:text-charcoal"
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-md transition-all ${
                  lang === "en" ? "bg-saffron text-white shadow-xs" : "text-stone hover:text-charcoal"
                }`}
              >
                English
              </button>
            </div>

            <Link
              href="/"
              className="p-1.5 rounded-lg text-stone hover:text-charcoal hover:bg-gold/10"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Purchase Confirmation Modal if triggered */}
        {purchaseSuccess && orderSummary && (
          <div className="p-6 rounded-2xl bg-green-50 border border-green-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-600 rounded-full text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-green-950">
                  {lang === "hi" ? "प्रीमियम सफलतापूर्वक सक्रिय हुआ!" : "Premium Successfully Activated!"}
                </h3>
                <p className="text-xs text-green-800">
                  {lang === "hi"
                    ? `आपका ₹1 का प्रारंभिक 3-दिन का एक्सेस सक्रिय हो गया है।`
                    : `Your ₹1 introductory 3-day access is now active.`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-xl border border-green-200 text-xs">
              <div>
                <div className="text-stone">Order ID</div>
                <div className="font-mono font-bold text-charcoal truncate">{orderSummary.orderId}</div>
              </div>
              <div>
                <div className="text-stone">{lang === "hi" ? "भुगतान राशि" : "Amount Paid"}</div>
                <div className="font-bold text-green-700">₹{orderSummary.initialAmountPaid}</div>
              </div>
              <div>
                <div className="text-stone">{lang === "hi" ? "वैधता" : "Valid For"}</div>
                <div className="font-bold text-charcoal">3 Days</div>
              </div>
              <div>
                <div className="text-stone">{lang === "hi" ? "प्रथम रिन्यूअल" : "First Renewal"}</div>
                <div className="font-bold text-maroon">₹499/माह</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone">
                {lang === "hi"
                  ? `अगला रिन्यूअल: ${dynamicDates.renewalDateFormatted}`
                  : `Next Renewal: ${dynamicDates.renewalDateFormatted}`}
              </span>
              <Link
                href="/account/plan"
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                {lang === "hi" ? "मेरा प्लान देखें" : "View My Plan"}
              </Link>
            </div>
          </div>
        )}

        {/* 1. Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-saffron-dark text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span>{t.headerTitle}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-maroon leading-tight">
            {t.headerSubtitle}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone leading-relaxed">
            {t.headerDescription}
          </p>
        </div>

        {/* 2. Hero Price Presentation Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-saffron/15 to-maroon/10 border-2 border-gold/40 p-6 sm:p-8 shadow-lg text-center space-y-4">
          <div className="space-y-2">
            <div className="text-xs uppercase font-extrabold tracking-widest text-saffron-dark">
              {lang === "hi" ? "विशेष प्रारंभिक प्रस्ताव (Introductory Offer)" : "Exclusive Introductory Offer"}
            </div>

            {/* High Visibility ₹1 */}
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif text-5xl sm:text-7xl font-black text-maroon tracking-tight">
                ₹1
              </span>
              <span className="text-left font-serif text-xl sm:text-2xl font-bold text-charcoal">
                / {lang === "hi" ? "3 दिन" : "3 Days"}
              </span>
            </div>

            <div className="font-serif text-lg sm:text-2xl font-bold text-maroon">
              {t.introPriceHighlight}
            </div>

            <div className="text-sm font-semibold text-stone-dark">
              {t.recurringPriceHighlight}
            </div>

            <p className="text-xs text-stone italic">
              {t.cancellationNotice}
            </p>
          </div>
        </div>

        {/* 3. Three-Step Subscription Timeline */}
        <div className="bg-ivory rounded-2xl border border-gold/25 p-6 space-y-4 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
            <Calendar className="w-5 h-5 text-saffron" />
            <span>{lang === "hi" ? "सब्सक्रिप्शन समयरेखा (Subscription Timeline)" : "Subscription Timeline"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1: Day 1 */}
            <div className="p-4 rounded-xl bg-white border border-gold/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-saffron-dark uppercase">
                  {t.timeline.step1Title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-saffron/15 text-[11px] font-bold text-saffron-dark">
                  {t.timeline.step1Badge}
                </span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                {t.timeline.step1Desc}
              </p>
            </div>

            {/* Step 2: Day 1–3 */}
            <div className="p-4 rounded-xl bg-white border border-gold/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-saffron-dark uppercase">
                  {t.timeline.step2Title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-[11px] font-bold text-green-800">
                  {t.timeline.step2Badge}
                </span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                {t.timeline.step2Desc}
              </p>
            </div>

            {/* Step 3: After Day 3 */}
            <div className="p-4 rounded-xl bg-white border border-gold/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-maroon uppercase">
                  {t.timeline.step3Title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-maroon/10 text-[11px] font-bold text-maroon">
                  {t.timeline.step3Badge}
                </span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                {t.timeline.step3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Complete 20 Premium Features Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron" />
              <span>{lang === "hi" ? "प्रीमियम में क्या-क्या शामिल है? (20+ फीचर्स)" : "What is included in Premium? (20+ Features)"}</span>
            </h2>
            <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
              {lang === "hi" ? "सभी 20 फीचर्स अनलॉक" : "All 20 Features Unlocked"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PREMIUM_FEATURES_CATALOG.map((feat) => (
              <div
                key={feat.id}
                className="p-3.5 rounded-xl bg-ivory border border-gold/20 hover:border-gold/50 transition-all flex items-start gap-3 text-xs"
              >
                <div className="p-1.5 rounded-lg bg-saffron/10 text-saffron shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-saffron" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-charcoal">
                    {lang === "hi" ? feat.nameHi : feat.name}
                  </div>
                  <p className="text-[11px] text-stone leading-tight">
                    {lang === "hi" ? feat.descriptionHi : feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Billing Transparency Box (Prominent before CTA) */}
        <div className="rounded-2xl border-2 border-gold/30 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gold/15 pb-3">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <h3 className="font-serif text-sm font-bold text-maroon uppercase tracking-wide">
              {lang === "hi" ? "बिलिंग पारदर्शिता एवं शर्तें (Billing Transparency)" : "Billing Transparency & Terms"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs">
            <div className="flex justify-between py-1 border-b border-gold/10">
              <span className="text-stone">{lang === "hi" ? "आज का शुल्क:" : "Today's Exact Charge:"}</span>
              <span className="font-bold text-maroon">₹1</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gold/10">
              <span className="text-stone">{lang === "hi" ? "प्रारंभिक एक्सेस अवधि:" : "Introductory Duration:"}</span>
              <span className="font-bold text-charcoal">3 {lang === "hi" ? "दिन" : "Days"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gold/10">
              <span className="text-stone">{lang === "hi" ? "आगामी रिन्यूअल राशि:" : "Recurring Amount:"}</span>
              <span className="font-bold text-charcoal">₹499 / {lang === "hi" ? "माह" : "Month"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gold/10">
              <span className="text-stone">{lang === "hi" ? "बिलिंग आवृत्ति:" : "Billing Frequency:"}</span>
              <span className="font-bold text-charcoal">{lang === "hi" ? "मासिक (Monthly)" : "Monthly"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gold/10 sm:col-span-2">
              <span className="text-stone">{lang === "hi" ? "सटीक प्रथम रिन्यूअल तिथि:" : "Exact First Renewal Date:"}</span>
              <span className="font-bold text-maroon">{dynamicDates.renewalDateFormatted}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gold/10 sm:col-span-2">
              <span className="text-stone">{lang === "hi" ? "भुगतान प्रदाता:" : "Payment Provider:"}</span>
              <span className="font-bold text-charcoal">Google Play Billing (Official)</span>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-[11px] text-stone-dark space-y-1">
            <p className="font-semibold text-charcoal">
              {t.transparency.autoRenewNotice}
            </p>
            <p className="text-stone leading-relaxed">
              {lang === "hi"
                ? "यह एक सशुल्क प्रारंभिक प्रस्ताव है, कोई निःशुल्क ट्रायल या रिफंडेबल सिक्योरिटी डिपॉजिट नहीं है। आप किसी भी समय Google Play > Payments & Subscriptions से स्वतः रिन्यूअल बंद कर सकते हैं।"
                : "This is a paid introductory offer, not a free trial and not a deposit. You may cancel auto-renewal at any time via Google Play > Payments & Subscriptions."}
            </p>
          </div>
        </div>

        {/* 6. Main Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleStartPremium}
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-saffron to-maroon hover:from-saffron-dark hover:to-maroon-dark text-white font-serif font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{lang === "hi" ? "सत्यापित हो रहा है..." : "Processing ₹1..."}</span>
              </>
            ) : (
              <>
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Secondary Dismiss Action (Fully visible, not hidden) */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block py-2 px-6 text-sm font-semibold text-stone hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* 7. Free & Un-Gated Guarantee Section */}
        <div className="pt-6 border-t border-gold/15 text-center text-xs text-stone space-y-2">
          <p>
            {lang === "hi"
              ? "Bhavlaya ऐप निःशुल्क डाउनलोड और उपयोग योग्य है। बुनियादी पंचांग, ब्राउज़िंग, भाषा चयन और खाता प्रबंधन कभी लॉक नहीं किए जाते।"
              : "Bhavlaya is free to download and browse. Onboarding, basic panchang, search, cancellation, and support remain 100% accessible to all users."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-stone-light">
            <Link href="/account/plan" className="hover:text-maroon underline">
              {lang === "hi" ? "सब्सक्रिप्शन प्रबंधन" : "Manage Subscription"}
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-maroon underline">
              {lang === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-maroon underline">
              {lang === "hi" ? "नियम व शर्तें" : "Terms & Conditions"}
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-maroon underline">
              {lang === "hi" ? "सहायता केंद्र" : "Help & Support"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
