"use client";

import { useState } from "react";
import { Info, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

const FEE_ROWS: {
  head: string;
  total: number;
  paid: number;
  blocking: boolean;
}[] = [
  { head: "Enrollment Fee", total: 800, paid: 800, blocking: false },
  { head: "Development Fund", total: 500, paid: 500, blocking: false },
  { head: "Sports & Cultural Fee", total: 200, paid: 200, blocking: false },
  { head: "Tuition Fee — Installment 2", total: 8000, paid: 5000, blocking: true },
  { head: "Exam Processing Fee", total: 50, paid: 0, blocking: true },
  { head: "Late Enrollment Fine", total: 100, paid: 0, blocking: true },
];

const TOTAL_OUTSTANDING = FEE_ROWS.reduce((s, r) => s + (r.total - r.paid), 0);

export default function RemainingFeesContent() {
  const [toastVisible, setToastVisible] = useState(false);

  const handlePayNow = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Info banner */}
      <div
        style={{
          backgroundColor: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          borderRadius: 6,
          padding: "14px 18px",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6 }}>
          All outstanding dues must be cleared before your examination form can be submitted.
          Fees marked <strong>Blocking</strong> directly prevent exam form access.
          Contact the accounts office if any payment has been made but is not yet reflected here.
        </p>
      </div>

      {/* Context card */}
      <div>
        <div style={sectionLabelStyle}>Student &amp; Session Context</div>
        <div style={{ ...cardStyle, padding: "14px 24px" }}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { label: "Enrollment No.", value: "0105IT251024" },
              { label: "Academic Year", value: "2025-26" },
              { label: "Semester", value: "I" },
              { label: "Program", value: "B.Tech (IT)" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee breakdown table */}
      <div>
        <div style={sectionLabelStyle}>Fee Breakdown</div>
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
                {["Fee Head", "Total (₹)", "Paid (₹)", "Balance (₹)", "Status"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEE_ROWS.map((row, i) => {
                const balance = row.total - row.paid;
                const cleared = balance === 0;
                return (
                  <tr
                    key={row.head}
                    className="exam-table-row"
                    style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                  >
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{row.head}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      {row.total.toLocaleString("en-IN")}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        color: row.paid > 0 ? "#1a7a4a" : "#9ca3af",
                        fontWeight: row.paid > 0 ? 500 : 400,
                      }}
                    >
                      {row.paid > 0 ? row.paid.toLocaleString("en-IN") : "—"}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: cleared ? 400 : 600,
                        color: cleared ? "#9ca3af" : "#dc2626",
                      }}
                    >
                      {cleared ? "—" : balance.toLocaleString("en-IN")}
                    </td>
                    <td style={tdStyle}>
                      {cleared ? (
                        <span
                          style={{
                            background: "#d4f5e9",
                            color: "#1a7a4a",
                            border: "1px solid #a7f3d0",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <CheckCircle2 size={11} />
                          Cleared
                        </span>
                      ) : row.blocking ? (
                        <span
                          style={{
                            background: "#fee2e2",
                            color: "#991b1b",
                            border: "1px solid #fecaca",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <AlertCircle size={11} />
                          Blocking
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "#fef3c7",
                            color: "#92400e",
                            border: "1px solid #fde68a",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                            display: "inline-block",
                          }}
                        >
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outstanding summary + payment */}
      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Outstanding amount */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>
              Total Outstanding
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#dc2626" }}>
                ₹ {TOTAL_OUTSTANDING.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
                across {FEE_ROWS.filter((r) => r.total - r.paid > 0).length} unpaid heads
              </span>
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: "0.8125rem",
                color: "#991b1b",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AlertCircle size={13} />
              Exam form submission is currently blocked
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePayNow}
            className="submit-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#007B8A",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            <CreditCard size={16} />
            Pay Now →
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #f3f4f6", margin: "16px 0 12px" }} />

        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.5 }}>
          Payments reflect within 1–2 working days. If your dues are not updated after payment,
          contact the accounts office with your transaction reference.
        </p>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            backgroundColor: "#1a1a2e",
            color: "#ffffff",
            padding: "14px 18px",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontSize: "0.875rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 9999,
            animation: "fadeInUp 0.25s ease forwards",
          }}
        >
          <CreditCard size={16} color="#00C2D4" />
          Payment integration coming soon
        </div>
      )}
    </div>
  );
}

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 10,
};

const thStyle: React.CSSProperties = {
  padding: "11px 16px",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.8125rem",
  letterSpacing: "0.04em",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: "11px 16px",
  fontSize: "0.875rem",
  color: "#1a1a2e",
  borderBottom: "1px solid #e0e0e0",
};
