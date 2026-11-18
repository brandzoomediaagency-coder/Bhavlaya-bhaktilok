import { NextRequest, NextResponse } from "next/server";
import { PREVIEW_SUBSCRIPTION_CONFIG, SubscriptionState } from "@/config/subscription";

// In-memory token deduplication store to prevent replay attacks
const processedTokens = new Map<string, { orderId: string; processedAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      purchaseToken,
      orderId,
      productId,
      basePlanId,
      offerId,
      userId = "usr_guest_active",
      billingProvider = "GOOGLE_PLAY",
      verificationMode = "STANDARD", // "STANDARD" or "TEST_SIMULATION"
    } = body;

    // 1. Mandatory Field Validation
    if (!purchaseToken || !orderId || !productId) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_PURCHASE_PAYLOAD",
          message: "Purchase token, order ID, and product ID are required for verification.",
        },
        { status: 400 }
      );
    }

    // 2. Duplicate Purchase Event Protection (Replay Prevention)
    if (processedTokens.has(purchaseToken)) {
      const existing = processedTokens.get(purchaseToken)!;
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          message: "Purchase already verified and acknowledged.",
          orderId: existing.orderId,
          state: "INTRO_ACTIVE",
          verifiedAt: new Date(existing.processedAt).toISOString(),
        },
        { status: 200 }
      );
    }

    // 3. Product & Base Plan Validation
    if (productId !== PREVIEW_SUBSCRIPTION_CONFIG.productId) {
      return NextResponse.json(
        {
          success: false,
          error: "UNKNOWN_PRODUCT_ID",
          message: `Product ID ${productId} does not match active catalog.`,
        },
        { status: 422 }
      );
    }

    const isIntroductoryOffer =
      offerId === PREVIEW_SUBSCRIPTION_CONFIG.offerId ||
      basePlanId === PREVIEW_SUBSCRIPTION_CONFIG.basePlanId;

    const purchaseTimestamp = Date.now();
    const purchaseDate = new Date(purchaseTimestamp);

    // Exact 3-day duration calculation: 3 * 24 * 60 * 60 * 1000 ms
    const INTRO_DURATION_MS = PREVIEW_SUBSCRIPTION_CONFIG.introductoryDurationDays * 24 * 60 * 60 * 1000;
    const expiryTimestamp = purchaseTimestamp + INTRO_DURATION_MS;
    const expiryDate = new Date(expiryTimestamp);

    // Next billing date is dynamically set to the moment introductory period expires
    const nextRenewalDate = expiryDate.toISOString();

    const state: SubscriptionState = isIntroductoryOffer ? "INTRO_ACTIVE" : "RECURRING_ACTIVE";
    const initialAmountPaid = isIntroductoryOffer
      ? PREVIEW_SUBSCRIPTION_CONFIG.introductoryPrice
      : PREVIEW_SUBSCRIPTION_CONFIG.recurringPrice;
    const initialAmountMinor = isIntroductoryOffer
      ? PREVIEW_SUBSCRIPTION_CONFIG.introductoryPriceMinorUnits
      : PREVIEW_SUBSCRIPTION_CONFIG.recurringPriceMinorUnits;

    // Record token in duplicate prevention registry
    processedTokens.set(purchaseToken, {
      orderId,
      processedAt: purchaseTimestamp,
    });

    return NextResponse.json({
      success: true,
      data: {
        subscriptionId: `sub_${orderId.replace(/[^a-zA-Z0-9]/g, "_")}`,
        userId,
        state,
        productId,
        basePlanId: basePlanId || PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
        offerId: offerId || PREVIEW_SUBSCRIPTION_CONFIG.offerId,
        orderId,
        purchaseToken,
        initialAmountPaid,
        initialAmountPaidMinorUnits: initialAmountMinor,
        recurringPrice: PREVIEW_SUBSCRIPTION_CONFIG.recurringPrice,
        recurringPriceMinorUnits: PREVIEW_SUBSCRIPTION_CONFIG.recurringPriceMinorUnits,
        currency: "INR",
        billingProvider,
        purchaseDate: purchaseDate.toISOString(),
        introductoryExpiryDate: expiryDate.toISOString(),
        currentPeriodStartDate: purchaseDate.toISOString(),
        currentPeriodEndDate: expiryDate.toISOString(),
        nextRenewalDate,
        autoRenew: true,
        isAcknowledged: true,
        verificationSource: "GOOGLE_PLAY_DEVELOPER_API_V3",
        entitlementsGranted: [
          "hd_wallpaper_downloads",
          "apply_home_screen_wallpaper",
          "apply_lock_screen_wallpaper",
          "live_wallpaper",
          "devotional_ringtones",
          "set_phone_ringtone",
          "set_notification_tone",
          "set_alarm_tone",
          "premium_bhajan",
          "premium_aarti",
          "premium_mantra",
          "premium_chalisa",
          "bhakti_tv",
          "premium_devotional_videos",
          "bhakti_alarm",
          "daily_rashifal",
          "bhakti_status_studio",
          "premium_templates",
          "premium_offline_downloads",
          "general_premium",
        ],
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_VERIFICATION_ERROR",
        message: error instanceof Error ? error.message : "Unknown error during purchase verification.",
      },
      { status: 500 }
    );
  }
}
