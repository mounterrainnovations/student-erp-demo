"use client";

import { useState } from "react";
import { AlertTriangle, X, Zap } from "lucide-react";
import ExamFormPrerequisites from "./ExamFormPrerequisites";
import StudentPersonalDetails from "./StudentPersonalDetails";
import StudentCurrentStatus from "./StudentCurrentStatus";
import SubjectList from "./SubjectList";
import FeeSummary from "./FeeSummary";

export default function ExamFormContent() {
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [session, setSession] = useState("December 2025");
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

      {/* Section 1 */}
      <ExamFormPrerequisites
        session={session}
        onSessionChange={setSession}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Sections 2–5 — fade in after search */}
      {searchTriggered && (
        <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <StudentPersonalDetails />
          <StudentCurrentStatus />
          <SubjectList />
          <FeeSummary
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
          <Zap size={16} color="#00C2D4" />
          Payment integration coming soon
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
      <AlertTriangle
        size={18}
        color="#f59e0b"
        style={{ flexShrink: 0, marginTop: 1 }}
      />

      <ul
        style={{
          flex: 1,
          margin: 0,
          paddingLeft: 18,
          listStyleType: "disc",
        }}
      >
        {[
          `If your payment transaction shows "failed transaction" status but the amount was deducted, please wait. Do not re-submit or make another payment. Your form will be forwarded automatically.`,
          `Your examination fees deduction will reflect as "Submitted To RGPV" in your account by the next working day.`,
          `The institution must forward your exam form first before it becomes available for online submission.`,
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
