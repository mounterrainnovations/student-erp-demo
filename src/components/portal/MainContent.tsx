"use client";

import Link from "next/link";
import { useState } from "react";

interface MainContentProps {
  children: React.ReactNode;
  studentName?: string;
  role?: string;
  department?: string;
  year?: string;
}

export default function MainContent({
  children,
  studentName = "Rajesh Kumar",
  role = "Student",
  department = "BA Economics",
  year = "II Year",
}: MainContentProps) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  return (
    <main
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      {/* Welcome bar */}
      <div
        style={{
          padding: "16px 24px 16px 24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          marginBottom: 20,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                color: "#6b7280",
              }}
            >
              Welcome:{" "}
            </span>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1a1a2e",
              }}
            >
              {studentName}
            </span>
          </div>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
            <span style={{ fontWeight: 500 }}>Role:</span>{" "}
            <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{role}</span>
            <span style={{ color: "#d1d5db", margin: "0 8px" }}>|</span>
            <span style={{ fontWeight: 500 }}>Department:</span>{" "}
            <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{department}</span>
            <span style={{ color: "#d1d5db", margin: "0 8px" }}>|</span>
            <span style={{ fontWeight: 500 }}>Year:</span>{" "}
            <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{year}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src="/passport.png"
            alt={studentName}
            onClick={() => setIsPhotoOpen(true)}
            style={{
              width: "60px",
              height: "75px",
              objectFit: "cover",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              backgroundColor: "#f9fafb",
              cursor: "pointer"
            }}
          />
          <Link
            href="/student"
            style={{
              fontSize: "0.8125rem",
              color: "#007B8A",
              fontWeight: 500,
              textDecoration: "none",
            }}
            className="welcome-link-dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: "0 24px 24px 24px", flex: 1 }}>{children}</div>

      {/* Photo Modal */}
      {isPhotoOpen && (
        <div
          onClick={() => setIsPhotoOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="/passport.png"
            alt={studentName}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              backgroundColor: "#fff"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsPhotoOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
      )}
    </main>
  );
}
