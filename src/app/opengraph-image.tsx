import { ImageResponse } from "next/og";

export const alt = "THPARFUMS — Perfumaria de alto padrão";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const crownSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 70' width='180' height='126'><g fill='%23f5f5f4'><path d='M10,52 L12,22 L21.5,46 L31,14 L40.5,40 L50,8 L59.5,40 L69,14 L78.5,46 L88,22 L90,52 Z'/><rect x='8' y='52' width='84' height='10' rx='2.5'/><circle cx='12' cy='22' r='3.4'/><circle cx='31' cy='14' r='3.4'/><circle cx='50' cy='8' r='3.6'/><circle cx='69' cy='14' r='3.4'/><circle cx='88' cy='22' r='3.4'/></g></svg>`;

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 80% at 50% 0%, #1c1c1f 0%, #0a0a0a 60%)",
          color: "#f5f5f4",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;utf8,${crownSvg}`}
          alt=""
          width={180}
          height={126}
        />
        <div
          style={{
            fontSize: 92,
            letterSpacing: 18,
            marginTop: 24,
            fontWeight: 700,
          }}
        >
          THPARFUMS
        </div>
        <div style={{ fontSize: 30, color: "#a3a3a3", marginTop: 8 }}>
          Perfumaria de alto padrão · Elegância que fixa
        </div>
      </div>
    ),
    size,
  );
}
