"use client";

import { useState, useEffect } from "react";
import { X, BellRing, Info, Briefcase, FileText } from "lucide-react";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setShow(true);
    // Trigger animation slightly after mount
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  if (!show) return null;

  function handleClose() {
    setAnimateIn(false);
    setTimeout(() => setShow(false), 300); // Wait for fade out
  }

  const notices = [
    {
      id: 0,
      icon: BellRing,
      color: "#dc2626",
      bg: "#fef2f2",
      title: "URGENT: Only 3 days left to fill your examination form!",
      date: "27 Apr 2026",
      desc: "The final deadline for the Nov/Dec 2025 semester examination form is 30 Apr 2026. Avoid late fees and submit immediately.",
      highlight: true,
    },
    {
      id: 1,
      icon: Info,
      color: "#007B8A",
      bg: "#e6f7f9",
      title: "Academic Calendar Published",
      date: "24 Apr 2026",
      desc: "The revised academic calendar for session 2025–26 is now available.",
      highlight: false,
    },
    {
      id: 2,
      icon: Briefcase,
      color: "#6366f1",
      bg: "#eef2ff",
      title: "Placement Drive — TCS",
      date: "22 Apr 2026",
      desc: "TCS campus recruitment drive is scheduled for 5 May 2026. Register by 1 May.",
      highlight: false,
    },
    {
      id: 3,
      icon: FileText,
      color: "#f59e0b",
      bg: "#fffbeb",
      title: "Result Declaration",
      date: "20 Apr 2026",
      desc: "Results for the previous semester have been declared. Check your portal.",
      highlight: false,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: animateIn ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        transition: "background-color 0.3s ease",
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(680px, 92vw)",
          backgroundColor: "#ffffff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 28px 90px rgba(0,0,0,0.3)",
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#007B8A",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BellRing size={18} color="#ffffff" />
            <span style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700 }}>
              Recent Notifications
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 6,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
              transition: "background 0.2s",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "0" }}>
          {notices.map((n, i) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  gap: 14,
                  borderBottom: i < notices.length - 1 ? "1px solid #f0f0f0" : "none",
                  backgroundColor: n.highlight ? "#fff5f5" : (i % 2 === 0 ? "#ffffff" : "#fafafa"),
                  borderLeft: n.highlight ? "4px solid #ef4444" : "4px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: n.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} color={n.color} strokeWidth={2.25} />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1a1a2e" }}>
                      {n.title}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "#4b5563", margin: "0 0 6px 0", lineHeight: 1.4 }}>
                    {n.desc}
                  </p>
                  <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600 }}>
                    {n.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "#f9fafb",
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              backgroundColor: "#1a1a2e",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
