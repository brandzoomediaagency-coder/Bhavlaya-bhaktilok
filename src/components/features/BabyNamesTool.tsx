"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

interface BabyName {
  name: string;
  gender: "boy" | "girl";
  meaning: string;
  deity: string;
  startingLetter: string;
}

const SAMPLE_NAMES: BabyName[] = [
  { name: "आरव (Aarav)", gender: "boy", meaning: "शांतिपूर्ण ध्वनि, विवेकशील", deity: "सूर्य / शिव", startingLetter: "आ" },
  { name: "अनन्या (Ananya)", gender: "girl", meaning: "अद्वितीय, अनुपम, अतुलनीय", deity: "माँ पार्वती", startingLetter: "अ" },
  { name: "ध्रुव (Dhruv)", gender: "boy", meaning: "अटल, ध्रुव तारा, परम भक्त", deity: "भगवान विष्णु", startingLetter: "ध" },
  { name: "ईशानी (Ishani)", gender: "girl", meaning: "भगवान शिव की शक्ति, ईश्वरी", deity: "माँ दुर्गा", startingLetter: "ई" },
  { name: "माधव (Madhav)", gender: "boy", meaning: "श्री कृष्ण, माँ लक्ष्मी के पति", deity: "श्री कृष्ण", startingLetter: "म" },
  { name: "सिया (Siya)", gender: "girl", meaning: "माता सीता, श्वेत, पावन", deity: "माता सीता", startingLetter: "स" },
  { name: "रुद्र (Rudra)", gender: "boy", meaning: "महाकाल, दुःखों का नाश करने वाले", deity: "भगवान शिव", startingLetter: "र" },
  { name: "वैदेही (Vaidehi)", gender: "girl", meaning: "विदेह राज जनक की पुत्री, सीता जी", deity: "माता सीता", startingLetter: "व" },
  { name: "केशव (Keshav)", gender: "boy", meaning: "सुंदर केशों वाले, श्री कृष्ण", deity: "श्री कृष्ण", startingLetter: "क" },
  { name: "गौरी (Gauri)", gender: "girl", meaning: "कांतिमान, माता पार्वती", deity: "माँ पार्वती", startingLetter: "ग" },
  { name: "राघव (Raghav)", gender: "boy", meaning: "रघुकुल के वंशज, श्री राम", deity: "श्री राम", startingLetter: "र" },
  { name: "मीरा (Meera)", gender: "girl", meaning: "कृष्ण की परम भक्त, शांत", deity: "श्री कृष्ण", startingLetter: "म" },
];

export function BabyNamesTool() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | "boy" | "girl">("all");

  const filtered = SAMPLE_NAMES.filter((item) => {
    const matchesGender = genderFilter === "all" || item.gender === genderFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deity.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGender && matchesSearch;
  });

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gold/15 gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
            वैदिक एवं सनातन शिशु नाम खोजक
          </h3>
          <p className="text-xs text-stone mt-0.5">
            संस्कृत भाषा, वेद एवं देवी-देवताओं पर आधारित पावन नाम एवं उनका अर्थ
          </p>
        </div>

        {/* Gender Tabs */}
        <div className="flex bg-ivory p-1 rounded-xl border border-gold/25 self-start sm:self-auto text-xs">
          <button
            onClick={() => setGenderFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              genderFilter === "all" ? "bg-saffron text-white shadow-2xs" : "text-stone hover:text-maroon"
            }`}
          >
            सभी
          </button>
          <button
            onClick={() => setGenderFilter("boy")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              genderFilter === "boy" ? "bg-saffron text-white shadow-2xs" : "text-stone hover:text-maroon"
            }`}
          >
            बालक (Boys)
          </button>
          <button
            onClick={() => setGenderFilter("girl")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              genderFilter === "girl" ? "bg-saffron text-white shadow-2xs" : "text-stone hover:text-maroon"
            }`}
          >
            बालिका (Girls)
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="नाम, अर्थ या इष्टदेव से खोजें (उदा: कृष्ण, शिव, शांति)..."
          className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-ivory rounded-xl border border-gold/20 hover:border-gold hover:shadow-xs transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-maroon">
                {item.name}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                item.gender === "boy" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
              }`}>
                {item.gender === "boy" ? "बालक" : "बालिका"}
              </span>
            </div>
            <p className="text-xs text-stone leading-relaxed">
              <strong>अर्थ:</strong> {item.meaning}
            </p>
            <p className="text-[11px] text-saffron-dark font-medium">
              संबंधित: {item.deity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
