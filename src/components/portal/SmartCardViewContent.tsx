"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, QrCode } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { getSmartcardState, type SmartcardDemoState } from "@/lib/smartcard-demo";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle } from "./portalPageStyles";

export default function SmartCardViewContent() {
  const [state] = useState<SmartcardDemoState>(() => getSmartcardState());

  if (!state.active) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={pageTitleStyle}>View smart card</h1>
        <p style={pageSubtitleStyle}>Activate your card to see a digital preview here.</p>
        <div style={{ ...cardStyle, padding: 20 }}>
          <Link href="/student/smartcard/activate" style={{ color: "#007B8A", fontWeight: 600 }}>
            Go to Activate →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>View smart card</h1>
        <p style={pageSubtitleStyle}>Read-only preview for verification (design mock — not a physical card scan).</p>
      </div>

      <div
        style={{
          maxWidth: 400,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          border: "1px solid #e0e0e0",
          background: "linear-gradient(135deg, #007B8A 0%, #005f6b 100%)",
        }}
      >
        <div style={{ padding: "20px 20px 12px", color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "0.7rem", opacity: 0.85 }}>Barkatullah Vishwavidyalaya</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: 4 }}>Student Smart Card</div>
            </div>
            <CreditCard size={32} color="#fff" style={{ opacity: 0.9 }} />
          </div>
        </div>
        <div style={{ background: "#f8f9fa", padding: 20, color: "#1a1a2e" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 8,
              background: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: "0.65rem", textAlign: "center", color: "#64748b", padding: 4 }}>Photo</div>
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{DEMO_STUDENT.name}</div>
          <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 4 }}>{DEMO_STUDENT.enrollmentNo}</div>
          <div style={{ fontSize: "0.78rem", marginTop: 8 }}>{DEMO_STUDENT.programme} · {DEMO_STUDENT.branch}</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 12 }}>Card no.</div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#007B8A" }}>{state.cardNo}</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <QrCode size={14} />
            QR encodes enrollment + card id (demo)
          </div>
        </div>
      </div>
    </div>
  );
}
