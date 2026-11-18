import { NextRequest, NextResponse } from "next/server";
import { SUBSCRIPTION_SEED_RECORDS } from "@/data/subscriptionSeed";
import { SubscriptionState, PREVIEW_SUBSCRIPTION_CONFIG } from "@/config/subscription";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stateParam = searchParams.get("mockState") as SubscriptionState | null;

  // If a mock state is passed for testing/QA, return that seeded fixture
  if (stateParam && SUBSCRIPTION_SEED_RECORDS[stateParam]) {
    const record = SUBSCRIPTION_SEED_RECORDS[stateParam];
    return NextResponse.json({
      success: true,
      data: record,
      isEntitled: record.activeEntitlements.length > 0,
    });
  }

  // Default demo state: introductory offer active with 3-day duration
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return NextResponse.json({
    success: true,
    data: {
      userId: "usr_active_subscriber",
      planName: "Bhavlaya Premium",
      state: "INTRO_ACTIVE",
      productId: PREVIEW_SUBSCRIPTION_CONFIG.productId,
      basePlanId: PREVIEW_SUBSCRIPTION_CONFIG.basePlanId,
      offerId: PREVIEW_SUBSCRIPTION_CONFIG.offerId,
      initialAmountPaid: 1,
      recurringPrice: 499,
      currency: "INR",
      billingProvider: "GOOGLE_PLAY",
      purchaseDate: now.toISOString(),
      introductoryExpiryDate: threeDaysLater.toISOString(),
      currentPeriodStartDate: now.toISOString(),
      currentPeriodEndDate: threeDaysLater.toISOString(),
      nextRenewalDate: threeDaysLater.toISOString(),
      autoRenew: true,
      googlePlayManageUrl: `https://play.google.com/store/account/subscriptions?sku=${PREVIEW_SUBSCRIPTION_CONFIG.productId}&package=com.codecrewlabs.bhavlaya`,
      isEntitled: true,
      activeEntitlementsCount: 20,
    },
  });
}
