import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: "linear-gradient(135deg, #D97706 0%, #B58A43 50%, #651D32 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "#FAF8F2",
          fontFamily: "serif",
          fontWeight: "bold",
          border: "2px solid #FFFDF8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        भा
      </div>
    ),
    {
      ...size,
    }
  );
}
