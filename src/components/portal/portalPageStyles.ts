import type { CSSProperties } from "react";

export const sectionLabelStyle: CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 10,
};

export const pageTitleStyle: CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "#1a1a2e",
  margin: "0 0 4px 0",
};

export const pageSubtitleStyle: CSSProperties = {
  fontSize: "0.8125rem",
  color: "#6b7280",
  margin: "0 0 20px 0",
  lineHeight: 1.5,
};

export const thStyle: CSSProperties = {
  padding: "11px 16px",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.8125rem",
  letterSpacing: "0.04em",
  textAlign: "left" as const,
};
