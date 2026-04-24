"use client";

import React, { useState } from "react";
import { Download, CalendarDays, BookOpen, Clock } from "lucide-react";

export default function TimeTableContent() {
  const [course, setCourse] = useState("B.Tech (IT)");
  const [semester, setSemester] = useState("III");

  const timetableData = [
    { date: "12 Nov 2026", day: "Thursday", code: "IT-301", name: "Data Structures", time: "10:00 AM - 01:00 PM" },
    { date: "15 Nov 2026", day: "Sunday", code: "IT-302", name: "Object Oriented Programming", time: "10:00 AM - 01:00 PM" },
    { date: "18 Nov 2026", day: "Wednesday", code: "IT-303", name: "Digital Electronics", time: "10:00 AM - 01:00 PM" },
    { date: "21 Nov 2026", day: "Saturday", code: "IT-304", name: "Discrete Mathematics", time: "10:00 AM - 01:00 PM" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Examination Time Table</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
            View and download your semester examination schedule.
          </p>
        </div>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#fff",
            color: "#007B8A",
            border: "1px solid #007B8A",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem"
          }}
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div style={{ display: "flex", gap: 20, padding: "20px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Course / Program</label>
          <select 
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none" }}
          >
            <option value="B.Tech (IT)">B.Tech (Information Technology)</option>
            <option value="B.Tech (CSE)">B.Tech (Computer Science)</option>
            <option value="MBA">MBA (Master of Business Administration)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Semester</label>
          <select 
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none" }}
          >
            <option value="I">Semester I</option>
            <option value="II">Semester II</option>
            <option value="III">Semester III</option>
            <option value="IV">Semester IV</option>
          </select>
        </div>
      </div>

      <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Date & Day</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Subject Details</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Timing</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.map((item, i) => (
              <tr key={i} style={{ borderBottom: i === timetableData.length - 1 ? "none" : "1px solid #f3f4f6" }}>
                <td style={{ padding: "16px", verticalAlign: "top" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 6 }}>
                    <CalendarDays size={14} color="#6b7280" /> {item.date}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 4, paddingLeft: 20 }}>{item.day}</div>
                </td>
                <td style={{ padding: "16px", verticalAlign: "top" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#007B8A", display: "flex", alignItems: "center", gap: 6 }}>
                    <BookOpen size={14} color="#007B8A" /> {item.code}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "#374151", marginTop: 4, paddingLeft: 20 }}>{item.name}</div>
                </td>
                <td style={{ padding: "16px", verticalAlign: "top" }}>
                  <div style={{ fontSize: "0.875rem", color: "#1a1a2e", display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={14} color="#6b7280" /> {item.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
