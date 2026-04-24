"use client";

import React, { useState } from "react";
import { Download, FileText, Search, Folder } from "lucide-react";

export default function SyllabusContent() {
  const [course, setCourse] = useState("B.Tech (IT)");
  const [semester, setSemester] = useState("All");

  const syllabusData = [
    { name: "IT-101: Programming in C", size: "1.2 MB", date: "Aug 2026", semester: "I", type: "PDF" },
    { name: "IT-102: Engineering Mathematics I", size: "2.4 MB", date: "Aug 2026", semester: "I", type: "PDF" },
    { name: "IT-201: Data Structures", size: "1.8 MB", date: "Jan 2027", semester: "II", type: "PDF" },
    { name: "IT-202: Object Oriented Programming", size: "1.5 MB", date: "Jan 2027", semester: "II", type: "PDF" },
    { name: "Scheme of Examination (Batch 2026-2030)", size: "4.1 MB", date: "Jul 2026", semester: "All", type: "PDF" },
  ];

  const filteredData = syllabusData.filter(item => 
    semester === "All" ? true : item.semester === semester || item.semester === "All"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
      <div>
        <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Scheme & Syllabus</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
          Download course scheme and detailed subject syllabus files.
        </p>
      </div>

      <div style={{ display: "flex", gap: 20, padding: "20px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Program</label>
          <select 
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none" }}
          >
            <option value="B.Tech (IT)">B.Tech (Information Technology)</option>
            <option value="B.Tech (CSE)">B.Tech (Computer Science)</option>
            <option value="MBA">MBA</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Semester</label>
          <select 
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none" }}
          >
            <option value="All">All Semesters</option>
            <option value="I">Semester I</option>
            <option value="II">Semester II</option>
            <option value="III">Semester III</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: "relative" }}>
            <Search size={16} color="#9ca3af" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              placeholder="Search by subject name..." 
              style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none" }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filteredData.map((item, i) => (
          <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#f0fbfc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={20} color="#007B8A" />
              </div>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e", lineHeight: 1.4, marginBottom: 4 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", display: "flex", alignItems: "center", gap: 6 }}>
                  <Folder size={12} /> {course} • Sem {item.semester}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                {item.type} • {item.size} • {item.date}
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
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#f0fbfc"
                }}
                title="Download"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
