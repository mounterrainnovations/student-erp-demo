"use client";

import { useEffect } from "react";
import {
  X,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
} from "lucide-react";

interface PdfViewerModalProps {
  title: string;
  date?: string;
  onClose: () => void;
}

export default function PdfViewerModal({ title, date, onClose }: PdfViewerModalProps) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Modal panel — stop click propagation so backdrop click closes, inner click doesn't */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 92vw)",
          height: "min(700px, 90vh)",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Header bar ───────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#007B8A",
            padding: "0 16px",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 12,
          }}
        >
          {/* Left: icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <FileText size={18} color="#ffffff" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <span
              style={{
                color: "#ffffff",
                fontSize: "0.875rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "55vw",
              }}
            >
              {title}
            </span>
          </div>

          {/* Right: actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <HeaderBtn title="Download" onClick={() => {}}>
              <Download size={15} />
            </HeaderBtn>
            <HeaderBtn title="Print" onClick={() => {}}>
              <Printer size={15} />
            </HeaderBtn>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.3)", margin: "0 4px" }} />
            <HeaderBtn title="Close (Esc)" onClick={onClose}>
              <X size={16} />
            </HeaderBtn>
          </div>
        </div>

        {/* ── Toolbar ──────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
            padding: "0 16px",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 12,
          }}
        >
          {/* Page navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ToolBtn title="Previous page" disabled><ChevronLeft size={13} /></ToolBtn>
            <span style={{ fontSize: "0.78rem", color: "#374151", fontWeight: 500 }}>
              Page&nbsp;<strong>1</strong>&nbsp;of&nbsp;<strong>1</strong>
            </span>
            <ToolBtn title="Next page" disabled><ChevronRight size={13} /></ToolBtn>
          </div>

          {/* Zoom */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ToolBtn title="Zoom out" disabled><ZoomOut size={13} /></ToolBtn>
            <span
              style={{
                fontSize: "0.78rem",
                color: "#374151",
                fontWeight: 500,
                background: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: 4,
                padding: "2px 8px",
                minWidth: 50,
                textAlign: "center",
              }}
            >
              100%
            </span>
            <ToolBtn title="Zoom in" disabled><ZoomIn size={13} /></ToolBtn>
          </div>

          {/* Right info */}
          <span style={{ fontSize: "0.72rem", color: "#9ca3af", fontStyle: "italic" }}>
            Demo — placeholder document
          </span>
        </div>

        {/* ── Viewer area ──────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#525659",
            overflowY: "auto",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "28px 24px",
          }}
        >
          {/* Simulated A4 page */}
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: 620,
              minHeight: 840,
              boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* University letterhead */}
            <div
              style={{
                backgroundColor: "#007B8A",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              {/* Placeholder logo circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.3 }}>
                  Barkatullah Vishwavidyalaya
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}>
                  Hoshangabad Road, Bhopal (M.P.) — 462033
                </div>
              </div>
            </div>

            {/* Document body */}
            <div style={{ padding: "28px 32px", flex: 1 }}>
              {/* Ref + date row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                  fontSize: "0.78rem",
                  color: "#6b7280",
                }}
              >
                <span>Ref. No.: BU/EXAM/2025-26/0042</span>
                <span>{date ?? "April 2026"}</span>
              </div>

              {/* Notice title */}
              <div
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  lineHeight: 1.5,
                  marginBottom: 20,
                  paddingBottom: 14,
                  borderBottom: "2px solid #007B8A",
                }}
              >
                {title}
              </div>

              {/* Salutation */}
              <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>
                To all the concerned students and faculty members,
              </p>

              {/* Placeholder body text lines */}
              {[85, 92, 78, 88, 70, 95, 60, 82].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 10,
                    backgroundColor: "#e5e7eb",
                    borderRadius: 4,
                    width: `${w}%`,
                    marginBottom: 10,
                  }}
                />
              ))}

              <div style={{ height: 20 }} />

              {/* Second paragraph placeholder */}
              {[90, 75, 88, 65].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 10,
                    backgroundColor: "#e5e7eb",
                    borderRadius: 4,
                    width: `${w}%`,
                    marginBottom: 10,
                  }}
                />
              ))}

              {/* Signature block */}
              <div style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: "#f3f4f6",
                    borderRadius: 4,
                    marginBottom: 6,
                    border: "1px dashed #d1d5db",
                  }}
                />
                <div style={{ fontSize: "0.78rem", color: "#374151", fontWeight: 600 }}>
                  Controller of Examinations
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                  Barkatullah Vishwavidyalaya, Bhopal
                </div>
              </div>
            </div>

            {/* Page footer */}
            <div
              style={{
                borderTop: "1px solid #e0e0e0",
                padding: "8px 32px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.65rem",
                color: "#9ca3af",
              }}
            >
              <span>© Barkatullah Vishwavidyalaya</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small helper button components ─────────────────────────────────── */

function HeaderBtn({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 6,
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#ffffff",
        transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function ToolBtn({
  children,
  title,
  disabled,
}: {
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      style={{
        background: "none",
        border: "1px solid #d1d5db",
        borderRadius: 5,
        width: 26,
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#9ca3af" : "#374151",
      }}
    >
      {children}
    </button>
  );
}
