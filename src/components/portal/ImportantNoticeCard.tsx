"use client";

import { useState } from "react";
import PdfViewerModal from "./PdfViewerModal";

interface Notice {
  title: string;
  date: string;
  href: string;
  isNew: boolean;
}

const NOTICES: Notice[] = [
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
  },
];

export default function ImportantNoticeCard() {
  const [selected, setSelected] = useState<Notice | null>(null);

  return (
    <>
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
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            style={{ color: "#ffffff", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.03em" }}
          >
            Important Notice / Circular
          </span>
        </div>

        {/* Notice list */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {NOTICES.map((notice, i) => (
            <li
              key={i}
              className="notice-row"
              onClick={() => setSelected(notice)}
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
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  backgroundColor: "#007B8A", flexShrink: 0, marginTop: 6,
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "#1a1a2e",
                      lineHeight: 1.4,
                    }}
                  >
                    {notice.title}
                  </span>
                  {notice.isNew && (
                    <span
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        backgroundColor: "#ef4444",
                        borderRadius: 4,
                        padding: "2px 6px",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 2 }}>
                  {notice.date}
                </div>
              </div>

              {/* PDF icon */}
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
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
            textAlign: "right",
          }}
        >
          <a
            href="/student/notices"
            style={{ fontSize: "0.8125rem", color: "#007B8A", textDecoration: "none", fontWeight: 500 }}
            className="notice-link"
          >
            View all notices →
          </a>
        </div>
      </div>

      {selected && (
        <PdfViewerModal
          title={selected.title}
          date={selected.date}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
