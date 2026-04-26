"use client";

import { useState } from "react";
import Header from "@/components/portal/Header";
import NavBar from "@/components/portal/NavBar";
import Sidebar from "@/components/portal/Sidebar";
import MainContent from "@/components/portal/MainContent";
import ImportantNoticeCard from "@/components/portal/ImportantNoticeCard";
import WelcomePopup from "@/components/portal/WelcomePopup";
import Link from "next/link";
import { AlertTriangle, ChevronDown, ChevronUp, UserCheck, FileText, PieChart, CreditCard, ChevronRight } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f4f7f8" }}>
      <Header />
      <NavBar />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <MainContent>
          <WelcomePopup />
          
          {/* Sleek Urgent Banner */}
          <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #fecaca",
            borderLeft: "4px solid #ef4444",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 20,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            boxShadow: "0 2px 5px rgba(239, 68, 68, 0.05)",
          }}>
            <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ color: "#b91c1c", fontSize: "0.85rem", fontWeight: 700, marginBottom: 2 }}>
                Action Required: Examination Form Deadline
              </div>
              <div style={{ color: "#7f1d1d", fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.4 }}>
                Only 3 days left to fill your Semester 6 examination form without late fees. <a href="/student/examination/fill-exam-form" style={{ color: "#dc2626", textDecoration: "underline", marginLeft: 4 }}>Complete it now</a>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            <StatCard 
              icon={<UserCheck size={18} />} 
              title="Attendance" 
              value="82.5%" 
              subValue="Valid for exams"
              iconBg="#ecfdf5" 
              iconColor="#059669" 
              href="/student/attendance"
            />
            <StatCard 
              icon={<FileText size={18} />} 
              title="Pending Forms" 
              value="1 Active" 
              subValue="Sem 6 Exam Form"
              iconBg="#fffbeb" 
              iconColor="#d97706" 
              href="#"
            />
            <StatCard 
              icon={<CreditCard size={18} />} 
              title="Fees Pending" 
              value="₹ 1,250" 
              subValue="Exam Late Fee"
              iconBg="#fef2f2" 
              iconColor="#dc2626" 
              href="/student/account"
            />
            <StatCard 
              icon={<PieChart size={18} />} 
              title="Reports" 
              value="Sem 5 Result" 
              subValue="Declared on 15 Apr"
              iconBg="#eef2ff" 
              iconColor="#4f46e5" 
              href="#"
            />
          </div>

          <ImportantNoticeCard />
          <StudentDetailsTable />
        </MainContent>
      </div>

      <Footer />
    </div>
  );
}

function StatCard({ icon, title, value, subValue, iconBg, iconColor, href }: { icon: React.ReactNode, title: string, value: string, subValue?: string, iconBg: string, iconColor: string, href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "flex", flex: "1 1 200px" }}>
      <div 
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.2s, transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{
          backgroundColor: iconBg,
          color: iconColor,
          padding: 10,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", letterSpacing: "0.02em", marginBottom: 3 }}>
            {title}
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
            {value}
          </div>
          {subValue && (
            <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginTop: 4, fontWeight: 500 }}>
              {subValue}
            </div>
          )}
        </div>
        <div style={{ alignSelf: "center", color: "#d1d5db" }}>
          <ChevronRight size={18} />
        </div>
      </div>
    </Link>
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
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expanded ? STUDENT_DATA : STUDENT_DATA.slice(0, 5);

  return (
    <div style={{ marginTop: 24 }}>
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
            {visibleRows.map((row, i) => (
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
        
        {/* Expand / Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#f9fafb",
            border: "none",
            borderTop: "1px solid #e0e0e0",
            color: "#007B8A",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "background 0.2s",
          }}
        >
          {expanded ? (
            <><ChevronUp size={16} /> Show Less</>
          ) : (
            <><ChevronDown size={16} /> Show All Details ({STUDENT_DATA.length - 5} more)</>
          )}
        </button>
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
