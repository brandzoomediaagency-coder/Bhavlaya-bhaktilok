# 05 — PROPOSED INFORMATION ARCHITECTURE & KNOWLEDGE TAXONOMY

**Product:** Bhavlaya (भावलय) — *Where Devotion Meets Knowledge*  
**Auditor:** Code Crew Labs Senior Product & Technical Architecture Team  
**Date:** November 2026

---

## 1. Unified Information Hierarchy

```
BHAVLAYA DIGITAL ECOSYSTEM
│
├── 1. DEVOTIONAL CONTENT
│   ├── Bhajan (/bhajan) ────────── Krishna, Shiv, Ram, Hanuman, Mata, Shyam
│   ├── Mantra (/mantra) ────────── Vedic, Beej, Gayatri, Mahamrityunjaya, Navagraha
│   ├── Aarti (/aarti) ──────────── Daily Mandir Aartis, Deity Collections
│   ├── Chalisa (/chalisa) ──────── Hanuman, Shiv, Durga, Ganesh, Shani
│   ├── Stotra (/stotra) ────────── Shiva Tandava, Vishnu Sahasranama, Mahalakshmi
│   └── Katha (/katha) ──────────── Shiv Vivah, Samudra Manthan, Vrat Kathas
│
├── 2. SANATAN KNOWLEDGE & ENCYCLOPEDIA
│   ├── Encyclopedia (/encyclopedia) ── A-Z Knowledge Base (20 Categories)
│   │   ├── Deities, Avatars, Rishis, Saints, Philosophies, Yugas
│   │   └── Dedicated Lists: 12 Jyotirlingas, 51 Shakti Peethas, 4 Vedas, 18 Puranas
│   └── Granth (/granth) ────────── Gita, Ramcharitmanas, Vedas, Upanishads
│
├── 3. ASTRONOMY & SACRED TIME
│   ├── Panchang (/panchang) ────── Drik-Ganita 12-City Astronomical Engine
│   ├── Muhurat (/muhurat) ──────── Brahma, Abhijit, Amrit Kaal, Rahukaal
│   ├── Choghadiya (/choghadiya) ── 8 Daytime & Nighttime Divisions
│   └── Festivals (/festivals) ──── 2026 Hindu Calendar & Vrat Tithis
│
├── 4. PILGRIMAGE & SACRED GEOGRAPHY
│   ├── Mandir (/mandir) ────────── National Temple Directory
│   ├── Jyotirlinga (/jyotirlinga) ── 12 Holy Shiva Jyotirlingas
│   ├── Shakti Peeth (/shaktipeeth) ── 51 Sacred Devi Peethas
│   └── Pilgrimage Guides ───────── Char Dham, Sapta Puri, River Tirthas
│
├── 5. INTERACTIVE SPIRITUAL TOOLS (/tools)
│   ├── Category A: Panchang & Muhurat (Rahukaal, Choghadiya, Tithi Finder)
│   ├── Category B: Puja & Ritual (Daily Checklist, Puja Samagri, Sankalp Generator)
│   ├── Category C: Mantra & Meditation (108 Jap Mala, Temple Bell, Shankh, Timer)
│   ├── Category D: Sanatan Knowledge (Baby Name Finder, Sanskrit Glossary, Gita Verse)
│   └── Category E: Daily Lifestyle (Daily Sankalp & Punya Ledger, Morning/Evening Routine)
│
├── 6. FLAGSHIP BHAKTI STATUS STUDIO (/status-maker)
│   ├── WhatsApp Story (9:16), Square (1:1), Feed (4:5), Landscape (16:9)
│   ├── Quote Presets: Gita Shlokas, Shiva, Krishna, Ram, Hanuman, Blessings
│   ├── Visual Controls: Themes, Devanagari typography, Alignment, Custom Signature
│   └── HD Export: Instant PNG/JPG Download & Direct WhatsApp Share
│
├── 7. DAILY DEVOTIONAL LIVING & MEDITATION
│   ├── Daily Darshan (/daily-darshan) ── Temple Photography, Today's Aarti, Inspiration
│   ├── Daily Shloka (/daily-shloka) ── Sanskrit Verse, Padachhed, Word Meanings
│   └── Meditation Room (/meditation) ── 136.1Hz Om, Tanpura Drone, Guided Timer
│
├── 8. EDITORIAL & MEDIA (/articles)
│   ├── Articles & Blog ─────────── Sanatan History, Philosophy, Sacred Traditions
│   └── Authors & Reviewers (/authors) ── Editorial Board Profiles
│
└── 9. MOBILE & INTEGRATION APIS (/api/v1/*)
    ├── /api/v1/panchang, /api/v1/bhajans, /api/v1/mantras, /api/v1/temples, /api/v1/search
```

---

## 2. Multi-Entity Knowledge Graph Relationships

Every content piece on Bhavlaya links to related entities to build a rich semantic graph for users, search engines (SEO), direct answers (AEO), and generative AI systems (GEO):

```
       [ DEITY: Bhagwan Shiva ]
         │         │         │
 ┌───────┴───┐ ┌───┴─────┐ ┌─┴─────────┐
 ▼           ▼ ▼         ▼ ▼           ▼
Mantra     Aarti       Chalisa       Temple
(Maha-    (Om Jai      (Shiv       (Kashi
mrityun-   Shiv        Chalisa)    Vishwanath,
jaya)      Omkara)                 Somnath)
 │           │           │             │
 └───────────┼───────────┼─────────────┘
             ▼           ▼
        Festival       Scripture
        (Maha          (Shiv
        Shivratri)     Purana)
```
