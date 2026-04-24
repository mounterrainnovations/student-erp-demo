"use client";

import { useMemo, useState } from "react";
import { Search, CheckCircle2 } from "lucide-react";
import { pageSubtitleStyle, pageTitleStyle, sectionLabelStyle } from "./portalPageStyles";

type Notice = {
  id: string;
  title: string;
  date: string;
  category: "Exam" | "Fee" | "Academic" | "General";
  isNew: boolean;
  href: string;
};

const NOTICES: Notice[] = [
  {
    id: "1",
    title: "Examination Form Submission Schedule for Nov/Dec 2025 — B.E. / B.Tech (All Semesters)",
    date: "22 Apr 2026",
    category: "Exam",
    isNew: true,
    href: "#",
  },
  {
    id: "2",
    title: "Important Notice Regarding Online Fee Payment for Odd Semester 2025–26",
    date: "18 Apr 2026",
    category: "Fee",
    isNew: true,
    href: "#",
  },
  {
    id: "3",
    title: "Revised Academic Calendar for Session 2025–26 — All Affiliated Colleges",
    date: "10 Apr 2026",
    category: "Academic",
    isNew: false,
    href: "#",
  },
  {
    id: "4",
    title: "Convocation / Degree Ceremony — Expression of Interest (2025–26 pass-outs)",
    date: "05 Apr 2026",
    category: "General",
    isNew: false,
    href: "#",
  },
  {
    id: "5",
    title: "Mid-term Internal Assessment — Guidelines for B.E. VI Semester",
    date: "28 Mar 2026",
    category: "Academic",
    isNew: false,
    href: "#",
  },
  {
    id: "6",
    title: "Scholarship Application Window — State Merit (SC/ST) — 2025–26",
    date: "15 Mar 2026",
    category: "General",
    isNew: false,
    href: "#",
  },
];

export default function NoticesContent() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [toast, setToast] = useState("");

  const list = useMemo(() => {
    return NOTICES.filter((n) => {
      if (cat !== "All" && n.category !== cat) return false;
      if (q.trim() && !n.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  const openPdf = (n: Notice) => {
    setToast(`Opening PDF for: ${n.title.slice(0, 48)}… (demo).`);
    setTimeout(() => setToast(""), 2800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={pageTitleStyle}>Notices & circulars</h1>
        <p style={pageSubtitleStyle}>
          Download official notices and circulars issued by Barkatullah Vishwavidyalaya, Bhopal. This list is for demo
          purposes; links are placeholders.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Category</span>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            style={{
              minWidth: 180,
              height: 38,
              border: "1px solid #d1d5db",
              borderRadius: 7,
              padding: "0 10px",
            }}
          >
            {["All", "Exam", "Fee", "Academic", "General"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 220 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>Search</span>
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              color="#9ca3af"
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title…"
              style={{
                width: "100%",
                height: 38,
                border: "1px solid #d1d5db",
                borderRadius: 7,
                padding: "0 12px 0 34px",
                fontSize: "0.875rem",
                boxSizing: "border-box",
              }}
            />
          </div>
        </label>
      </div>

      <div>
        <div style={sectionLabelStyle}>
          {list.length} notice{list.length === 1 ? "" : "s"} found
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {list.map((notice, i) => (
            <li
              key={notice.id}
              className="notice-row"
              onClick={() => openPdf(notice)}
              onKeyDown={(e) => e.key === "Enter" && openPdf(notice)}
              role="button"
              tabIndex={0}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 16px",
                border: "1px solid #e0e0e0",
                borderTop: i === 0 ? "1px solid #e0e0e0" : "none",
                borderRadius: i === 0 ? "8px 8px 0 0" : i === list.length - 1 ? "0 0 8px 8px" : 0,
                backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafcfc",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#007B8A",
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                  <a
                    href={notice.href}
                    className="notice-link"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: "0.875rem",
                      color: "#1a1a2e",
                      textDecoration: "none",
                      lineHeight: 1.4,
                      fontWeight: 500,
                    }}
                  >
                    {notice.title}
                  </a>
                  {notice.isNew && (
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#fff",
                        background: "#ef4444",
                        borderRadius: 4,
                        padding: "2px 6px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      NEW
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: "#007B8A",
                      background: "#e6f7f9",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {notice.category}
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 4 }}>Published: {notice.date}</div>
              </div>
              <svg
                className="notice-pdf-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                style={{ flexShrink: 0, marginTop: 3, opacity: 0.35 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p style={{ fontSize: "0.875rem", color: "#6b7280", padding: 16, border: "1px solid #e0e0e0", borderRadius: 8 }}>
            No notices match your filters. Try another category or clear the search.
          </p>
        )}
      </div>

      <p style={{ fontSize: "0.78rem", color: "#6b7280" }}>
        For older circulars, contact the examination cell or the college academic section. (Demo prototype.)
      </p>

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
            maxWidth: 360,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0 }} />
          {toast}
        </div>
      )}
    </div>
  );
}
