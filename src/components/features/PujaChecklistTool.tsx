"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, RotateCcw, Sparkles } from "lucide-react";

interface ChecklistItem {
  id: string;
  step: string;
  desc: string;
  mantra?: string;
}

const DEFAULT_PUJA_STEPS: ChecklistItem[] = [
  { id: "p1", step: "1. पवित्र स्नान व शुद्ध वस्त्र", desc: "प्रातःकाल स्नान कर शुद्ध व धुले हुए श्वेत अथवा पीले वस्त्र धारण करें।" },
  { id: "p2", step: "2. आचमन एवं पवित्रीकरण", desc: "दाहिने हाथ में जल लेकर तीन बार आचमन करें और मुख तथा हाथ पोंछें।", mantra: "ॐ केशवाय नमः, ॐ माधवाय नमः, ॐ नारायणाय नमः" },
  { id: "p3", step: "3. तिलक एवं आसन शुद्धि", desc: "माथे पर चंदन अथवा रोली का तिलक लगाएं और आसन पर कुश या ऊनी कपड़ा बिछाएं।" },
  { id: "p4", step: "4. दीप एवं धूप प्रज्वलन", desc: "शुद्ध गाय के घी अथवा तिल के तेल का दीपक प्रज्वलित करें और धूप जलाएं।", mantra: "शुभं करोति कल्याणं आरोग्यं धनसंपदाम्। शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥" },
  { id: "p5", step: "5. श्री गणेश एवं इष्टदेव ध्यान", desc: "सर्वप्रथम विघ्नहर्ता श्री गणेश जी का ध्यान करें व दुर्वा/पुष्प अर्पित करें।" },
  { id: "p6", step: "6. अक्षत, पुष्प एवं नैवेद्य अर्पण", desc: "भगवान को अक्षत (अखंड चावल), ताजे पुष्प, फल अथवा मिष्ठान का भोग लगाएं।" },
  { id: "p7", step: "7. मंत्र जप (कम से कम 108 बार)", desc: "अपने इष्ट मंत्र अथवा गायत्री मंत्र का शांत भाव से एकाग्रचित्त होकर जप करें।" },
  { id: "p8", step: "8. पावन आरती एवं पुष्पांजलि", desc: "श्रद्धापूर्वक खड़े होकर आरती करें और अंत में क्षमा प्रार्थना व शांति पाठ करें।" },
];

export function PujaChecklistTool() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bhavlaya_puja_checklist") || localStorage.getItem("bhaktilok_puja_checklist");
    if (saved) {
      try {
        setCheckedIds(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const toggleStep = (id: string) => {
    const next = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id];
    setCheckedIds(next);
    localStorage.setItem("bhavlaya_puja_checklist", JSON.stringify(next));
  };

  const resetAll = () => {
    setCheckedIds([]);
    localStorage.removeItem("bhavlaya_puja_checklist");
    localStorage.removeItem("bhaktilok_puja_checklist");
  };

  const progressPercent = Math.round((checkedIds.length / DEFAULT_PUJA_STEPS.length) * 100);

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gold/15 gap-2 mb-6">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
            दैनिक पूजा चरणबद्ध चेकलिस्ट
          </h3>
          <p className="text-xs text-stone mt-0.5">
            पूजा के प्रत्येक चरण को पूरा करने के बाद टिक करें
          </p>
        </div>
        <button
          onClick={resetAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/30 text-xs text-stone hover:text-red-700 hover:border-red-300 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          रीसेट करें
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-semibold text-stone mb-1.5">
          <span>पूजा प्रगति</span>
          <span className="text-saffron">{progressPercent}% पूर्ण ({checkedIds.length}/{DEFAULT_PUJA_STEPS.length})</span>
        </div>
        <div className="w-full h-2.5 bg-ivory rounded-full overflow-hidden border border-gold/20">
          <div
            className="h-full bg-saffron-gradient transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {DEFAULT_PUJA_STEPS.map((step) => {
          const isDone = checkedIds.includes(step.id);
          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isDone
                  ? "bg-green-50/70 border-green-200"
                  : "bg-ivory border-gold/20 hover:border-gold"
              }`}
            >
              <div className="mt-0.5 text-saffron shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5 text-stone" />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-serif text-base font-bold ${
                    isDone ? "text-green-900 line-through opacity-80" : "text-maroon"
                  }`}
                >
                  {step.step}
                </h4>
                <p className="text-xs text-stone mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
                {step.mantra && (
                  <p className="mt-2 text-xs font-serif text-saffron font-medium bg-amber-50/60 p-2 rounded-lg border border-gold/15">
                    {step.mantra}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
