"use client";

import { useState } from "react";
import { ChevronDown, Search, Loader2, User, SlidersHorizontal, GraduationCap, MapPin } from "lucide-react";

/* ── Exam type data ──────────────────────────────────────────────────── */

const SEMESTER_EXAMS = [
  { value: "Regular",     label: "Regular",     desc: "Appearing for the current semester subjects for the first time."          },
  { value: "Back Paper",  label: "Back Paper",  desc: "Re-appearing for subjects failed in a previous semester examination."    },
  { value: "Ex-Back",     label: "Ex-Back",     desc: "Re-attempting subjects previously appeared as back paper but not cleared." },
  { value: "Improvement", label: "Improvement", desc: "Appearing to improve marks in already passed subjects."                  },
];

const SEMESTER_VALUES = new Set(SEMESTER_EXAMS.map((e) => e.value));

interface CompExam { id: string; label: string; }

const COMPETITIVE_CATEGORIES: { cat: string; exams: CompExam[] }[] = [
  {
    cat: "BU University Entrance",
    exams: [
      { id: "BU_PHD",   label: "BU PhD Entrance"      },
      { id: "BU_LLB",   label: "BU LLB Entrance"      },
      { id: "BU_MBA",   label: "BU MBA / PGDM"        },
      { id: "BU_MCA",   label: "BU MCA Entrance"      },
      { id: "BU_BED",   label: "BU B.Ed / M.Ed"       },
      { id: "BU_MPHIL", label: "BU M.Phil Entrance"   },
    ],
  },
];

const EXAM_CENTRES = [
  "GEC Bhopal (Centre No. 0101)",
  "MANIT Bhopal (Centre No. 0102)",
  "RGPV Bhopal (Centre No. 0103)",
  "SATI Vidisha (Centre No. 0104)",
  "Govt. P.G. College, Hoshangabad",
];

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const STUDENT_INFO = [
  { label: "Student Name",   value: "Rajesh Kumar"                      },
  { label: "College",        value: "Govt. Engineering College, Bhopal" },
  { label: "Programme",      value: "B.E."                              },
  { label: "Branch",         value: "Computer Science & Engineering"    },
  { label: "Category",       value: "General"                           },
  { label: "Admission Year", value: "2022"                              },
];

/* ── Props ───────────────────────────────────────────────────────────── */

interface Props {
  enrollmentNo?: string;
  examType: string;
  onExamTypeChange: (t: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

/* ── Component ───────────────────────────────────────────────────────── */

export default function ExamFormPrerequisites({
  enrollmentNo = "0101CS221001",
  examType,
  onExamTypeChange,
  onSearch,
  isSearching,
}: Props) {
  const [semester, setSemester] = useState("6th");
  const [centre, setCentre]     = useState(EXAM_CENTRES[0]);

  const isSemester   = SEMESTER_VALUES.has(examType);
  const isCompetitive = examType !== "" && !isSemester;
  const activeSemDesc = SEMESTER_EXAMS.find((e) => e.value === examType)?.desc;

  // label shown in search button row
  const selectedLabel = (() => {
    if (!examType) return null;
    if (isSemester) return `${examType} · Semester ${semester}`;
    // find competitive label
    for (const grp of COMPETITIVE_CATEGORIES) {
      const found = grp.exams.find((e) => e.id === examType);
      if (found) return found.label;
    }
    return examType;
  })();

  return (
    <div>
      <div style={sectionLabelStyle}>Exam Form Prerequisites</div>

      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>

        {/* ── Zone 1: Student Information ────────────────────────── */}
        <div style={{ padding: "16px 24px 14px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={zoneHeaderStyle}>
            <User size={13} color="#9ca3af" strokeWidth={2} />
            Student Information
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "12px 24px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={readLabelStyle}>Enrollment No.</div>
              <input readOnly value={enrollmentNo} style={readInputStyle} />
            </div>
            {STUDENT_INFO.map((row) => (
              <div key={row.label}>
                <div style={readLabelStyle}>{row.label}</div>
                <div style={readValueStyle}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Zone 2: Exam Selection ─────────────────────────────── */}
        <div style={{ padding: "18px 24px 20px" }}>
          <div style={zoneHeaderStyle}>
            <SlidersHorizontal size={13} color="#9ca3af" strokeWidth={2} />
            Select Examination
          </div>

          {/* — Semester Examinations — */}
          <div style={{ marginBottom: 20 }}>
            <div style={groupLabelStyle}>
              <span style={{
                display: "inline-block", width: 8, height: 8,
                borderRadius: "50%", backgroundColor: "#007B8A", marginRight: 6,
              }} />
              Semester Examination
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SEMESTER_EXAMS.map((et) => {
                const active = examType === et.value;
                return (
                  <button
                    key={et.value}
                    type="button"
                    onClick={() => onExamTypeChange(et.value)}
                    style={{
                      border: active ? "2px solid #007B8A" : "1.5px solid #e0e0e0",
                      borderRadius: 8,
                      padding: "9px 18px",
                      cursor: "pointer",
                      backgroundColor: active ? "#e6f7f9" : "#ffffff",
                      display: "flex", alignItems: "center", gap: 8,
                      transition: "border 0.15s, background 0.15s",
                    }}
                  >
                    <span style={{
                      width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
                      border: active ? "3.5px solid #007B8A" : "2px solid #d1d5db",
                      transition: "border 0.15s",
                    }} />
                    <span style={{
                      fontSize: "0.8125rem",
                      fontWeight: active ? 700 : 500,
                      color: active ? "#007B8A" : "#374151",
                    }}>
                      {et.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeSemDesc && (
              <div style={{
                marginTop: 10, display: "inline-flex", alignItems: "flex-start",
                gap: 7, backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: 6, padding: "7px 12px",
                fontSize: "0.78rem", color: "#166534", lineHeight: 1.5,
              }}>
                <GraduationCap size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                {activeSemDesc}
              </div>
            )}
          </div>

          {/* — University Entrance Examinations — */}
          <div style={{ marginBottom: 20 }}>
            <div style={groupLabelStyle}>
              <span style={{
                display: "inline-block", width: 8, height: 8,
                borderRadius: "50%", backgroundColor: "#9ca3af", marginRight: 6,
              }} />
              University Entrance Examinations
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {COMPETITIVE_CATEGORIES.map((grp) => (
                <div key={grp.cat}>
                  <div style={subCatLabelStyle}>{grp.cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {grp.exams.map((ex) => {
                      const active = examType === ex.id;
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => onExamTypeChange(ex.id)}
                          style={{
                            border: active ? "1.5px solid #6b7280" : "1.5px solid #e5e7eb",
                            borderRadius: 20,
                            padding: "5px 14px",
                            cursor: "pointer",
                            backgroundColor: active ? "#374151" : "#f9fafb",
                            fontSize: "0.78rem",
                            fontWeight: active ? 600 : 400,
                            color: active ? "#ffffff" : "#6b7280",
                            transition: "border 0.12s, background 0.12s, color 0.12s",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ex.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Conditional parameter fields ───────────────────────── */}
          {examType && (
            <div style={{
              borderTop: "1px solid #f0f0f0", paddingTop: 18,
              display: "flex", flexWrap: "wrap", gap: "14px 24px",
              alignItems: "flex-end",
            }}>
              {/* Semester — only for semester exams */}
              {isSemester && (
                <div style={{ minWidth: 160 }}>
                  <label style={labelStyle}>Semester <Req /></label>
                  <SelectField value={semester} onChange={setSemester} options={SEMESTERS} />
                </div>
              )}

              {/* Exam Centre — always shown once exam type selected */}
              <div style={{ minWidth: 240, flex: 1 }}>
                <label style={labelStyle}>
                  <MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle", color: "#9ca3af" }} />
                  Exam Centre <Req />
                </label>
                <SelectField value={centre} onChange={setCentre} options={EXAM_CENTRES} />
              </div>

              {/* Fixed info badge for competitive exams */}
              {isCompetitive && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{
                    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: 6, padding: "8px 14px",
                    fontSize: "0.78rem", color: "#6b7280",
                    display: "flex", alignItems: "center", gap: 7,
                  }}>
                    <span style={{ fontSize: "1rem" }}>ℹ️</span>
                    Exam date, session and syllabus are determined by the respective examination body.
                    The centre above is for correspondence and admit card dispatch only.
                  </div>

                  {/* Prior Academic Qualifications Section */}
                  <div style={{
                    border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 20px",
                    backgroundColor: "#ffffff",
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                      Prior Academic Qualifications
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px 24px" }}>
                      {/* Class 10th */}
                      <div>
                        <label style={labelStyle}>Class 10th Percentage / CGPA <Req /></label>
                        <input type="text" placeholder="e.g. 85.5%" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Class 10th Mark Sheet <Req /></label>
                        <input type="file" style={fileInputStyle} />
                      </div>

                      {/* Class 12th */}
                      <div>
                        <label style={labelStyle}>Class 12th Percentage / CGPA <Req /></label>
                        <input type="text" placeholder="e.g. 88.2%" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Class 12th Mark Sheet <Req /></label>
                        <input type="file" style={fileInputStyle} />
                      </div>
                      
                      {/* Other Degrees */}
                      <div>
                        <label style={labelStyle}>Number of Other Degrees Completed</label>
                        <SelectField value="0" onChange={() => {}} options={["0", "1", "2", "3+"]} />
                      </div>

                      {/* Other Details */}
                      <div>
                        <label style={labelStyle}>Other Exam Details / Pipeline Info</label>
                        <input type="text" placeholder="Any additional context..." style={inputStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Search row ─────────────────────────────────────────── */}
          <div style={{
            borderTop: "1px solid #f0f0f0", marginTop: 18, paddingTop: 14,
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12,
          }}>
            <span style={{ fontSize: "0.78rem", color: "#9ca3af", marginRight: "auto" }}>
              {selectedLabel
                ? <><strong style={{ color: "#374151" }}>Selected:</strong> {selectedLabel}</>
                : "Select an examination type to continue"}
            </span>
            <button
              onClick={onSearch}
              disabled={isSearching || !examType}
              className="search-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                backgroundColor: isSearching || !examType ? "#9ab8bc" : "#007B8A",
                color: "#ffffff", border: "none", borderRadius: 7,
                padding: "10px 28px", fontSize: "0.875rem", fontWeight: 600,
                cursor: isSearching || !examType ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease", letterSpacing: "0.02em",
              }}
            >
              {isSearching ? (
                <><Loader2 size={15} style={{ animation: "spin 0.7s linear infinite" }} /> Searching…</>
              ) : (
                <><Search size={15} /> Search</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none", WebkitAppearance: "none",
          border: "1px solid #d1d5db", borderRadius: 7,
          padding: "9px 34px 9px 12px", fontSize: "0.875rem",
          color: "#1a1a2e", width: "100%", background: "#ffffff",
          cursor: "pointer", outline: "none",
        }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} style={{
        position: "absolute", right: 10, top: "50%",
        transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280",
      }} />
    </div>
  );
}

function Req() {
  return <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>;
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem", fontWeight: 700, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
};

const zoneHeaderStyle: React.CSSProperties = {
  fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.08em",
  display: "flex", alignItems: "center", gap: 6, marginBottom: 14,
};

const groupLabelStyle: React.CSSProperties = {
  fontSize: "0.78rem", fontWeight: 600, color: "#374151",
  marginBottom: 10, display: "flex", alignItems: "center",
};

const subCatLabelStyle: React.CSSProperties = {
  fontSize: "0.68rem", fontWeight: 600, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6,
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem", fontWeight: 600, color: "#374151",
  display: "block", marginBottom: 6,
};

const readLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3,
};

const readValueStyle: React.CSSProperties = {
  fontSize: "0.875rem", fontWeight: 500, color: "#374151", lineHeight: 1.4,
};

const readInputStyle: React.CSSProperties = {
  background: "#f3f4f6", border: "1px solid #e0e0e0", borderRadius: 7,
  padding: "9px 12px", fontSize: "0.875rem", color: "#1a1a2e",
  width: "100%", cursor: "not-allowed", display: "block",
  fontFamily: "monospace", letterSpacing: "0.04em", boxSizing: "border-box",
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff", border: "1px solid #e0e0e0",
  borderRadius: 8, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #d1d5db", borderRadius: 7,
  padding: "9px 12px", fontSize: "0.875rem",
  color: "#1a1a2e", width: "100%", background: "#ffffff",
  outline: "none", boxSizing: "border-box",
};

const fileInputStyle: React.CSSProperties = {
  ...inputStyle,
  padding: "6px 12px",
  color: "#6b7280",
};
