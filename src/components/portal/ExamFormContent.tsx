"use client";

import { useState, useRef, useEffect } from "react";
import { AlertTriangle, X, Zap, BookOpen, IndianRupee, CalendarClock, ClipboardCheck } from "lucide-react";
import ExamFormPrerequisites from "./ExamFormPrerequisites";
import StudentPersonalDetails from "./StudentPersonalDetails";
import StudentCurrentStatus from "./StudentCurrentStatus";
import SubjectList from "./SubjectList";
import FeeSummary from "./FeeSummary";
import ReviewModal, { ReviewSubject, ReviewFeeRow } from "./ReviewModal";

interface BackPaper { code: string; name: string; fee: number; }

interface CoreSubject {
  code: string; name: string;
  type: "Theory" | "Practical";
  credits: number; max: number; min: number;
}

const BASE_FEE_TOTAL = 1400;

const BASE_FEES_FOR_REVIEW: ReviewFeeRow[] = [
  { label: "Examination Fee",          amount: 1200 },
  { label: "University Development Fee", amount: 100 },
  { label: "Sports & Cultural Fee",    amount: 50  },
  { label: "Processing Fee",           amount: 50  },
  { label: "Late Fee (if applicable)", amount: 0   },
];

export default function ExamFormContent() {
  const [searchTriggered, setSearchTriggered]   = useState(false);
  const [examType, setExamType]                 = useState("");
  const [bannerDismissed, setBannerDismissed]   = useState(false);
  const [bannerCollapsing, setBannerCollapsing] = useState(false);
  const [confirmChecked, setConfirmChecked]     = useState(false);
  const [isSearching, setIsSearching]           = useState(false);
  const [toastVisible, setToastVisible]         = useState(false);
  const [addedBackPapers, setAddedBackPapers]   = useState<BackPaper[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<CoreSubject[]>([]);
  const [reviewOpen, setReviewOpen]             = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const extraFee   = addedBackPapers.reduce((s, b) => s + b.fee, 0);
  const grandTotal = BASE_FEE_TOTAL + extraFee;

  // Auto-scroll to form when search results appear
  useEffect(() => {
    if (searchTriggered && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [searchTriggered]);

  function handleSearch() {
    setIsSearching(true);
    setTimeout(() => { setIsSearching(false); setSearchTriggered(true); }, 1500);
  }

  function handleDismissBanner() {
    setBannerCollapsing(true);
    setTimeout(() => setBannerDismissed(true), 300);
  }

  // Build subjects for ReviewModal
  const reviewSubjects: ReviewSubject[] = [
    ...selectedSubjects.map((s) => ({ ...s, isBackPaper: false })),
    ...addedBackPapers.map((b) => ({
      code: b.code,
      name: b.name,
      type: "Theory" as const,
      credits: 0,
      max: 100,
      min: 35,
      isBackPaper: true,
    })),
  ];

  const reviewFees: ReviewFeeRow[] = [
    ...BASE_FEES_FOR_REVIEW,
    ...(extraFee > 0 ? [{ label: "Ex / Back Paper Fee", amount: extraFee, highlight: "extra" as const }] : []),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Warning banner */}
      {!bannerDismissed && (
        <div style={{ maxHeight: bannerCollapsing ? 0 : 400, overflow: "hidden", transition: "max-height 0.3s ease" }}>
          <WarningBanner onDismiss={handleDismissBanner} />
        </div>
      )}

      {/* Section 1 — Prerequisites */}
      <ExamFormPrerequisites
        examType={examType}
        onExamTypeChange={setExamType}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Sections 2–6 — revealed after search */}
      {searchTriggered && (
        <div ref={resultsRef} className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Step divider */}
          <StepDivider label="Step 2 — Complete Your Exam Form" />

          {/* Stat cards */}
          <ExamStatCards examType={examType} extraSubjects={addedBackPapers.length} />

          <StudentPersonalDetails />
          <StudentCurrentStatus />

          <SubjectList
            onExtraSubjectsChange={setAddedBackPapers}
            onSubjectsChange={setSelectedSubjects}
          />

          <FeeSummary
            confirmChecked={confirmChecked}
            onConfirmChange={setConfirmChecked}
            onReview={() => setReviewOpen(true)}
            extraFee={extraFee}
          />
        </div>
      )}

      {/* Review modal */}
      {reviewOpen && (
        <ReviewModal
          examType={examType}
          session="April 2026"
          subjects={reviewSubjects}
          fees={reviewFees}
          grandTotal={grandTotal}
          onClose={() => setReviewOpen(false)}
          onProceed={() => {
            setReviewOpen(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3500);
          }}
        />
      )}

      {/* Payment coming-soon toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed", bottom: 28, right: 28,
            backgroundColor: "#1a1a2e", color: "#ffffff",
            padding: "14px 18px", borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontSize: "0.875rem", fontWeight: 500,
            display: "flex", alignItems: "center", gap: 10,
            zIndex: 9999, animation: "fadeInUp 0.25s ease forwards",
          }}
        >
          <Zap size={16} color="#00C2D4" />
          Payment integration coming soon
        </div>
      )}
    </div>
  );
}

/* ── Step Divider ────────────────────────────────────────────────────── */

function StepDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0" }} />
      <span style={{
        fontSize: "0.72rem", fontWeight: 700, color: "#007B8A",
        textTransform: "uppercase", letterSpacing: "0.1em",
        whiteSpace: "nowrap",
        background: "#f0fafa", border: "1px solid #b2e4ea",
        borderRadius: 20, padding: "4px 14px",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0" }} />
    </div>
  );
}

/* ── Stat Cards ──────────────────────────────────────────────────────── */

function ExamStatCards({ examType, extraSubjects }: { examType: string; extraSubjects: number }) {
  const stats = [
    {
      icon: <BookOpen size={20} color="#007B8A" strokeWidth={1.75} />,
      bg: "#e6f7f9",
      label: "Total Subjects",
      value: `${7 + extraSubjects}`,
      sub: `${7} regular${extraSubjects > 0 ? ` + ${extraSubjects} back` : ""}`,
    },
    {
      icon: <IndianRupee size={20} color="#16a34a" strokeWidth={1.75} />,
      bg: "#f0fdf4",
      label: "Exam Fee",
      value: "₹ 1,400",
      sub: "Base fee + levies",
    },
    {
      icon: <CalendarClock size={20} color="#d97706" strokeWidth={1.75} />,
      bg: "#fffbeb",
      label: "Last Date",
      value: "30 Apr 2026",
      sub: "April 2026 Session",
    },
    {
      icon: <ClipboardCheck size={20} color="#6366f1" strokeWidth={1.75} />,
      bg: "#eef2ff",
      label: "Exam Type",
      value: examType || "Regular",
      sub: "Forwarded by institution",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
            padding: "16px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: 8,
              backgroundColor: s.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.icon}
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>
              {s.label}
            </div>
            <div style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>
              {s.value}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 2 }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Warning Banner ──────────────────────────────────────────────────── */

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
          `If your payment transaction shows "failed transaction" status but the amount was deducted, please wait. Do not re-submit or make another payment. Your form will be forwarded automatically.`,
          `Your examination fees deduction will reflect as "Submitted To BU" in your account by the next working day.`,
          `The institution must forward your exam form first before it becomes available for online submission.`,
        ].map((text, i) => (
          <li key={i} style={{ fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6, marginBottom: i < 2 ? 4 : 0 }}>
            {text}
          </li>
        ))}
      </ul>
      <button
        onClick={onDismiss}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 2, flexShrink: 0, lineHeight: 1 }}
        className="banner-dismiss"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
