import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, brandConfig } from "@/config/site";

const notoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: brandConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.activeDomain),
  title: {
    default: `${brandConfig.name} – Bhakti, Sanatan Knowledge, Mantra, Aarti & Spirituality`,
    template: `%s | ${brandConfig.nameHi} (${brandConfig.name})`,
  },
  description: brandConfig.description,
  keywords: [
    "भावलय", "Bhavlaya", "भजन", "मंत्र", "आरती", "चालीसा", "पंचांग", "दैनिक पंचांग",
    "व्रत त्योहार", "सनातन धर्म", "हिंदू धर्म", "श्रीमद्भगवद्गीता",
    "bhajan", "mantra", "aarti", "chalisa", "panchang", "sanatan dharma", "spirituality",
  ],
  authors: [{ name: `${brandConfig.nameHi} संपादकीय मंडल` }],
  creator: brandConfig.companyName,
  publisher: brandConfig.name,
  robots: { index: true, follow: true, "max-image-preview": "large" as const },
  openGraph: {
    type: "website",
    url: brandConfig.activeDomain,
    title: `${brandConfig.name} – ${brandConfig.tagline}`,
    siteName: brandConfig.name,
    description: brandConfig.description,
    locale: brandConfig.locale,
    images: [{ url: `${brandConfig.activeDomain}/opengraph-image`, width: 1200, height: 630, alt: brandConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name} – ${brandConfig.tagline}`,
    description: brandConfig.description,
    images: [`${brandConfig.activeDomain}/opengraph-image`],
  },
  alternates: {
    canonical: brandConfig.activeDomain,
  },
  other: {
    "content-language": brandConfig.language,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${notoSans.variable} ${notoSerif.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${brandConfig.activeDomain}/#organization`,
                  name: brandConfig.name,
                  alternateName: [brandConfig.nameHi, `${brandConfig.name}.com`, `${brandConfig.name} Sanatan`],
                  url: brandConfig.activeDomain,
                  logo: {
                    "@type": "ImageObject",
                    url: `${brandConfig.activeDomain}/icon`,
                    width: 512,
                    height: 512,
                  },
                  description: brandConfig.description,
                  sameAs: Object.values(brandConfig.social),
                },
                {
                  "@type": "WebSite",
                  "@id": `${brandConfig.activeDomain}/#website`,
                  url: brandConfig.activeDomain,
                  name: brandConfig.name,
                  alternateName: brandConfig.nameHi,
                  publisher: { "@id": `${brandConfig.activeDomain}/#organization` },
                  inLanguage: brandConfig.language,
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${brandConfig.activeDomain}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-ivory text-charcoal min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
