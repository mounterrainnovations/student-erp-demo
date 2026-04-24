"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, Users, Award, CheckCircle2, XCircle, Briefcase } from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

/* ── Placement stats ─────────────────────────────────────── */
const STATS = [
  {
    icon: <Users size={20} color="#007B8A" />,
    value: "87%",
    label: "Campus Placed",
    sub: "Batch 2024-25",
  },
  {
    icon: <TrendingUp size={20} color="#007B8A" />,
    value: "₹4.2 LPA",
    label: "Average Package",
    sub: "IT Branch",
  },
  {
    icon: <Award size={20} color="#007B8A" />,
    value: "₹12 LPA",
    label: "Highest Package",
    sub: "Microsoft",
  },
];

/* ── Eligibility criteria ────────────────────────────────── */
type EligibilityStatus = "eligible" | "not-eligible" | "action-required";

const CRITERIA: {
  label: string;
  requirement: string;
  yours: string;
  status: EligibilityStatus;
}[] = [
  { label: "CGPA", requirement: "≥ 6.0", yours: "7.4", status: "eligible" },
  { label: "Active Backlogs", requirement: "0", yours: "0", status: "eligible" },
  { label: "Attendance", requirement: "≥ 75%", yours: "82%", status: "eligible" },
  {
    label: "Placement Registration",
    requirement: "Required",
    yours: "Not Registered",
    status: "action-required",
  },
];

/* ── Upcoming drives ─────────────────────────────────────── */
const DRIVES: {
  company: string;
  date: string;
  role: string;
  ctc: string;
  branches: string;
}[] = [
  {
    company: "Infosys",
    date: "15 May 2026",
    role: "Systems Engineer",
    ctc: "₹3.6 LPA",
    branches: "IT, CS, EC",
  },
  {
    company: "TCS",
    date: "22 May 2026",
    role: "Assistant System Engineer",
    ctc: "₹3.36 LPA",
    branches: "All Branches",
  },
  {
    company: "Wipro",
    date: "02 Jun 2026",
    role: "Project Engineer",
    ctc: "₹3.5 LPA",
    branches: "IT, CS",
  },
  {
    company: "Cognizant",
    date: "10 Jun 2026",
    role: "Programmer Analyst",
    ctc: "₹4.0 LPA",
    branches: "IT, CS, EC",
  },
];

/* ── My applications ─────────────────────────────────────── */
type AppStatus = "Shortlisted" | "Not Selected" | "Pending" | "Offer Received";

const MY_APPS: {
  company: string;
  role: string;
  appliedOn: string;
  round: string;
  status: AppStatus;
}[] = [
  {
    company: "HCL Technologies",
    role: "Technical Trainee",
    appliedOn: "18 Jan 2026",
    round: "HR Round",
    status: "Shortlisted",
  },
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    appliedOn: "05 Feb 2026",
    round: "—",
    status: "Not Selected",
  },
];

const APP_STATUS_STYLES: Record<AppStatus, React.CSSProperties> = {
  Shortlisted: { background: "#dbeafe", color: "#1d4ed8", border: "1px solid #bfdbfe" },
  "Not Selected": { background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
  Pending: { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
  "Offer Received": { background: "#d4f5e9", color: "#1a7a4a", border: "1px solid #a7f3d0" },
};

/* ── Component ───────────────────────────────────────────── */
export default function PlacementContent() {
  const router = useRouter();
  const metCount = CRITERIA.filter((c) => c.status === "eligible").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Placement Overview — stat cards */}
      <div>
        <div style={sectionLabelStyle}>Placement Overview</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                ...cardStyle,
                flex: "1 1 160px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  backgroundColor: "#e6f7f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginTop: 2 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 1 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div>
        <div style={sectionLabelStyle}>Your Eligibility</div>
        <div style={cardStyle}>
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 180px 100px",
              padding: "8px 0 10px",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: 2,
            }}
          >
            {["Criteria", "Requirement", "Your Status", "Result"].map((h) => (
              <span
                key={h}
                style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                {h}
              </span>
            ))}
          </div>

          {CRITERIA.map((c, i) => (
            <div
              key={c.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 180px 100px",
                alignItems: "center",
                padding: "11px 0",
                borderBottom: i < CRITERIA.length - 1 ? "1px solid #f3f4f6" : "none",
              }}
            >
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>
                {c.label}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{c.requirement}</span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: c.status === "action-required" ? "#dc2626" : "#374151",
                }}
              >
                {c.yours}
              </span>
              <span>
                {c.status === "eligible" ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#1a7a4a",
                    }}
                  >
                    <CheckCircle2 size={14} />
                    Eligible
                  </span>
                ) : c.status === "action-required" ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#dc2626",
                    }}
                  >
                    <XCircle size={14} />
                    Action Needed
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#991b1b",
                    }}
                  >
                    <XCircle size={14} />
                    Not Eligible
                  </span>
                )}
              </span>
            </div>
          ))}

          {/* Summary bar */}
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              backgroundColor: "#fef3c7",
              border: "1px solid #fde68a",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ fontSize: "0.8125rem", color: "#92400e", fontWeight: 500 }}>
              You meet <strong>{metCount}/{CRITERIA.length}</strong> criteria. Complete placement
              registration to become fully eligible for drives.
            </span>
            <button
              onClick={() => router.push("/student/placement/apply")}
              className="submit-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "#007B8A",
                color: "#ffffff",
                border: "none",
                borderRadius: 6,
                padding: "7px 16px",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              Apply for Placement
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Drives */}
      <div>
        <div style={sectionLabelStyle}>Upcoming Placement Drives</div>
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
                {["Company", "Drive Date", "Role", "CTC", "Eligible Branches", "Action"].map(
                  (h) => (
                    <th key={h} style={thStyle}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {DRIVES.map((d, i) => (
                <tr
                  key={d.company}
                  className="exam-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                >
                  <td style={{ ...tdStyle, fontWeight: 600, color: "#1a1a2e" }}>{d.company}</td>
                  <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "#6b7280" }}>{d.date}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{d.role}</td>
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: 600,
                      color: "#1a7a4a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.ctc}
                  </td>
                  <td style={{ ...tdStyle, fontSize: "0.8125rem", color: "#6b7280" }}>
                    {d.branches}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        router.push(
                          `/student/placement/apply?company=${encodeURIComponent(d.company)}`
                        )
                      }
                      style={{
                        backgroundColor: "#e6f7f9",
                        color: "#007B8A",
                        border: "1px solid #b2e4ea",
                        borderRadius: 6,
                        padding: "5px 14px",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "background 0.15s",
                      }}
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Applications */}
      <div>
        <div style={sectionLabelStyle}>My Applications</div>
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
                {["Company", "Role", "Applied On", "Current Round", "Status"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MY_APPS.map((a, i) => (
                <tr
                  key={a.company}
                  className="exam-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                >
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{a.company}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{a.role}</td>
                  <td style={{ ...tdStyle, color: "#6b7280", whiteSpace: "nowrap" }}>
                    {a.appliedOn}
                  </td>
                  <td style={{ ...tdStyle, color: "#6b7280" }}>{a.round}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...APP_STATUS_STYLES[a.status],
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.status === "Shortlisted" && <Briefcase size={11} />}
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
