import { ClipboardCheck } from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

interface Props {
  confirmChecked: boolean;
  onConfirmChange: (v: boolean) => void;
  onReview: () => void;
  extraFee?: number;
}

const BASE_FEES = [
  { label: "Examination Fee",         amount: 1200 },
  { label: "University Development Fee", amount: 100 },
  { label: "Sports & Cultural Fee",   amount: 50  },
  { label: "Processing Fee",          amount: 50  },
  { label: "Late Fee (if applicable)", amount: 0  },
];

export default function FeeSummary({ confirmChecked, onConfirmChange, onReview, extraFee = 0 }: Props) {
  const baseTotal = BASE_FEES.reduce((s, f) => s + f.amount, 0);
  const grandTotal = baseTotal + extraFee;

  return (
    <div>
      <div style={sectionLabelStyle}>Fee Summary &amp; Submission</div>

      <div style={cardStyle}>
        {/* Base fee rows */}
        {BASE_FEES.map((fee) => (
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
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color:
                  fee.amount === 0
                    ? "#9ca3af"
                    : fee.label.includes("Late")
                    ? "#ef4444"
                    : "#1a1a2e",
              }}
            >
              {fee.amount === 0 ? "—" : `₹ ${fee.amount.toLocaleString("en-IN")}`}
            </span>
          </div>
        ))}

        {/* Extra subjects fee row — only shown when non-zero */}
        {extraFee > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <span style={{ fontSize: "0.875rem", color: "#374151" }}>
              Ex / Back Paper Fee
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#d97706" }}>
              + ₹ {extraFee.toLocaleString("en-IN")}
            </span>
          </div>
        )}

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
          <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#007B8A" }}>
            ₹ {grandTotal.toLocaleString("en-IN")}
          </span>
        </div>

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
            I confirm that all subject selections and personal details are correct,
            and I wish to proceed with examination form submission.
          </span>
        </label>

        {/* Review button */}
        <button
          onClick={onReview}
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
            padding: "12px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: confirmChecked ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          <ClipboardCheck size={16} />
          Review Submission →
        </button>

        {/* Helper text */}
        {confirmChecked && (
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", textAlign: "center", margin: "10px 0 0" }}>
            You will be able to verify all details before payment is charged.
          </p>
        )}
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
