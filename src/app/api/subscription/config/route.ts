import { NextResponse } from "next/server";
import {
  PREVIEW_SUBSCRIPTION_CONFIG,
  PREMIUM_FEATURES_CATALOG,
  UNGATED_FREE_AREAS,
  SUBSCRIPTION_MARKETING_COPY,
} from "@/config/subscription";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      config: PREVIEW_SUBSCRIPTION_CONFIG,
      catalog: PREMIUM_FEATURES_CATALOG,
      ungatedAreas: UNGATED_FREE_AREAS,
      copy: SUBSCRIPTION_MARKETING_COPY,
      playConsolePolicy: {
        minPermittedInrPrice: 10,
        currency: "INR",
        configuredIntroPrice: 1,
        policyNote:
          "Google Play standard minimum price floor in India is ₹10. Introductory promotional single-charge offers must be authorized in Play Console. If rejected by Play Console during deployment, report ₹10 minimum floor to business owner for approval.",
      },
      timestamp: new Date().toISOString(),
    },
  });
}
