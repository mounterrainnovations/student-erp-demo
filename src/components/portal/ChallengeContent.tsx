"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Info } from "lucide-react";

const SUBJECTS = [
  { code: "BT-101", name: "Engineering Chemistry", grade: "C+", marks: 58 },
  { code: "BT-102", name: "Mathematics-I", grade: "B", marks: 64 },
  { code: "BT-103", name: "English for Communication", grade: "A", marks: 78 },
  { code: "BT-104", name: "Basic Electrical Engineering", grade: "C", marks: 52 },
];

export default function ChallengeContent() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const totalFee = selectedSubjects.length * 2000; // 2000 per subject

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#d4f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <CheckCircle2 size={32} color="#1a7a4a" />
        </div>
        <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", margin: 0 }}>Challenge Application Submitted</h2>
        <p style={{ color: "#6b7280", maxWidth: 400, fontSize: "0.875rem", lineHeight: 1.6 }}>
          Your application for Challenge Valuation has been submitted successfully. Please proceed to the payment portal to complete the process.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            marginTop: 16,
            padding: "10px 24px",
            backgroundColor: "#007B8A",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Go to Payment
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 800 }}>
      <div>
        <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Apply for Challenge Valuation</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Challenge Valuation allows you to request a complete re-evaluation of your answer script by an external subject expert.
        </p>
      </div>

      <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "16px", borderRadius: 8, display: "flex", gap: 12 }}>
        <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1e3a8a", marginBottom: 4 }}>Important Instructions</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#1e40af", fontSize: "0.8125rem", lineHeight: 1.6 }}>
            <li>The fee for Challenge Valuation is <strong>₹2000 per subject</strong>.</li>
            <li>If your marks increase by 10% or more, 50% of the fee will be refunded.</li>
            <li>The result of the challenge valuation will be final and binding.</li>
          </ul>
        </div>
      </div>

      <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Select</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Subject Code</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Subject Name</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>Current Grade</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((sub) => (
              <tr key={sub.code} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 16px", textAlign: "center", width: 60 }}>
                  <input 
                    type="checkbox" 
                    checked={selectedSubjects.includes(sub.code)} 
                    onChange={() => toggleSubject(sub.code)}
                    style={{ width: 16, height: 16, accentColor: "#007B8A", cursor: "pointer" }}
                  />
                </td>
                <td style={{ padding: "12px 16px", fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>{sub.code}</td>
                <td style={{ padding: "12px 16px", fontSize: "0.875rem", color: "#374151" }}>{sub.name}</td>
                <td style={{ padding: "12px 16px", fontSize: "0.875rem", color: "#1a1a2e", textAlign: "center", fontWeight: 600 }}>{sub.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSubjects.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fdfd", border: "1px solid #b2e4ea", padding: "16px 20px", borderRadius: 8 }}>
          <div>
            <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Selected Subjects</div>
            <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#007B8A" }}>{selectedSubjects.length}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Total Fee Required</div>
            <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1a1a2e" }}>₹{totalFee}</div>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            style={{
              padding: "10px 24px",
              backgroundColor: "#007B8A",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            Submit Application <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
