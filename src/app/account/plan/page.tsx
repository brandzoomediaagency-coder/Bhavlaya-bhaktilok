"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  LifeBuoy,
  RotateCcw,
  Receipt,
  Sparkles,
} from "lucide-react";
import { PREVIEW_SUBSCRIPTION_CONFIG, SubscriptionState } from "@/config/subscription";

export default function MyPlanPage() {
  const [loading, setLoading] = useState(true);
  const [subData, setSubData] = useState<any>(null);
  const [selectedMockState, setSelectedMockState] = useState<SubscriptionState>("INTRO_ACTIVE");
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);

  const fetchPlanData = async (stateToLoad: SubscriptionState = selectedMockState) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/subscription/status?mockState=${stateToLoad}`);
      const data = await res.json();
      if (data.success) {
        setSubData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanData(selectedMockState);
  }, [selectedMockState]);

  const handleRestorePurchase = async () => {
    setRestoreMessage("Google Play Store से पूर्व क्रय खोजा जा रहा है...");
    setTimeout(() => {
      setRestoreMessage("सफलतापूर्वक सत्यापित: आपका ₹1 प्रारंभिक 3-दिन का प्लान Google Play अकाउंट से सक्रिय है।");
    }, 1200);
  };

  const getStatusBadge = (state: SubscriptionState) => {
    switch (state) {
      case "INTRO_ACTIVE":
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">₹1 प्रारंभिक एक्टिव (3 दिन)</span>;
      case "RECURRING_ACTIVE":
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">मासिक ₹499 एक्टिव</span>;
      case "CANCELLED_BUT_ACTIVE":
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">कैंसल (अवधि तक वैध)</span>;
      case "GRACE_PERIOD":
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">ग्रेस पीरियड (भुगतान लंबित)</span>;
      case "ACCOUNT_ON_HOLD":
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">अकाउंट होल्ड (स्थगित)</span>;
      case "EXPIRED":
        return <span className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-xs font-bold">अवधि समाप्त (Expired)</span>;
      default:
        return <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold">{state}</span>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "लागू नहीं (N/A)";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-gold/15">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-maroon transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>मुख्य पृष्ठ (Home)</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone font-medium hidden sm:inline">QA स्टेट सिमुलेटर:</span>
            <select
              value={selectedMockState}
              onChange={(e) => setSelectedMockState(e.target.value as SubscriptionState)}
              className="text-xs bg-white border border-gold/30 rounded-lg px-2 py-1 font-semibold text-charcoal"
            >
              <option value="INTRO_ACTIVE">INTRO_ACTIVE (₹1 for 3 Days)</option>
              <option value="RECURRING_ACTIVE">RECURRING_ACTIVE (₹499 Monthly)</option>
              <option value="CANCELLED_BUT_ACTIVE">CANCELLED_BUT_ACTIVE</option>
              <option value="GRACE_PERIOD">GRACE_PERIOD</option>
              <option value="ACCOUNT_ON_HOLD">ACCOUNT_ON_HOLD</option>
              <option value="EXPIRED">EXPIRED</option>
              <option value="REFUNDED">REFUNDED</option>
              <option value="REVOKED">REVOKED</option>
            </select>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-dark uppercase">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>सब्सक्रिप्शन प्रबंधन (My Plan)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
            मेरा भावलय प्रीमियम प्लान
          </h1>
          <p className="text-xs text-stone">
            आपके वर्तमान सब्सक्रिप्शन, आगामी रिन्यूअल एवं भुगतान स्थिति का वास्तविक विवरण।
          </p>
        </div>

        {/* Restore Purchase Notice */}
        {restoreMessage && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
            <span>{restoreMessage}</span>
            <button onClick={() => setRestoreMessage(null)} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* Main Subscription Card */}
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gold/20 shadow-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-saffron mx-auto mb-2" />
            <p className="text-xs text-stone">प्लान डेटा लोड हो रहा है...</p>
          </div>
        ) : subData ? (
          <div className="rounded-2xl bg-white border border-gold/30 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gold/15">
              <div>
                <div className="text-xs text-stone">प्लान का नाम</div>
                <div className="font-serif text-xl font-bold text-maroon">भावलय प्रीमियम (Bhavlaya Premium)</div>
              </div>
              <div>{getStatusBadge(subData.state)}</div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1">
                <div className="text-stone">प्रारंभिक भुगतान (Introductory Payment)</div>
                <div className="text-base font-bold text-charcoal">₹1 (100 पैसे)</div>
                <div className="text-[11px] text-stone-dark">3-दिन का प्रारंभिक पूर्ण प्रीमियम एक्सेस</div>
              </div>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1">
                <div className="text-stone">आगामी रिन्यूअल शुल्क (Recurring Price)</div>
                <div className="text-base font-bold text-charcoal">₹499 / माह (49,900 पैसे)</div>
                <div className="text-[11px] text-stone-dark">मासिक ऑटो-रिन्यूअल (P1M)</div>
              </div>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1">
                <div className="text-stone">क्रय तिथि (Purchase Date)</div>
                <div className="font-semibold text-charcoal">{formatDate(subData.purchaseDate)}</div>
              </div>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1">
                <div className="text-stone">प्रारंभिक समाप्ति तिथि (Introductory Expiry)</div>
                <div className="font-semibold text-charcoal">{formatDate(subData.introductoryExpiryDate || subData.currentPeriodEndDate)}</div>
              </div>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1 sm:col-span-2">
                <div className="text-stone">आगामी रिन्यूअल तिथि (Next Renewal Date)</div>
                <div className="font-bold text-maroon">
                  {subData.autoRenew ? formatDate(subData.nextRenewalDate || subData.currentPeriodEndDate) : "स्वतः रिन्यूअल बंद है"}
                </div>
              </div>

              <div className="p-3 bg-ivory rounded-xl border border-gold/15 space-y-1 sm:col-span-2">
                <div className="text-stone">भुगतान प्रदाता (Billing Provider)</div>
                <div className="font-semibold text-charcoal">
                  {subData.billingProvider === "GOOGLE_PLAY" ? "Google Play Billing (आधिकारिक)" : "UPI AutoPay (वैकल्पिक)"}
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="pt-4 border-t border-gold/15 space-y-3">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">उपलब्ध विकल्प (Actions)</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Manage on Google Play */}
                <a
                  href={`https://play.google.com/store/account/subscriptions?sku=${PREVIEW_SUBSCRIPTION_CONFIG.productId}&package=com.codecrewlabs.bhavlaya`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-saffron/10 hover:bg-saffron/20 text-saffron-dark font-bold rounded-xl border border-saffron/30 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>सब्सक्रिप्शन मैनेज करें (Google Play)</span>
                  </div>
                </a>

                {/* Cancel on Google Play */}
                <a
                  href={`https://play.google.com/store/account/subscriptions?sku=${PREVIEW_SUBSCRIPTION_CONFIG.productId}&package=com.codecrewlabs.bhavlaya`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-red-50 hover:bg-red-100 text-red-800 font-bold rounded-xl border border-red-200 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>सब्सक्रिप्शन कैंसल करें</span>
                  </div>
                </a>

                {/* Restore Purchases */}
                <button
                  onClick={handleRestorePurchase}
                  className="p-3 bg-ivory hover:bg-gold/10 text-stone-dark font-semibold rounded-xl border border-gold/25 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-saffron" />
                    <span>क्रय पुनर्स्थापित करें (Restore)</span>
                  </div>
                </button>

                {/* Contact Support */}
                <Link
                  href="/contact"
                  className="p-3 bg-ivory hover:bg-gold/10 text-stone-dark font-semibold rounded-xl border border-gold/25 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="w-4 h-4 text-maroon" />
                    <span>सहायता केंद्र से संपर्क करें</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Legal Security Disclosure */}
            <div className="p-3 rounded-xl bg-ivory border border-gold/15 text-[11px] text-stone leading-relaxed">
              <p>
                <strong>गोपनीयता एवं सुरक्षा:</strong> Bhavlaya आपके किसी भी क्रेडिट/डेबिट कार्ड नंबर, नेटबैंकिंग पासवर्ड या UPI PIN को कभी भी संग्रहीत या संसाधित नहीं करता है। समस्त लेन-देन Google Play Billing के सुरक्षित इन्फ्रास्ट्रक्चर द्वारा प्रबंधित होते हैं।
              </p>
            </div>
          </div>
        ) : null}

        {/* Upgrade / Re-subscribe CTA if expired */}
        {subData && (subData.state === "EXPIRED" || subData.state === "NOT_SUBSCRIBED") && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-saffron/15 to-maroon/15 border-2 border-gold/30 text-center space-y-3">
            <h3 className="font-serif text-lg font-bold text-maroon">भावलय प्रीमियम पुनः सक्रिय करें</h3>
            <p className="text-xs text-stone">
              सिर्फ ₹1 में 3 दिनों का प्रारंभिक अनुभव प्राप्त करें अथवा ₹499/माह पर निरंतर भक्ति का आनंद लें।
            </p>
            <Link
              href="/premium"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-saffron to-maroon text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <span>प्रीमियम शुरू करें</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
