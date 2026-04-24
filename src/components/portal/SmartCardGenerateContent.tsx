"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, CheckCircle2, Download } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { getSmartcardState, markDataFileGenerated, type SmartcardDemoState } from "@/lib/smartcard-demo";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle } from "./portalPageStyles";

export default function SmartCardGenerateContent() {
  const [state, setState] = useState<SmartcardDemoState>(() => getSmartcardState());
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const refresh = () => setState(getSmartcardState());

  const handleGenerate = () => {
    setBusy(true);
    setTimeout(() => {
      const s = markDataFileGenerated();
      setState(s);
      setBusy(false);
      setToast("Data file ready (demo) — use Download.");
      setTimeout(() => setToast(""), 3000);
    }, 1200);
  };

  const handleDownload = () => {
    setToast("Saved bu_smartcard_data.bin (demo — no file written).");
    setTimeout(() => setToast(""), 3000);
  };

  if (!state.active) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={pageTitleStyle}>Generate data file</h1>
        <p style={pageSubtitleStyle}>
          A vendor-ready data file is generated after your smart card is activated.
        </p>
        <div style={{ ...cardStyle, padding: 20 }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151" }}>
            You need to <Link href="/student/smartcard/activate" style={{ color: "#007B8A", fontWeight: 600 }}>activate your smart card</Link> first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Generate data file</h1>
        <p style={pageSubtitleStyle}>
          Download the machine / vendor data file for printing or encoding. Session demo only.
        </p>
      </div>

      <div style={{ ...cardStyle, padding: "16px 20px" }}>
        <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>Enrollment</div>
        <div style={{ fontWeight: 600, color: "#1a1a2e" }}>{DEMO_STUDENT.enrollmentNo}</div>
        <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 8 }}>Card</div>
        <div style={{ fontWeight: 600 }}>{state.cardNo}</div>
        {state.dataFileAt && (
          <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 8 }}>
            Last generated: {new Date(state.dataFileAt).toLocaleString("en-IN")}
          </div>
        )}
      </div>

      <div>
        <div style={sectionLabelStyle}>Actions</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy}
            className="submit-btn"
            style={{
              backgroundColor: busy ? "#9ab8bc" : "#007B8A",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "10px 18px",
              fontWeight: 600,
              cursor: busy ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Database size={16} />
            {busy ? "Generating…" : "Generate / refresh file"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!state.dataFileAt}
            style={{
              backgroundColor: state.dataFileAt ? "#fff" : "#f3f4f6",
              color: state.dataFileAt ? "#007B8A" : "#9ca3af",
              border: "1px solid #e0e0e0",
              borderRadius: 7,
              padding: "10px 18px",
              fontWeight: 600,
              cursor: state.dataFileAt ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Download size={16} />
            Download .bin
          </button>
          <button
            type="button"
            onClick={refresh}
            style={{
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: 7,
              padding: "10px 14px",
              fontSize: "0.8125rem",
              cursor: "pointer",
            }}
          >
            Refresh status
          </button>
        </div>
        <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 12 }}>
          Format: binary dump compatible with the vendor encoder (illustrative only for the demo).
        </p>
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
            maxWidth: 340,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0 }} />
          {toast}
        </div>
      )}
    </div>
  );
}
