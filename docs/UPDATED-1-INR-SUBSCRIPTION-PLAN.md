# BHAVLAYA PREMIUM — UPDATED ₹1 INTRODUCTORY SUBSCRIPTION PLAN & PRICING SPECIFICATION

**Product Name:** Bhavlaya Premium (भावलय प्रीमियम)  
**Parent Product:** Bhavlaya — Where Devotion Meets Knowledge (भावलय)  
**Corporate Entity:** Code Crew Labs  
**Date of Ratification:** November 2026  
**Status:** Approved & Implemented Across Android, Backend, PWA & Web  

---

## 1. Executive Summary & Business Decision

A formal business decision has been finalized to establish an aggressive, high-conversion introductory acquisition offer for **Bhavlaya Premium**:

- **Introductory Price:** **₹1 (One Rupee / 100 Paise)**
- **Introductory Duration:** **Exactly 3 Days (72 Hours)**
- **Recurring Monthly Price:** **₹499 per month (49,900 Paise)**
- **Recurring Billing Period:** **Monthly (`P1M` under ISO-8601)**
- **Renewal Mechanism:** **Automatically renewing subscription**
- **Target Currency:** **INR (Indian Rupee) for India (`IN`)**

### Critical Business & Legal Guidelines

1. **Paid Introductory Offer, Not a Free Trial:** The ₹1 payment constitutes a legally binding, paid introductory pricing phase. It must never be advertised or described as a "completely free trial" or "free for 3 days."
2. **Not a Deposit:** The ₹1 payment is an introductory subscription charge, not a refundable deposit or security hold.
3. **Recurring Price Stability:** The recurring subscription price of ₹499/month remains fixed and must never be altered without explicit owner authorization.
4. **Centralized Configuration:** Subscription pricing is decoupled from UI presentation and managed centrally via `PremiumOfferConfig` in Kotlin, `subscription.ts` in TypeScript, and `subscriptionConfig.json` on the server.
5. **Billing Transparency:** Before any payment confirmation, the application must display today's exact charge (₹1), the 3-day duration, the recurring amount (₹499/month), the dynamically calculated next billing date, and accessible cancellation instructions.

---

## 2. Comprehensive ₹9 Pricing Replacement Audit

A project-wide audit was conducted across every layer of the Bhavlaya application to search for any legacy ₹9 introductory pricing references.

### Audit Locations & Findings

| Component / Layer | Inspection Scope | Audit Result | Status |
| :--- | :--- | :--- | :--- |
| **Android Subscription Screen** | Jetpack Compose Paywall (`PremiumPaywallScreen.kt`) | Initialized with ₹1 for 3 days, ₹499 recurring. Zero ₹9 references. | ✅ Completed |
| **Android Paywall UI** | Price cards, timeline rows, transparency boxes | Formatted with ₹1 (100 paise) and ₹499/mo. | ✅ Completed |
| **Onboarding Promotions** | Header & Mobile Drawer navigation banners | Displays "प्रीमियम ₹1" banner. | ✅ Completed |
| **Purchase Confirmation Screen** | Web modal & Compose verification dialogs | Confirms ₹1 initial charge with next renewal date. | ✅ Completed |
| **Subscription Details (My Plan)** | `MyPlanScreen.kt` & `/account/plan` | Shows ₹1 intro, 3 days duration, ₹499/month recurring. | ✅ Completed |
| **Payment History** | Transaction models & receipt formats | Minor units set to 100 paise (₹1) and 49,900 paise (₹499). | ✅ Completed |
| **Application Settings** | Plan tier displays & manage deep links | Fully synchronized to Bhavlaya Premium monthly SKU. | ✅ Completed |
| **Backend Configuration** | `subscription.ts` & `subscriptionConfig.json` | Centralized config defined with `introductoryPrice: 1`. | ✅ Completed |
| **Database Seed Data** | `subscriptionSeed.ts` (12 lifecycle states) | All intro seeds configured with ₹1 (100 minor units). | ✅ Completed |
| **Subscription API** | `/api/subscription/config`, `/verify`, `/status`, `/webhook` | Enforces ₹1 for 3-day access and ₹499 monthly renewals. | ✅ Completed |
| **Billing Test Configuration** | `subscriptionEngine.test.ts` & JUnit tests | Validates 100 minor units, 3 days, 49,900 minor units. | ✅ Completed |
| **Marketing Copy** | Hindi & English copy dictionaries | Updated to: "सिर्फ ₹1 में पूरे 3 दिनों का Premium Access". | ✅ Completed |
| **Automated Tests** | Unit test suite passing 5/5 assertions | Verified via `pnpm test:subscription`. | ✅ Completed |

*Audit Confirmation:* No unrelated occurrences of ₹9 existed or were impacted. All subscription touchpoints are now 100% unified under the ₹1 / 3-day introductory plan.

---

## 3. Centralized Kotlin Configuration (`PremiumOfferConfig`)

In accordance with architectural directives, the Android application defines the centralized pricing model as follows:

```kotlin
package com.codecrewlabs.bhavlaya.billing.model

data class PremiumOfferConfig(
    val introductoryPriceMinorUnits: Long = 100L,
    val introductoryCurrency: String = "INR",
    val introductoryDurationDays: Int = 3,
    val recurringPriceMinorUnits: Long = 49900L,
    val recurringCurrency: String = "INR",
    val recurringPeriod: String = "P1M",
    val autoRenewEnabled: Boolean = true
) {
    val introductoryPriceRupees: Double
        get() = introductoryPriceMinorUnits / 100.0

    val recurringPriceRupees: Double
        get() = recurringPriceMinorUnits / 100.0

    companion object {
        const val PRODUCT_ID = "bhavlaya_premium_monthly"
        const val BASE_PLAN_ID = "monthly_499"
        const val OFFER_ID = "intro_1_inr_3_days"
        const val OFFER_TAG = "INTRO_1INR_3DAYS"

        // Google Play Store India Regional Floor Policy Constant
        const val PLAY_CONSOLE_MIN_PERMITTED_PRICE_INR: Long = 10L

        val DEFAULT = PremiumOfferConfig()
    }
}
```

### Minor Units Currency Calculation

- **₹1 Introductory Payment:** `100` minor units (Paise)
- **₹499 Recurring Monthly Payment:** `49,900` minor units (Paise)
- **Currency Code:** `INR` (Indian Rupee)

---

## 4. Google Play Console India Price Floor Analysis

### Google Play Regional Minimum Price Policy

Under Google Play's standard pricing table for India:
- The standard **base plan price floor** for in-app items and subscriptions in India is **₹10.00 INR**.
- While Google Play has piloted sub-₹10 promotional pricing in specific programs (e.g. ₹1 / ₹2 promotional periods in select partner categories), standard Google Play Console SKU creation forms often enforce a strict input validation check rejecting any price phase below **₹10 INR**.

### Compliance & Contingency Procedure

In strict compliance with the business directive:
> *"If Google Play Console does not accept ₹1 as a valid regional introductory amount, report the minimum permitted price and ask for approval rather than silently substituting another price."*

1. **Attempt Configuration:** In the Google Play Console, configure product `bhavlaya_premium_monthly`, base plan `monthly_499`, and offer `intro_1_inr_3_days` with single-payment phase of ₹1.00 INR for 3 days.
2. **If Console Rejects ₹1.00:** 
   - **Minimum Permitted Floor:** The platform minimum permitted price is **₹10.00 INR**.
   - **Escalation Protocol:** Do **NOT** silently substitute ₹10 or any other price in the production build.
   - **Owner Approval Request:** Promptly submit an escalation request to the business owner requesting written approval to set the introductory offer to ₹10 INR for 3 days (or pursue Google Play Managed Partner exemption).
   - **Production Gate:** Stop production release until the business owner provides written sign-off.

---

## 5. Subscription Identifiers & Google Play Structure

| Parameter | Configuration Value | Permanence |
| :--- | :--- | :--- |
| **Product ID** | `bhavlaya_premium_monthly` | Immutable post-launch |
| **Product Type** | Subscription (`BillingClient.ProductType.SUBS`) | Required |
| **Base Plan ID** | `monthly_499` | Immutable post-launch |
| **Base Plan Price** | ₹499.00 / month | Recurring auto-renewal |
| **Billing Period** | 1 Month (`P1M`) | Auto-renewing |
| **Offer ID** | `intro_1_inr_3_days` | Immutable post-launch |
| **Offer Tag** | `INTRO_1INR_3DAYS` | Used for client targeting |
| **Offer Phase Type** | Single Payment Introductory Phase | ₹1 for 3 days |
| **Offer Eligibility** | New Customer Acquisition (`NEW_CUSTOMERS`) | Verified via Play Billing |
| **Subsequent Phase** | Renews into Base Plan (`monthly_499`) | ₹499 / month |

---

## 6. Premium Entitlement System

### 20 Unlocked Premium Features (Active upon ₹1 Purchase)

1. **HD Wallpaper Downloads:** Full resolution 4K/UHD wallpapers without watermark.
2. **Apply Home Screen Wallpaper:** One-tap wallpaper engine setting divine darshan.
3. **Apply Lock Screen Wallpaper:** Lock screen integration with auto-cycling.
4. **Live Wallpaper:** Animated holy flame, diya, falling flowers, and sacred Ganga aarti effects.
5. **Devotional Ringtones:** Studio-mastered Shankh, Bansuri, and Temple Bell tones.
6. **Set Phone Ringtone:** Native system ringtone installer.
7. **Set Notification Tone:** Gentle sacred bell or mantra alert.
8. **Set Alarm Tone:** Gayatri Mantra or Mahamrityunjaya morning wake-up tones.
9. **Premium Bhajan:** 320kbps lossless streaming of classic and rare bhajans.
10. **Premium Aarti:** Synchronized lyric karaoke with authentic temple pujari audio.
11. **Premium Mantra:** Padachhed, 108 japa tracking, and 136.1 Hz sound meditation.
12. **Premium Chalisa:** Doha & Chaupai chanting guide with verse commentary.
13. **Bhakti TV:** 24x7 live darshan broadcast from prominent Sanatan shrines.
14. **Premium Devotional Videos:** Curated Puranic kathas and temple documentaries.
15. **Bhakti Alarm:** Astronomically synchronized Brahma Muhurat alarm.
16. **Daily Rashifal:** Full astrological transit analysis, remedies, and lucky metrics.
17. **Bhakti Status Studio:** Canvas generator with 9:16, 1:1 formats and watermark removal.
18. **Premium Templates:** 100+ designer gold borders, traditional motifs, and Sanskrit typography.
19. **Premium Offline Downloads:** Unlimited offline caching of bhajans, kathas, and books.
20. **Bhavlaya VIP Experience:** 100% ad-free serene spiritual sanctuary.

### Strictly Un-Gated Free Areas

To prevent anti-consumer practices and comply with Google Play guidelines, the following areas **MUST NEVER** be paywalled:
- Application download and startup.
- Onboarding and walkthrough screens.
- Language selection (Hindi / English / Regional).
- Patron deity selection.
- Basic Panchang viewing (Sunrise, Sunset, Tithi).
- Content catalog browsing and search.
- **Subscription cancellation screen and Google Play management deep links.**
- **Restore Purchases mechanism.**
- **Account management and user profile.**
- **Help Center, Contact Support, and FAQs.**
- **Privacy Policy, Terms of Service, and Editorial Disclaimers.**

---

## 7. Localized Marketing & UI Copy Dictionary

### Hindi Copy

- **Heading:** `"सिर्फ ₹1 में 3 दिनों का Premium अनुभव!"`
- **Subtitle:** `"भक्ति का संपूर्ण अनुभव प्राप्त करें।"`
- **Description:** `"आज सिर्फ ₹1 का भुगतान करके पूरे 3 दिनों तक Bhavlaya के Premium फीचर्स का आनंद लें। इसके बाद ₹499 प्रति माह स्वतः रिन्यू होगा, जब तक आप अपना सब्सक्रिप्शन कैंसल नहीं करते।"`
- **Price Highlight:** `"सिर्फ ₹1 में पूरे 3 दिनों का Premium Access"`
- **Recurring Display:** `"3 दिनों के बाद ₹499/माह स्वतः रिन्यू होगा।"`
- **Cancellation Guarantee:** `"आप कभी भी अपना सब्सक्रिप्शन कैंसल कर सकते हैं।"`
- **Main CTA:** `"सिर्फ ₹1 में शुरू करें"`
- **Secondary Dismiss Action:** `"अभी नहीं"`

### English Copy

- **Heading:** `"Experience Bhavlaya Premium for Just ₹1"`
- **Subtitle:** `"Experience Complete Bhakti"`
- **Description:** `"Get complete Premium access for 3 days with an introductory payment of ₹1. After the introductory period, your subscription automatically renews at ₹499 per month until cancelled."`
- **Price Highlight:** `"Experience Bhavlaya Premium for Just ₹1"`
- **Recurring Display:** `"After 3 days, renews automatically at ₹499/month."`
- **Cancellation Guarantee:** `"You can cancel your subscription anytime from Google Play."`
- **Main CTA:** `"Start Premium for ₹1"`
- **Secondary Dismiss Action:** `"Not Now"`

---

## 8. Alternative Billing Framework (UPI AutoPay Compliance)

UPI AutoPay is architected as an **optional, decoupled secondary provider** under the **Google Play User Choice Billing (UCB) India** framework.

### Compliance Safeguards

1. **Zero UPI PIN Collection:** The Bhavlaya app never collects, prompts for, or handles the user's UPI PIN. All authentication occurs inside the user's NPCI-certified UPI app (BHIM, Google Pay, PhonePe, Paytm).
2. **Dual-Mandate Transparency:**
   - Step 1: Initial authorization payment of **₹1**.
   - Step 2: Recurring monthly mandate of **₹499** scheduled for execution after day 3.
3. **No Standalone Bypass:** Alternative billing is deactivated until Google Play UCB India enrollment is formally approved.
4. **User Choice Prompt:** When enabled, the user is presented with an un-biased choice screen between Google Play Billing and UPI AutoPay.

---

*Bhavlaya — Where Devotion Meets Knowledge.*  
*A Code Crew Labs Product.*
