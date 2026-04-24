import { ClipboardList } from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

interface Props {
  confirmChecked: boolean;
  onConfirmChange: (v: boolean) => void;
  onSubmit: () => void;
}

const FEES = [
  { label: "Enrollment Fee", amount: 800 },
  { label: "Development Fund", amount: 500 },
  { label: "Sports & Cultural Fee", amount: 200 },
  { label: "Processing Fee", amount: 50 },
];

const TOTAL = FEES.reduce((s, f) => s + f.amount, 0);

export default function EnrollmentFeeSummary({
  confirmChecked,
  onConfirmChange,
  onSubmit,
}: Props) {
  return (
    <div>
      <div style={sectionLabelStyle}>Fee Summary &amp; Submission</div>

      <div style={cardStyle}>
        {/* Fee rows */}
        {FEES.map((fee) => (
          <div
            key={fee.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <span style={{ fontSize: "0.875rem", color: "#374151" }}>{fee.label}</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>
              ₹ {fee.amount.toLocaleString("en-IN")}
            </span>
          </div>
        ))}

        {/* Total */}
        <div style={{ borderTop: "2px solid #e0e0e0", margin: "10px 0 16px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#374151" }}>
            Total Payable
          </span>
          <span style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>
            ₹ {TOTAL.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e0e0e0", marginBottom: 16 }} />

        {/* Confirm checkbox */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 9,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          <input
            type="checkbox"
            checked={confirmChecked}
            onChange={(e) => onConfirmChange(e.target.checked)}
            style={{
              accentColor: "#007B8A",
              width: 15,
              height: 15,
              marginTop: 2,
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "0.8125rem", color: "#374151", lineHeight: 1.5 }}>
            I confirm that I am a regular student and all details are correct.
            I wish to enroll for this academic year and semester.
          </span>
        </label>

        {/* Submit button */}
        <button
          onClick={onSubmit}
          disabled={!confirmChecked}
          className="submit-btn"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: confirmChecked ? "#007B8A" : "#e0e0e0",
            color: confirmChecked ? "#ffffff" : "#9ca3af",
            border: "none",
            borderRadius: 8,
            padding: "11px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: confirmChecked ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          <ClipboardList size={16} />
          Submit Enrollment Form →
        </button>
      </div>
    </div>
  );
}

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 10,
};
