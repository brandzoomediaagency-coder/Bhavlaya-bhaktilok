"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, navigation, brandConfig } from "@/config/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PWAInstallButton } from "@/components/features/PWAInstallButton";
import { Send, Heart, ShieldCheck, Mail, Sparkles } from "lucide-react";

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-cream border-t border-gold/20 text-charcoal pt-14 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Daily Inspiration Bar */}
        <div className="bg-gradient-to-r from-maroon/95 via-maroon to-maroon/95 text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-saffron/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/30 text-saffron-light text-xs font-medium mb-2 border border-saffron/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{brandConfig.name} — दैनिक अमृतवाणी व पंचांग</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                प्रतिदिन सुबह पावन विचार, पंचांग व शुभ मुहूर्त प्राप्त करें
              </h3>
              <p className="text-white/80 text-sm mt-1">
                {brandConfig.nameHi} के माध्यम से सनातन धर्म, वेद-पुराणों के सार और दैनिक व्रत-त्योहारों से जुड़े रहें।
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-sm border border-gold/40 text-cream px-4 py-3 rounded-xl text-center text-sm font-medium flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-saffron-light" />
                  आपका स्वागत है! {brandConfig.nameHi} से दैनिक प्रेरणा संदेश प्राप्त होंगे।
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="अपना ईमेल दर्ज करें..."
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-charcoal text-sm placeholder-stone focus:outline-none focus:ring-2 focus:ring-saffron"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-saffron hover:bg-saffron-light text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    जुड़ें
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-gold/15">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="footer" showTagline={true} />

            <p className="text-stone text-sm leading-relaxed max-w-sm">
              Bhakti, spiritual knowledge, scriptures and devotional experiences — all in one place.
            </p>
            <p className="text-xs text-stone/90 leading-relaxed max-w-sm">
              {brandConfig.heroDescriptionHi.slice(0, 160)}...
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={brandConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all shadow-2xs"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ivory border border-gold/30 flex items-center justify-center text-maroon hover:bg-maroon hover:text-white transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Devotional Column */}
          <div>
            <h4 className="font-serif font-bold text-maroon text-base mb-3 pb-1 border-b border-gold/20 inline-block">
              भक्ति संग्रह
            </h4>
            <ul className="space-y-2 text-sm text-stone">
              {navigation.footer.devotional.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge & Tools Column */}
          <div>
            <h4 className="font-serif font-bold text-maroon text-base mb-3 pb-1 border-b border-gold/20 inline-block">
              सनातन ज्ञान व साधन
            </h4>
            <ul className="space-y-2 text-sm text-stone">
              {navigation.footer.knowledge.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {(navigation.footer.tools || navigation.footer.explore || []).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h4 className="font-serif font-bold text-maroon text-base mb-3 pb-1 border-b border-gold/20 inline-block">
              संस्था एवं नीतियां
            </h4>
            <ul className="space-y-2 text-sm text-stone">
              {navigation.footer.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-saffron transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-xs text-stone-light hover:text-maroon transition-colors">
                  प्रशासनिक कक्ष (CMS)
                </Link>
              </li>
              <li className="pt-2">
                <PWAInstallButton variant="footer" />
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Disclaimer */}
        <div className="py-4 text-xs text-stone/80 text-center leading-relaxed">
          <p>
            <strong>धार्मिक अस्वीकरण:</strong> {brandConfig.nameHi} पर प्रस्तुत मंत्र, पंचांग, व्रत कथा एवं विचार प्राचीन सनातन ग्रंथों एवं पारंपरिक मान्यताओं पर आधारित हैं। इन्हें व्यक्तिगत आस्था एवं विवेक के साथ अपनाएँ। यह सामग्री किसी भी चिकित्सा, वित्तीय या कानूनी सलाह का विकल्प नहीं है।
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-4 border-t border-gold/15 flex flex-col sm:flex-row justify-between items-center text-xs text-stone gap-3">
          <p>© 2026 {brandConfig.nameHi} ({brandConfig.name}). सर्वाधिकार सुरक्षित।</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>निर्मित सस्नेह</span>
            <Heart className="w-3.5 h-3.5 text-maroon fill-maroon" />
            <span>| {brandConfig.companyCreditHi} ({brandConfig.companyCredit})</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
