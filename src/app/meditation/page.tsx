import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MeditationRoomClient } from "./MeditationRoomClient";
import { brandConfig } from "@/config/brand";
import { Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: `ध्यान साधना कक्ष (Spiritual Meditation & OM Sound) | ${brandConfig.nameHi}`,
  description: `136.1 Hz ब्रह्मांडीय ॐ नाद, तानपुरा स्वर, अंतराल मंदिर घंटी एवं शांत ध्यान टाइमर के साथ आत्मिक साधना का अनुभव।`,
};

export default function MeditationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: "ध्यान साधना कक्ष" }]} />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          अंतर्मुखी चेतना एवं आत्मिक शांति
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-maroon">
          आध्यात्मिक ध्यान एवं ॐ साधना कक्ष
        </h1>
        <p className="text-stone text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          वेब ऑडियो द्वारा संश्लेषित 136.1 हर्ट्ज (षड्ज - ॐ नाद) की पवित्र तरंगों के साथ मन को शांत करें और एकाग्रता का विकास करें।
        </p>
      </div>

      <MeditationRoomClient />
    </div>
  );
}
