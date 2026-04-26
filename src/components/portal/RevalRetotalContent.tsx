"use client";

import { useState } from "react";
import {
  AlertTriangle, CheckCircle2, Clock, Info,
  RotateCcw, FileSearch, Trash2, X, IndianRupee,
  BookOpen, CalendarDays,
} from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageTitleStyle, pageSubtitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

/* ── Constants ───────────────────────────────────────────────────────── */

const RETOTAL_FEE = 200;
const REVAL_FEE   = 500;
const DEADLINE    = "08 May 2026";
const DAYS_LEFT   = 12;

/* ── Types ───────────────────────────────────────────────────────────── */

type AppType = "Retotal" | "Reval";
type Status  = "Pass" | "Borderline" | "Fail";

interface Result {
  code:     string;
  name:     string;
  type:     "Theory" | "Practical";
  max:      number;
  obtained: number;
  passmark: number;
}

interface Application {
  code:        string;
  name:        string;
  appType:     AppType;
  fee:         number;
  subjectType: "Theory" | "Practical";
}

/* ── Data ────────────────────────────────────────────────────────────── */

const RESULTS: Result[] = [
  { code: "CS601", name: "Theory of Computation",       type: "Theory",    max: 70, obtained: 52, passmark: 25 },
  { code: "CS602", name: "Compiler Design",             type: "Theory",    max: 70, obtained: 23, passmark: 25 },
  { code: "CS603", name: "Computer Networks",           type: "Theory",    max: 70, obtained: 58, passmark: 25 },
  { code: "CS604", name: "Software Engineering",        type: "Theory",    max: 70, obtained: 28, passmark: 25 },
  { code: "CS605", name: "Web Technologies (Elective)", type: "Theory",    max: 70, obtained: 36, passmark: 25 },
  { code: "CS606", name: "Networks Lab",                type: "Practical", max: 30, obtained: 24, passmark: 11 },
  { code: "CS607", name: "Compiler Design Lab",         type: "Practical", max: 30, obtained: 18, passmark: 11 },
];

function getStatus(r: Result): Status {
  if (r.obtained < r.passmark)     return "Fail";
  if (r.obtained < r.passmark + 5) return "Borderline";
  return "Pass";
}

/* ── Main Component ──────────────────────────────────────────────────── */

export default function RevalRetotalContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [toastVisible, setToastVisible]     = useState(false);

  const totalFee = applications.reduce((s, a) => s + a.fee, 0);

  function getApplied(code: string): AppType | null {
    return applications.find((a) => a.code === code)?.appType ?? null;
  }

  function toggleApp(result: Result, appType: AppType) {
    if (appType === "Reval" && result.type === "Practical") return;

    setApplications((prev) => {
      const existing = prev.find((a) => a.code === result.code);
      if (existing?.appType === appType) {
        return prev.filter((a) => a.code !== result.code);
      }
      return [
        ...prev.filter((a) => a.code !== result.code),
        { code: result.code, name: result.name, appType, fee: appType === "Retotal" ? RETOTAL_FEE : REVAL_FEE, subjectType: result.type },
      ];
    });
  }

  function removeApp(code: string) {
    setApplications((prev) => prev.filter((a) => a.code !== code));
  }

  function handleSubmit() {
    setToastVisible(true);
    setApplications([]);
    setConfirmChecked(false);
    setTimeout(() => setToastVisible(false), 4000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Page header */}
      <div>
        <h1 style={pageTitleStyle}>Apply for Revaluation / Retotalling</h1>
        <p style={{ ...pageSubtitleStyle, marginBottom: 0 }}>
          End-semester results · November 2025 · Semester VI · B.E. Computer Science &amp; Engineering
        </p>
      </div>

      {/* Deadline warning */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        backgroundColor: "#fff8e1", borderLeft: "4px solid #f59e0b",
        borderRadius: 6, padding: "12px 16px",
      }}>
        <Clock size={17} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#92400e" }}>
            Application window closes in {DAYS_LEFT} days
          </span>
          <span style={{ fontSize: "0.8125rem", color: "#78350f" }}>
            {" "}— Last date: {DEADLINE}. Submit before the deadline; late applications will not be accepted.
          </span>
        </div>
      </div>

      {/* Student + session card */}
      <div style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px 28px", padding: "16px 24px" }}>
        {[
          { icon: <BookOpen size={14} color="#9ca3af" />,     label: "Student",      value: "Rajesh Kumar · 0101CS221001"            },
          { icon: <CalendarDays size={14} color="#9ca3af" />, label: "Exam Session", value: "End-Semester · November 2025"           },
          { icon: <CheckCircle2 size={14} color="#16a34a" />, label: "Result Status", value: "Declared · 12 Mar 2026"               },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fee type info */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <InfoPill
          color="#3b82f6"
          bg="#eff6ff"
          border="#bfdbfe"
          icon={<RotateCcw size={13} />}
          text={`Retotalling — ₹ ${RETOTAL_FEE}/subject`}
          sub="Marks re-added by a new examiner"
        />
        <InfoPill
          color="#007B8A"
          bg="#e6f7f9"
          border="#a5d8df"
          icon={<FileSearch size={13} />}
          text={`Revaluation — ₹ ${REVAL_FEE}/subject`}
          sub="Full re-checking of answer sheet · Theory only"
        />
        <InfoPill
          color="#6b7280"
          bg="#f9fafb"
          border="#e5e7eb"
          icon={<Info size={13} />}
          text="Reval not applicable for Practical exams"
          sub="Retotalling is available for Practical"
        />
      </div>

      {/* Results table */}
      <div>
        <div style={sectionLabelStyle}>Subject-Wise Results &amp; Apply</div>
        <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007B8A" }}>
                {["Code", "Subject Name", "Type", "Max", "Obtained", "%", "Status", "Retotalling", "Revaluation"].map((h) => (
                  <th key={h} style={{ ...thStyle, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((r, i) => {
                const status   = getStatus(r);
                const pct      = Math.round((r.obtained / r.max) * 1000) / 10;
                const applied  = getApplied(r.code);
                const rowBg    = status === "Fail"       ? "#fff5f5"
                               : status === "Borderline" ? "#fffbeb"
                               : i % 2 === 0            ? "#ffffff"
                               :                          "#f8fdfd";

                return (
                  <tr key={r.code} style={{ backgroundColor: rowBg }}>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "0.8rem", color: "#374151" }}>
                      {r.code}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500, color: "#1a1a2e" }}>
                      {r.name}
                    </td>
                    <td style={tdStyle}>
                      {r.type === "Practical"
                        ? <span style={{ background: "#ede9fe", color: "#5b21b6", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>Practical</span>
                        : <span style={{ fontSize: "0.8rem", color: "#374151" }}>Theory</span>
                      }
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#6b7280" }}>{r.max}</td>
                    <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700, color: status === "Fail" ? "#dc2626" : "#1a1a2e" }}>
                      {r.obtained}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#6b7280" }}>
                      {pct}%
                    </td>
                    <td style={{ ...tdStyle }}>
                      <StatusBadge status={status} />
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <ApplyButton
                        active={applied === "Retotal"}
                        color="#2563eb"
                        activeBg="#dbeafe"
                        activeColor="#1d4ed8"
                        label="Retotal"
                        fee={RETOTAL_FEE}
                        onClick={() => toggleApp(r, "Retotal")}
                      />
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {r.type === "Practical" ? (
                        <span style={{ fontSize: "0.75rem", color: "#d1d5db", userSelect: "none" }}>—</span>
                      ) : (
                        <ApplyButton
                          active={applied === "Reval"}
                          color="#007B8A"
                          activeBg="#e6f7f9"
                          activeColor="#005f6b"
                          label="Reval"
                          fee={REVAL_FEE}
                          onClick={() => toggleApp(r, "Reval")}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 8 }}>
          Pass mark: 25 / 70 for Theory · 11 / 30 for Practical. Borderline = within 5 marks of the pass cutoff.
        </p>
      </div>

      {/* Application cart */}
      {applications.length > 0 && (
        <div className="fade-in-up">
          <div style={sectionLabelStyle}>Selected Applications ({applications.length})</div>
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>

            {/* Cart rows */}
            {applications.map((app, i) => (
              <div
                key={app.code}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 20px",
                  borderBottom: i < applications.length - 1 ? "1px solid #f3f4f6" : "none",
                  backgroundColor: app.appType === "Reval" ? "#f0fafa" : "#f0f5ff",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  backgroundColor: app.appType === "Reval" ? "#e6f7f9" : "#dbeafe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {app.appType === "Reval"
                    ? <FileSearch size={14} color="#007B8A" />
                    : <RotateCcw size={14} color="#2563eb" />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e" }}>
                    {app.code} · {app.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, padding: "1px 8px", borderRadius: 20,
                      backgroundColor: app.appType === "Reval" ? "#e6f7f9" : "#dbeafe",
                      color: app.appType === "Reval" ? "#007B8A" : "#1d4ed8",
                    }}>
                      {app.appType}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{app.subjectType}</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#1a1a2e", minWidth: 80, textAlign: "right" }}>
                  ₹ {app.fee.toLocaleString("en-IN")}
                </div>
                <button
                  onClick={() => removeApp(app.code)}
                  style={{
                    background: "none", border: "1px solid #e5e7eb", borderRadius: 6,
                    width: 28, height: 28, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#9ca3af", flexShrink: 0,
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {/* Total + submit */}
            <div style={{ borderTop: "2px solid #e0e0e0", padding: "16px 20px", backgroundColor: "#ffffff" }}>

              {/* Total row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#374151" }}>
                  Total Payable ({applications.length} application{applications.length > 1 ? "s" : ""})
                </span>
                <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#007B8A" }}>
                  ₹ {totalFee.toLocaleString("en-IN")}
                </span>
              </div>

              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>

                {/* Confirm checkbox */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", marginBottom: 14 }}>
                  <input
                    type="checkbox"
                    checked={confirmChecked}
                    onChange={(e) => setConfirmChecked(e.target.checked)}
                    style={{ accentColor: "#007B8A", width: 15, height: 15, marginTop: 2, cursor: "pointer", flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "0.8125rem", color: "#374151", lineHeight: 1.5 }}>
                    I confirm that the subject details and application type are correct. I understand that fees once paid
                    are non-refundable and the decision of the examination authority is final.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={!confirmChecked}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    backgroundColor: confirmChecked ? "#007B8A" : "#e0e0e0",
                    color: confirmChecked ? "#ffffff" : "#9ca3af",
                    border: "none", borderRadius: 8, padding: "12px",
                    fontSize: "0.9375rem", fontWeight: 600,
                    cursor: confirmChecked ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  <IndianRupee size={16} />
                  Proceed to Payment — ₹ {totalFee.toLocaleString("en-IN")}
                </button>

                {confirmChecked && (
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af", textAlign: "center", margin: "10px 0 0" }}>
                    You will be redirected to the payment gateway. Keep your transaction receipt.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when nothing selected */}
      {applications.length === 0 && (
        <div style={{
          ...cardStyle,
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "32px 20px", gap: 10, color: "#9ca3af",
        }}>
          <FileSearch size={32} strokeWidth={1.25} />
          <span style={{ fontSize: "0.875rem" }}>
            Select Retotalling or Revaluation for any subject above to add it to your application.
          </span>
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div style={{
          position: "fixed", bottom: 28, right: 28,
          backgroundColor: "#1a1a2e", color: "#ffffff",
          padding: "14px 18px", borderRadius: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          fontSize: "0.875rem", fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          zIndex: 9999,
        }}>
          <CheckCircle2 size={16} color="#00C2D4" />
          Application submitted — payment integration coming soon.
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function InfoPill({
  color, bg, border, icon, text, sub,
}: {
  color: string; bg: string; border: string;
  icon: React.ReactNode; text: string; sub: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 9,
      backgroundColor: bg, border: `1px solid ${border}`,
      borderRadius: 8, padding: "9px 14px", flex: "1 1 200px",
    }}>
      <span style={{ color, marginTop: 1, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color }}>{text}</div>
        <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = {
    Pass:       { bg: "#dcfce7", color: "#15803d", label: "Pass" },
    Borderline: { bg: "#fef9c3", color: "#a16207", label: "Borderline" },
    Fail:       { bg: "#fee2e2", color: "#dc2626", label: "Fail" },
  }[status];
  return (
    <span style={{
      fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: 20,
      backgroundColor: cfg.bg, color: cfg.color, whiteSpace: "nowrap",
    }}>
      {cfg.label}
    </span>
  );
}

function ApplyButton({
  active, color, activeBg, activeColor, label, fee, onClick,
}: {
  active: boolean; color: string; activeBg: string; activeColor: string;
  label: string; fee: number; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", flexDirection: "column", alignItems: "center",
        gap: 1, padding: "5px 12px", borderRadius: 7, cursor: "pointer",
        border: active ? `1.5px solid ${color}` : "1.5px solid #e5e7eb",
        backgroundColor: active ? activeBg : "#f9fafb",
        transition: "all 0.15s",
        minWidth: 72,
      }}
    >
      <span style={{ fontSize: "0.75rem", fontWeight: active ? 700 : 500, color: active ? activeColor : "#6b7280" }}>
        {active ? "✓ Applied" : label}
      </span>
      <span style={{ fontSize: "0.65rem", color: active ? color : "#9ca3af" }}>
        ₹ {fee}
      </span>
    </button>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const tdStyle: React.CSSProperties = {
  padding: "11px 16px",
  fontSize: "0.875rem",
  color: "#374151",
  borderBottom: "1px solid #f0f0f0",
};
