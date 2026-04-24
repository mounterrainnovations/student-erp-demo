import { cardStyle } from "./ExamFormPrerequisites";

const ROWS: Array<[{ label: string; value: React.ReactNode } | null, { label: string; value: React.ReactNode } | null]> = [
  [
    {
      label: "ABC ID",
      value: (
        <span style={{
          display: "inline-block",
          background: "#d4f5e9",
          color: "#1a7a4a",
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "2px 10px",
          borderRadius: 20,
        }}>
          Verified
        </span>
      ),
    },
    null,
  ],
  [
    { label: "Name", value: "Divyansh Saxena" },
    { label: "Father's Name", value: "Sandeep Saxena" },
  ],
  [
    { label: "Degree", value: "B.Tech" },
    { label: "Branch", value: "[IT] Information Technology" },
  ],
  [
    { label: "Sex", value: "Male" },
    null,
  ],
  [
    { label: "Address", value: "Ward No 12 Mukharji Nagar Raisen MP 464551" },
    { label: "State", value: "M.P." },
  ],
  [
    { label: "City", value: "Raisen" },
    { label: "Phone", value: "91" },
  ],
  [
    { label: "Pincode", value: "464551" },
    { label: "Admission Year", value: "2025" },
  ],
  [
    { label: "Mobile", value: "9340681485" },
    null,
  ],
];

export default function StudentPersonalDetails() {
  return (
    <div>
      <div style={sectionLabelStyle}>Student Personal Details</div>

      <div style={{ ...cardStyle, padding: 0 }}>
        {ROWS.map(([left, right], i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd",
              borderBottom: i < ROWS.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            <Cell cell={left} />
            <Cell cell={right} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Cell({ cell }: { cell: { label: string; value: React.ReactNode } | null }) {
  if (!cell) return <div style={cellStyle} />;
  return (
    <div style={cellStyle}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", marginBottom: 3 }}>
        {cell.label}
      </div>
      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1a1a2e" }}>
        {cell.value}
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

const cellStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRight: "1px solid #f3f4f6",
};
