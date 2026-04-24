"use client";

import React from "react";
import { Download, FileText, BarChart2, CalendarDays, Wallet, Activity } from "lucide-react";

export default function ReportsContent() {
  const reports = [
    { title: "Consolidated Marksheet", description: "Academic performance across all semesters.", date: "Jan 2026", type: "Academic", icon: BarChart2, color: "#007B8A", bg: "#f0fbfc" },
    { title: "Attendance Summary", description: "Detailed day-wise attendance for the current term.", date: "Apr 2026", type: "Attendance", icon: CalendarDays, color: "#eab308", bg: "#fefce8" },
    { title: "Fee Statement (2025-26)", description: "Complete financial transaction history.", date: "Dec 2025", type: "Financial", icon: Wallet, color: "#3b82f6", bg: "#eff6ff" },
    { title: "Library Clearance Report", description: "Status of issued books and pending dues.", date: "Mar 2026", type: "Administrative", icon: FileText, color: "#ec4899", bg: "#fdf2f8" },
    { title: "Mid-Term Evaluation", description: "Scores from the recent mid-term examinations.", date: "Feb 2026", type: "Academic", icon: Activity, color: "#8b5cf6", bg: "#f5f3ff" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
      <div>
        <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Reports & Analytics</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
          Access your personalized academic, attendance, and financial reports.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {reports.map((report, i) => (
          <div 
            key={i} 
            style={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e0e0e0", 
              borderRadius: 12, 
              padding: 20, 
              display: "flex", 
              flexDirection: "column", 
              gap: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: 12, backgroundColor: report.bg, 
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
              }}>
                <report.icon size={24} color={report.color} />
              </div>
              <span style={{ 
                fontSize: "0.75rem", fontWeight: 600, color: report.color, backgroundColor: report.bg, 
                padding: "4px 10px", borderRadius: 20 
              }}>
                {report.type}
              </span>
            </div>
            
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px 0" }}>{report.title}</h3>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                {report.description}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500 }}>
                Generated: {report.date}
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#007B8A",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontSize: "0.8125rem",
                  fontWeight: 600
                }}
              >
                Download <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
