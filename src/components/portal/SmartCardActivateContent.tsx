"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle2, Info } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { activateSmartcard, getSmartcardState, type SmartcardDemoState } from "@/lib/smartcard-demo";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle } from "./portalPageStyles";

export default function SmartCardActivateContent() {
  const [state, setState] = useState<SmartcardDemoState>(() => getSmartcardState());
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleActivate = () => {
    setLoading(true);
    setTimeout(() => {
      const s = activateSmartcard();
      setState(s);
      setLoading(false);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Activate Smart Card</h1>
        <p style={pageSubtitleStyle}>
          One-time activation links your enrollment to the physical smart card issued through the college. Demo: state is
          saved in this browser session.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          borderRadius: 6,
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6 }}>
          Carry a valid ID to the college office for card collection. This screen only records digital activation for the
          portal (prototype).
        </p>
      </div>

      <div style={{ ...cardStyle, padding: "18px 22px" }}>
        <div style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: 8 }}>Student</div>
        <div style={{ fontWeight: 700, color: "#1a1a2e" }}>
          {DEMO_STUDENT.name} · {DEMO_STUDENT.enrollmentNo}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Status</div>
        {state.active ? (
          <div style={{ ...cardStyle, padding: "20px 22px", borderColor: "#a7f3d0", background: "#f0fdf4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <CheckCircle2 color="#16a34a" size={22} />
              <span style={{ fontWeight: 700, color: "#166534" }}>Smart card is active</span>
            </div>
            <div style={{ fontSize: "0.875rem", color: "#374151" }}>
              Card no.: <strong>{state.cardNo}</strong>
            </div>
            {state.activatedAt && (
              <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 6 }}>
                Activated: {new Date(state.activatedAt).toLocaleString("en-IN")}
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              <Link href="/student/smartcard/view" style={{ color: "#007B8A", fontWeight: 600, fontSize: "0.875rem" }}>
                View smart card →
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ ...cardStyle, padding: "20px 22px" }}>
            <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: "#374151" }}>
              Your smart card is not activated yet. Click below to complete digital activation (demo).
            </p>
            <button
              type="button"
              disabled={loading}
              onClick={handleActivate}
              className="submit-btn"
              style={{
                backgroundColor: loading ? "#9ab8bc" : "#007B8A",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                padding: "10px 20px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Zap size={16} />
              {loading ? "Activating…" : "Activate smart card"}
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            backgroundColor: "#1a1a2e",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 9999,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          <CheckCircle2 size={16} color="#4ade80" />
          Activation completed (demo).
        </div>
      )}
    </div>
  );
}
