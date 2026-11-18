import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContentActions } from "@/components/ui/ContentActions";
import { brandConfig, getCitationString } from "@/config/brand";
import { BookOpen, Sparkles, ArrowLeft, ShieldAlert } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const KATHA_DETAILS: Record<string, { title: string; category: string; source: string; content: string; moral: string }> = {
  "shiv-parvati-vivah-katha": {
    title: "भगवान शिव एवं माता पार्वती का दिव्य विवाह प्रसंग",
    category: "शिव महापुराण",
    source: "शिव महापुराण (रुद्र संहिता, पार्वती खण्ड)",
    content: `दक्ष प्रजापति के यज्ञ में माता सती के भस्म होने के उपरांत भगवान शिव गहन समाधि में लीन हो गए। उधर ताड़कासुर नामक महाप्रतापी असुर के अत्याचारों से तीनों लोक कांप उठे। ब्रह्मा जी ने देवताओं को बताया कि ताड़कासुर का वध केवल भगवान शिव के पुत्र द्वारा ही संभव है।

इसके पश्चात सती जी ने पर्वतराज हिमालय और मैना के घर पार्वती (उमा) के रूप में जन्म लिया। बाल्यकाल से ही देवी पार्वती शिवजी की अनन्य भक्त थीं। देवर्षि नारद के उपदेश से माता पार्वती ने भगवान शिव को पति रूप में प्राप्त करने के लिए घोर तपस्या का संकल्प लिया।

सैकड़ों वर्षों की कठोर तपस्या, निराहार रहकर पंचाग्नि साधना के पश्चात भगवान शिव अत्यंत प्रसन्न हुए। सप्तर्षियों को पार्वती जी की परीक्षा लेने भेजा गया, जिसमें वे पूर्णतः सफल रहीं।

अंततः शुभ मुहूर्त में भगवान शिव की अद्भुत बारात हिमालय की राजधानी में पहुँची, जिसमें देवता, ऋषि, यक्ष, गंधर्व के साथ-साथ भूत-पिशाच भी सम्मिलित थे। माता मैना पहले भयभीत हुईं, किन्तु शिवजी के परम सुंदर चंद्रशेखर रूप को देखकर सभी मुग्ध हो गए। विधिपूर्वक वैदिक मन्त्रोच्चार के बीच शिव-पार्वती का पावन विवाह संपन्न हुआ, जिससे संपूर्ण ब्रह्मांड में परम शांति और आनंद का प्रसार हुआ।`,
    moral: "कठोर तप, धैर्य और निष्काम भक्ति से असम्भव भी सम्भव हो जाता है। भगवान शिव केवल सच्ची निष्ठा और प्रेम से प्रसन्न होते हैं, बाह्य आडंबरों से नहीं।",
  },
  "samudra-manthan-amrit-katha": {
    title: "समुद्र मंथन एवं 14 दिव्य रत्नों का प्राकट्य",
    category: "श्रीमद्भागवत महापुराण",
    source: "श्रीमद्भागवत महापुराण (अष्टम स्कन्ध)",
    content: `ऋषि दुर्वासा के शाप से जब देवराज इंद्र और समस्त देवलोक श्रीहीन हो गया, तब भगवान विष्णु ने देवताओं को असुरों के साथ मिलकर क्षीरसागर का मंथन करने का परामर्श दिया ताकि अमृत प्राप्त हो सके।

मंथन के लिए मंदराचल पर्वत को मथानी और नागराज वासुकि को नेती बनाया गया। भगवान विष्णु ने विशाल कच्छप (कूर्म अवतार) धारण कर पर्वत को अपनी पीठ पर संभाला।

मंथन के दौरान सर्वप्रथम हलाहल विष निकला, जिससे संपूर्ण सृष्टि जलने लगी। तब देवाधिदेव भगवान शिव ने लोक कल्याण हेतु उस कालकूट विष का पान किया और अपने कंठ में धारण कर 'नीलकंठ' कहलाए।

इसके उपरांत समुद्र से 14 दिव्य रत्न प्रकट हुए:
1. हलाहल विष (शिवजी ने पिया)
2. कामधेनु गाय (ऋषियों को दी गई)
3. उच्चैःश्रवा घोड़ा (राजा बलि को मिला)
4. ऐरावत हाथी (इंद्र को प्राप्त)
5. कौस्तुभ मणि (विष्णु जी ने धारण की)
6. कल्पवृक्ष (स्वर्ग में स्थापित)
7. रंभा आदि अप्सराएं
8. माँ महालक्ष्मी (विष्णु जी का वरण किया)
9. वारुणी देवी
10. चन्द्रमा (शिवजी के मस्तक पर सुशोभित)
11. पारिजात वृक्ष
12. पांचजन्य शंख
13. भगवान धन्वंतरि (आयुर्वेद के जनक)
14. अमृत कलश

अंत में भगवान विष्णु ने मोहिनी रूप धारण कर असुरों को मोहित किया और देवताओं को अमृत पान कराया।`,
    moral: "जीवन में सुख और सफलता (अमृत) प्राप्त करने से पहले कठिनाइयों और विषमताओं (हलाहल) का सामना करना पड़ता है। कल्याणकारी भावना से विष पीने वाले ही महादेव कहलाते हैं।",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "shiv-parvati-vivah-katha" },
    { slug: "samudra-manthan-amrit-katha" },
  ];
}

export default async function KathaDetailPage({ params }: Props) {
  const { slug } = await params;
  const katha = KATHA_DETAILS[slug] || {
    title: "पावन धार्मिक कथा",
    category: "पुराण",
    source: "सनातन धर्मग्रंथ",
    content: "यह पावन कथा सनातन परंपरा की प्रामाणिक धरोहर है।",
    moral: "सत्य और धर्म का मार्ग ही शाश्वत कल्याणकारी है।",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "धार्मिक कथाएं", href: "/katha" },
          { label: katha.title },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          {katha.category} · स्रोत: {katha.source}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {katha.title}
        </h1>
        <p className="text-xs text-stone">
          संपादकीय समीक्षा एवं शास्त्रीय उद्धरणों सहित
        </p>
      </div>

      <ContentActions
        title={katha.title}
        contentToCopy={`${katha.title}\nस्रोत: ${katha.source}\n\n${katha.content}\n\nआध्यात्मिक सीख:\n${katha.moral}\n\n${getCitationString(katha.title, `/katha/${slug}`)}`}
      />

      {/* Main Story Body */}
      <div className="bg-cream border border-gold/30 rounded-3xl p-6 sm:p-10 shadow-card">
        <div
          id="devotional-content-body"
          className="font-devanagari text-charcoal text-base sm:text-lg leading-loose space-y-4 whitespace-pre-line select-text"
        >
          {katha.content}
        </div>
      </div>

      {/* Spiritual Lessons */}
      <div className="bg-ivory border border-gold/25 rounded-2xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-saffron" />
          <span>कथा का आध्यात्मिक संदेश एवं जीवन शिक्षा</span>
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">
          {katha.moral}
        </p>
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/katha"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य धार्मिक कथाएं देखें
        </Link>
      </div>
    </div>
  );
}
