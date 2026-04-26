"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Info, BookOpen } from "lucide-react";

/* ── Data ────────────────────────────────────────────────────────────── */

interface Subject {
  sno: number;
  code: string;
  name: string;
  type: "Theory" | "Practical";
  credits: number;
  max: number;
  min: number;
  locked: boolean; // locked = compulsory, cannot uncheck
}

interface BackPaper {
  code: string;
  name: string;
  semester: string;
  type: "Theory" | "Practical";
  fee: number;
}

const CORE_SUBJECTS: Subject[] = [
  { sno: 1, code: "CS601", name: "Theory of Computation",           type: "Theory",    credits: 4, max: 100, min: 35, locked: true  },
  { sno: 2, code: "CS602", name: "Compiler Design",                 type: "Theory",    credits: 4, max: 100, min: 35, locked: true  },
  { sno: 3, code: "CS603", name: "Computer Networks",               type: "Theory",    credits: 4, max: 100, min: 35, locked: true  },
  { sno: 4, code: "CS604", name: "Software Engineering",            type: "Theory",    credits: 3, max: 100, min: 35, locked: true  },
  { sno: 5, code: "CS605", name: "Web Technologies (Elective)",     type: "Theory",    credits: 3, max:  50, min: 18, locked: false },
  { sno: 6, code: "CS606", name: "Networks Lab",                    type: "Practical", credits: 2, max:  50, min: 18, locked: true  },
  { sno: 7, code: "CS607", name: "Compiler Design Lab",             type: "Practical", credits: 2, max:  50, min: 18, locked: true  },
];

const AVAILABLE_BACK_PAPERS: BackPaper[] = [
  { code: "CS501", name: "Microprocessors & Microcontrollers", semester: "5th", type: "Theory",    fee: 200 },
  { code: "CS502", name: "Database Management Systems",        semester: "5th", type: "Theory",    fee: 200 },
  { code: "CS503", name: "Operating Systems",                  semester: "5th", type: "Theory",    fee: 200 },
  { code: "CS404", name: "Data Structures & Algorithms",       semester: "4th", type: "Theory",    fee: 200 },
  { code: "CS405", name: "Object Oriented Programming",        semester: "4th", type: "Theory",    fee: 200 },
  { code: "CS306", name: "Digital Electronics Lab",            semester: "3rd", type: "Practical", fee: 150 },
];

/* ── Component ───────────────────────────────────────────────────────── */

interface SubjectListProps {
  onExtraSubjectsChange?: (added: BackPaper[]) => void;
  onSubjectsChange?: (selected: Subject[]) => void;
}

export default function SubjectList({ onExtraSubjectsChange, onSubjectsChange }: SubjectListProps) {
  const [checkedCodes, setCheckedCodes] = useState<Set<string>>(
    new Set(CORE_SUBJECTS.filter((s) => s.locked).map((s) => s.code))
  );
  const [backPanelOpen, setBackPanelOpen] = useState(false);
  const [addedBackPapers, setAddedBackPapers] = useState<BackPaper[]>([]);

  const selectedSubjects = CORE_SUBJECTS.filter((s) => checkedCodes.has(s.code));
  const totalCredits = selectedSubjects.reduce((s, x) => s + x.credits, 0);

  // Report initial selection to parent on mount
  useEffect(() => {
    onSubjectsChange?.(CORE_SUBJECTS.filter((s) => s.locked));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleSubject(code: string, locked: boolean) {
    if (locked) return;
    setCheckedCodes((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      const updated = CORE_SUBJECTS.filter((s) => next.has(s.code));
      onSubjectsChange?.(updated);
      return next;
    });
  }

  function addBackPaper(bp: BackPaper) {
    if (addedBackPapers.some((a) => a.code === bp.code)) return;
    const next = [...addedBackPapers, bp];
    setAddedBackPapers(next);
    onExtraSubjectsChange?.(next);
  }

  function removeBackPaper(code: string) {
    const next = addedBackPapers.filter((a) => a.code !== code);
    setAddedBackPapers(next);
    onExtraSubjectsChange?.(next);
  }

  const extraFee = addedBackPapers.reduce((s, b) => s + b.fee, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={sectionLabelStyle}>Subject Selection</div>

      {/* ── Regular Subjects Card ─────────────────────────────────── */}
      <div style={cardStyle}>
        {/* Card header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BookOpen size={16} color="#007B8A" strokeWidth={1.75} />
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a2e" }}>
              Regular Subjects — Semester VI
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Chip label={`${checkedCodes.size} selected`} bg="#e6f7f9" color="#007B8A" />
            <Chip label={`${totalCredits} credits`} bg="#f0fdf4" color="#166534" />
          </div>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007B8A" }}>
                {["", "S.No.", "Code", "Subject Name", "Type", "Credits", "Max", "Min"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CORE_SUBJECTS.map((row, i) => {
                const checked = checkedCodes.has(row.code);
                return (
                  <tr
                    key={row.code}
                    onClick={() => toggleSubject(row.code, row.locked)}
                    className="exam-table-row"
                    style={{
                      backgroundColor: !checked
                        ? "#f9fafb"
                        : i % 2 === 0
                        ? "#ffffff"
                        : "#f8fdfd",
                      opacity: checked ? 1 : 0.55,
                      cursor: row.locked ? "default" : "pointer",
                      transition: "opacity 0.15s, background 0.15s",
                    }}
                  >
                    <td style={{ ...tdStyle, width: 40, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly={row.locked}
                        onChange={() => toggleSubject(row.code, row.locked)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          accentColor: "#007B8A",
                          width: 15,
                          height: 15,
                          cursor: row.locked ? "default" : "pointer",
                        }}
                      />
                    </td>
                    <td style={{ ...tdStyle, color: "#9ca3af", width: 50 }}>{row.sno}</td>
                    <td
                      style={{
                        ...tdStyle,
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#374151",
                        width: 80,
                      }}
                    >
                      {row.code}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>
                      <span>{row.name}</span>
                      {row.locked && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            color: "#9ca3af",
                            backgroundColor: "#f3f4f6",
                            borderRadius: 4,
                            padding: "1px 5px",
                            verticalAlign: "middle",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Compulsory
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <TypeBadge type={row.type} />
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600, color: "#374151" }}>
                      {row.credits}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{row.max}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{row.min}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
        >
          <Info size={13} color="#9ca3af" />
          Compulsory subjects cannot be deselected. Elective subjects can be toggled.
        </div>
      </div>

      {/* ── Back / Ex-Back Papers Card ────────────────────────────── */}
      <div style={cardStyle}>
        {/* Toggle header */}
        <button
          onClick={() => setBackPanelOpen((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={14} color="#d97706" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a2e" }}>
              Add Ex / Back Papers
            </span>
            {addedBackPapers.length > 0 && (
              <Chip
                label={`${addedBackPapers.length} added`}
                bg="#fef3c7"
                color="#92400e"
              />
            )}
          </div>
          {backPanelOpen ? (
            <ChevronUp size={16} color="#6b7280" />
          ) : (
            <ChevronDown size={16} color="#6b7280" />
          )}
        </button>

        {/* Collapsible panel */}
        <div
          style={{
            maxHeight: backPanelOpen ? 600 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div style={{ paddingTop: 16 }}>
            {/* Info banner */}
            <div
              style={{
                backgroundColor: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 6,
                padding: "10px 14px",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 14,
                fontSize: "0.8rem",
                color: "#78350f",
              }}
            >
              <Info size={14} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              Additional fee of ₹ 200 per theory back paper and ₹ 150 per practical back paper will be charged at checkout.
            </div>

            {/* Available back papers table */}
            <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f3f4f6" }}>
                    {["Code", "Subject Name", "Semester", "Type", "Fee", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          ...thStyle,
                          backgroundColor: "transparent",
                          color: "#374151",
                          fontSize: "0.75rem",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AVAILABLE_BACK_PAPERS.map((bp, i) => {
                    const alreadyAdded = addedBackPapers.some((a) => a.code === bp.code);
                    return (
                      <tr
                        key={bp.code}
                        style={{
                          backgroundColor: alreadyAdded
                            ? "#f0fdf4"
                            : i % 2 === 0
                            ? "#ffffff"
                            : "#fafafa",
                          transition: "background 0.15s",
                        }}
                      >
                        <td
                          style={{
                            ...tdStyle,
                            fontFamily: "monospace",
                            fontSize: "0.8rem",
                            color: "#374151",
                          }}
                        >
                          {bp.code}
                        </td>
                        <td style={{ ...tdStyle, fontWeight: 500 }}>{bp.name}</td>
                        <td style={{ ...tdStyle, color: "#6b7280" }}>Sem {bp.semester}</td>
                        <td style={tdStyle}>
                          <TypeBadge type={bp.type} />
                        </td>
                        <td style={{ ...tdStyle, fontWeight: 600, color: "#374151" }}>
                          ₹ {bp.fee}
                        </td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>
                          {alreadyAdded ? (
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "#16a34a",
                                backgroundColor: "#dcfce7",
                                padding: "3px 10px",
                                borderRadius: 20,
                              }}
                            >
                              Added ✓
                            </span>
                          ) : (
                            <button
                              onClick={() => addBackPaper(bp)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                backgroundColor: "#007B8A",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: 6,
                                padding: "5px 12px",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background 0.15s",
                              }}
                            >
                              <Plus size={12} strokeWidth={2.5} />
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Added Extra Subjects ──────────────────────────────────── */}
      {addedBackPapers.length > 0 && (
        <div
          style={{
            ...cardStyle,
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#14532d" }}>
              Added Extra Subjects ({addedBackPapers.length})
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#14532d" }}>
              Extra Fee: ₹ {extraFee.toLocaleString("en-IN")}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {addedBackPapers.map((bp) => (
              <div
                key={bp.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff",
                  border: "1px solid #bbf7d0",
                  borderRadius: 8,
                  padding: "10px 14px",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      color: "#374151",
                      backgroundColor: "#f3f4f6",
                      padding: "2px 8px",
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                  >
                    {bp.code}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>
                      {bp.name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                      Sem {bp.semester} · {bp.type} · ₹ {bp.fee}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeBackPaper(bp.code)}
                  title="Remove"
                  style={{
                    background: "none",
                    border: "1px solid #fca5a5",
                    borderRadius: 6,
                    padding: "4px 6px",
                    cursor: "pointer",
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                    transition: "background 0.15s",
                  }}
                >
                  <Trash2 size={13} strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Helper sub-components ───────────────────────────────────────────── */

function TypeBadge({ type }: { type: "Theory" | "Practical" }) {
  return type === "Practical" ? (
    <span
      style={{
        background: "#ede9fe",
        color: "#5b21b6",
        fontSize: "0.72rem",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 20,
        display: "inline-block",
      }}
    >
      Practical
    </span>
  ) : (
    <span style={{ fontSize: "0.8rem", color: "#374151" }}>Theory</span>
  );
}

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        fontSize: "0.72rem",
        fontWeight: 700,
        padding: "2px 10px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 2,
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  padding: "20px 24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const thStyle: React.CSSProperties = {
  padding: "10px 14px",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.8125rem",
  letterSpacing: "0.03em",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "0.875rem",
  color: "#1a1a2e",
  borderBottom: "1px solid #f3f4f6",
};
