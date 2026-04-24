type StatusType = "Submitted to RGPV" | "Forwarded By Institution" | "Pending" | "Failed";

const STATUS_STYLES: Record<StatusType, React.CSSProperties> = {
  "Submitted to RGPV": {
    background: "#d4f5e9",
    color: "#1a7a4a",
    border: "1px solid #a7f3d0",
  },
  "Forwarded By Institution": {
    background: "#dbeafe",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
  },
  Pending: {
    background: "#fef3c7",
    color: "#92400e",
    border: "1px solid #fde68a",
  },
  Failed: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fecaca",
  },
};

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span style={{
      ...STATUS_STYLES[status],
      fontSize: "0.75rem",
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      display: "inline-block",
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

export default function StudentCurrentStatus() {
  return (
    <div>
      <div style={sectionLabelStyle}>Student Current Status</div>

      <div style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007B8A" }}>
              {["Select", "Enrollment No.", "Semester", "Exam Form Status"].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="exam-table-row" style={{ backgroundColor: "#ffffff" }}>
              <td style={tdStyle}>
                <input
                  type="checkbox"
                  style={{ accentColor: "#007B8A", width: 16, height: 16, cursor: "pointer" }}
                />
              </td>
              <td style={tdStyle}>0105IT251024</td>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>
                <StatusBadge status="Forwarded By Institution" />
              </td>
            </tr>
          </tbody>
        </table>
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
