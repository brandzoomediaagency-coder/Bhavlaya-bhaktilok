import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: string = "hi-IN"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "होम", href: "/" }];

  const labelMap: Record<string, string> = {
    bhajan: "भजन",
    mantra: "मंत्र",
    aarti: "आरती",
    chalisa: "चालीसा",
    katha: "कथा",
    granth: "ग्रंथ",
    panchang: "पंचांग",
    mandir: "मंदिर",
    festivals: "त्योहार",
    tools: "साधन",
    articles: "लेख",
    encyclopedia: "ज्ञानकोश",
    rashifal: "राशिफल",
    search: "खोजें",
    about: "हमारे बारे में",
    contact: "संपर्क",
    authors: "लेखक",
  };

  let href = "";
  for (const segment of segments) {
    href += `/${segment}`;
    breadcrumbs.push({
      label: labelMap[segment] || segment.replace(/-/g, " "),
      href,
    });
  }

  return breadcrumbs;
}
