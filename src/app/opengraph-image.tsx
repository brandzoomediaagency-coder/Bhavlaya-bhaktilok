import { ImageResponse } from "next/og";
import { brandConfig } from "@/config/brand";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #FFFDF8 0%, #FAF8F2 50%, #F5EFEB 100%)",
          border: "16px solid #B58A43",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #D97706 0%, #B58A43 50%, #651D32 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "44px",
                fontWeight: "bold",
              }}
            >
              भा
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "52px", fontWeight: "bold", color: "#651D32" }}>
                {brandConfig.nameHi}
              </span>
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#81786B", letterSpacing: "4px" }}>
                {brandConfig.name.toUpperCase()}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 24px",
              background: "#D97706",
              borderRadius: "24px",
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {brandConfig.category.split(",")[0]}
          </div>
        </div>

        {/* Center Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: "44px", fontWeight: "bold", color: "#22201E", lineHeight: "1.2" }}>
            {brandConfig.heroHeadingHi}
          </span>
          <span style={{ fontSize: "28px", color: "#D97706", fontWeight: "600" }}>
            {brandConfig.tagline} ({brandConfig.taglineHi})
          </span>
          <span style={{ fontSize: "20px", color: "#81786B", maxWidth: "900px", lineHeight: "1.5" }}>
            भजन · मंत्र · आरती · चालीसा · सनातन धर्मग्रंथ · मंदिर व तीर्थ · दैनिक पंचांग
          </span>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "2px solid rgba(181, 138, 67, 0.3)",
          }}
        >
          <span style={{ fontSize: "20px", color: "#81786B" }}>
            {brandConfig.activeDomain.replace("https://", "")}
          </span>
          <span style={{ fontSize: "18px", color: "#651D32", fontWeight: "bold" }}>
            {brandConfig.companyCredit}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
