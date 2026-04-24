import Header from "@/components/portal/Header";
import NavBar from "@/components/portal/NavBar";
import Sidebar from "@/components/portal/Sidebar";
import MainContent from "@/components/portal/MainContent";

export default function StudentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <NavBar />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <MainContent>
          <ImportantNoticeCard />
          <StudentDetailsTable />
        </MainContent>
      </div>

      <Footer />
    </div>
  );
}

/* ── Important Notice Card ─────────────────────────────────────────── */
function ImportantNoticeCard() {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      {/* Teal header band */}
      <div
        style={{
          backgroundColor: "#007B8A",
          padding: "9px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span style={{ color: "#ffffff", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.03em" }}>
          Important Notice / Circular
        </span>
      </div>

      {/* Notice list */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {NOTICES.map((notice, i) => (
          <li
            key={i}
            className="notice-row"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 16px",
              borderBottom: i < NOTICES.length - 1 ? "1px solid #f0f0f0" : "none",
              backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafcfc",
              transition: "background 0.15s ease",
              cursor: "pointer",
            }}
          >
            {/* Bullet */}
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              backgroundColor: "#007B8A", flexShrink: 0, marginTop: 6,
            }} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <a
                  href={notice.href}
                  className="notice-link"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#1a1a2e",
                    textDecoration: "none",
                    lineHeight: 1.4,
                  }}
                >
                  {notice.title}
                </a>
                {notice.isNew && (
                  <span style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    backgroundColor: "#ef4444",
                    borderRadius: 4,
                    padding: "2px 6px",
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                    verticalAlign: "middle",
                  }}>
                    NEW
                  </span>
                )}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 2 }}>
                {notice.date}
              </div>
            </div>

            {/* PDF icon — appears on row hover via CSS */}
            <svg
              className="notice-pdf-icon"
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 3, opacity: 0, transition: "opacity 0.15s" }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{
        padding: "8px 16px",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#f8f9fa",
        textAlign: "right",
      }}>
        <a
          href="/student/notices"
          className="notice-link"
          style={{ fontSize: "0.8125rem", color: "#007B8A", textDecoration: "none", fontWeight: 500 }}
        >
          View all notices →
        </a>
      </div>
    </div>
  );
}

const NOTICES = [
  {
    title: "Examination Form Submission Schedule for Nov/Dec 2025 — B.E. / B.Tech (All Semesters)",
    date: "22 Apr 2026",
    href: "#",
    isNew: true,
  },
  {
    title: "Important Notice Regarding Online Fee Payment for Odd Semester 2025–26",
    date: "18 Apr 2026",
    href: "#",
    isNew: true,
  },
  {
    title: "Revised Academic Calendar for Session 2025–26 — All Affiliated Colleges",
    date: "10 Apr 2026",
    href: "#",
    isNew: false,
  }
];

/* ── Student Details Table ─────────────────────────────────────────── */
const STUDENT_DATA = [
  { label: "Student Name", value: "Rajesh Kumar" },
  { label: "Enrollment No.", value: "0101CS221001" },
  { label: "Branch", value: "Computer Science & Engineering" },
  { label: "Programme", value: "B.E." },
  { label: "Semester", value: "6th" },
  { label: "Academic Year", value: "2025–2026" },
  { label: "College", value: "Government Engineering College, Bhopal" },
  { label: "Exam Form Status", value: "submitted" },
];

function StudentDetailsTable() {
  return (
    <div>
      <div style={{
        fontSize: "0.6875rem",
        fontWeight: 700,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 10,
      }}>
        Student Details
      </div>

      <div style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007B8A" }}>
              <th style={{
                padding: "11px 16px",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
                textAlign: "left",
                width: "35%",
              }}>
                Field
              </th>
              <th style={{
                padding: "11px 16px",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
                textAlign: "left",
              }}>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {STUDENT_DATA.map((row, i) => (
              <tr
                key={row.label}
                className="student-table-row"
                style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
              >
                <td style={{
                  padding: "11px 16px",
                  fontSize: "0.875rem",
                  color: "#374151",
                  fontWeight: 500,
                  borderBottom: "1px solid #e0e0e0",
                }}>
                  {row.label}
                </td>
                <td style={{
                  padding: "11px 16px",
                  fontSize: "0.875rem",
                  color: "#1a1a2e",
                  fontWeight: 400,
                  borderBottom: "1px solid #e0e0e0",
                }}>
                  {row.value === "submitted" ? (
                    <span style={{
                      display: "inline-block",
                      background: "#d4f5e9",
                      color: "#1a7a4a",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: 999,
                      padding: "2px 10px",
                    }}>
                      Submitted to BU
                    </span>
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Footer ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      backgroundColor: "#1a1a2e",
      color: "rgba(255,255,255,0.6)",
      fontSize: "0.72rem",
      textAlign: "center",
      padding: "10px 16px",
      letterSpacing: "0.02em",
      flexShrink: 0,
    }}>
      © {new Date().getFullYear()} Barkatullah Vishwavidyalaya, Bhopal. All rights reserved. · Demo by <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Mounterra Innovations</span>
    </footer>
  );
}
