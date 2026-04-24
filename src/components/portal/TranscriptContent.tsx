"use client";

import { useState } from "react";
import { CheckCircle2, Scroll, CreditCard } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

type AppRow = {
  id: string;
  date: string;
  copies: number;
  mode: string;
  status: "Submitted" | "In process" | "Ready for pickup";
  amount: number;
};

const INITIAL: AppRow[] = [
  {
    id: "TR-2025-0082",
    date: "12 Nov 2025",
    copies: 2,
    mode: "In person",
    status: "Ready for pickup",
    amount: 1000,
  },
];

const PER_COPY = 500;
const CONVENIENCE = 50;

export default function TranscriptContent() {
  const [copies, setCopies] = useState(1);
  const [mode, setMode] = useState<"In person" | "Post">("In person");
  const [address, setAddress] = useState("");
  const [rows, setRows] = useState<AppRow[]>(INITIAL);
  const [toast, setToast] = useState("");

  const checklist = [
    { id: 1, label: "All semester results declared", met: true },
    { id: 2, label: "No fee dues on ERP", met: true },
    { id: 3, label: "Identity verified in last 12 months", met: true },
  ];

  const total = copies * PER_COPY + CONVENIENCE;

  const pay = () => {
    const id = `TR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setRows((r) => [
      {
        id,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        copies,
        mode,
        status: "Submitted",
        amount: total,
      },
      ...r,
    ]);
    setToast("Payment received (demo). Application submitted.");
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Apply for transcript</h1>
        <p style={pageSubtitleStyle}>
          Request official semester transcripts from the controller of examinations. Demo: payments and status are
          simulated.
        </p>
      </div>

      <div>
        <div style={sectionLabelStyle}>Eligibility (auto-check)</div>
        <div style={{ ...cardStyle, padding: "16px 20px" }}>
          {checklist.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.875rem",
                color: c.met ? "#166534" : "#991b1b",
                marginBottom: 8,
              }}
            >
              <CheckCircle2 size={16} color={c.met ? "#16a34a" : "#ef4444"} />
              {c.label} — {c.met ? "OK" : "Action required"}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>New application</div>
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Copies</span>
              <input
                type="number"
                min={1}
                max={10}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                style={{
                  width: 80,
                  height: 38,
                  border: "1px solid #d1d5db",
                  borderRadius: 7,
                  padding: "0 10px",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Delivery</span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "In person" | "Post")}
                style={{ height: 38, minWidth: 160, border: "1px solid #d1d5db", borderRadius: 7, padding: "0 8px" }}
              >
                <option value="In person">In person (pickup)</option>
                <option value="Post">Post (speed post)</option>
              </select>
            </label>
          </div>
          {mode === "Post" && (
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Postal address</span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="Full address with PIN"
                style={{ border: "1px solid #d1d5db", borderRadius: 7, padding: 10, fontSize: "0.875rem" }}
              />
            </label>
          )}
          <div
            style={{
              background: "#f8f9fa",
              borderRadius: 8,
              padding: 14,
              fontSize: "0.875rem",
            }}
          >
            <div>Student: {DEMO_STUDENT.name}</div>
            <div>Enrollment: {DEMO_STUDENT.enrollmentNo}</div>
            <div style={{ marginTop: 8 }}>
              Per copy: ₹{PER_COPY} · Convenience: ₹{CONVENIENCE} · <strong>Total: ₹{total}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={pay}
            className="submit-btn"
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#007B8A",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "10px 20px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CreditCard size={16} />
            Pay &amp; submit (demo)
          </button>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Application history</div>
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
                {["Ref.", "Date", "Copies", "Mode", "Amount (₹)", "Status"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className="student-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fdfd" }}
                >
                  <td style={tdS}>{r.id}</td>
                  <td style={tdS}>{r.date}</td>
                  <td style={tdS}>{r.copies}</td>
                  <td style={tdS}>{r.mode}</td>
                  <td style={tdS}>{r.amount}</td>
                  <td style={tdS}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: r.status === "Ready for pickup" ? "#d4f5e9" : r.status === "In process" ? "#dbeafe" : "#fef3c7",
                        color: "#1a1a2e",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize: "0.78rem", color: "#6b7280" }}>
        <Scroll size={12} style={{ display: "inline", verticalAlign: "middle" }} /> Typical processing: 7–10 working
        days after payment confirmation. Contact the transcript cell for urgent cases.
      </p>

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
            zIndex: 9999,
            maxWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

const tdS: React.CSSProperties = { padding: "10px 14px", fontSize: "0.8125rem", borderBottom: "1px solid #e0e0e0" };
