import type { ReactNode } from "react";
import { COFFEE_COLORS } from "@/constants/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

interface AuthLayoutProps {
  heading: ReactNode;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  heading,
  description,
  children,
}: AuthLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: COFFEE_COLORS.gray,
      }}
    >
      {!isMobile && (
        <div
          style={{
            flex: "0 0 60%",
            position: "relative",
            overflow: "hidden",
            padding: "72px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: COFFEE_COLORS.creamCard,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              fontWeight: 700,
              margin: 0,
              color: COFFEE_COLORS.espresso,
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              fontSize: 18,
              maxWidth: 520,
              marginTop: 24,
              opacity: 0.85,
            }}
          >
            {description}
          </p>
          <span
            style={{
              position: "absolute",
              left: 64,
              bottom: 32,
              fontSize: 14,
              opacity: 0.7,
            }}
          >
            © {new Date().getFullYear()} Kopi Nusantara. All rights reserved.
          </span>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>{children}</div>
      </div>
    </div>
  );
}
