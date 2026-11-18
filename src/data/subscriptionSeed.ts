/**
 * Bhavlaya Subscription Database Seed Data
 *
 * Provides fixture accounts representing all 12 subscription lifecycle states
 * for automated testing, developer sandboxing, and QA audit.
 */

import { SubscriptionState, PREVIEW_SUBSCRIPTION_CONFIG } from "@/config/subscription";

export interface SubscriptionRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  state: SubscriptionState;
  productId: string;
  basePlanId: string;
  offerId?: string;
  purchaseToken: string;
  orderId: string;
  initialAmountPaid: number; // in INR
  initialAmountPaidMinorUnits: number; // in Paise
  recurringAmount: number; // in INR
  currency: string;
  billingProvider: "GOOGLE_PLAY" | "UPI_AUTOPAY";
  purchaseDate: string; // ISO string
  introductoryExpiryDate?: string; // ISO string
  currentPeriodStartDate: string;
  currentPeriodEndDate: string;
  nextRenewalDate?: string;
  autoRenew: boolean;
  gracePeriodEndsAt?: string;
  accountHoldEndsAt?: string;
  cancellationDate?: string;
  refundDate?: string;
  revocationReason?: string;
  activeEntitlements: string[];
}

const NOW = new Date("2026-11-18T14:30:00Z");

const addDays = (d: Date, days: number) => {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

const subDays = (d: Date, days: number) => {
  const result = new Date(d);
  result.setDate(result.getDate() - days);
  return result.toISOString();
};

export const SUBSCRIPTION_SEED_RECORDS: Record<SubscriptionState, SubscriptionRecord> = {
  NOT_SUBSCRIBED: {
    id: "sub_seed_01",
    userId: "usr_free_001",
    userEmail: "sharma.free@bhavlaya.com",
    userName: "अमित शर्मा (नया साधक)",
    state: "NOT_SUBSCRIBED",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "",
    orderId: "",
    initialAmountPaid: 0,
    initialAmountPaidMinorUnits: 0,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: "",
    currentPeriodStartDate: "",
    currentPeriodEndDate: "",
    autoRenew: false,
    activeEntitlements: [],
  },

  INTRO_PAYMENT_PENDING: {
    id: "sub_seed_02",
    userId: "usr_pending_002",
    userEmail: "verma.pending@bhavlaya.com",
    userName: "राजेश वर्मा (भुगतान प्रक्रियारत)",
    state: "INTRO_PAYMENT_PENDING",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    offerId: PREVIEW_SUBSCRIPTION_CONFIG.offerId,
    purchaseToken: "token_sim_pending_1inr_9823",
    orderId: "GPA.3312-9011-4421-0001",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: NOW.toISOString(),
    currentPeriodStartDate: NOW.toISOString(),
    currentPeriodEndDate: addDays(NOW, 3),
    autoRenew: true,
    activeEntitlements: [], // No premium until verified
  },

  INTRO_ACTIVE: {
    id: "sub_seed_03",
    userId: "usr_intro_active_003",
    userEmail: "priya.intro@bhavlaya.com",
    userName: "प्रिया मिश्रा (₹1 प्रारंभिक 3-दिन एक्टिव)",
    state: "INTRO_ACTIVE",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    offerId: PREVIEW_SUBSCRIPTION_CONFIG.offerId,
    purchaseToken: "token_gp_intro_active_7721",
    orderId: "GPA.3312-9011-4421-0002",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 1), // Started 1 day ago
    introductoryExpiryDate: addDays(NOW, 2), // 2 days left
    currentPeriodStartDate: subDays(NOW, 1),
    currentPeriodEndDate: addDays(NOW, 2),
    nextRenewalDate: addDays(NOW, 2), // Will renew to ₹499
    autoRenew: true,
    activeEntitlements: ["all_premium_20_features"],
  },

  RECURRING_ACTIVE: {
    id: "sub_seed_04",
    userId: "usr_recurring_active_004",
    userEmail: "vikram.active@bhavlaya.com",
    userName: "विक्रम चौहान (मासिक ₹499 एक्टिव)",
    state: "RECURRING_ACTIVE",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_rec_active_4419",
    orderId: "GPA.3312-9011-4421-0003",
    initialAmountPaid: 499,
    initialAmountPaidMinorUnits: 49900,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 15),
    currentPeriodStartDate: subDays(NOW, 15),
    currentPeriodEndDate: addDays(NOW, 15),
    nextRenewalDate: addDays(NOW, 15),
    autoRenew: true,
    activeEntitlements: ["all_premium_20_features"],
  },

  RENEWAL_PENDING: {
    id: "sub_seed_05",
    userId: "usr_renewal_pending_005",
    userEmail: "suresh.renewal@bhavlaya.com",
    userName: "सुरेश गुप्ता (रिन्यूअल प्रक्रियाधीन)",
    state: "RENEWAL_PENDING",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_renew_pending_1190",
    orderId: "GPA.3312-9011-4421-0004",
    initialAmountPaid: 499,
    initialAmountPaidMinorUnits: 49900,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 30),
    currentPeriodStartDate: subDays(NOW, 30),
    currentPeriodEndDate: NOW.toISOString(),
    nextRenewalDate: NOW.toISOString(),
    autoRenew: true,
    activeEntitlements: ["all_premium_20_features"],
  },

  CANCELLED_BUT_ACTIVE: {
    id: "sub_seed_06",
    userId: "usr_cancelled_active_006",
    userEmail: "ananya.cancelled@bhavlaya.com",
    userName: "अनन्या जोशी (कैंसल किंतु अवधि शेष)",
    state: "CANCELLED_BUT_ACTIVE",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    offerId: PREVIEW_SUBSCRIPTION_CONFIG.offerId,
    purchaseToken: "token_gp_cancelled_3310",
    orderId: "GPA.3312-9011-4421-0005",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 1),
    cancellationDate: NOW.toISOString(),
    introductoryExpiryDate: addDays(NOW, 2),
    currentPeriodStartDate: subDays(NOW, 1),
    currentPeriodEndDate: addDays(NOW, 2),
    nextRenewalDate: undefined, // Will NOT renew
    autoRenew: false,
    activeEntitlements: ["all_premium_20_features"], // Entitled until Day 3 expires
  },

  EXPIRED: {
    id: "sub_seed_07",
    userId: "usr_expired_007",
    userEmail: "manoj.expired@bhavlaya.com",
    userName: "मनोज तिवारी (अवधि समाप्त)",
    state: "EXPIRED",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_expired_9901",
    orderId: "GPA.3312-9011-4421-0006",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 10),
    currentPeriodStartDate: subDays(NOW, 10),
    currentPeriodEndDate: subDays(NOW, 7),
    autoRenew: false,
    activeEntitlements: [],
  },

  PAYMENT_FAILED: {
    id: "sub_seed_08",
    userId: "usr_failed_008",
    userEmail: "sunita.failed@bhavlaya.com",
    userName: "सुनीता राठौड़ (भुगतान विफल)",
    state: "PAYMENT_FAILED",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_failed_6612",
    orderId: "GPA.3312-9011-4421-0007",
    initialAmountPaid: 0,
    initialAmountPaidMinorUnits: 0,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: NOW.toISOString(),
    currentPeriodStartDate: NOW.toISOString(),
    currentPeriodEndDate: NOW.toISOString(),
    autoRenew: false,
    activeEntitlements: [],
  },

  GRACE_PERIOD: {
    id: "sub_seed_09",
    userId: "usr_grace_009",
    userEmail: "kavita.grace@bhavlaya.com",
    userName: "कविता सिंह (ग्रेस पीरियड)",
    state: "GRACE_PERIOD",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_grace_5510",
    orderId: "GPA.3312-9011-4421-0008",
    initialAmountPaid: 499,
    initialAmountPaidMinorUnits: 49900,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 31),
    currentPeriodStartDate: subDays(NOW, 31),
    currentPeriodEndDate: subDays(NOW, 1),
    gracePeriodEndsAt: addDays(NOW, 6), // 7-day Google Play grace period
    autoRenew: true,
    activeEntitlements: ["all_premium_20_features"], // Google Play allows access during grace
  },

  ACCOUNT_ON_HOLD: {
    id: "sub_seed_10",
    userId: "usr_hold_010",
    userEmail: "deepak.hold@bhavlaya.com",
    userName: "दीपक यादव (अकाउंट होल्ड)",
    state: "ACCOUNT_ON_HOLD",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_hold_8820",
    orderId: "GPA.3312-9011-4421-0009",
    initialAmountPaid: 499,
    initialAmountPaidMinorUnits: 49900,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 40),
    currentPeriodStartDate: subDays(NOW, 40),
    currentPeriodEndDate: subDays(NOW, 10),
    accountHoldEndsAt: addDays(NOW, 20), // 30 days hold
    autoRenew: true,
    activeEntitlements: [], // Access suspended during account hold
  },

  REFUNDED: {
    id: "sub_seed_11",
    userId: "usr_refunded_011",
    userEmail: "alok.refund@bhavlaya.com",
    userName: "आलोक नाथ (रिफंडेड)",
    state: "REFUNDED",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_refund_4401",
    orderId: "GPA.3312-9011-4421-0010",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 2),
    refundDate: NOW.toISOString(),
    currentPeriodStartDate: subDays(NOW, 2),
    currentPeriodEndDate: NOW.toISOString(),
    autoRenew: false,
    activeEntitlements: [],
  },

  REVOKED: {
    id: "sub_seed_12",
    userId: "usr_revoked_012",
    userEmail: "tarun.revoked@bhavlaya.com",
    userName: "तरुण मेहता (रिवोक्ड / धोखाधड़ी सुरक्षा)",
    state: "REVOKED",
    productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
    basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
    purchaseToken: "token_gp_revoked_1209",
    orderId: "GPA.3312-9011-4421-0011",
    initialAmountPaid: 1,
    initialAmountPaidMinorUnits: 100,
    recurringAmount: 499,
    currency: "INR",
    billingProvider: "GOOGLE_PLAY",
    purchaseDate: subDays(NOW, 2),
    revocationReason: "FRAUD_OR_CHARGEBACK",
    currentPeriodStartDate: subDays(NOW, 2),
    currentPeriodEndDate: NOW.toISOString(),
    autoRenew: false,
    activeEntitlements: [],
  },
};
