"use client";

import { useState } from "react";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import EnrollmentPrerequisites from "./EnrollmentPrerequisites";
import StudentPersonalDetails from "./StudentPersonalDetails";
import EnrollmentStatus from "./EnrollmentStatus";
import EnrollmentSubjectList from "./EnrollmentSubjectList";
import EnrollmentFeeSummary from "./EnrollmentFeeSummary";

export default function EnrollmentFormContent() {
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [semester, setSemester] = useState("I");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [bannerCollapsing, setBannerCollapsing] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchTriggered(true);
    }, 1500);
  };

  const handleDismissBanner = () => {
    setBannerCollapsing(true);
    setTimeout(() => setBannerDismissed(true), 300);
  };

  const handleSubmit = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Warning banner */}
      {!bannerDismissed && (
        <div
          style={{
            maxHeight: bannerCollapsing ? 0 : 400,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <WarningBanner onDismiss={handleDismissBanner} />
        </div>
      )}

      {/* Section 1 — prerequisites */}
      <EnrollmentPrerequisites
        academicYear={academicYear}
        semester={semester}
        onAcademicYearChange={setAcademicYear}
        onSemesterChange={setSemester}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Sections 2–5 — fade in after search */}
      {searchTriggered && (
        <div
          className="fade-in-up"
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <StudentPersonalDetails />
          <EnrollmentStatus />
          <EnrollmentSubjectList />
          <EnrollmentFeeSummary
            confirmChecked={confirmChecked}
            onConfirmChange={setConfirmChecked}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            backgroundColor: "#1a1a2e",
            color: "#ffffff",
            padding: "14px 18px",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontSize: "0.875rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 9999,
            animation: "fadeInUp 0.25s ease forwards",
          }}
        >
          <CheckCircle2 size={16} color="#00C2D4" />
          Enrollment form submitted successfully
        </div>
      )}
    </div>
  );
}

function WarningBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      style={{
        backgroundColor: "#fff8e1",
        borderLeft: "4px solid #f59e0b",
        borderRadius: 6,
        padding: "14px 18px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />

      <ul style={{ flex: 1, margin: 0, paddingLeft: 18, listStyleType: "disc" }}>
        {[
          `The enrollment form must be submitted before the deadline. Late submission may attract additional fees.`,
          `Your institution must forward the enrollment form to the university before it becomes active for the current academic year.`,
          `Ensure your personal details are up to date — discrepancies may cause issues in your final documents and degree certificate.`,
        ].map((text, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.8125rem",
              color: "#374151",
              lineHeight: 1.6,
              marginBottom: i < 2 ? 4 : 0,
            }}
          >
            {text}
          </li>
        ))}
      </ul>

      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9ca3af",
          padding: 2,
          flexShrink: 0,
          lineHeight: 1,
          transition: "color 0.15s",
        }}
        className="banner-dismiss"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
