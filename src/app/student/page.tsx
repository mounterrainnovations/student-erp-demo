import Header from "@/components/portal/Header";
import NavBar from "@/components/portal/NavBar";
import Sidebar from "@/components/portal/Sidebar";
import MainContent from "@/components/portal/MainContent";
import ImportantNoticeCard from "@/components/portal/ImportantNoticeCard";

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


/* ── Student Details Table ─────────────────────────────────────────── */
const STUDENT_DATA = [
  { label: "Student Name",        value: "Rajesh Kumar" },
  { label: "Father's Name",       value: "Suresh Kumar" },
  { label: "Mother's Name",       value: "Sunita Devi" },
  { label: "Enrollment No.",      value: "0101CS221001" },
  { label: "University Roll No.", value: "BU2022CS0042" },
  { label: "Date of Birth",       value: "14 Aug 2003" },
  { label: "Gender",              value: "Male" },
  { label: "Category",            value: "General" },
  { label: "Blood Group",         value: "B+" },
  { label: "Mobile No.",          value: "+91 98765 43210" },
  { label: "Email Address",       value: "rajesh.kumar@gecbhopal.ac.in" },
  { label: "Programme",           value: "B.E." },
  { label: "Branch",              value: "Computer Science & Engineering" },
  { label: "Semester",            value: "6th" },
  { label: "Admission Year",      value: "2022" },
  { label: "Academic Year",       value: "2025–2026" },
  { label: "College",             value: "Government Engineering College, Bhopal" },
  { label: "College Code",        value: "0101" },
  { label: "Scholarship Status",  value: "not-applicable" },
  { label: "Exam Form Status",    value: "submitted" },
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
                  ) : row.value === "not-applicable" ? (
                    <span style={{
                      display: "inline-block",
                      background: "#f3f4f6",
                      color: "#6b7280",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: 999,
                      padding: "2px 10px",
                    }}>
                      Not Applicable
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
