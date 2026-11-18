import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusCanvasClient } from "./StatusCanvasClient";
import { brandConfig } from "@/config/brand";
import { Sparkles, Share2, Smartphone, Download } from "lucide-react";

export const metadata = {
  title: `भक्ति स्टेटस स्टूडियो (Bhakti Status Studio & Creator) | ${brandConfig.nameHi}`,
  description: `व्हाट्सएप एवं इंस्टाग्राम स्टोरी के लिए सुंदर सनातन श्लोक, गीता उपदेश एवं देवी-देवता स्टेटस कार्ड बनाएं और HD में निःशुल्क डाउनलोड करें।`,
};

export default function StatusMakerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "भक्ति स्टेटस स्टूडियो" }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cream via-ivory to-cream border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          <span>व्हाट्सएप एवं सोशल मीडिया स्टेटस क्रिएटर</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          भक्ति स्टेटस स्टूडियो (Bhakti Status Studio)
        </h1>
        <p className="mt-3 text-stone text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          श्रीमद्भगवद्गीता के अमर श्लोक, शिव ताण्डव, राम वंदना और दैनिक आध्यात्मिक संदेशों के सुंदर HD स्टेटस कार्ड बनाएं, कस्टमाइज़ करें और सीधे साझा करें।
        </p>
      </div>

      {/* Canvas Generator Engine */}
      <StatusCanvasClient />
    </div>
  );
}
