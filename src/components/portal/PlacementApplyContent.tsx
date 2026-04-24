"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

/* ── Company data ──────────────────────────────────────────── */
type CompanyKey = "Infosys" | "TCS" | "Wipro" | "Cognizant";

const COMPANIES: Record<
  CompanyKey,
  {
    type: string;
    role: string;
    ctc: string;
    branches: string;
    driveDate: string;
    minCGPA: number;
    minAttendance: number;
    openings: number;
  }
> = {
  Infosys: {
    type: "IT Services & Consulting",
    role: "Systems Engineer",
    ctc: "₹3.6 LPA",
    branches: "IT, CS, EC",
    driveDate: "15 May 2026",
    minCGPA: 6.0,
    minAttendance: 75,
    openings: 12,
  },
  TCS: {
    type: "IT Services & Consulting",
    role: "Assistant System Engineer",
    ctc: "₹3.36 LPA",
    branches: "All Branches",
    driveDate: "22 May 2026",
    minCGPA: 6.0,
    minAttendance: 75,
    openings: 20,
  },
  Wipro: {
    type: "IT Services",
    role: "Project Engineer",
    ctc: "₹3.5 LPA",
    branches: "IT, CS",
    driveDate: "02 Jun 2026",
    minCGPA: 6.5,
    minAttendance: 75,
    openings: 8,
  },
  Cognizant: {
    type: "IT Services & Digital",
    role: "Programmer Analyst",
    ctc: "₹4.0 LPA",
    branches: "IT, CS, EC",
    driveDate: "10 Jun 2026",
    minCGPA: 6.0,
    minAttendance: 75,
    openings: 10,
  },
};

/* ── Student data (demo) ───────────────────────────────────── */
const STUDENT = {
  enrollmentNo: "0105IT251024",
  name: "Divyansh Saxena",
  fathersName: "Sandeep Saxena",
  mobile: "9340681485",
  email: "divyansh.saxena@buit.ac.in",
  gender: "Male",
  program: "B.Tech",
  branch: "Information Technology",
  semester: "I",
  cgpa: 7.4,
  attendance: 82,
  backlogs: 0,
};

const CAPTCHA = { a: 8, b: 5 };

/* ── Props ─────────────────────────────────────────────────── */
interface Props {
  initialCompany?: string;
}

/* ── Root component ────────────────────────────────────────── */
export default function PlacementApplyContent({ initialCompany }: Props) {
  const router = useRouter();
  const validInitial =
    initialCompany && initialCompany in COMPANIES ? initialCompany : "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [company, setCompany] = useState(validInitial);
  const [remark, setRemark] = useState("");
  const [profileConfirmed, setProfileConfirmed] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNo] = useState(
    () => `REG-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`
  );

  const companyData = company ? COMPANIES[company as CompanyKey] : null;
  const captchaCorrect = captchaInput.trim() === String(CAPTCHA.a + CAPTCHA.b);
  const canSubmit = declared && captchaCorrect;

  if (submitted && companyData) {
    return (
      <SuccessState
        company={company}
        companyData={companyData}
        ticketNo={ticketNo}
        onBack={() => router.push("/student/placement")}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <StepIndicator step={step} />

      {step === 1 && (
        <Step1
          company={company}
          setCompany={setCompany}
          companyData={companyData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          remark={remark}
          setRemark={setRemark}
          profileConfirmed={profileConfirmed}
          setProfileConfirmed={setProfileConfirmed}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && companyData && (
        <Step3
          company={company}
          companyData={companyData}
          declared={declared}
          setDeclared={setDeclared}
          captchaInput={captchaInput}
          setCaptchaInput={setCaptchaInput}
          captchaCorrect={captchaCorrect}
          canSubmit={canSubmit}
          onBack={() => setStep(2)}
          onSubmit={() => setSubmitted(true)}
        />
      )}
    </div>
  );
}

/* ── Step indicator ────────────────────────────────────────── */
function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const STEPS = [
    { n: 1, label: "Company" },
    { n: 2, label: "Profile Review" },
    { n: 3, label: "Declaration" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {STEPS.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <React.Fragment key={s.label}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                minWidth: 88,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: done || active ? "#007B8A" : "#e0e0e0",
                  color: done || active ? "#ffffff" : "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  transition: "background-color 0.25s",
                  flexShrink: 0,
                }}
              >
                {done ? <CheckCircle2 size={18} /> : s.n}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: active ? 700 : 400,
                  color: active ? "#007B8A" : done ? "#374151" : "#9ca3af",
                  textAlign: "center",
                  lineHeight: 1.3,
                  transition: "color 0.25s",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: done ? "#007B8A" : "#e0e0e0",
                  marginTop: 17,
                  transition: "background-color 0.25s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Step 1: Company selection & eligibility ───────────────── */
function Step1({
  company,
  setCompany,
  companyData,
  onNext,
}: {
  company: string;
  setCompany: (v: string) => void;
  companyData: (typeof COMPANIES)[CompanyKey] | null;
  onNext: () => void;
}) {
  const eligibility = companyData
    ? [
        {
          criteria: "CGPA",
          required: `≥ ${companyData.minCGPA.toFixed(1)}`,
          yours: String(STUDENT.cgpa),
          pass: STUDENT.cgpa >= companyData.minCGPA,
        },
        {
          criteria: "Active Backlogs",
          required: "0",
          yours: String(STUDENT.backlogs),
          pass: STUDENT.backlogs === 0,
        },
        {
          criteria: "Min. Attendance",
          required: `≥ ${companyData.minAttendance}%`,
          yours: `${STUDENT.attendance}%`,
          pass: STUDENT.attendance >= companyData.minAttendance,
        },
      ]
    : [];

  const allEligible = eligibility.length > 0 && eligibility.every((e) => e.pass);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Company select */}
      <div>
        <div style={sectionLabelStyle}>Select Company</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {(Object.keys(COMPANIES) as CompanyKey[]).map((c) => {
            const isSelected = company === c;
            return (
              <div
                key={c}
                onClick={() => setCompany(c)}
                style={{
                  backgroundColor: isSelected ? "#f0fbfc" : "#ffffff",
                  border: isSelected ? "2px solid #007B8A" : "1px solid #e0e0e0",
                  borderRadius: 12,
                  boxShadow: isSelected ? "0 4px 12px rgba(0, 123, 138, 0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {isSelected && (
                  <div style={{ position: "absolute", top: 12, right: 12, color: "#007B8A" }}>
                    <CheckCircle2 size={18} />
                  </div>
                )}
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 6 }}>{c}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
                  {COMPANIES[c].type}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#007B8A",
                    backgroundColor: "#e6f7f9",
                    padding: "4px 10px",
                    borderRadius: 20,
                  }}
                >
                  {COMPANIES[c].role}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Company details + eligibility — revealed after selection */}
      {companyData && (
        <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Company details */}
          <div>
            <div style={sectionLabelStyle}>Company Details</div>
            <div style={{ ...cardStyle, padding: 0 }}>
              {[
                [
                  { label: "Company Type", value: companyData.type },
                  { label: "Role Offered", value: companyData.role },
                ],
                [
                  { label: "CTC", value: companyData.ctc },
                  { label: "Drive Date", value: companyData.driveDate },
                ],
                [
                  { label: "Eligible Branches", value: companyData.branches },
                  { label: "No. of Openings", value: String(companyData.openings) },
                ],
              ].map((row, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    backgroundColor: ri % 2 === 0 ? "#ffffff" : "#f8fdfd",
                    borderBottom: ri < 2 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  {row.map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        padding: "10px 16px",
                        borderRight: "1px solid #f3f4f6",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#6b7280",
                          marginBottom: 3,
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#1a1a2e",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility check */}
          <div>
            <div style={sectionLabelStyle}>
              Your Eligibility for {company}
            </div>
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
                    {["Criteria", "Required", "Your Status", "Result"].map((h) => (
                      <th key={h} style={thStyle}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eligibility.map((e, i) => (
                    <tr
                      key={e.criteria}
                      className="exam-table-row"
                      style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
                    >
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{e.criteria}</td>
                      <td style={{ ...tdStyle, color: "#6b7280" }}>{e.required}</td>
                      <td
                        style={{
                          ...tdStyle,
                          fontWeight: 600,
                          color: e.pass ? "#1a7a4a" : "#dc2626",
                        }}
                      >
                        {e.yours}
                      </td>
                      <td style={tdStyle}>
                        {e.pass ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "#1a7a4a",
                            }}
                          >
                            <CheckCircle2 size={13} />
                            Eligible
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "#dc2626",
                            }}
                          >
                            <XCircle size={13} />
                            Not Eligible
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!allEligible && (
              <div
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fecaca",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.8125rem",
                  color: "#991b1b",
                  fontWeight: 500,
                }}
              >
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                You do not meet all criteria for {company}. Please select a
                different company or contact the placement cell.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          disabled={!company || !allEligible}
          className="submit-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: company && allEligible ? "#007B8A" : "#e0e0e0",
            color: company && allEligible ? "#ffffff" : "#9ca3af",
            border: "none",
            borderRadius: 7,
            padding: "10px 24px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: company && allEligible ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          Profile Review
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 2: Profile review ────────────────────────────────── */
function Step2({
  remark,
  setRemark,
  profileConfirmed,
  setProfileConfirmed,
  onBack,
  onNext,
}: {
  remark: string;
  setRemark: (v: string) => void;
  profileConfirmed: boolean;
  setProfileConfirmed: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const DETAILS: [string, string][] = [
    ["Enrollment No.", STUDENT.enrollmentNo],
    ["Student Name", STUDENT.name],
    ["Father's Name", STUDENT.fathersName],
    ["Mobile No.", STUDENT.mobile],
    ["Email", STUDENT.email],
    ["Gender", STUDENT.gender],
    ["Program", STUDENT.program],
    ["Branch", STUDENT.branch],
    ["Semester", STUDENT.semester],
    ["CGPA", String(STUDENT.cgpa)],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Student details — read-only */}
      <div>
        <div style={sectionLabelStyle}>Your Profile Details</div>
        <div style={{ ...cardStyle, padding: 0 }}>
          {Array.from({ length: Math.ceil(DETAILS.length / 2) }, (_, ri) => {
            const left = DETAILS[ri * 2];
            const right = DETAILS[ri * 2 + 1];
            return (
              <div
                key={ri}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  backgroundColor: ri % 2 === 0 ? "#ffffff" : "#f8fdfd",
                  borderBottom:
                    ri < Math.ceil(DETAILS.length / 2) - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                }}
              >
                {[left, right].map((cell, ci) =>
                  cell ? (
                    <div
                      key={cell[0]}
                      style={{
                        padding: "10px 16px",
                        borderRight: ci === 0 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#6b7280",
                          marginBottom: 3,
                        }}
                      >
                        {cell[0]}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#1a1a2e",
                        }}
                      >
                        {cell[1]}
                      </div>
                    </div>
                  ) : (
                    <div key={ci} style={{ padding: "10px 16px" }} />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Remark + confirmation */}
      <div>
        <div style={sectionLabelStyle}>Additional Information</div>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Remark (if any)</label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Any additional information for the placement cell"
              maxLength={200}
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: "0.875rem",
                color: "#1a1a2e",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 16 }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 9,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={profileConfirmed}
                onChange={(e) => setProfileConfirmed(e.target.checked)}
                style={{
                  accentColor: "#007B8A",
                  width: 15,
                  height: 15,
                  marginTop: 2,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "#374151",
                  lineHeight: 1.5,
                }}
              >
                I confirm that all the details shown above are correct and
                up to date. I understand that incorrect information may lead
                to disqualification from the placement process.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "transparent",
            color: "#6b7280",
            border: "1px solid #d1d5db",
            borderRadius: 7,
            padding: "10px 20px",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!profileConfirmed}
          className="submit-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: profileConfirmed ? "#007B8A" : "#e0e0e0",
            color: profileConfirmed ? "#ffffff" : "#9ca3af",
            border: "none",
            borderRadius: 7,
            padding: "10px 24px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: profileConfirmed ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          Declaration
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 3: Declaration & submit ──────────────────────────── */
function Step3({
  company,
  companyData,
  declared,
  setDeclared,
  captchaInput,
  setCaptchaInput,
  captchaCorrect,
  canSubmit,
  onBack,
  onSubmit,
}: {
  company: string;
  companyData: (typeof COMPANIES)[CompanyKey];
  declared: boolean;
  setDeclared: (v: boolean) => void;
  captchaInput: string;
  setCaptchaInput: (v: string) => void;
  captchaCorrect: boolean;
  canSubmit: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Application summary */}
      <div>
        <div style={sectionLabelStyle}>Application Summary</div>
        <div style={cardStyle}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { label: "Company", value: company },
              { label: "Role", value: companyData.role },
              { label: "CTC", value: companyData.ctc },
              { label: "Drive Date", value: companyData.driveDate },
              { label: "Student", value: STUDENT.name },
              { label: "Enrollment No.", value: STUDENT.enrollmentNo },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: 3,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#1a1a2e",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Declaration */}
      <div>
        <div style={sectionLabelStyle}>Declaration</div>
        <div style={cardStyle}>
          <div
            style={{
              padding: "12px 14px",
              backgroundColor: "#f8fdfd",
              border: "1px solid #e0e0e0",
              borderRadius: 6,
              marginBottom: 16,
              fontSize: "0.875rem",
              color: "#374151",
              lineHeight: 1.7,
            }}
          >
            I, <strong>{STUDENT.name}</strong>, hereby declare that all the
            information provided in this placement registration form is true,
            correct, and complete to the best of my knowledge. I understand
            that any false or misleading information will result in immediate
            disqualification from the placement process and may lead to
            disciplinary action as per university norms. I also consent to the
            sharing of my academic and personal details with{" "}
            <strong>{company}</strong> for the purpose of this recruitment drive.
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 9,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={declared}
              onChange={(e) => setDeclared(e.target.checked)}
              style={{
                accentColor: "#007B8A",
                width: 15,
                height: 15,
                marginTop: 2,
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.8125rem",
                color: "#374151",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              I have read and agree to the above declaration.
            </span>
          </label>
        </div>
      </div>

      {/* Verification */}
      <div>
        <div style={sectionLabelStyle}>Verification</div>
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                fontWeight: 500,
              }}
            >
              Enter Answer:
            </span>
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1a1a2e",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              {CAPTCHA.a} + {CAPTCHA.b} =
            </span>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Result"
              maxLength={3}
              style={{
                border: captchaInput
                  ? `1px solid ${captchaCorrect ? "#a7f3d0" : "#fecaca"}`
                  : "1px solid #d1d5db",
                borderRadius: 6,
                padding: "7px 12px",
                fontSize: "0.875rem",
                width: 90,
                outline: "none",
                color: "#1a1a2e",
                background: captchaInput
                  ? captchaCorrect
                    ? "#f0fdf4"
                    : "#fff5f5"
                  : "#ffffff",
                textAlign: "center",
              }}
            />
            {captchaInput && (
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: captchaCorrect ? "#1a7a4a" : "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {captchaCorrect ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}
                {captchaCorrect ? "Correct" : "Incorrect"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "transparent",
            color: "#6b7280",
            border: "1px solid #d1d5db",
            borderRadius: 7,
            padding: "10px 20px",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="submit-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: canSubmit ? "#007B8A" : "#e0e0e0",
            color: canSubmit ? "#ffffff" : "#9ca3af",
            border: "none",
            borderRadius: 7,
            padding: "10px 28px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: canSubmit ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          <ShieldCheck size={16} />
          Submit Registration →
        </button>
      </div>
    </div>
  );
}

/* ── Success state ─────────────────────────────────────────── */
function SuccessState({
  company,
  companyData,
  ticketNo,
  onBack,
}: {
  company: string;
  companyData: (typeof COMPANIES)[CompanyKey];
  ticketNo: string;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#d4f5e9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <CheckCircle2 size={36} color="#1a7a4a" />
      </div>

      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#1a1a2e",
          margin: "0 0 8px",
        }}
      >
        Registration Submitted!
      </h2>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#6b7280",
          margin: "0 0 28px",
          maxWidth: 420,
          lineHeight: 1.6,
        }}
      >
        Your registration for the <strong>{company}</strong> placement drive
        has been received. You will be notified of the next steps via your
        registered email.
      </p>

      {/* Details card */}
      <div
        style={{
          ...cardStyle,
          width: "100%",
          maxWidth: 480,
          textAlign: "left",
          marginBottom: 24,
        }}
      >
        {[
          ["Company", company],
          ["Role", companyData.role],
          ["CTC", companyData.ctc],
          ["Drive Date", companyData.driveDate],
          ["Student", STUDENT.name],
          ["Ticket No.", ticketNo],
        ].map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: i < 5 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: label === "Ticket No." ? 700 : 500,
                color:
                  label === "Ticket No."
                    ? "#007B8A"
                    : label === "CTC"
                    ? "#1a7a4a"
                    : "#1a1a2e",
                fontFamily: label === "Ticket No." ? "monospace" : undefined,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        style={{
          backgroundColor: "#007B8A",
          color: "#ffffff",
          border: "none",
          borderRadius: 7,
          padding: "10px 28px",
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ← Back to Placement
      </button>
    </div>
  );
}

/* ── Shared styles ─────────────────────────────────────────── */
const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 10,
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#374151",
  display: "block",
  marginBottom: 4,
};

const thStyle: React.CSSProperties = {
  padding: "11px 16px",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.8125rem",
  letterSpacing: "0.04em",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: "11px 16px",
  fontSize: "0.875rem",
  color: "#1a1a2e",
  borderBottom: "1px solid #e0e0e0",
};
