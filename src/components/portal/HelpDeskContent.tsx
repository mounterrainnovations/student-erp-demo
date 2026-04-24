"use client";

import { useState } from "react";
import {
  Info,
  ChevronDown,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

const CATEGORIES = [
  "Select Category",
  "Academic",
  "Fee Related",
  "Examination",
  "Infrastructure",
  "Hostel / Mess",
  "Library",
  "Scholarship",
  "Other",
];

type GrievanceStatus = "Open" | "In Progress" | "Resolved" | "Closed";

const GRIEVANCES: {
  id: string;
  category: string;
  subject: string;
  date: string;
  status: GrievanceStatus;
}[] = [
  {
    id: "GRV-2024-0041",
    category: "Fee Related",
    subject: "Duplicate fee deducted for exam form submission",
    date: "12 Jan 2026",
    status: "Resolved",
  },
  {
    id: "GRV-2025-0018",
    category: "Examination",
    subject: "Hall ticket not generated for Semester I",
    date: "03 Mar 2026",
    status: "In Progress",
  },
  {
    id: "GRV-2025-0023",
    category: "Academic",
    subject: "Attendance marked incorrectly for October",
    date: "15 Apr 2026",
    status: "Open",
  },
];

const STATUS_STYLES: Record<GrievanceStatus, React.CSSProperties> = {
  Open: { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
  "In Progress": { background: "#dbeafe", color: "#1d4ed8", border: "1px solid #bfdbfe" },
  Resolved: { background: "#d4f5e9", color: "#1a7a4a", border: "1px solid #a7f3d0" },
  Closed: { background: "#f3f4f6", color: "#6b7280", border: "1px solid #e0e0e0" },
};

const STATUS_ICONS: Record<GrievanceStatus, React.ReactNode> = {
  Open: <AlertCircle size={11} />,
  "In Progress": <Clock size={11} />,
  Resolved: <CheckCircle2 size={11} />,
  Closed: <XCircle size={11} />,
};

export default function HelpDeskContent() {
  const [category, setCategory] = useState("Select Category");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [toastVisible, setToastVisible] = useState(false);

  const canSubmit =
    category !== "Select Category" &&
    subject.trim().length > 0 &&
    description.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setToastVisible(true);
    setCategory("Select Category");
    setSubject("");
    setDescription("");
    setPriority("Normal");
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
          Use this portal to raise academic or administrative grievances. For urgent matters,
          also contact your department office directly. All submissions are tracked and you
          will be notified of updates via the email address on record.
        </p>
      </div>

      {/* Submit a Grievance */}
      <div>
        <div style={sectionLabelStyle}>Submit a New Grievance</div>
        <div style={cardStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Category + Priority */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 220px" }}>
                <label style={labelStyle}>Category</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      width: "100%",
                      border: "1px solid #d1d5db",
                      borderRadius: 6,
                      padding: "8px 34px 8px 12px",
                      fontSize: "0.875rem",
                      color: category === "Select Category" ? "#9ca3af" : "#1a1a2e",
                      background: "#ffffff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} disabled={c === "Select Category"}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6b7280",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Priority</label>
                <div style={{ display: "flex", gap: 16, paddingTop: 7 }}>
                  {(["Normal", "Urgent"] as const).map((p) => (
                    <label
                      key={p}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color:
                          p === "Urgent" && priority === "Urgent" ? "#ef4444" : "#374151",
                        fontWeight: priority === p ? 500 : 400,
                      }}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={p}
                        checked={priority === p}
                        onChange={() => setPriority(p)}
                        style={{
                          accentColor: p === "Urgent" ? "#ef4444" : "#007B8A",
                          cursor: "pointer",
                        }}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your grievance"
                maxLength={120}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: "#1a1a2e",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail — include dates, reference numbers, or any information that would help resolve it faster."
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: "#1a1a2e",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Submit row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <span style={{ fontSize: "0.8125rem", color: "#9ca3af" }}>
                Response time: 2–5 working days
              </span>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="submit-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  backgroundColor: canSubmit ? "#007B8A" : "#e0e0e0",
                  color: canSubmit ? "#ffffff" : "#9ca3af",
                  border: "none",
                  borderRadius: 7,
                  padding: "9px 22px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                <Send size={14} />
                Submit Grievance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* My Grievances */}
      <div>
        <div style={sectionLabelStyle}>My Grievances</div>
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
                {["Ticket ID", "Category", "Subject", "Submitted", "Status"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRIEVANCES.map((row, i) => (
                <tr
                  key={row.id}
                  className="exam-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                >
                  <td
                    style={{
                      ...tdStyle,
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.id}
                  </td>
                  <td style={tdStyle}>{row.category}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{row.subject}</td>
                  <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "#6b7280" }}>
                    {row.date}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...STATUS_STYLES[row.status],
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {STATUS_ICONS[row.status]}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <CheckCircle2 size={16} color="#00C2D4" />
          Grievance submitted — you will be notified of updates
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

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#374151",
  display: "block",
  marginBottom: 4,
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
