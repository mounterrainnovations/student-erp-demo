"use client";

import { useState } from "react";
import { CheckCircle2, User } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

export default function StudentProfileContent() {
  const [toast, setToast] = useState(false);

  const requestUpdate = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Student Profile</h1>
        <p style={pageSubtitleStyle}>
          Your registered details as on university records. For corrections, use the request button or contact the
          college office (demo).
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "#e6f7f9",
            border: "2px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User size={40} color="#007B8A" strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1a2e" }}>{DEMO_STUDENT.name}</div>
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 4 }}>
            {DEMO_STUDENT.enrollmentNo} · {DEMO_STUDENT.programme} · {DEMO_STUDENT.semester} Semester
          </div>
          <button
            type="button"
            onClick={requestUpdate}
            style={{
              marginTop: 12,
              backgroundColor: "#007B8A",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "8px 16px",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Request profile update
          </button>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Personal</div>
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {(
                [
                  ["Date of birth", DEMO_STUDENT.dateOfBirth],
                  ["Gender", DEMO_STUDENT.gender],
                  ["Category", DEMO_STUDENT.category],
                  ["Blood group", DEMO_STUDENT.bloodGroup],
                  ["Aadhaar (masked)", DEMO_STUDENT.aadhaarLast4],
                  ["Address", DEMO_STUDENT.address],
                ] as const
              ).map(([a, b], i) => (
                <tr key={a} className="student-table-row" style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fdfd" }}>
                  <td
                    style={{
                      padding: "10px 16px",
                      width: "32%",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "#6b7280",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {a}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: "0.875rem",
                      color: "#1a1a2e",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Contact</div>
        <div style={{ ...cardStyle, padding: "16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Email</div>
              <div style={{ fontWeight: 500 }}>{DEMO_STUDENT.email}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Mobile</div>
              <div style={{ fontWeight: 500 }}>{DEMO_STUDENT.mobile}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Guardian</div>
              <div style={{ fontWeight: 500 }}>{DEMO_STUDENT.guardianName}</div>
              <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{DEMO_STUDENT.guardianMobile}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Academic</div>
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
                {["Field", "Value"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Programme", DEMO_STUDENT.programme],
                  ["Branch", DEMO_STUDENT.branch],
                  ["Semester", DEMO_STUDENT.semester],
                  ["Academic year", DEMO_STUDENT.academicYear],
                  ["College", DEMO_STUDENT.college],
                  ["Section / batch", `${DEMO_STUDENT.section} / ${DEMO_STUDENT.batch}`],
                ] as const
              ).map(([a, b], i) => (
                <tr key={a} className="student-table-row" style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fdfd" }}>
                  <td style={{ padding: "10px 16px", fontSize: "0.8125rem", fontWeight: 600, color: "#6b7280" }}>{a}</td>
                  <td style={{ padding: "10px 16px", fontSize: "0.875rem" }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          Update request received (demo). The college will contact you.
        </div>
      )}
    </div>
  );
}
