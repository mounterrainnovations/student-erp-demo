"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

const MARKS: {
  code: string;
  subject: string;
  max: number;
  obtained: number;
}[] = [
  { code: "CS-601", subject: "Compiler Design", max: 25, obtained: 21 },
  { code: "CS-602", subject: "Software Engineering", max: 25, obtained: 20 },
  { code: "CS-603", subject: "Machine Learning", max: 25, obtained: 22 },
  { code: "CS-605", subject: "Computer Networks Lab", max: 25, obtained: 23 },
  { code: "CS-651", subject: "Elective — Cloud Computing", max: 25, obtained: 19 },
];

export default function MidtermMarksContent() {
  const [filter, setFilter] = useState("All");

  const subjects = useMemo(() => ["All", ...MARKS.map((m) => m.code)], []);
  const rows = useMemo(() => (filter === "All" ? MARKS : MARKS.filter((m) => m.code === filter)), [filter]);
  const totalObt = rows.reduce((s, m) => s + m.obtained, 0);
  const totalMax = rows.reduce((s, m) => s + m.max, 0);
  const pct = totalMax ? Math.round((totalObt / totalMax) * 1000) / 10 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Mid-term internal marks</h1>
        <p style={pageSubtitleStyle}>
          Provisional internal assessment for the current session. Final marks are subject to moderation (demo data).
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
          If any subject is missing, contact the department. Revaluation of mid-term is generally not available — refer to
          university rules (illustrative).
        </p>
      </div>

      <div style={{ ...cardStyle, padding: "14px 20px" }}>
        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Programme &amp; period</div>
        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1a2e" }}>
          {DEMO_STUDENT.programme} — {DEMO_STUDENT.branch} · {DEMO_STUDENT.semester} Semester
        </div>
        <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 4 }}>Session: 2025–26 · Mid-term — March 2026</div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Filter by subject</div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ height: 38, minWidth: 200, border: "1px solid #d1d5db", borderRadius: 7, padding: "0 10px" }}
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All subjects" : s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div style={sectionLabelStyle}>Summary (filtered)</div>
        <div style={{ display: "flex", gap: 20, fontSize: "0.875rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ color: "#6b7280" }}>Total obtained: </span>
            <strong>{totalObt}</strong> / {totalMax}
          </div>
          <div>
            <span style={{ color: "#6b7280" }}>Percentage: </span>
            <strong>{pct}%</strong>
          </div>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Subject-wise</div>
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
                {["Code", "Subject", "Max", "Obtained", "%"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const p = r.max ? Math.round((r.obtained / r.max) * 1000) / 10 : 0;
                return (
                  <tr
                    key={r.code}
                    className="student-table-row"
                    style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fdfd" }}
                  >
                    <td style={tdS}>{r.code}</td>
                    <td style={tdS}>{r.subject}</td>
                    <td style={tdS}>{r.max}</td>
                    <td style={tdS}>{r.obtained}</td>
                    <td style={tdS}>{p}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
        Disclaimer: Provisional display from internal assessment. Does not include end-semester theory/practical. Not valid
        for official transcripts without COE attestation.
      </p>
    </div>
  );
}

const tdS: React.CSSProperties = { padding: "10px 16px", fontSize: "0.8125rem", color: "#374151", borderBottom: "1px solid #e0e0e0" };
