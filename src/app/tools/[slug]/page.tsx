import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TOOLS } from "@/data/devotionalData";
import { brandConfig } from "@/config/brand";
import { JapMalaCounter } from "@/components/features/JapMalaCounter";
import { TempleBellPlayer } from "@/components/features/TempleBellPlayer";
import { PanchangWidget } from "@/components/sections/PanchangWidget";
import { PujaChecklistTool } from "@/components/features/PujaChecklistTool";
import { BabyNamesTool } from "@/components/features/BabyNamesTool";
import { SankalpGeneratorTool } from "@/components/features/SankalpGeneratorTool";
import { PunyaLedgerTool } from "@/components/features/PunyaLedgerTool";
import { Sparkles, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};

  return {
    title: `${tool.name} | आध्यात्मिक डिजिटल साधन | ${brandConfig.nameHi}`,
    description: `${tool.description} निःशुल्क एवं सरल रूप से उपयोग करें।`,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: "आध्यात्मिक डिजिटल साधन", href: "/tools" },
          { label: tool.name },
        ]}
      />

      <div className="text-center space-y-3 pb-6 border-b border-gold/20">
        <span className="inline-block px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
          श्रेणी: {tool.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon">
          {tool.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto">
          {tool.description}
        </p>
      </div>

      {/* Render the specific interactive tool component */}
      <div className="my-8">
        {tool.slug === "108-jap-mala-counter" && <JapMalaCounter />}
        {tool.slug === "digital-temple-bell" && <TempleBellPlayer />}
        {tool.slug === "daily-puja-checklist" && <PujaChecklistTool />}
        {tool.slug === "brahma-muhurat-calculator" && <PanchangWidget showFullDetails={true} />}
        {tool.slug === "choghadiya-calculator" && <PanchangWidget showFullDetails={true} />}
        {tool.slug === "rahukaal-calculator" && <PanchangWidget showFullDetails={true} />}
        {tool.slug === "hindu-baby-names" && <BabyNamesTool />}
        {tool.slug === "puja-sankalp-generator" && <SankalpGeneratorTool />}
        {tool.slug === "daily-punya-ledger" && <PunyaLedgerTool />}
      </div>

      <div className="pt-6 border-t border-gold/20 flex justify-between items-center text-sm">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-saffron hover:text-saffron-dark font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          अन्य सभी साधन देखें
        </Link>
      </div>
    </div>
  );
}
