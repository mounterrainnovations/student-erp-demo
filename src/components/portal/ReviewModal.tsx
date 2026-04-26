"use client";

import { useEffect } from "react";
import {
  X,
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  User,
  BookOpen,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

export interface ReviewSubject {
  code: string;
  name: string;
  type: "Theory" | "Practical";
  credits: number;
  max: number;
  min: number;
  isBackPaper?: boolean;
}

export interface ReviewFeeRow {
  label: string;
  amount: number;
  highlight?: "warn" | "extra";
}

interface Props {
  examType: string;
  session: string;
  subjects: ReviewSubject[];
  fees: ReviewFeeRow[];
  grandTotal: number;
  onClose: () => void;
  onProceed: () => void;
}

export default function ReviewModal({
  examType,
  session,
  subjects,
  fees,
  grandTotal,
  onClose,
  onProceed,
}: Props) {
  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const regularSubjects = subjects.filter((s) => !s.isBackPaper);
  const backPapers      = subjects.filter((s) =>  s.isBackPaper);
  const totalCredits    = regularSubjects.reduce((s, x) => s + x.credits, 0);

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        zIndex: 9100,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(880px, 95vw)",
          maxHeight: "92vh",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#007B8A",
            padding: "0 20px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.01em" }}>
            Exam Form — Review &amp; Confirm
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 6, width: 30, height: 30,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#ffffff",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Step indicator ─────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e0e0e0",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 0,
            flexShrink: 0,
          }}
        >
          <Step label="Fill Form" state="done"    num={1} />
          <StepArrow />
          <Step label="Review"    state="active"  num={2} />
          <StepArrow />
          <Step label="Payment"   state="pending" num={3} />
        </div>

        {/* ── Scrollable body ────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>

          {/* A — Exam Details */}
          <SectionHeader icon={<User size={14} />} title="Exam Details" />
          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px 24px" }}>
              {[
                { label: "Student Name",    value: "Rajesh Kumar"                             },
                { label: "Enrollment No.",  value: "0101CS221001"                             },
                { label: "Programme",       value: "B.E."                                     },
                { label: "Branch",          value: "Computer Science & Engineering"           },
                { label: "Semester",        value: "6th"                                      },
                { label: "Exam Type",       value: examType  || "Regular"                     },
                { label: "Session",         value: session                                    },
                { label: "Exam Centre",     value: "GEC Bhopal (Centre No. 0101)"             },
                { label: "Academic Year",   value: "2025–2026"                                },
                { label: "College",         value: "Govt. Engineering College, Bhopal"        },
              ].map((row) => (
                <div key={row.label}>
                  <div style={detailLabelStyle}>{row.label}</div>
                  <div style={detailValueStyle}>{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* B — Subjects */}
          <SectionHeader
            icon={<BookOpen size={14} />}
            title={`Subjects Selected (${subjects.length})`}
            right={
              <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                {regularSubjects.length} regular · {totalCredits} credits
                {backPapers.length > 0 && ` · ${backPapers.length} back paper${backPapers.length > 1 ? "s" : ""}`}
              </span>
            }
          />
          <div style={{ ...cardStyle, padding: 0, marginBottom: 20, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#007B8A" }}>
                  {["#", "Code", "Subject Name", "Type", "Credits", "Max", "Min"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, i) => (
                  <tr
                    key={s.code}
                    style={{
                      backgroundColor: s.isBackPaper
                        ? "#fffbeb"
                        : i % 2 === 0 ? "#ffffff" : "#f8fdfd",
                    }}
                  >
                    <td style={{ ...tdStyle, color: "#9ca3af", width: 36 }}>{i + 1}</td>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "0.8rem", color: "#374151" }}>
                      {s.code}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>
                      {s.name}
                      {s.isBackPaper && (
                        <span style={{
                          marginLeft: 8, fontSize: "0.65rem", fontWeight: 700,
                          color: "#92400e", background: "#fde68a",
                          borderRadius: 4, padding: "1px 6px",
                          verticalAlign: "middle", textTransform: "uppercase",
                        }}>
                          Back
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {s.type === "Practical" ? (
                        <span style={{ background: "#ede9fe", color: "#5b21b6", fontSize: "0.72rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>Practical</span>
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "#374151" }}>Theory</span>
                      )}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600 }}>{s.isBackPaper ? "—" : s.credits}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{s.max}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{s.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* C — Fee Breakdown */}
          <SectionHeader icon={<IndianRupee size={14} />} title="Fee Breakdown" />
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            {fees.map((fee) => (
              <div
                key={fee.label}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "9px 0", borderBottom: "1px solid #f3f4f6",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "#374151" }}>{fee.label}</span>
                <span style={{
                  fontSize: "0.875rem", fontWeight: 500,
                  color: fee.amount === 0 ? "#9ca3af"
                    : fee.highlight === "warn"  ? "#ef4444"
                    : fee.highlight === "extra" ? "#d97706"
                    : "#1a1a2e",
                }}>
                  {fee.amount === 0 ? "—" : (fee.highlight === "extra" ? "+ " : "") + `₹ ${fee.amount.toLocaleString("en-IN")}`}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "2px solid #e0e0e0", margin: "10px 0 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Total Payable</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#007B8A" }}>
                ₹ {grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Declaration */}
          <div style={{
            backgroundColor: "#f0fafa", border: "1px solid #b2e4ea",
            borderRadius: 8, padding: "12px 16px", marginBottom: 24,
            display: "flex", alignItems: "flex-start", gap: 10,
            fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6,
          }}>
            <CheckCircle2 size={16} color="#007B8A" style={{ flexShrink: 0, marginTop: 1 }} />
            I hereby declare that the information provided above is correct. I understand that any
            incorrect information may lead to cancellation of my examination form.
          </div>

        </div>

        {/* ── Sticky footer ──────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            padding: "14px 24px",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "none", border: "1.5px solid #d1d5db",
              borderRadius: 8, padding: "10px 20px",
              fontSize: "0.875rem", fontWeight: 500, color: "#374151",
              cursor: "pointer", transition: "border-color 0.15s",
            }}
          >
            <ArrowLeft size={15} />
            Back to Edit
          </button>

          <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
            Review all details before proceeding
          </div>

          <button
            onClick={onProceed}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              backgroundColor: "#007B8A", color: "#ffffff",
              border: "none", borderRadius: 8, padding: "11px 28px",
              fontSize: "0.9375rem", fontWeight: 700,
              cursor: "pointer", transition: "background 0.2s",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            <CreditCard size={16} />
            Confirm &amp; Proceed to Payment — ₹ {grandTotal.toLocaleString("en-IN")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helper sub-components ───────────────────────────────────────────── */

function Step({ label, state, num }: { label: string; state: "done" | "active" | "pending"; num: number }) {
  const isDone    = state === "done";
  const isActive  = state === "active";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        backgroundColor: isDone ? "#007B8A" : isActive ? "#007B8A" : "#e0e0e0",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {isDone
          ? <CheckCircle2 size={14} color="#ffffff" strokeWidth={2.5} />
          : <span style={{ fontSize: "0.72rem", fontWeight: 700, color: isDone || isActive ? "#ffffff" : "#9ca3af" }}>{num}</span>
        }
      </div>
      <span style={{
        fontSize: "0.78rem",
        fontWeight: isActive ? 700 : 500,
        color: isDone || isActive ? "#007B8A" : "#9ca3af",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

function StepArrow() {
  return (
    <ChevronRight size={14} color="#d1d5db" style={{ margin: "0 8px", flexShrink: 0 }} />
  );
}

function SectionHeader({
  icon, title, right,
}: {
  icon: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ color: "#9ca3af" }}>{icon}</span>
        <span style={{
          fontSize: "0.6875rem", fontWeight: 700, color: "#9ca3af",
          textTransform: "uppercase", letterSpacing: "0.1em",
        }}>
          {title}
        </span>
      </div>
      {right}
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  padding: "18px 20px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const detailLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3,
};

const detailValueStyle: React.CSSProperties = {
  fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e",
};

const thStyle: React.CSSProperties = {
  padding: "10px 14px", color: "#ffffff",
  fontWeight: 600, fontSize: "0.8rem",
  letterSpacing: "0.03em", textAlign: "left", whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 14px", fontSize: "0.875rem",
  color: "#1a1a2e", borderBottom: "1px solid #f3f4f6",
};
