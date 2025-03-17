import { Hono } from "hono";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { fetchFont } from "./fetchFont";

const app = new Hono();

export default app.get("/", async (c) => {
  // Parameters for your portfolio OGP
  const { 
    title = "kbkn3 Portfolio", 
    projectName = "",
    category = "Web Development",
    userName = "kbkn3"
  } = c.req.query();

  const fontFamily = "Open Sans";
  const text = `${title}${projectName}${category}${userName}Portfolio`;
  
  // Fetch fonts with proper text content
  const fontNormal = await fetchFont(text, fontFamily, 400);
  const fontBold = await fetchFont(text, fontFamily, 700);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 斜めに分かれた背景 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #f97316 0%, #10b981 100%)",
          zIndex: 0,
        }}
      />
      
      {/* 斜めの分割線 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#0f172a",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          zIndex: 1,
          opacity: 0.85,
        }}
      />
      
      {/* コンテンツ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "3rem",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "36px",
            fontFamily: "Open Sans",
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          {userName}
        </div>
        
        <div
          style={{
            color: "#ffffff",
            fontSize: "72px",
            fontFamily: "Open Sans",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: fontFamily,
          data: fontNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: fontFamily,
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
});
