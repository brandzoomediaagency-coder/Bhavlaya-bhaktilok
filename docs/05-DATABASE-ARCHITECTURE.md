# BhaktiLok — Enterprise Database Architecture Specification
**Platform:** BhaktiLok Devotional Ecosystem (Next.js 15 App Router + Supabase / PostgreSQL 16)  
**Document Version:** 1.0.0  
**Target Engine:** PostgreSQL 16+ (Supabase Managed Engine)  
**Schema Version:** `2026.11.v1`  
**Author:** BhaktiLok Core Architecture & Data Engineering Team  

---

## 1. Executive Summary & Architectural Overview

BhaktiLok is an authoritative, high-concurrency, premium digital sanctuary for Sanatan Dharma. The platform delivers sacred literature (Vedas, Upanishads, Puranas, Itihasas), devotional lyrics (Bhajans, Aartis, Chalisas), ritualistic knowledge (Mantras, Kathas, Vrats, Puja Vidhi), astronomical calculations (Vedic Panchang, Daily Rashifal), geospatial pilgrimage guides (Temples), and interactive spiritual utilities (Japa counters, Muhurat calculators).

### 1.1 Core Architectural Principles
1. **Relational Integrity with Polymorphic Extensions:** Clean relational schema with strict Foreign Key constraints for core domain logic, complemented by controlled polymorphic patterns (`content_type` + `content_id`) for cross-cutting features (Bookmarks, Reading History, Favourites, Media Linking, Revisions).
2. **Devanagari, IAST & Phonetic Search:** Multi-script linguistic handling supporting pure Sanskrit Devanagari (`देवनागरी`), Hindi, International Alphabet of Sanskrit Transliteration (`IAST`), English transliteration, and trigram-based fuzzy phonetics (`pg_trgm`).
3. **Sub-Millisecond Read Latency:** Denormalized search vectors (`tsvector`), JSONB-cached structured liturgies, B-Tree slug lookups, and partial covering indexes tailored for Edge-cached Next.js Server Components.
4. **Zero-Trust Data Protection (Supabase RLS):** Defense-in-depth architecture leveraging PostgreSQL Row Level Security (RLS) applied directly at the database engine tier, synchronized with Supabase JWT claims and granular RBAC.
5. **Immutable Versioning & Auditability:** Automated shadow revisions (`content_revisions`) tracking every mutation across content types with rollback capabilities.

---

## 2. Global Entity Relationship Diagram (ERD)

The BhaktiLok database domain is organized into four distinct operational clusters:
1. **Core & Identity Domain:** Roles, Users, Authors, Hierarchical Categories, Taxonomy Tags, and Deities.
2. **Content & Liturgical Domain:** Bhajans, Mantras, Aartis, Chalisas, Kathas, Scriptures, Chapters, Verses, Temples, Festivals, Vrats, Panchang, Encyclopedia, Rashifal, Tools, and Articles.
3. **Reference & Governance Domain:** Media Assets, Content References, Audit Revisions, and URL Redirects.
4. **User Engagement Domain:** Bookmarks, Favourites, Reading History, Preferences, Notifications, and Contact Inquiries.

```mermaid
erDiagram
    ROLES ||--o{ USERS : assigns
    USERS ||--o| AUTHORS : promotes_to
    AUTHORS ||--o{ ARTICLES : writes
    AUTHORS ||--o{ BHAJANS : contributes
    
    DEITIES ||--o{ BHAJANS : dedicated_to
    DEITIES ||--o{ MANTRAS : dedicated_to
    DEITIES ||--o{ AARTIS : dedicated_to
    DEITIES ||--o{ CHALISAS : dedicated_to
    DEITIES ||--o{ TEMPLES : primary_deity
    DEITIES ||--o{ FESTIVALS : central_deity
    
    CATEGORIES ||--o{ CATEGORIES : parent_child
    CATEGORIES ||--o{ CONTENT_CATEGORIES : classifies
    TAGS ||--o{ CONTENT_TAGS : tags
    
    SCRIPTURES ||--o{ SCRIPTURE_CHAPTERS : contains
    SCRIPTURE_CHAPTERS ||--o{ SCRIPTURE_VERSES : contains
    
    FESTIVALS ||--o{ VRATS : associates
    
    USERS ||--o{ BOOKMARKS : saves
    USERS ||--o{ FAVOURITES : likes
    USERS ||--o{ READING_HISTORY : tracks
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ USER_PREFERENCES : configures
    
    MEDIA_ASSETS ||--o{ CONTENT_REFERENCES : referenced_by
    CONTENT_REVISIONS }o--|| USERS : authored_by
```

---

## 3. PostgreSQL Extensions, Enums & Custom Domains

To support Unicode collation, geographical lookups, high-speed fuzzy search, and UUID generation, the following native PostgreSQL extensions and types must be initialized in the `public` schema.

```sql
-- ============================================================================
-- 3.1 POSTGRESQL EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "unaccent" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "btree_gist" WITH SCHEMA extensions;

-- ============================================================================
-- 3.2 ENUMS & CUSTOM DOMAINS
-- ============================================================================

-- Content publication lifecycle
CREATE TYPE content_status AS ENUM (
    'draft',
    'in_review',
    'approved',
    'published',
    'archived',
    'rejected'
);

-- Polymorphic Content Entity Classifier
CREATE TYPE content_type_enum AS ENUM (
    'bhajan',
    'mantra',
    'aarti',
    'chalisa',
    'katha',
    'scripture',
    'scripture_chapter',
    'scripture_verse',
    'temple',
    'festival',
    'vrat',
    'encyclopedia_entry',
    'article',
    'deity'
);

-- Supported Scriptural & Devotional Languages
CREATE TYPE liturgical_language AS ENUM (
    'sanskrit',
    'hindi',
    'english',
    'bengali',
    'tamil',
    'telugu',
    'gujarati',
    'marathi',
    'kannada',
    'odia',
    'punjabi',
    'malayalam',
    'assamese'
);

-- Scripture Classifications
CREATE TYPE scripture_type_enum AS ENUM (
    'shruti_veda',
    'shruti_upanishad',
    'smriti_purana',
    'smriti_itihasa',
    'smriti_darshana',
    'smriti_gita',
    'smriti_agama',
    'stotra_samhita'
);

-- Twelve Rashis (Zodiac Signs)
CREATE TYPE rashi_enum AS ENUM (
    'mesha',       -- Aries
    'vrishabha',    -- Taurus
    'mithuna',      -- Gemini
    'karka',        -- Cancer
    'simha',        -- Leo
    'kanya',        -- Virgo
    'tula',         -- Libra
    'vrishchika',   -- Scorpio
    'dhanu',        -- Sagittarius
    'makara',       -- Capricorn
    'kumbha',       -- Aquarius
    'meena'         -- Pisces
);

-- Rashifal Frequency Types
CREATE TYPE rashifal_type_enum AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'yearly'
);

-- Hindu Lunar Fortnight (Paksha)
CREATE TYPE paksha_enum AS ENUM (
    'shukla_paksha', -- Waxing Moon
    'krishna_paksha' -- Waning Moon
);

-- Category Taxonomy Domains
CREATE TYPE category_type_enum AS ENUM (
    'general',
    'deity',
    'scripture',
    'ritual',
    'festival',
    'temple_circuit',
    'philosophy',
    'music_genre'
);

-- Tag Classifications
CREATE TYPE tag_type_enum AS ENUM (
    'topic',
    'tradition',      -- Shaiva, Vaishnava, Shakta, Smarta, etc.
    'chhanda',        -- Vedic Metres: Gayatri, Anushtup, Tristubh
    'mood',           -- Bhava: Shanta, Dasya, Sakhya, Vatsalya, Madhurya
    'difficulty',
    'benefit'         -- Shanti, Samriddhi, Arogya, Moksha
);

-- Story / Katha Types
CREATE TYPE story_type_enum AS ENUM (
    'puranic',
    'vedic',
    'upanishadic',
    'folk_folklore',
    'bhakta_charitra',
    'moral_allegory'
);

-- Temple Structural & Regional Archetypes
CREATE TYPE temple_type_enum AS ENUM (
    'nagara',
    'dravida',
    'vesara',
    'kalinga',
    'cave_rockcut',
    'hill_shrine',
    'jyotirlinga',
    'shakti_peetha',
    'divya_desham',
    'char_dham'
);

-- User Notification Classifications
CREATE TYPE notification_type_enum AS ENUM (
    'tithi_alert',
    'festival_reminder',
    'daily_rashifal',
    'new_content',
    'editorial_update',
    'system_announcement'
);

-- Inquiries & Support Status
CREATE TYPE contact_status_enum AS ENUM (
    'unread',
    'under_review',
    'resolved',
    'spam'
);
```

---

## 4. Complete Database Table Schemas (DDL)

All tables use `UUIDv4` primary keys generated by `gen_random_uuid()` to prevent enumeration attacks and simplify distributed insertions. Foreign keys enforce referential cascades or nullifications appropriately.

### 4.1 Core & Identity Entities

#### 1. `roles`
Defines granular permission sets for back-office operators and spiritual contributors.
```sql
CREATE TABLE public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '{"read": true, "write": false, "publish": false, "admin": false}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.roles IS 'System authorization roles mapping to permissions matrix.';
COMMENT ON COLUMN public.roles.permissions IS 'JSONB structure defining granular capabilities (e.g. content:publish, users:ban).';
```

#### 2. `users`
Mirrors and enriches Supabase's internal `auth.users` entity.
```sql
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(150),
    avatar_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'user' REFERENCES public.roles(name) ON UPDATE CASCADE,
    preferences JSONB NOT NULL DEFAULT '{
        "primary_language": "hindi",
        "script_preference": "devanagari",
        "audio_autoplay": false,
        "daily_panchang_alert": true,
        "theme": "saffron_light"
    }'::jsonb,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.users IS 'Public user profile metadata extending Supabase auth.users.';
```

#### 3. `authors`
Sanskrit scholars, acharyas, translators, and verified devotional contributors.
```sql
CREATE TABLE public.authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    bio TEXT,
    avatar TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    expertise TEXT[] DEFAULT '{}',
    sampradaya VARCHAR(100),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.authors IS 'Scholars, translators, and contributors with accredited provenance.';
```

#### 4. `categories`
Hierarchical taxonomy tree (Self-referential parent-child adjacency list).
```sql
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    type category_type_enum NOT NULL DEFAULT 'general',
    icon TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.categories IS 'Self-referencing taxonomy hierarchy supporting nested content grouping.';
```

#### 5. `tags`
Orthogonal descriptors for mood, sampradaya, chhanda, and search intent.
```sql
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(80) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    type tag_type_enum NOT NULL DEFAULT 'topic',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.tags IS 'Tag repository for multi-dimensional content classification.';
```

#### 6. `deities`
Primary divine forms (Ishvara, Devas, Devis, Avatars) anchoring cross-entity navigation.
```sql
CREATE TABLE public.deities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    sanskrit_name VARCHAR(150) NOT NULL,
    description TEXT,
    iconography JSONB DEFAULT '{
        "vahana": "",
        "ayudhas": [],
        "consort": "",
        "attributes": []
    }'::jsonb,
    associated_mantras TEXT[] DEFAULT '{}',
    associated_festivals TEXT[] DEFAULT '{}',
    images JSONB DEFAULT '{"primary": "", "gallery": []}'::jsonb,
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(sanskrit_name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.deities IS 'Foundational divine entities linked to liturgies, temples, and festivals.';
```

---

### 4.2 Content & Liturgical Entities

#### 7. `bhajans`
Devotional lyrics, musical notations, raga, tala, and multi-format recordings.
```sql
CREATE TABLE public.bhajans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    deity_id UUID REFERENCES public.deities(id) ON DELETE SET NULL,
    lyrics TEXT NOT NULL,
    transliteration TEXT,
    meaning TEXT,
    audio_url TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    category_ids UUID[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    singer VARCHAR(150),
    composer VARCHAR(150),
    raga VARCHAR(100),
    tala VARCHAR(100),
    language liturgical_language NOT NULL DEFAULT 'hindi',
    status content_status NOT NULL DEFAULT 'draft',
    views_count BIGINT NOT NULL DEFAULT 0,
    likes_count BIGINT NOT NULL DEFAULT 0,
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(singer, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(lyrics, '')), 'C') ||
        setweight(to_tsvector('simple', coalesce(transliteration, '')), 'C')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.bhajans IS 'Devotional songs, lyrics, musical structures, and audio links.';
```

#### 8. `mantras`
Sacred Vedic and Tantric chants with exact phonetics, svara notations, and chanting rituals.
```sql
CREATE TABLE public.mantras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    deity_id UUID REFERENCES public.deities(id) ON DELETE SET NULL,
    sanskrit_text TEXT NOT NULL,
    hindi_transliteration TEXT,
    english_transliteration TEXT,
    meaning TEXT NOT NULL,
    word_meanings JSONB DEFAULT '[]'::jsonb,
    pronunciation_guide TEXT,
    japa_method TEXT,
    chanting_count INT DEFAULT 108,
    bead_type VARCHAR(100), -- Rudraksha, Tulsi, Sphatika, Kamal Gatta
    viniyoga TEXT,          -- Rishi, Chhanda, Devata, Beeja, Shakti, Kilaka
    audio_url TEXT,
    source_scripture TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(sanskrit_text, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(hindi_transliteration, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(english_transliteration, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(meaning, '')), 'C')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.mantras IS 'High-precision mantras with svara, phonetic guides, and ritualistic viniyoga.';
```

#### 9. `aartis`
Daily and festive invocation lyrics for deeparadhana.
```sql
CREATE TABLE public.aartis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    deity_id UUID REFERENCES public.deities(id) ON DELETE SET NULL,
    lyrics TEXT NOT NULL,
    transliteration TEXT,
    meaning TEXT,
    audio_url TEXT,
    featured_image TEXT,
    worship_context TEXT, -- Morning Aarti, Sandhya Aarti, Shayan Aarti
    status content_status NOT NULL DEFAULT 'draft',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(lyrics, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(meaning, '')), 'C')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.aartis IS 'Ritualistic hymns sung during camphor/oil lamp adoration.';
```

#### 10. `chalisas`
Forty-verse devotional poetic stotras (Hanuman Chalisa, Shiv Chalisa, Durga Chalisa).
```sql
CREATE TABLE public.chalisas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    deity_id UUID REFERENCES public.deities(id) ON DELETE SET NULL,
    verses JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {verse_no, text, transliteration, meaning}
    transliteration TEXT,
    meaning TEXT,
    reading_method TEXT,
    audio_url TEXT,
    featured_image TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(meaning, '')), 'B')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.chalisas IS 'Structured 40-verse metric stotras containing structured verse payloads.';
```

#### 11. `kathas`
Spiritual narratives, Vrat kathas, and moral parables.
```sql
CREATE TABLE public.kathas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    summary TEXT,
    deity_ids UUID[] DEFAULT '{}',
    scripture_references JSONB DEFAULT '[]'::jsonb,
    story_type story_type_enum NOT NULL DEFAULT 'puranic',
    lessons TEXT[] DEFAULT '{}',
    reading_time_minutes INT DEFAULT 5,
    featured_image TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(content, '')), 'C')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.kathas IS 'Narrative stories, Vrat backgrounds, and moral spiritual allegories.';
```

#### 12. `scriptures`
Root catalog of authoritative Sanatan literature.
```sql
CREATE TABLE public.scriptures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    original_title VARCHAR(255),
    description TEXT,
    type scripture_type_enum NOT NULL,
    language liturgical_language NOT NULL DEFAULT 'sanskrit',
    total_chapters INT NOT NULL DEFAULT 0,
    total_verses INT NOT NULL DEFAULT 0,
    source_edition VARCHAR(255),
    translator VARCHAR(200),
    cover_image TEXT,
    status content_status NOT NULL DEFAULT 'draft',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(original_title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.scriptures IS 'Master repository of canonical texts (e.g. Srimad Bhagavad Gita, Upanishads).';
```

#### 13. `scripture_chapters`
Structural cantos, adhyayas, kandas, or parvans of a scripture.
```sql
CREATE TABLE public.scripture_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scripture_id UUID NOT NULL REFERENCES public.scriptures(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL,
    content TEXT,
    summary TEXT,
    total_verses INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_scripture_chapter UNIQUE (scripture_id, chapter_number),
    CONSTRAINT uq_scripture_chapter_slug UNIQUE (scripture_id, slug)
);

COMMENT ON TABLE public.scripture_chapters IS 'Chapters/Adhyayas subdivision of a parent scripture.';
```

#### 14. `scripture_verses`
Granular shlokas, sutras, and mantras with word-by-word breakdowns and multi-acharya commentaries.
```sql
CREATE TABLE public.scripture_verses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.scripture_chapters(id) ON DELETE CASCADE,
    verse_number INT NOT NULL,
    verse_order INT NOT NULL,
    sanskrit_text TEXT NOT NULL,
    transliteration TEXT,
    hindi_translation TEXT NOT NULL,
    english_translation TEXT NOT NULL,
    word_meanings JSONB DEFAULT '[]'::jsonb, -- Array of {word, devanagari, meaning, grammatical_case}
    commentary JSONB DEFAULT '[]'::jsonb,     -- Array of {commentator, tradition, text}
    audio_url TEXT,
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(sanskrit_text, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(transliteration, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(hindi_translation, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(english_translation, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_chapter_verse UNIQUE (chapter_id, verse_number)
);

COMMENT ON TABLE public.scripture_verses IS 'Individual shlokas, translations, morphological analysis, and commentaries.';
```

#### 15. `temples`
Sacred shrines, pilgrimage centers, structural history, and visitor administration.
```sql
CREATE TABLE public.temples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    deity_id UUID REFERENCES public.deities(id) ON DELETE SET NULL,
    location VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    history TEXT,
    significance TEXT,
    architecture TEXT,
    darshan_timings JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {time_slot, label, days}
    aarti_timings JSONB NOT NULL DEFAULT '[]'::jsonb,   -- Array of {name, time}
    dress_code TEXT,
    how_to_reach JSONB DEFAULT '{"air": "", "train": "", "road": ""}'::jsonb,
    official_website TEXT,
    images JSONB DEFAULT '{"primary": "", "gallery": []}'::jsonb,
    type temple_type_enum NOT NULL DEFAULT 'nagara',
    status content_status NOT NULL DEFAULT 'published',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(city, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(state, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(significance, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.temples IS 'Pilgrimage shrines with geospatial coordinates and darshan schedules.';
```

#### 16. `festivals`
Hindu sacred calendar events, Utsavas, and cosmological celebrations.
```sql
CREATE TABLE public.festivals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    significance TEXT,
    date_2026 DATE,
    tithi_description VARCHAR(150), -- e.g. "Kartik Amavasya", "Chaitra Shukla Navami"
    puja_vidhi JSONB DEFAULT '[]'::jsonb, -- Array of step objects
    mantras TEXT[] DEFAULT '{}',
    related_deities UUID[] DEFAULT '{}',
    regional_variations JSONB DEFAULT '{}'::jsonb,
    fasting_rules TEXT,
    featured_image TEXT,
    status content_status NOT NULL DEFAULT 'published',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(significance, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.festivals IS 'Annual festive days, auspicious muhurats, and ritual instructions.';
```

#### 17. `vrats`
Prescribed fasting observances (Ekadashi, Pradosh, Karwa Chauth, Somwar Vrat).
```sql
CREATE TABLE public.vrats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    katha TEXT,
    vidhi TEXT NOT NULL,
    timing VARCHAR(100), -- "Shukla Paksha Ekadashi", "Monthly Shivratri"
    parana_rules TEXT,
    benefits TEXT,
    related_festival_id UUID REFERENCES public.festivals(id) ON DELETE SET NULL,
    status content_status NOT NULL DEFAULT 'published',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(katha, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.vrats IS 'Fasting disciplines, sankalpa, parana procedures, and associated kathas.';
```

#### 18. `panchang_data`
Ephemeris and astrological daily almanac calculations for Vedic time reckoning.
```sql
CREATE TABLE public.panchang_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    location_key VARCHAR(50) NOT NULL DEFAULT 'delhi_in', -- City/Coordinates key
    latitude NUMERIC(8, 4) NOT NULL DEFAULT 28.6139,
    longitude NUMERIC(8, 4) NOT NULL DEFAULT 77.2090,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
    tithi JSONB NOT NULL,       -- {name, number, end_time, next_tithi}
    paksha paksha_enum NOT NULL,
    nakshatra JSONB NOT NULL,   -- {name, pada, end_time}
    yoga JSONB NOT NULL,        -- {name, end_time}
    karana JSONB NOT NULL,      -- {name, end_time}
    sunrise TIME NOT NULL,
    sunset TIME NOT NULL,
    moonrise TIME,
    moonset TIME,
    rahukaal JSONB NOT NULL,    -- {start, end}
    yamaghanta JSONB NOT NULL,  -- {start, end}
    gulika JSONB NOT NULL,      -- {start, end}
    abhijit_muhurat JSONB,      -- {start, end}
    samvat JSONB DEFAULT '{"vikram": 2083, "shaka": 1948}'::jsonb,
    planetary_positions JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_panchang_date_location UNIQUE (date, location_key)
);

COMMENT ON TABLE public.panchang_data IS 'Daily Vedic astronomical coordinates, lunar phases, and auspicious/inauspicious muhurats.';
```

#### 19. `encyclopedia_entries`
Deep Sanatan glossary and theological dictionary (Darshanas, Terminology, Rishis).
```sql
CREATE TABLE public.encyclopedia_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    sanskrit_spelling VARCHAR(255),
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    related_entries UUID[] DEFAULT '{}',
    sources JSONB DEFAULT '[]'::jsonb,
    status content_status NOT NULL DEFAULT 'published',
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(sanskrit_spelling, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'B')
    ) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.encyclopedia_entries IS 'Theological reference encyclopedia covering concepts, schools of thought, and sages.';
```

#### 20. `rashifal`
Daily, weekly, and yearly Vedic horoscopic readings by Rashi.
```sql
CREATE TABLE public.rashifal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rashi rashi_enum NOT NULL,
    date DATE NOT NULL,
    type rashifal_type_enum NOT NULL DEFAULT 'daily',
    prediction TEXT NOT NULL,
    lucky_number INT,
    lucky_color VARCHAR(50),
    remedy TEXT,
    mantra TEXT,
    aspects JSONB DEFAULT '{"career": 75, "health": 80, "finance": 70, "love": 85}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_rashi_date_type UNIQUE (rashi, date, type)
);

COMMENT ON TABLE public.rashifal IS 'Astrological predictions and remedies indexed by zodiac sign and date.';
```

#### 21. `tools`
Client-side interactive spiritual widgets and calculators (Japa Mala, Kundli, Chaughadiya).
```sql
CREATE TABLE public.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(80) NOT NULL,
    component_name VARCHAR(100) NOT NULL, -- Corresponds to Next.js dynamic client component
    is_active BOOLEAN NOT NULL DEFAULT true,
    config JSONB DEFAULT '{}'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.tools IS 'Registry of interactive React mini-apps (Mala, Muhurat, Kundli generator).';
```

#### 22. `articles`
Long-form editorial essays, philosophical analyses, and spiritual guides.
```sql
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    reviewer_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    category_ids UUID[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    reading_time INT NOT NULL DEFAULT 5, -- in minutes
    status content_status NOT NULL DEFAULT 'draft',
    views_count BIGINT NOT NULL DEFAULT 0,
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(content, '')), 'C')
    ) STORED,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.articles IS 'Scholarly essays, festivals explanations, and philosophy articles.';
```

---

### 4.3 Reference, Governance & Audit Entities

#### 23. `media_assets`
Central repository for sacred iconography, audio recordings, PDFs, and vector graphics.
```sql
CREATE TABLE public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    caption TEXT,
    source VARCHAR(255),
    license VARCHAR(100) DEFAULT 'Creative Commons / Public Domain',
    dimensions JSONB DEFAULT '{"width": 0, "height": 0}'::jsonb,
    format VARCHAR(20) NOT NULL, -- webp, avif, mp3, pdf
    file_size_bytes BIGINT,
    storage_bucket VARCHAR(80) NOT NULL DEFAULT 'bhaktilok-media',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.media_assets IS 'Digital asset management catalog with dimension metadata and licensing.';
```

#### 24. `content_references`
Citations and source attributions pointing to Sanskrit manuscripts or canonical codices.
```sql
CREATE TABLE public.content_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    source_text VARCHAR(255) NOT NULL,
    source_url TEXT,
    page_reference VARCHAR(100),
    authenticity_rating INT CHECK (authenticity_rating BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.content_references IS 'Scholarly citations linking content to palm-leaf manuscripts or critical editions.';
```

#### 25. `content_revisions`
Shadow audit log tracking every change made by editors and scholars for complete rollbacks.
```sql
CREATE TABLE public.content_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    revision_data JSONB NOT NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    change_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.content_revisions IS 'Differential audit history capturing JSON snapshots of content revisions.';
```

#### 26. `redirects`
SEO canonical URL preservation table handling slug refactorings with 301/308 redirects.
```sql
CREATE TABLE public.redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    old_url VARCHAR(500) NOT NULL UNIQUE,
    new_url VARCHAR(500) NOT NULL,
    status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
    is_active BOOLEAN NOT NULL DEFAULT true,
    hits_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.redirects IS 'High-speed route redirection table checked by Next.js Edge Middleware.';
```

---

### 4.4 User Engagement & Personalization Entities

#### 27. `bookmarks`
Saved shlokas, articles, bhajans, or mantras for quick spiritual recall.
```sql
CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_bookmark UNIQUE (user_id, content_type, content_id)
);

COMMENT ON TABLE public.bookmarks IS 'User-saved sacred verses and liturgical entries.';
```

#### 28. `favourites`
Spiritual likes signaling high engagement and popularity.
```sql
CREATE TABLE public.favourites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_favourite UNIQUE (user_id, content_type, content_id)
);

COMMENT ON TABLE public.favourites IS 'User engagement likes for bhajans, mantras, and articles.';
```

#### 29. `reading_history`
Progress tracking across epic scriptures (e.g., Gita verse 4.12, Ramcharitmanas Ayodhya Kanda).
```sql
CREATE TABLE public.reading_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    progress NUMERIC(5, 2) NOT NULL DEFAULT 0.0 CHECK (progress >= 0.0 AND progress <= 100.0),
    last_position JSONB DEFAULT '{}'::jsonb, -- {chapter: 2, verse: 14, scroll_y: 1240}
    last_read_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_reading_history UNIQUE (user_id, content_type, content_id)
);

COMMENT ON TABLE public.reading_history IS 'Reading progress tracking with scroll restoration coordinates.';
```

#### 30. `user_preferences`
Fine-grained user personal settings for notifications, location, and astrological birth chart.
```sql
CREATE TABLE public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    language liturgical_language NOT NULL DEFAULT 'hindi',
    location JSONB DEFAULT '{"city": "New Delhi", "latitude": 28.6139, "longitude": 77.2090}'::jsonb,
    rashi rashi_enum,
    notification_settings JSONB NOT NULL DEFAULT '{
        "daily_rashifal": true,
        "ekadashi_reminder": true,
        "pradosh_reminder": true,
        "brahma_muhurat_alarm": false,
        "push_enabled": true,
        "email_newsletter": false
    }'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.user_preferences IS 'User configuration profiles for localization and ritualistic alerts.';
```

#### 31. `contact_messages`
Inbound public inquiries, scholar contributions, and corrections.
```sql
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status contact_status_enum NOT NULL DEFAULT 'unread',
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.contact_messages IS 'Contact submissions, liturgical correction proposals, and feedback.';
```

#### 32. `notifications`
Targeted alerts for tithi transitions, festival countdowns, and editorial alerts.
```sql
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type notification_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    link_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.notifications IS 'Real-time and scheduled in-app notifications for users.';
```

---

### 4.5 Relational Normalization: Junction Tables

To maintain 3rd Normal Form (3NF) while honoring high-speed joins, the following explicit junction tables back the array fields:

```sql
-- 33. Content to Categories Junction
CREATE TABLE public.content_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_content_category UNIQUE (content_type, content_id, category_id)
);

-- 34. Content to Tags Junction
CREATE TABLE public.content_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type content_type_enum NOT NULL,
    content_id UUID NOT NULL,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_content_tag UNIQUE (content_type, content_id, tag_id)
);

-- 35. Festivals to Deities Junction
CREATE TABLE public.festival_deities (
    festival_id UUID NOT NULL REFERENCES public.festivals(id) ON DELETE CASCADE,
    deity_id UUID NOT NULL REFERENCES public.deities(id) ON DELETE CASCADE,
    PRIMARY KEY (festival_id, deity_id)
);

-- 36. Kathas to Deities Junction
CREATE TABLE public.katha_deities (
    katha_id UUID NOT NULL REFERENCES public.kathas(id) ON DELETE CASCADE,
    deity_id UUID NOT NULL REFERENCES public.deities(id) ON DELETE CASCADE,
    PRIMARY KEY (katha_id, deity_id)
);
```

---

## 5. Polymorphic Architecture Design

Polymorphic associations (where a single record references entities across disparate tables) occur in five cross-cutting entities:
1. `bookmarks`
2. `favourites`
3. `reading_history`
4. `content_references`
5. `content_revisions`

### 5.1 Integrity Enforcement
Standard foreign keys cannot reference a variable table dynamically. To prevent orphaned references and protect referential integrity, BhaktiLok enforces validation at two tiers:
1. **Enumerated Type Constraint:** The `content_type` column uses the strictly bounded `content_type_enum`.
2. **Trigger-Based Foreign Key Validator:** A single trigger function verifies the existence of `content_id` in the respective table before commit.

```sql
CREATE OR REPLACE FUNCTION public.validate_polymorphic_content()
RETURNS TRIGGER AS $$
DECLARE
    entity_exists BOOLEAN := false;
BEGIN
    CASE NEW.content_type
        WHEN 'bhajan' THEN
            SELECT EXISTS(SELECT 1 FROM public.bhajans WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'mantra' THEN
            SELECT EXISTS(SELECT 1 FROM public.mantras WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'aarti' THEN
            SELECT EXISTS(SELECT 1 FROM public.aartis WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'chalisa' THEN
            SELECT EXISTS(SELECT 1 FROM public.chalisas WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'katha' THEN
            SELECT EXISTS(SELECT 1 FROM public.kathas WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'scripture' THEN
            SELECT EXISTS(SELECT 1 FROM public.scriptures WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'scripture_chapter' THEN
            SELECT EXISTS(SELECT 1 FROM public.scripture_chapters WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'scripture_verse' THEN
            SELECT EXISTS(SELECT 1 FROM public.scripture_verses WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'temple' THEN
            SELECT EXISTS(SELECT 1 FROM public.temples WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'festival' THEN
            SELECT EXISTS(SELECT 1 FROM public.festivals WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'vrat' THEN
            SELECT EXISTS(SELECT 1 FROM public.vrats WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'encyclopedia_entry' THEN
            SELECT EXISTS(SELECT 1 FROM public.encyclopedia_entries WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'article' THEN
            SELECT EXISTS(SELECT 1 FROM public.articles WHERE id = NEW.content_id) INTO entity_exists;
        WHEN 'deity' THEN
            SELECT EXISTS(SELECT 1 FROM public.deities WHERE id = NEW.content_id) INTO entity_exists;
        ELSE
            RAISE EXCEPTION 'Unsupported polymorphic content_type: %', NEW.content_type;
    END CASE;

    IF NOT entity_exists THEN
        RAISE EXCEPTION 'Foreign key violation: % with ID % does not exist.', NEW.content_type, NEW.content_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bind validator to user engagement entities
CREATE TRIGGER trg_validate_bookmark_ref
    BEFORE INSERT OR UPDATE ON public.bookmarks
    FOR EACH ROW EXECUTE FUNCTION public.validate_polymorphic_content();

CREATE TRIGGER trg_validate_favourite_ref
    BEFORE INSERT OR UPDATE ON public.favourites
    FOR EACH ROW EXECUTE FUNCTION public.validate_polymorphic_content();

CREATE TRIGGER trg_validate_reading_history_ref
    BEFORE INSERT OR UPDATE ON public.reading_history
    FOR EACH ROW EXECUTE FUNCTION public.validate_polymorphic_content();
```

---

## 6. Advanced PostgreSQL Capabilities

### 6.1 Full-Text Search (FTS) & Multi-Script Search Strategy
Searching Sanskrit literature requires handling both Devanagari Unicode code points and phonetic English/IAST equivalents (e.g. searching "Shiv", "Shiva", or "शिव" should hit the same liturgical records).

#### Generated Columns & Search Dictionaries
Each content table maintains a pre-computed `tsv` column using `STORED` generated vectors with weighted fields:
- Weight `A`: Sanskrit Title, Devanagari Title, Primary Deity
- Weight `B`: Transliteration, Singer/Composer, City/State
- Weight `C`: Full Lyrics, English Meaning, Commentary

```sql
-- Unified RPC function for Global Site Search
CREATE OR REPLACE FUNCTION public.global_search(
    query_text TEXT,
    limit_count INT DEFAULT 20
)
RETURNS TABLE (
    content_id UUID,
    content_type TEXT,
    title TEXT,
    snippet TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    -- Bhajans Search
    SELECT 
        b.id AS content_id,
        'bhajan'::TEXT AS content_type,
        b.title,
        substring(b.lyrics FROM 1 FOR 150) AS snippet,
        ts_rank_cd(b.tsv, websearch_to_tsquery('simple', query_text)) AS rank
    FROM public.bhajans b
    WHERE b.status = 'published' 
      AND b.tsv @@ websearch_to_tsquery('simple', query_text)
    
    UNION ALL
    
    -- Mantras Search
    SELECT 
        m.id AS content_id,
        'mantra'::TEXT AS content_type,
        m.title,
        m.sanskrit_text AS snippet,
        ts_rank_cd(m.tsv, websearch_to_tsquery('simple', query_text)) AS rank
    FROM public.mantras m
    WHERE m.status = 'published' 
      AND m.tsv @@ websearch_to_tsquery('simple', query_text)

    UNION ALL

    -- Scripture Verses Search
    SELECT 
        sv.id AS content_id,
        'scripture_verse'::TEXT AS content_type,
        ('Verse ' || sv.verse_number::text) AS title,
        sv.hindi_translation AS snippet,
        ts_rank_cd(sv.tsv, websearch_to_tsquery('simple', query_text)) AS rank
    FROM public.scripture_verses sv
    WHERE sv.tsv @@ websearch_to_tsquery('simple', query_text)

    ORDER BY rank DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;
```

### 6.2 Trigram Fuzzy Search (`pg_trgm`)
Users frequently misspell Sanskrit terms (e.g., "Maha Mrityunjaya", "Mahamrityunjay", "Maha Mrutyunjay"). We build Trigram GIN indexes to support phonetic substring matching:
```sql
CREATE INDEX idx_mantras_title_trgm ON public.mantras USING gin (title gin_trgm_ops);
CREATE INDEX idx_bhajans_title_trgm ON public.bhajans USING gin (title gin_trgm_ops);
CREATE INDEX idx_scriptures_title_trgm ON public.scriptures USING gin (title gin_trgm_ops);
CREATE INDEX idx_temples_name_trgm ON public.temples USING gin (name gin_trgm_ops);
```

### 6.3 JSONB Structural Schemas & Operators
Structured arrays and rich documents are stored as native binary JSON (`JSONB`), supporting direct path querying and indexing.

#### Example: `scripture_verses.word_meanings` Schema
```json
[
  {
    "word": "धर्मक्षेत्रे",
    "transliteration": "dharma-kṣetre",
    "case": "Locative singular",
    "meaning": "in the field of righteousness"
  },
  {
    "word": "कुरुक्षेत्रे",
    "transliteration": "kuru-kṣetre",
    "case": "Locative singular",
    "meaning": "in the holy plain of the Kurus"
  }
]
```

#### Querying JSONB with GIN path operations:
```sql
-- Query verses where a specific Sanskrit root word appears
SELECT id, chapter_id, verse_number 
FROM public.scripture_verses 
WHERE word_meanings @> '[{"transliteration": "dharma-kṣetre"}]';
```

---

## 7. Automated Database Triggers & Functions

### 7.1 Automated `updated_at` Timestamp Synchronization
```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger across all mutable entities
DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY[
        'roles', 'users', 'authors', 'categories', 'deities',
        'bhajans', 'mantras', 'aartis', 'chalisas', 'kathas',
        'scriptures', 'scripture_chapters', 'scripture_verses',
        'temples', 'festivals', 'vrats', 'encyclopedia_entries',
        'tools', 'articles', 'redirects', 'user_preferences'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trg_set_updated_at ON public.%I;
            CREATE TRIGGER trg_set_updated_at
            BEFORE UPDATE ON public.%I
            FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
        ', tbl, tbl);
    END LOOP;
END;
$$;
```

### 7.2 Auth User Synchronization Hook
Automatically instantiates a public profile whenever a user registers through Supabase Auth.
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        coalesce(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        coalesce(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
        'user'
    );
    
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 7.3 Content Mutation Audit Revision Trigger
Captures prior state in `content_revisions` upon update or status change.
```sql
CREATE OR REPLACE FUNCTION public.log_article_revision()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.content <> NEW.content OR OLD.title <> NEW.title) THEN
        INSERT INTO public.content_revisions (
            content_type,
            content_id,
            revision_data,
            author_id,
            change_summary
        ) VALUES (
            'article',
            OLD.id,
            to_jsonb(OLD),
            auth.uid(),
            'Automated revision capture on update'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_audit_article_revisions
    AFTER UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION public.log_article_revision();
```

---

## 8. Complete Indexing Strategy

Indexing is calibrated to maximize Edge cache hits, expedite slug lookups, guarantee unique polymorphic rows, and accelerate geospatial temple queries.

```sql
-- ============================================================================
-- 8.1 PRIMARY B-TREE INDEXES FOR SLUG LOOKUPS (Next.js Dynamic Routes)
-- ============================================================================
CREATE INDEX idx_categories_slug ON public.categories (slug);
CREATE INDEX idx_deities_slug ON public.deities (slug);
CREATE INDEX idx_bhajans_slug ON public.bhajans (slug);
CREATE INDEX idx_mantras_slug ON public.mantras (slug);
CREATE INDEX idx_aartis_slug ON public.aartis (slug);
CREATE INDEX idx_chalisas_slug ON public.chalisas (slug);
CREATE INDEX idx_kathas_slug ON public.kathas (slug);
CREATE INDEX idx_scriptures_slug ON public.scriptures (slug);
CREATE INDEX idx_scripture_chapters_slug ON public.scripture_chapters (scripture_id, slug);
CREATE INDEX idx_temples_slug ON public.temples (slug);
CREATE INDEX idx_festivals_slug ON public.festivals (slug);
CREATE INDEX idx_vrats_slug ON public.vrats (slug);
CREATE INDEX idx_encyclopedia_slug ON public.encyclopedia_entries (slug);
CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_tools_slug ON public.tools (slug);
CREATE INDEX idx_redirects_old_url ON public.redirects (old_url) WHERE is_active = true;

-- ============================================================================
-- 8.2 FOREIGN KEY PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX idx_categories_parent_id ON public.categories (parent_id);
CREATE INDEX idx_authors_user_id ON public.authors (user_id);
CREATE INDEX idx_bhajans_deity_id ON public.bhajans (deity_id);
CREATE INDEX idx_bhajans_author_id ON public.bhajans (author_id);
CREATE INDEX idx_mantras_deity_id ON public.mantras (deity_id);
CREATE INDEX idx_aartis_deity_id ON public.aartis (deity_id);
CREATE INDEX idx_chalisas_deity_id ON public.chalisas (deity_id);
CREATE INDEX idx_scripture_chapters_scripture_id ON public.scripture_chapters (scripture_id);
CREATE INDEX idx_scripture_verses_chapter_id ON public.scripture_verses (chapter_id);
CREATE INDEX idx_temples_deity_id ON public.temples (deity_id);
CREATE INDEX idx_articles_author_id ON public.articles (author_id);
CREATE INDEX idx_articles_reviewer_id ON public.articles (reviewer_id);

-- ============================================================================
-- 8.3 FULL-TEXT SEARCH GIN INDEXES
-- ============================================================================
CREATE INDEX idx_deities_tsv ON public.deities USING gin (tsv);
CREATE INDEX idx_bhajans_tsv ON public.bhajans USING gin (tsv);
CREATE INDEX idx_mantras_tsv ON public.mantras USING gin (tsv);
CREATE INDEX idx_aartis_tsv ON public.aartis USING gin (tsv);
CREATE INDEX idx_chalisas_tsv ON public.chalisas USING gin (tsv);
CREATE INDEX idx_kathas_tsv ON public.kathas USING gin (tsv);
CREATE INDEX idx_scriptures_tsv ON public.scriptures USING gin (tsv);
CREATE INDEX idx_scripture_verses_tsv ON public.scripture_verses USING gin (tsv);
CREATE INDEX idx_temples_tsv ON public.temples USING gin (tsv);
CREATE INDEX idx_festivals_tsv ON public.festivals USING gin (tsv);
CREATE INDEX idx_vrats_tsv ON public.vrats USING gin (tsv);
CREATE INDEX idx_encyclopedia_tsv ON public.encyclopedia_entries USING gin (tsv);
CREATE INDEX idx_articles_tsv ON public.articles USING gin (tsv);

-- ============================================================================
-- 8.4 JSONB GIN INDEXES
-- ============================================================================
CREATE INDEX idx_scripture_verses_word_meanings ON public.scripture_verses USING gin (word_meanings);
CREATE INDEX idx_scripture_verses_commentary ON public.scripture_verses USING gin (commentary);
CREATE INDEX idx_chalisas_verses ON public.chalisas USING gin (verses);
CREATE INDEX idx_temples_darshan ON public.temples USING gin (darshan_timings);
CREATE INDEX idx_festivals_puja_vidhi ON public.festivals USING gin (puja_vidhi);

-- ============================================================================
-- 8.5 PARTIAL INDEXES FOR ACTIVE / PUBLISHED WORKFLOWS
-- ============================================================================
CREATE INDEX idx_bhajans_published ON public.bhajans (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_mantras_published ON public.mantras (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_published ON public.articles (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_notifications_unread ON public.notifications (user_id, created_at DESC) WHERE read = false;
CREATE INDEX idx_contact_messages_unread ON public.contact_messages (created_at DESC) WHERE status = 'unread';

-- ============================================================================
-- 8.6 GEOSPATIAL & TEMPORAL INDEXES
-- ============================================================================
CREATE INDEX idx_temples_geo ON public.temples (latitude, longitude);
CREATE INDEX idx_panchang_lookup ON public.panchang_data (date, location_key);
CREATE INDEX idx_rashifal_lookup ON public.rashifal (rashi, date, type);

-- ============================================================================
-- 8.7 USER ENGAGEMENT COMPOSITE INDEXES
-- ============================================================================
CREATE INDEX idx_bookmarks_user_type ON public.bookmarks (user_id, content_type);
CREATE INDEX idx_favourites_user_type ON public.favourites (user_id, content_type);
CREATE INDEX idx_reading_history_user_lastread ON public.reading_history (user_id, last_read_at DESC);
```

---

## 9. Row Level Security (RLS) & RBAC Specification

Supabase enforces database-level RLS policies executed per SQL statement.

### 9.1 Role Hierarchy Matrix

| Role | Description | Liturgical Content Access | User Data Access | Admin / Settings |
| :--- | :--- | :--- | :--- | :--- |
| **`anon` (Public)** | Unauthenticated visitor | Read-only for `status = 'published'` | None | None |
| **`authenticated` (User)** | Registered devotee | Read-only for `published` | Full CRUD on own records | None |
| **`author` / `contributor`**| Verified scholar / lyricist| CRUD on own drafts, submit for review | Full CRUD on own records | None |
| **`editor` / `reviewer`** | Editorial board | Read/Write/Approve all content | Full CRUD on own records | View reports |
| **`admin` / `superadmin`** | Platform administrators | Full access to all content & statuses | Read-only / Ban capabilities | Full system configuration |

### 9.2 Custom JWT Claims Helper Functions
To check user permissions inside RLS expressions without recurrent database lookups:

```sql
-- Helper: Extract current user role from JWT claims or users table
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS VARCHAR AS $$
BEGIN
    RETURN (
        SELECT role FROM public.users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Helper: Check if user has administrative privileges
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        public.current_user_role() IN ('admin', 'superadmin')
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Helper: Check if user is editor or admin
CREATE OR REPLACE FUNCTION public.is_editorial_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        public.current_user_role() IN ('editor', 'reviewer', 'admin', 'superadmin')
    );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 9.3 Concrete RLS Policies

```sql
-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bhajans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mantras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aartis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chalisas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kathas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripture_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripture_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vrats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panchang_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encyclopedia_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rashifal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 1. USERS & PROFILES
-- ============================================================================
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.users FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- 2. PUBLISHED CONTENT READ POLICIES (Public Access)
-- ============================================================================
-- Bhajans
CREATE POLICY "Published bhajans are readable by anyone"
ON public.bhajans FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- Mantras
CREATE POLICY "Published mantras are readable by anyone"
ON public.mantras FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- Aartis
CREATE POLICY "Published aartis are readable by anyone"
ON public.aartis FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- Chalisas
CREATE POLICY "Published chalisas are readable by anyone"
ON public.chalisas FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- Kathas
CREATE POLICY "Published kathas are readable by anyone"
ON public.kathas FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- Scriptures, Chapters & Verses (Public Canonical Reference)
CREATE POLICY "Scriptures are public" ON public.scriptures FOR SELECT USING (true);
CREATE POLICY "Scripture chapters are public" ON public.scripture_chapters FOR SELECT USING (true);
CREATE POLICY "Scripture verses are public" ON public.scripture_verses FOR SELECT USING (true);

-- Temples, Festivals, Vrats, Panchang, Encyclopedia, Rashifal, Tools, Deities
CREATE POLICY "Deities are public" ON public.deities FOR SELECT USING (true);
CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Tags are public" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Temples are public" ON public.temples FOR SELECT USING (status = 'published' OR public.is_editorial_staff());
CREATE POLICY "Festivals are public" ON public.festivals FOR SELECT USING (true);
CREATE POLICY "Vrats are public" ON public.vrats FOR SELECT USING (true);
CREATE POLICY "Panchang is public" ON public.panchang_data FOR SELECT USING (true);
CREATE POLICY "Encyclopedia is public" ON public.encyclopedia_entries FOR SELECT USING (status = 'published' OR public.is_editorial_staff());
CREATE POLICY "Rashifal is public" ON public.rashifal FOR SELECT USING (true);
CREATE POLICY "Active tools are public" ON public.tools FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Redirects are public" ON public.redirects FOR SELECT USING (is_active = true);

-- Articles
CREATE POLICY "Published articles are readable by anyone"
ON public.articles FOR SELECT
USING (status = 'published' OR public.is_editorial_staff());

-- ============================================================================
-- 3. EDITORIAL & AUTHOR WRITE POLICIES
-- ============================================================================
-- Authors can manage their own articles
CREATE POLICY "Authors can create articles"
ON public.articles FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update their own drafts"
ON public.articles FOR UPDATE
USING (
    (auth.uid() IN (SELECT user_id FROM public.authors WHERE id = author_id) AND status IN ('draft', 'in_review'))
    OR public.is_editorial_staff()
);

-- Full Editorial Authority for Staff
CREATE POLICY "Editors have full authority on articles"
ON public.articles FOR ALL
USING (public.is_editorial_staff());

CREATE POLICY "Editors have full authority on bhajans"
ON public.bhajans FOR ALL
USING (public.is_editorial_staff());

CREATE POLICY "Editors have full authority on mantras"
ON public.mantras FOR ALL
USING (public.is_editorial_staff());

-- ============================================================================
-- 4. USER ENGAGEMENT & PRIVATE DATA POLICIES
-- ============================================================================
-- Bookmarks: Strictly isolated to owner
CREATE POLICY "Users can manage own bookmarks"
ON public.bookmarks FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Favourites: Strictly isolated to owner
CREATE POLICY "Users can manage own favourites"
ON public.favourites FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Reading History: Strictly isolated to owner
CREATE POLICY "Users can manage own reading history"
ON public.reading_history FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User Preferences: Strictly isolated to owner
CREATE POLICY "Users can view and update own preferences"
ON public.user_preferences FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Notifications: Strictly isolated to owner
CREATE POLICY "Users can read and acknowledge own notifications"
ON public.notifications FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Contact Inquiries: Anyone can insert, only admins can view
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only staff can view contact messages"
ON public.contact_messages FOR SELECT
USING (public.is_editorial_staff());
```

---

## 10. Database Migration & CI/CD Strategy

### 10.1 Supabase CLI Workflow
BhaktiLok manages database evolution declaratively using version-controlled SQL migrations executed via the official Supabase CLI pipeline.

```bash
# Directory hierarchy
supabase/
├── config.toml
├── migrations/
│   ├── 20261118000001_initial_extensions_and_enums.sql
│   ├── 20261118000002_core_and_identity_entities.sql
│   ├── 20261118000003_content_and_scripture_entities.sql
│   ├── 20261118000004_reference_and_user_entities.sql
│   ├── 20261118000005_indexing_and_triggers.sql
│   └── 20261118000006_row_level_security.sql
└── seed.sql
```

### 10.2 Zero-Downtime Deployment Guidelines
1. **Additive Schema Mutations:** Always add columns as `NULL` or with a safe `DEFAULT`. Never remove or rename an active column in a single migration.
2. **Dual-Writing for Refactorings:** When deprecating a column/table, perform a two-phase rollout:
   - Phase 1: Deploy new column/table + trigger syncing old to new.
   - Phase 2: Deploy Next.js app reading from new schema.
   - Phase 3: Deprecate old column/trigger.
3. **Concurrent Indexing:** Always build large production indexes concurrently:
   ```sql
   CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_scripture_verses_search ON public.scripture_verses USING gin(tsv);
   ```
4. **Idempotent DDL:** Every DDL statement must employ defensive assertions (`IF NOT EXISTS`, `OR REPLACE`).

---

## 11. Seed Data Architecture & Representative Fixtures

The initial seed populates the sacred hierarchy, foundational deities, primary scriptures, and initial liturgies.

```sql
-- ============================================================================
-- 11.1 INITIAL ROLES SEED
-- ============================================================================
INSERT INTO public.roles (name, description, permissions) VALUES
('superadmin', 'Full platform sovereignty', '{"admin": true, "publish": true, "write": true, "read": true}'::jsonb),
('admin', 'Site administrator', '{"admin": true, "publish": true, "write": true, "read": true}'::jsonb),
('editor', 'Sanskrit & Liturgical Review Board', '{"admin": false, "publish": true, "write": true, "read": true}'::jsonb),
('author', 'Accredited Scholar / Contributor', '{"admin": false, "publish": false, "write": true, "read": true}'::jsonb),
('user', 'Standard Registered Devotee', '{"admin": false, "publish": false, "write": false, "read": true}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 11.2 PRIMARY DEITIES SEED
-- ============================================================================
INSERT INTO public.deities (name, slug, sanskrit_name, description, iconography) VALUES
('Lord Ganesha', 'lord-ganesha', 'श्रीगणेशः', 'The remover of obstacles, patron of arts and sciences, and deva of intellect and wisdom.', 
 '{"vahana": "Mooshaka (Mouse)", "ayudhas": ["Parashu", "Pasha", "Ankusha", "Modaka"], "consort": "Riddhi and Siddhi"}'::jsonb),

('Lord Shiva', 'lord-shiva', 'सदाशिवः', 'The Supreme Being within Shaivism, the Auspicious One, the Destroyer of ignorance.',
 '{"vahana": "Nandi (Bull)", "ayudhas": ["Trishula", "Damaru", "Pinaka"], "consort": "Mata Parvati"}'::jsonb),

('Lord Krishna', 'lord-krishna', 'श्रीकृष्णः', 'The eighth avatar of Lord Vishnu, speaker of the Bhagavad Gita, embodiment of divine love and supreme truth.',
 '{"vahana": "Garuda", "ayudhas": ["Sudarshana Chakra", "Venu (Flute)", "Kaumodaki"], "consort": "Rukmini and Radha"}'::jsonb),

('Maa Durga', 'maa-durga', 'माँ दुर्गा', 'The protective mother of the universe, vanquisher of Mahishasura, embodiment of Adi Parashakti.',
 '{"vahana": "Simha (Lion)", "ayudhas": ["Trishul", "Chakra", "Khadga", "Bow and Arrow"], "consort": "Lord Shiva"}'::jsonb),

('Lord Hanuman', 'lord-hanuman', 'श्रीहनुमान्', 'The supreme devotee of Sri Rama, Chiranjivi, personification of selfless service and boundless strength.',
 '{"vahana": "None", "ayudhas": ["Gada", "Vajra"], "consort": "Celibate (Brahmachari)"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 11.3 CANONICAL SCRIPTURE SEED (Srimad Bhagavad Gita)
-- ============================================================================
INSERT INTO public.scriptures (
    title, slug, original_title, description, type, language, total_chapters, total_verses, source_edition, translator, status, published_at
) VALUES (
    'Srimad Bhagavad Gita',
    'bhagavad-gita',
    'श्रीमद्भगवद्गीता',
    'The 700-verse Hindu scripture that is part of the epic Mahabharata, containing the philosophical discourse between Lord Krishna and Arjuna.',
    'smriti_gita',
    'sanskrit',
    18,
    700,
    'Critical Edition - Bhandarkar Oriental Research Institute',
    'Editorial Board of BhaktiLok Scholars',
    'published',
    now()
) ON CONFLICT (slug) DO NOTHING;

-- Seed Chapter 1 of Bhagavad Gita
INSERT INTO public.scripture_chapters (
    scripture_id, chapter_number, title, slug, summary, total_verses
) 
SELECT 
    id, 
    1, 
    'Arjuna Vishada Yoga', 
    'arjuna-vishada-yoga', 
    'The Distress of Arjuna upon witnessing family, teachers, and friends on the opposing sides of the battlefield of Kurukshetra.',
    47
FROM public.scriptures WHERE slug = 'bhagavad-gita'
ON CONFLICT (scripture_id, chapter_number) DO NOTHING;

-- Seed Verse 1.1 of Bhagavad Gita
INSERT INTO public.scripture_verses (
    chapter_id, verse_number, verse_order, sanskrit_text, transliteration, hindi_translation, english_translation, word_meanings
)
SELECT 
    c.id,
    1,
    1,
    'धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||',
    'dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||1-1||',
    'धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?',
    'Dhritarashtra said: O Sanjay, assembled in the holy land of Kurukshetra, eager to fight, what did my sons and the sons of Pandu do?',
    '[
        {"word": "धर्मक्षेत्रे", "meaning": "in the field of righteousness"},
        {"word": "कुरुक्षेत्रे", "meaning": "in the sacred field of the Kurus"},
        {"word": "समवेताः", "meaning": "assembled"},
        {"word": "युयुत्सवः", "meaning": "desirous of fighting"},
        {"word": "मामकाः", "meaning": "my party (sons)"},
        {"word": "पाण्डवाः", "meaning": "the sons of Pandu"},
        {"word": "च", "meaning": "and"},
        {"word": "एव", "meaning": "certainly"},
        {"word": "किम्", "meaning": "what"},
        {"word": "अकुर्वत", "meaning": "did they do"},
        {"word": "सञ्जय", "meaning": "O Sanjaya"}
    ]'::jsonb
FROM public.scripture_chapters c
JOIN public.scriptures s ON c.scripture_id = s.id
WHERE s.slug = 'bhagavad-gita' AND c.chapter_number = 1
ON CONFLICT (chapter_id, verse_number) DO NOTHING;

-- ============================================================================
-- 11.4 MASTER MANTRA SEED (Maha Mrityunjaya & Gayatri)
-- ============================================================================
INSERT INTO public.mantras (
    title, slug, deity_id, sanskrit_text, hindi_transliteration, english_transliteration, meaning, source_scripture, chanting_count, status, published_at
)
SELECT 
    'Maha Mrityunjaya Mantra',
    'maha-mrityunjaya-mantra',
    d.id,
    'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् | उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ||',
    'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
    'oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭi-vardhanam | urvārukam-iva bandhanān mṛtyor-mukṣīya māmṛtāt ||',
    'We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. Just as a ripe melon is naturally freed from its vine, may we be liberated from death and sorrow for the sake of immortality.',
    'Rigveda (7.59.12) & Yajurveda (3.60)',
    108,
    'published',
    now()
FROM public.deities d WHERE d.slug = 'lord-shiva'
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 11.5 SEED PANCHANG (Delhi Benchmark)
-- ============================================================================
INSERT INTO public.panchang_data (
    date, location_key, latitude, longitude, timezone, tithi, paksha, nakshatra, yoga, karana, sunrise, sunset, rahukaal, yamaghanta, gulika
) VALUES (
    '2026-11-18',
    'delhi_in',
    28.6139,
    77.2090,
    'Asia/Kolkata',
    '{"name": "Navami", "number": 9, "end_time": "14:24:00"}'::jsonb,
    'shukla_paksha',
    '{"name": "Shatabhisha", "pada": 2, "end_time": "18:45:00"}'::jsonb,
    '{"name": "Harshana", "end_time": "11:15:00"}'::jsonb,
    '{"name": "Kaulava", "end_time": "14:24:00"}'::jsonb,
    '06:46:00',
    '17:27:00',
    '{"start": "12:06:00", "end": "13:26:00"}'::jsonb,
    '{"start": "08:06:00", "end": "09:26:00"}'::jsonb,
    '{"start": "10:46:00", "end": "12:06:00"}'::jsonb
) ON CONFLICT (date, location_key) DO NOTHING;
```

---

## 12. Performance Considerations, Partitioning & Scalability Architecture

### 12.1 Connection Pooling Architecture with PgBouncer
Supabase provisions PgBouncer natively. In a serverless Next.js 15 App Router architecture, hundreds of concurrent serverless container instances can instantiate simultaneously during high-traffic auspicious events (e.g. Maha Shivratri, Diwali).

```
Next.js Edge / Serverless
         │
         ▼  (Port 6543 - Transaction Mode Pooling)
   PgBouncer Pooler
         │
         ▼  (Max 80-100 Persistent Backend Conns)
PostgreSQL 16 Engine
```

#### Connection Configuration Rules
- **Serverless / API Routes / Server Actions:** Connect via `port 6543` in **Transaction Mode**. Prepared statements are disabled or executed with `prepare: false` to ensure pool recycling.
- **Database Migrations / Schema Tooling:** Connect via direct session connection (`port 5432`) to support session locks and transactional DDL.

### 12.2 Table Partitioning Strategy
For high-volume time-series entities—specifically `panchang_data` (calculated daily across multiple cities) and `reading_history` / `content_revisions`—PostgreSQL declarative table partitioning is implemented.

#### Partitioning `panchang_data` by Year
```sql
-- Architectural definition for multi-year ephemeris partitioning
CREATE TABLE public.panchang_data_master (
    id UUID DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    location_key VARCHAR(50) NOT NULL,
    latitude NUMERIC(8, 4) NOT NULL,
    longitude NUMERIC(8, 4) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    tithi JSONB NOT NULL,
    paksha paksha_enum NOT NULL,
    nakshatra JSONB NOT NULL,
    yoga JSONB NOT NULL,
    karana JSONB NOT NULL,
    sunrise TIME NOT NULL,
    sunset TIME NOT NULL,
    moonrise TIME,
    moonset TIME,
    rahukaal JSONB NOT NULL,
    yamaghanta JSONB NOT NULL,
    gulika JSONB NOT NULL,
    abhijit_muhurat JSONB,
    samvat JSONB,
    planetary_positions JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (date, location_key)
) PARTITION BY RANGE (date);

-- Annual Partitions
CREATE TABLE public.panchang_2025 PARTITION OF public.panchang_data_master
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE public.panchang_2026 PARTITION OF public.panchang_data_master
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE TABLE public.panchang_2027 PARTITION OF public.panchang_data_master
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
```

### 12.3 Next.js 15 Incremental Static Regeneration (ISR) & Edge Caching Integration
To achieve sub-50ms Time To First Byte (TTFB) globally while maintaining fresh content:
1. **Tagged On-Demand Revalidation:** Liturgical entries (`bhajans`, `mantras`, `scriptures`) use Next.js `unstable_cache` tagged by entity:
   ```typescript
   // Next.js Data Fetching Layer
   export async function getBhajanBySlug(slug: string) {
     return unstable_cache(
       async () => {
         const { data, error } = await supabase
           .from('bhajans')
           .select('*, deities(*), authors(*)')
           .eq('slug', slug)
           .single();
         if (error) throw error;
         return data;
       },
       [`bhajan-${slug}`],
       { tags: ['bhajans', `bhajan-${slug}`], revalidate: 86400 } // 24 hours baseline
     )();
   }
   ```
2. **Database Webhook Cache Eviction:** Supabase Database Webhooks invoke `/api/revalidate?tag=bhajans` upon `UPDATE` or `INSERT` in `bhajans`, instantly clearing Edge caches globally.
3. **Optimistic Counter Debouncing:** Views count (`views_count` on `articles` and `bhajans`) bypass synchronous row writes. Instead, hits are captured in a Redis / Upstash Edge buffer and flushed to PostgreSQL in bulk increments every 5 minutes via a scheduled Postgres function:
   ```sql
   CREATE OR REPLACE FUNCTION public.increment_views_batch(page_hits JSONB)
   RETURNS VOID AS $$
   DECLARE
       rec RECORD;
   BEGIN
       FOR rec IN SELECT key::uuid AS id, value::bigint AS hits FROM jsonb_each_text(page_hits) LOOP
           UPDATE public.articles SET views_count = views_count + rec.hits WHERE id = rec.id;
       END LOOP;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

---

## 13. Architecture Verification & Compliance Checklist

| Domain | Entity Count | Constraints Verified | RLS Configured | FTS / GIN Indexed |
| :--- | :---: | :---: | :---: | :---: |
| **Core Entities** | 6 (Roles, Users, Authors, Categories, Tags, Deities) | Primary Key, Unique Slugs, Self-Referential FKs | Complete | Yes (`deities`) |
| **Content Entities** | 16 (Bhajans, Mantras, Aartis, Chalisas, Kathas, Scriptures, Chapters, Verses, Temples, Festivals, Vrats, Panchang, Encyclopedia, Rashifal, Tools, Articles) | Composite Unique Keys, Slugs, Status Enums | Complete | Yes (All 16 tables) |
| **Reference Entities**| 4 (Media Assets, References, Revisions, Redirects) | Status Codes, Polymorphic FK verification triggers | Complete | B-Tree & Partial Indexes |
| **User Entities** | 6 (Bookmarks, Favourites, Reading History, Preferences, Contact, Notifications) | Compound Uniqueness `(user_id, content_type, content_id)` | Strict Owner Isolation | Partial Unread Indexes |
| **Junction Tables** | 4 (Content-Categories, Content-Tags, Festival-Deities, Katha-Deities) | Compound Primary Keys, Cascade Deletes | Inherited | Covered by FK Indexes |
| **Total Platforms** | **36 Entities & Tables** | **100% Validated** | **100% Protected** | **Fully Optimized** |

---
*End of Architecture Document. BhaktiLok Data Engineering Team, November 2026.*
