"use client";

import { useMemo, useState } from "react";
import { FileText, HardDrive, Upload, CheckCircle2, Eye } from "lucide-react";
import { DEMO_STUDENT } from "@/data/demo-student";
import { cardStyle } from "./ExamFormPrerequisites";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle, thStyle } from "./portalPageStyles";

type DocItem = {
  id: string;
  title: string;
  period: string;
  category: "Marksheets" | "ID & certificates" | "Other";
  uploadedOn: string;
  status: "Verified" | "Pending";
};

const INITIAL_DOCS: DocItem[] = [
  {
    id: "1",
    title: "Semester V marksheet (provisional)",
    period: "Nov/Dec 2025",
    category: "Marksheets",
    uploadedOn: "18 Jan 2026",
    status: "Verified",
  },
  {
    id: "2",
    title: "Category certificate",
    period: "—",
    category: "ID & certificates",
    uploadedOn: "02 Feb 2026",
    status: "Pending",
  },
];

export default function DigitalLockerContent() {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [category, setCategory] = useState<string>("All");
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    if (category === "All") return docs;
    return docs.filter((d) => d.category === category);
  }, [docs, category]);

  const handleUpload = () => {
    const n = docs.length + 1;
    setDocs((prev) => [
      {
        id: String(n),
        title: "Uploaded document (demo)",
        period: "2025-26",
        category: "Other",
        uploadedOn: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        status: "Pending",
      },
      ...prev,
    ]);
    setToast("File uploaded to locker (demo).");
    setTimeout(() => setToast(""), 3000);
  };

  const viewDoc = (id: string) => {
    setToast(`Opening preview for ${id} (demo).`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Digital Locker</h1>
        <p style={pageSubtitleStyle}>
          Store and track academic documents. Uploads are verified by the college; only accepted formats are listed
          below (demo — no real file is stored).
        </p>
      </div>

      <div
        style={{
          ...cardStyle,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 18px",
        }}
      >
        <HardDrive size={22} color="#007B8A" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: "0.8125rem", color: "#374151" }}>
          <strong>{DEMO_STUDENT.name}</strong> · {DEMO_STUDENT.enrollmentNo}
          <br />
          <span style={{ color: "#6b7280" }}>Approx. space used: 2.1 MB of 15 MB (demo)</span>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Filter</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            minWidth: 200,
            height: 38,
            border: "1px solid #d1d5db",
            borderRadius: 7,
            padding: "0 10px",
            fontSize: "0.875rem",
          }}
        >
          {["All", "Marksheets", "ID & certificates", "Other"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div style={sectionLabelStyle}>Upload (demo)</div>
        <div
          onClick={handleUpload}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleUpload()}
          style={{
            border: "2px dashed #cbd5e1",
            borderRadius: 8,
            padding: "28px 20px",
            textAlign: "center",
            cursor: "pointer",
            background: "#fafcfc",
            transition: "background 0.15s",
          }}
        >
          <Upload size={28} color="#007B8A" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e" }}>Click to upload</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 4 }}>PDF, JPG or PNG up to 2 MB</div>
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Documents</div>
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
                {["Title", "Period", "Category", "Uploaded on", "Status", ""].map((h) => (
                  <th key={h || "a"} style={{ ...thStyle, width: h === "" ? 100 : undefined }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr
                  key={d.id}
                  className="student-table-row"
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fdfd" }}
                >
                  <td style={tdStyle}>
                    <FileText
                      size={14}
                      style={{ verticalAlign: "middle", marginRight: 6, display: "inline" }}
                      color="#007B8A"
                    />
                    {d.title}
                  </td>
                  <td style={tdStyle}>{d.period}</td>
                  <td style={tdStyle}>{d.category}</td>
                  <td style={tdStyle}>{d.uploadedOn}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        background: d.status === "Verified" ? "#d4f5e9" : "#fef3c7",
                        color: d.status === "Verified" ? "#1a7a4a" : "#92400e",
                      }}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      type="button"
                      onClick={() => viewDoc(d.id)}
                      style={{
                        background: "none",
                        border: "1px solid #007B8A",
                        color: "#007B8A",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Eye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 12 }}>No documents in this category.</p>
        )}
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
          {toast}
        </div>
      )}
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "0.8125rem",
  borderBottom: "1px solid #e0e0e0",
  color: "#374151",
};
