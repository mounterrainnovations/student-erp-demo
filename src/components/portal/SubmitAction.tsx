import { ShieldCheck, CreditCard } from "lucide-react";
import { cardStyle } from "./ExamFormPrerequisites";

interface Props {
  confirmChecked: boolean;
  onConfirmChange: (v: boolean) => void;
  onSubmit: () => void;
}

export default function SubmitAction({ confirmChecked, onConfirmChange, onSubmit }: Props) {
  return (
    <div style={{ flex: 1 }}>
      <div style={sectionLabelStyle}>Submit Exam Form</div>

      <div style={{ ...cardStyle, textAlign: "center" }}>
        <ShieldCheck
          size={40}
          color="#007B8A"
          style={{ display: "block", margin: "0 auto 12px" }}
        />

        <h3 style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "#1a1a2e",
          margin: "0 0 8px",
        }}>
          Ready to Submit?
        </h3>

        <p style={{
          fontSize: "0.8125rem",
          color: "#6b7280",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}>
          Please verify all details before proceeding to payment.
          This action cannot be undone.
        </p>

        <label style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 9,
          textAlign: "left",
          cursor: "pointer",
          marginBottom: 20,
        }}>
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
            I confirm that all details are correct and I wish to proceed
            with examination form submission.
          </span>
        </label>

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
            padding: "12px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: confirmChecked ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          <CreditCard size={16} />
          Proceed to Payment →
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
