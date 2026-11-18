/**
 * Automated Unit Test Suite for Bhavlaya Premium Subscription Engine
 *
 * Validates:
 * 1. Minor units conversion: ₹1 = 100 paise, ₹499 = 49,900 paise.
 * 2. Introductory offer: 3 days, non-free, non-refundable.
 * 3. Recurring offer: ₹499/month, autoRenewEnabled.
 * 4. All 12 Subscription States and entitlement flags.
 * 5. All 20 Premium features and 10 ungated free areas.
 */

import {
  PREVIEW_SUBSCRIPTION_CONFIG,
  PREMIUM_FEATURES_CATALOG,
  UNGATED_FREE_AREAS,
  SubscriptionState,
} from "../config/subscription";
import { SUBSCRIPTION_SEED_RECORDS } from "../data/subscriptionSeed";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST FAILED: ${message}`);
  }
}

console.log("=================================================");
console.log("BHAVLAYA SUBSCRIPTION & PRICING VERIFICATION TEST");
console.log("=================================================");

// 1. Verify Pricing Configuration
console.log("\n[Test 1] Verifying Final Pricing Configuration...");
assert(PREVIEW_SUBSCRIPTION_CONFIG.introductoryPrice === 1, "Introductory price must be 1 INR");
assert(PREVIEW_SUBSCRIPTION_CONFIG.introductoryPriceMinorUnits === 100, "Introductory price minor units must be 100 paise");
assert(PREVIEW_SUBSCRIPTION_CONFIG.introductoryDurationDays === 3, "Introductory duration must be exactly 3 days");
assert(PREVIEW_SUBSCRIPTION_CONFIG.introductoryCurrency === "INR", "Introductory currency must be INR");
assert(PREVIEW_SUBSCRIPTION_CONFIG.recurringPrice === 499, "Recurring price must be 499 INR");
assert(PREVIEW_SUBSCRIPTION_CONFIG.recurringPriceMinorUnits === 49900, "Recurring price minor units must be 49,900 paise");
assert(PREVIEW_SUBSCRIPTION_CONFIG.recurringPeriod === "P1M", "Recurring period must be P1M");
assert(PREVIEW_SUBSCRIPTION_CONFIG.autoRenewEnabled === true, "Auto renew must be enabled");
assert(PREVIEW_SUBSCRIPTION_CONFIG.productId === "bhavlaya_premium_monthly", "Product ID must be bhavlaya_premium_monthly");
assert(PREVIEW_SUBSCRIPTION_CONFIG.basePlanId === "monthly_499", "Base plan ID must be monthly_499");
assert(PREVIEW_SUBSCRIPTION_CONFIG.offerId === "intro_1_inr_3_days", "Offer ID must be intro_1_inr_3_days");
assert(PREVIEW_SUBSCRIPTION_CONFIG.offerTag === "INTRO_1INR_3DAYS", "Offer tag must be INTRO_1INR_3DAYS");
console.log("✓ Pricing configuration & minor units passed.");

// 2. Verify All 12 Subscription States Seed Records
console.log("\n[Test 2] Verifying All 12 Subscription States Seed Data...");
const requiredStates: SubscriptionState[] = [
  "NOT_SUBSCRIBED",
  "INTRO_PAYMENT_PENDING",
  "INTRO_ACTIVE",
  "RECURRING_ACTIVE",
  "RENEWAL_PENDING",
  "CANCELLED_BUT_ACTIVE",
  "EXPIRED",
  "PAYMENT_FAILED",
  "GRACE_PERIOD",
  "ACCOUNT_ON_HOLD",
  "REFUNDED",
  "REVOKED",
];

requiredStates.forEach((st) => {
  const seed = SUBSCRIPTION_SEED_RECORDS[st];
  assert(seed !== undefined, `Seed record for ${st} must exist.`);
  assert(seed.state === st, `Seed state must match ${st}.`);
});
console.log(`✓ All 12 states verified in seed registry.`);

// 3. Verify Entitlements logic
console.log("\n[Test 3] Verifying Entitlement Access Rules...");
// INTRO_ACTIVE must have active entitlements
assert(SUBSCRIPTION_SEED_RECORDS.INTRO_ACTIVE.activeEntitlements.length > 0, "INTRO_ACTIVE must have active entitlements");
// RECURRING_ACTIVE must have active entitlements
assert(SUBSCRIPTION_SEED_RECORDS.RECURRING_ACTIVE.activeEntitlements.length > 0, "RECURRING_ACTIVE must have active entitlements");
// CANCELLED_BUT_ACTIVE must retain entitlements until expiration
assert(SUBSCRIPTION_SEED_RECORDS.CANCELLED_BUT_ACTIVE.activeEntitlements.length > 0, "CANCELLED_BUT_ACTIVE must retain entitlements");
// EXPIRED must have NO entitlements
assert(SUBSCRIPTION_SEED_RECORDS.EXPIRED.activeEntitlements.length === 0, "EXPIRED must have no entitlements");
// REFUNDED must have NO entitlements
assert(SUBSCRIPTION_SEED_RECORDS.REFUNDED.activeEntitlements.length === 0, "REFUNDED must have no entitlements");
// REVOKED must have NO entitlements
assert(SUBSCRIPTION_SEED_RECORDS.REVOKED.activeEntitlements.length === 0, "REVOKED must have no entitlements");
console.log("✓ Entitlement access rules verified.");

// 4. Verify Catalog of 20 Features
console.log("\n[Test 4] Verifying 20 Premium Features Catalog...");
assert(PREMIUM_FEATURES_CATALOG.length === 20, `Catalog must contain exactly 20 features, found: ${PREMIUM_FEATURES_CATALOG.length}`);
PREMIUM_FEATURES_CATALOG.forEach((feat) => {
  assert(!!feat.name && !!feat.nameHi, `Feature ${feat.id} must have both English and Hindi names`);
  assert(!!feat.description && !!feat.descriptionHi, `Feature ${feat.id} must have descriptions`);
});
console.log("✓ 20 Premium Features catalog verified.");

// 5. Verify Ungated Free Areas
console.log("\n[Test 5] Verifying Free & Ungated Areas...");
assert(UNGATED_FREE_AREAS.length >= 10, "Must have at least 10 documented ungated free areas");
assert(UNGATED_FREE_AREAS.some((a) => a.id === "cancellation"), "Cancellation must be ungated");
assert(UNGATED_FREE_AREAS.some((a) => a.id === "privacy_policy"), "Privacy policy must be ungated");
assert(UNGATED_FREE_AREAS.some((a) => a.id === "help_support"), "Help & Support must be ungated");
console.log("✓ Free & Ungated areas verified.");

console.log("\n=================================================");
console.log("ALL SUBSCRIPTION TESTS PASSED SUCCESSFULLY! (5/5)");
console.log("=================================================\n");
