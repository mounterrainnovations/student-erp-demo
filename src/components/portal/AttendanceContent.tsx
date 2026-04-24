"use client";

import { useMemo, useState } from "react";
import { Download, Info, Printer, CheckCircle2, AlertTriangle } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

type RowStatus = "P" | "A" | "L" | "OD";

const ATTENDANCE_DATA: {
  date: string;
  monthKey: string;
  subject: string;
  code: string;
  status: RowStatus;
  remark?: string;
}[] = [
  { date: "02 Apr 2026", monthKey: "2026-04", subject: "Compiler Design", code: "CS-601", status: "P" },
  { date: "01 Apr 2026", monthKey: "2026-04", subject: "Computer Networks Lab", code: "CS-605", status: "P" },
  { date: "28 Mar 2026", monthKey: "2026-03", subject: "Compiler Design", code: "CS-601", status: "A" },
  { date: "27 Mar 2026", monthKey: "2026-03", subject: "Software Engineering", code: "CS-602", status: "P" },
  { date: "26 Mar 2026", monthKey: "2026-03", subject: "Machine Learning", code: "CS-603", status: "P" },
  { date: "25 Mar 2026", monthKey: "2026-03", subject: "Compiler Design", code: "CS-601", status: "P" },
  { date: "20 Mar 2026", monthKey: "2026-03", subject: "Machine Learning", code: "CS-603", status: "OD", remark: "OD approved" },
  { date: "18 Mar 2026", monthKey: "2026-03", subject: "Software Engineering", code: "CS-602", status: "P" },
  { date: "15 Mar 2026", monthKey: "2026-03", subject: "Elective — Cloud Computing", code: "CS-651", status: "P" },
  { date: "10 Mar 2026", monthKey: "2026-03", subject: "Computer Networks Lab", code: "CS-605", status: "L", remark: "Medical" },
  { date: "05 Mar 2026", monthKey: "2026-03", subject: "Machine Learning", code: "CS-603", status: "P" },
  { date: "28 Feb 2026", monthKey: "2026-02", subject: "Software Engineering", code: "CS-602", status: "P" },
  { date: "20 Feb 2026", monthKey: "2026-02", subject: "Compiler Design", code: "CS-601", status: "P" },
  { date: "12 Feb 2026", monthKey: "2026-02", subject: "Elective — Cloud Computing", code: "CS-651", status: "A" },
  { date: "05 Feb 2026", monthKey: "2026-02", subject: "Machine Learning", code: "CS-603", status: "P" },
];

const ACADEMIC_YEARS = ["2024-25", "2025-26"];
const SEMESTERS = ["V", "VI"];
const MONTHS = [
  { key: "all", label: "All months" },
  { key: "2026-04", label: "April 2026" },
  { key: "2026-03", label: "March 2026" },
  { key: "2026-02", label: "February 2026" },
];

const SUBJECTS = ["All subjects", ...Array.from(new Set(ATTENDANCE_DATA.map((r) => r.code)))];

const STATUS_LABEL: Record<RowStatus, string> = {
  P: "Present",
  A: "Absent",
  L: "Leave",
  OD: "On Duty",
};

const STATUS_COLOR: Record<RowStatus, { bg: string; text: string }> = {
  P: { bg: "#d4f5e9", text: "#1a7a4a" },
  A: { bg: "#fee2e2", text: "#b91c1c" },
  L: { bg: "#fef3c7", text: "#92400e" },
  OD: { bg: "#dbeafe", text: "#1d4ed8" },
};

const MIN_PCT = 75;

function computeSummary(rows: typeof ATTENDANCE_DATA) {
  const present = rows.filter((r) => r.status === "P").length;
  const od = rows.filter((r) => r.status === "OD").length;
  const absent = rows.filter((r) => r.status === "A").length;
  const leave = rows.filter((r) => r.status === "L").length;
  const denom = present + absent + leave + od;
  const attended = present + od;
  const pct = denom === 0 ? 0 : Math.round((attended / denom) * 1000) / 10;
  return {
    held: rows.length,
    present,
    absent,
    leave,
    od,
    pct,
    attended,
  };
}

export default function AttendanceContent() {
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [semester, setSemester] = useState("VI");
  const [month, setMonth] = useState("all");
  const [subject, setSubject] = useState("All subjects");
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    return ATTENDANCE_DATA.filter((r) => {
      if (month !== "all" && r.monthKey !== month) return false;
      if (subject !== "All subjects" && r.code !== subject) return false;
      return true;
    });
  }, [month, subject]);

  const summary = useMemo(() => computeSummary(filtered), [filtered]);
  const belowMin = summary.pct < MIN_PCT && filtered.length > 0;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  };

  const handleDownload = () => {
    showToast("Attendance report downloaded (demo).");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>View Attendance</h1>
        <p style={pageSubtitleStyle}>
          Class-wise / subject-wise attendance for your current programme. Figures are sourced from the college ERP
          (demo data for presentation).
        </p>
      </div>

      <div
        style={{
          backgroundColor: belowMin ? "#fffbeb" : "#eff6ff",
          borderLeft: `4px solid ${belowMin ? "#f59e0b" : "#3b82f6"}`,
          borderRadius: 6,
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        {belowMin ? (
          <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
        ) : (
          <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
        )}
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6 }}>
          Minimum attendance required: <strong>{MIN_PCT}%</strong> (excluding on-duty, as per ordinance).
          {belowMin ? (
            <>
              {" "}
              Your calculated percentage is below the threshold for the filtered period — contact your department.
            </>
          ) : (
            <> Leave (L) is counted in the denominator for eligibility unless exempted on medical grounds.</>
          )}
        </p>
      </div>

      <div>
        <div style={sectionLabelStyle}>Session context</div>
        <div style={{ ...cardStyle, padding: "14px 24px" }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", fontSize: "0.875rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Student</div>
              <div style={{ fontWeight: 600, color: "#1a1a2e" }}>{DEMO_STUDENT.name}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Enrollment</div>
              <div>{DEMO_STUDENT.enrollmentNo}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Programme / Sem</div>
              <div>
                {DEMO_STUDENT.programme} · {DEMO_STUDENT.branch} · Sec {DEMO_STUDENT.section}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600 }}>Last sync</div>
              <div>24 Apr 2026, 06:00 AM</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Filters</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Academic year</span>
            <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} style={selectStyle}>
              {ACADEMIC_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Semester</span>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} style={selectStyle}>
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Month</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{ ...selectStyle, minWidth: 180 }}
            >
              {MONTHS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Subject</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ ...selectStyle, minWidth: 220 }}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Summary (filtered)</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { k: "Records", v: String(filtered.length) },
            { k: "Present", v: String(summary.present) },
            { k: "Absent", v: String(summary.absent) },
            { k: "Leave", v: String(summary.leave) },
            { k: "On duty", v: String(summary.od) },
            { k: "Attendance %", v: `${summary.pct}%`, highlight: true },
          ].map((x) => (
            <div
              key={x.k}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: "12px 16px",
                backgroundColor: x.highlight ? (belowMin ? "#fff7ed" : "#e6f7f9") : "#fff",
              }}
            >
              <div style={{ fontSize: "0.7rem", color: "#6b7280", fontWeight: 600 }}>{x.k}</div>
              <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1a1a2e" }}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button type="button" onClick={handleDownload} className="search-btn" style={btnPrimary}>
          <Download size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Download report
        </button>
        <button type="button" onClick={handlePrint} style={btnSecondary}>
          <Printer size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Print
        </button>
      </div>

      <div>
        <div style={sectionLabelStyle}>Detail</div>
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
                {["Date", "Subject", "Code", "Status", "Remarks"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={`${row.date}-${row.code}-${i}`}
                  className="student-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                >
                  <td style={tdStyle}>{row.date}</td>
                  <td style={tdStyle}>{row.subject}</td>
                  <td style={tdStyle}>{row.code}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: STATUS_COLOR[row.status].bg,
                        color: STATUS_COLOR[row.status].text,
                      }}
                    >
                      {row.status} — {STATUS_LABEL[row.status]}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#6b7280" }}>{row.remark || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>
        <strong>Legend:</strong> P = Present, A = Absent, L = Leave (counts unless exempted), OD = On duty (treated as
        present for eligibility). This is a demo prototype.
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
          {toast}
        </div>
      )}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  minWidth: 160,
  height: 38,
  border: "1px solid #d1d5db",
  borderRadius: 7,
  padding: "0 10px",
  fontSize: "0.875rem",
  backgroundColor: "#fff",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: "0.8125rem",
  color: "#374151",
  borderBottom: "1px solid #e0e0e0",
};

const btnPrimary: React.CSSProperties = {
  backgroundColor: "#007B8A",
  color: "#fff",
  border: "none",
  borderRadius: 7,
  padding: "10px 18px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  backgroundColor: "#fff",
  color: "#007B8A",
  border: "1px solid #007B8A",
  borderRadius: 7,
  padding: "10px 18px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
};
