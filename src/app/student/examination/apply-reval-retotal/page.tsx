import { Clock } from "lucide-react";

export const metadata = {
  title: "Apply Reval-Retotal — Student Portal",
};

export default function ApplyRevalRetotalPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 360,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <Clock
          size={48}
          color="#9ca3af"
          style={{ display: "block", margin: "0 auto 16px" }}
        />
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#374151",
            margin: "0 0 10px",
          }}
        >
          Results Awaited
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Reval / Retotal applications will be available once your examination
          results have been declared.
        </p>
      </div>
    </div>
  );
}
