"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { getSmartcardState, type SmartcardDemoState } from "@/lib/smartcard-demo";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, thStyle } from "./portalPageStyles";

const REASONS = ["Lost", "Stolen", "Damaged", "Name correction", "Other"];

const FEE = 200;

export default function SmartCardDuplicateContent() {
  const [state] = useState<SmartcardDemoState>(() => getSmartcardState());
  const [reason, setReason] = useState(REASONS[0]);
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);
  const [refId, setRefId] = useState("");
  const [toast, setToast] = useState(false);

  const submit = () => {
    if (!agree) return;
    setRefId(`DUP-${Date.now().toString().slice(-8)}`);
    setDone(true);
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  if (!state.active) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={pageTitleStyle}>Duplicate smart card</h1>
        <p style={pageSubtitleStyle}>Available only for students with an active card record.</p>
        <div style={{ ...cardStyle, padding: 20 }}>
          <Link href="/student/smartcard/activate" style={{ color: "#007B8A", fontWeight: 600 }}>
            Activate first →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Duplicate smart card</h1>
        <p style={pageSubtitleStyle}>
          Request a re-issue at the published fee. Misuse of duplicate requests may be subject to discipline (placeholder
          text for demo).
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fffbeb",
          borderLeft: "4px solid #f59e0b",
          borderRadius: 6,
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#374151" }}>
          Police FIR is required for “Lost / Stolen” in production — not collected in this demo.
        </p>
      </div>

      <div style={{ ...cardStyle, padding: "16px 20px" }}>
        <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>Current card</div>
        <div style={{ fontWeight: 700, color: "#1a1a2e" }}>{state.cardNo}</div>
        <div style={{ fontSize: "0.8rem", marginTop: 6 }}>
          {DEMO_STUDENT.name} — {DEMO_STUDENT.enrollmentNo}
        </div>
      </div>

      {done ? (
        <div style={{ ...cardStyle, borderColor: "#a7f3d0", background: "#f0fdf4", padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#166534", marginBottom: 8 }}>Request registered (demo)</div>
          <div style={{ fontSize: "0.875rem", color: "#374151" }}>
            Reference: <strong>{refId}</strong>
            <br />
            Pay ₹{FEE} at the fee counter and collect the card on the notified date.
          </div>
        </div>
      ) : (
        <>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Reason</div>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                minWidth: 220,
                height: 40,
                border: "1px solid #d1d5db",
                borderRadius: 7,
                padding: "0 10px",
              }}
            >
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#007B8A" }}>
                  {["Item", "Amount (₹)"].map((h) => (
                    <th key={h} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="student-table-row" style={{ background: "#fff" }}>
                  <td style={{ padding: "12px 16px" }}>Duplicate smart card fee</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{FEE}</td>
                </tr>
                <tr style={{ background: "#f8f9fa" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700 }}>Total</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700 }}>{FEE}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8125rem", cursor: "pointer" }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3 }} />
            I declare the reason is true to the best of my knowledge. I will pay the fee as per university rules (demo
            acceptance).
          </label>

          <button
            type="button"
            onClick={submit}
            disabled={!agree}
            style={{
              backgroundColor: agree ? "#007B8A" : "#cbd5e1",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "10px 20px",
              fontWeight: 600,
              cursor: agree ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Copy size={16} />
            Submit request
          </button>
        </>
      )}

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
          Submitted (demo).
        </div>
      )}
    </div>
  );
}
