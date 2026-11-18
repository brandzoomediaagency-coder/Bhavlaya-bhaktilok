"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { brandConfig } from "@/config/brand";
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "सुझाव",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", category: "सुझाव", message: "" });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "संपर्क करें" }]} />

      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          संवाद एवं सहयोग
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
          {brandConfig.nameHi} संपादकीय दल से संपर्क करें
        </h1>
        <p className="text-stone text-sm sm:text-base max-w-xl mx-auto">
          सामग्री में सुधार, नवीन सुझाव, कॉपीराइट अथवा किसी भी सहायता के लिए हमें संदेश भेजें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cream border border-gold/25 rounded-2xl p-6 space-y-4 shadow-card">
            <h3 className="font-serif font-bold text-lg text-maroon">
              सीधे संपर्क सूत्र
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              हम प्रत्येक श्रद्धालु एवं पाठक के विचार का सम्मान करते हैं। सामान्यतः 24-48 घंटों के भीतर प्रत्युत्तर दिया जाता है।
            </p>

            <div className="pt-2 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal block">संपादकीय ईमेल:</span>
                  <a href={`mailto:${brandConfig.supportEmail}`} className="text-stone hover:text-saffron">
                    {brandConfig.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-charcoal block">मुख्यालय / केंद्र:</span>
                  <span className="text-stone">प्रयागराज / वाराणसी, उत्तर प्रदेश, भारत</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50/80 rounded-2xl border border-gold/20 text-xs text-stone space-y-1">
            <span className="font-bold text-maroon block">संशोधन नीति (Corrections Policy):</span>
            <p>
              यदि आपको किसी मंत्र के उच्चारण, अर्थ या भजन के बोल में कोई त्रुटि प्रतीत हो, तो कृपया ग्रंथ संदर्भ सहित हमें अवश्य सूचित करें।
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-maroon">
                आपका संदेश प्राप्त हुआ!
              </h3>
              <p className="text-stone text-xs sm:text-sm max-w-sm mx-auto">
                {brandConfig.nameHi} संपादकीय दल को आपका संदेश सुरक्षित रूप से प्राप्त हो गया है। शीघ्र ही हमारी टीम आपसे संपर्क करेगी।
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-saffron text-white text-xs font-semibold"
              >
                अन्य संदेश भेजें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-maroon mb-2">
                संदेश प्रपत्र (Send Message)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">
                    ईमेल पता *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">
                    विषय श्रेणी
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                  >
                    <option value="सुझाव">सामग्री सुझाव (Suggestion)</option>
                    <option value="संशोधन">मंत्र/भजन संशोधन (Correction)</option>
                    <option value="तकनीकी">तकनीकी समस्या (Technical Bug)</option>
                    <option value="अन्य">अन्य प्रश्न (General Inquiry)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal block mb-1">
                    विषय शीर्षक *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="संदेश का संक्षिप्त विषय"
                    className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-charcoal block mb-1">
                  संदेश विवरण *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="अपना संदेश यहाँ विस्तार से लिखें..."
                  className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-saffron hover:bg-saffron-light text-white font-medium text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "भेजा जा रहा है..." : "संदेश प्रेषित करें"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
