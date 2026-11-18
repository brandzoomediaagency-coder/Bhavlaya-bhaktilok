"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Flame, Sparkles, RotateCcw, Award } from "lucide-react";

interface PunyaTask {
  id: string;
  title: string;
  desc: string;
  timeSlot: "प्रातः" | "मध्याह्न" | "सायं" | "सार्वकालिक";
}

const DEFAULT_PUNYA_TASKS: PunyaTask[] = [
  { id: "p1", title: "प्रातः कर दर्शन एवं ईश्वर स्मरण", desc: "बिस्तर से उठते ही हथेलियों का दर्शन और कृतज्ञता भाव।", timeSlot: "प्रातः" },
  { id: "p2", title: "सूर्य देव को तांबे के लोटे से जल अर्पण", desc: "सूर्य गायत्री अथवा ॐ सूर्याय नमः मंत्र सहित अर्घ्य।", timeSlot: "प्रातः" },
  { id: "p3", title: "108 गायत्री अथवा इष्ट मंत्र जप", desc: "शांत चित्त से जप माला अथवा डिजिटल काउंटर पर साधना।", timeSlot: "प्रातः" },
  { id: "p4", title: "श्रीमद्भगवद्गीता अथवा रामायण का 1 श्लोक पठन", desc: "दैनिक स्वाध्याय और उसके अर्थ पर 5 मिनट का चिंतन।", timeSlot: "मध्याह्न" },
  { id: "p5", title: "संध्या काल में दीप प्रज्वलन व आरती", desc: "घर के मंदिर में घी अथवा तिल के तेल का दीपक जलाना।", timeSlot: "सायं" },
  { id: "p6", title: "मूक पशु-पक्षी अथवा जरूरतमंद की सेवा (दान)", desc: "गौ माता को ग्रास, पक्षियों को दाना अथवा जल सेवा।", timeSlot: "सार्वकालिक" },
];

export function PunyaLedgerTool() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);

  // Load from local storage
  useEffect(() => {
    const todayKey = `bhavlaya_ledger_${new Date().toISOString().split("T")[0]}`;
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
      } catch {}
    }
    const savedStreak = localStorage.getItem("bhavlaya_ledger_streak");
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
  }, []);

  const toggleTask = (id: string) => {
    const todayKey = `bhavlaya_ledger_${new Date().toISOString().split("T")[0]}`;
    const next = completedIds.includes(id)
      ? completedIds.filter((item) => item !== id)
      : [...completedIds, id];
    setCompletedIds(next);
    localStorage.setItem(todayKey, JSON.stringify(next));

    if (next.length === DEFAULT_PUNYA_TASKS.length) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      localStorage.setItem("bhavlaya_ledger_streak", nextStreak.toString());
    }
  };

  const resetToday = () => {
    if (window.confirm("क्या आप आज का बहीखाता रीसेट करना चाहते हैं?")) {
      const todayKey = `bhavlaya_ledger_${new Date().toISOString().split("T")[0]}`;
      setCompletedIds([]);
      localStorage.removeItem(todayKey);
    }
  };

  const progressPercent = Math.round((completedIds.length / DEFAULT_PUNYA_TASKS.length) * 100);

  return (
    <div className="bg-cream border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-card max-w-xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gold/15 gap-3">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
            दैनिक पुण्य व साधना बहीखाता
          </h3>
          <p className="text-stone text-xs">
            प्रतिदिन 6 पावन आध्यात्मिक कर्मों का संकल्प और साधना रिपोर्ट।
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center bg-saffron/10 border border-saffron/20 px-3 py-1.5 rounded-xl text-xs font-bold text-saffron-dark">
          <Flame className="w-4 h-4 text-saffron fill-current" />
          <span>साधना स्ट्रीक: {streak} दिन</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-stone">
          <span>आज की साधना प्रगति:</span>
          <span className="font-bold text-maroon">{completedIds.length} / {DEFAULT_PUNYA_TASKS.length} कर्म पूर्ण ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-ivory rounded-full overflow-hidden border border-gold/20">
          <div
            className="h-full bg-gradient-to-r from-saffron to-maroon transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {DEFAULT_PUNYA_TASKS.map((task) => {
          const isDone = completedIds.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isDone
                  ? "bg-green-50/70 border-green-300 text-charcoal shadow-xs"
                  : "bg-ivory border-gold/20 hover:border-gold/40 text-stone"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-light" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gold/15 text-maroon font-semibold">
                    {task.timeSlot}
                  </span>
                  <span className={`text-sm font-semibold ${isDone ? "text-green-900 line-through" : "text-charcoal"}`}>
                    {task.title}
                  </span>
                </div>
                <p className="text-xs text-stone leading-relaxed">{task.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gold/15 flex justify-between items-center text-xs">
        <span className="text-stone-light italic">
          * यह बहीखाता आपके डिवाइस में सुरक्षित सहेजा जाता है।
        </span>
        <button
          onClick={resetToday}
          className="flex items-center gap-1 text-stone hover:text-maroon transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>आज का रीसेट करें</span>
        </button>
      </div>
    </div>
  );
}
