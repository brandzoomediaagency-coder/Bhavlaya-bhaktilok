import { NextRequest, NextResponse } from "next/server";
import { PREVIEW_SUBSCRIPTION_CONFIG } from "@/config/subscription";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userId = "current_user", reason } = body;

    // Direct official Google Play subscription management deeplink
    const playStoreManageUrl = `https://play.google.com/store/account/subscriptions?sku=${PREVIEW_SUBSCRIPTION_CONFIG.productId}&package=com.codecrewlabs.bhavlaya`;

    return NextResponse.json({
      success: true,
      data: {
        userId,
        reason: reason || "User initiated cancellation",
        redirectUrl: playStoreManageUrl,
        instructions: {
          step1: "Open the Google Play Store on your Android device.",
          step2: "Tap Profile > Payments & subscriptions > Subscriptions.",
          step3: "Select Bhavlaya Premium and tap 'Cancel subscription'.",
          step4: "Confirm cancellation. You will retain full access until your current 3-day introductory or monthly cycle ends.",
        },
        notice: "आप कभी भी अपना सब्सक्रिप्शन कैंसल कर सकते हैं। कैंसल करने पर भी आपकी सहेजी गई सामग्री और प्रोफाइल सुरक्षित रहेगी।",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "CANCELLATION_HELPER_FAILED",
        message: "Failed to process cancellation request.",
      },
      { status: 500 }
    );
  }
}
