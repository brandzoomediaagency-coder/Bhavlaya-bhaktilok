import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { BHAJANS, MANTRAS, CHALISAS, AARTIS, TEMPLES, FESTIVALS, SCRIPTURES, TOOLS, RASHIS } from "@/data/devotionalData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/panchang`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/bhajan`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/mantra`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/chalisa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/aarti`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/katha`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/granth`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/mandir`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/festivals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/rashifal`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic Bhajan routes
  const bhajanRoutes: MetadataRoute.Sitemap = BHAJANS.map((b) => ({
    url: `${baseUrl}/bhajan/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Mantra routes
  const mantraRoutes: MetadataRoute.Sitemap = MANTRAS.map((m) => ({
    url: `${baseUrl}/mantra/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic Chalisa routes
  const chalisaRoutes: MetadataRoute.Sitemap = CHALISAS.map((c) => ({
    url: `${baseUrl}/chalisa/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic Aarti routes
  const aartiRoutes: MetadataRoute.Sitemap = AARTIS.map((a) => ({
    url: `${baseUrl}/aarti/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Temple routes
  const templeRoutes: MetadataRoute.Sitemap = TEMPLES.map((t) => ({
    url: `${baseUrl}/mandir/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Festival routes
  const festivalRoutes: MetadataRoute.Sitemap = FESTIVALS.map((f) => ({
    url: `${baseUrl}/festivals/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Tool routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic Rashifal routes
  const rashiRoutes: MetadataRoute.Sitemap = RASHIS.map((r) => ({
    url: `${baseUrl}/rashifal/${r.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...bhajanRoutes,
    ...mantraRoutes,
    ...chalisaRoutes,
    ...aartiRoutes,
    ...templeRoutes,
    ...festivalRoutes,
    ...toolRoutes,
    ...rashiRoutes,
  ];
}
