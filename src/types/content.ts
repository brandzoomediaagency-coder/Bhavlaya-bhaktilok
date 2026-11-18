// Core content types for Bhavlaya Platform

export type ContentStatus = "draft" | "review" | "approved" | "published" | "archived";
export type ContentType = "bhajan" | "mantra" | "aarti" | "chalisa" | "katha" | "article" | "scripture" | "temple" | "festival" | "tool" | "encyclopedia";

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  expertise?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  type: ContentType;
  icon?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Deity {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description?: string;
  iconography?: string;
  images?: MediaAsset[];
}

export interface MediaAsset {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  source?: string;
  license?: string;
  width?: number;
  height?: number;
  format?: string;
}

// Base content interface
export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  description?: string;
  featuredImage?: MediaAsset;
  author?: Author;
  reviewer?: Author;
  categories?: Category[];
  tags?: Tag[];
  deityId?: string;
  deity?: Deity;
  status: ContentStatus;
  publishedAt?: string;
  updatedAt?: string;
  createdAt: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  sources?: ContentReference[];
  relatedContent?: RelatedItem[];
}

export interface ContentReference {
  id: string;
  sourceText: string;
  sourceUrl?: string;
  type: "scripture" | "book" | "website" | "tradition";
}

export interface RelatedItem {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  image?: string;
}

// Bhajan
export interface Bhajan extends BaseContent {
  lyrics: string;
  transliteration?: string;
  meaning?: string;
  spiritualContext?: string;
  audioUrl?: string;
  singer?: string;
  language?: string;
}

// Mantra
export interface Mantra extends BaseContent {
  sanskritText: string;
  hindiTransliteration?: string;
  englishTransliteration?: string;
  pronunciation?: string;
  wordMeanings?: string;
  completeMeaning: string;
  japaMethod?: string;
  chantingCount?: number;
  suggestedTime?: string;
  audioUrl?: string;
  sourceScripture?: string;
}

// Aarti
export interface Aarti extends BaseContent {
  lyrics: string;
  meaning?: string;
  worshipContext?: string;
  audioUrl?: string;
}

// Chalisa
export interface Chalisa extends BaseContent {
  verses: string;
  transliteration?: string;
  meaning?: string;
  readingMethod?: string;
  audioUrl?: string;
}

// Katha / Story
export interface Katha extends BaseContent {
  content: string;
  introduction?: string;
  storyType?: string;
  lessons?: string;
  scripturalContext?: string;
  tableOfContents?: TocItem[];
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

// Scripture
export interface Scripture extends BaseContent {
  type: "veda" | "purana" | "upanishad" | "itihasa" | "stotra" | "other";
  totalChapters?: number;
  sourceEdition?: string;
  translator?: string;
  language?: string;
  chapters?: ScriptureChapter[];
}

export interface ScriptureChapter {
  id: string;
  scriptureId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  content?: string;
  summary?: string;
  verseCount?: number;
}

export interface ScriptureVerse {
  id: string;
  chapterId: string;
  verseNumber: number;
  sanskritText: string;
  hindiTranslation?: string;
  englishTranslation?: string;
  wordMeanings?: string;
  commentary?: string;
}

// Temple
export interface Temple extends BaseContent {
  location: string;
  state: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  history?: string;
  significance?: string;
  architecture?: string;
  darshanTimings?: string;
  aartiTimings?: string;
  howToReach?: string;
  nearbyRailway?: string;
  nearbyAirport?: string;
  officialWebsite?: string;
  templeType?: "jyotirlinga" | "shakti-peeth" | "char-dham" | "major" | "regional";
  images?: MediaAsset[];
}

// Festival
export interface Festival extends BaseContent {
  date?: string;
  significance?: string;
  pujaVidhi?: string;
  pujaSamagri?: string[];
  muhurat?: string;
  vratKatha?: string;
  mantras?: string[];
  traditions?: string;
  regionalVariations?: string;
  relatedDeities?: Deity[];
  faqs?: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// Vrat
export interface Vrat extends BaseContent {
  vratKatha?: string;
  vidhi?: string;
  timing?: string;
  relatedFestivalId?: string;
}

// Panchang
export interface PanchangData {
  date: string;
  tithi: string;
  paksha: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahukaal: string;
  abhijitMuhurat: string;
  choghadiya?: ChoghadiyaEntry[];
  brahmaMuhurat: string;
  amritKaal?: string;
  vikramSamvat: string;
  hinduMonth: string;
  festivals?: string[];
  vrats?: string[];
  location: string;
}

export interface ChoghadiyaEntry {
  name: string;
  type: "shubh" | "amrit" | "labh" | "char" | "rog" | "kaal" | "udyog";
  startTime: string;
  endTime: string;
}

// Encyclopedia
export interface EncyclopediaEntry extends BaseContent {
  content: string;
  category: string;
  relatedEntries?: RelatedItem[];
  glossaryTerms?: GlossaryTerm[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  sanskrit?: string;
}

// Rashifal
export interface Rashifal {
  id: string;
  rashi: string;
  rashiEn: string;
  date: string;
  type: "daily" | "weekly" | "monthly";
  prediction: string;
  luckyNumber?: number;
  luckyColor?: string;
  mantra?: string;
}

// Tool
export interface SpiritualTool extends BaseContent {
  toolCategory: string;
  componentName: string;
  isActive: boolean;
  config?: Record<string, unknown>;
}

// Article
export interface Article extends BaseContent {
  content: string;
  excerpt?: string;
  readingTime?: number;
  tableOfContents?: TocItem[];
}

// Search
export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  description?: string;
  image?: string;
  highlight?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// User
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: "user" | "author" | "editor" | "reviewer" | "admin" | "super_admin";
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  location?: string;
  notifications: {
    festivals: boolean;
    vrats: boolean;
    dailyPanchang: boolean;
    dailyMantra: boolean;
  };
}

export interface Bookmark {
  id: string;
  userId: string;
  contentType: ContentType;
  contentId: string;
  createdAt: string;
}

// Contact
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
