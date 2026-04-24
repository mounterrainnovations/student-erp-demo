type SubjectCategory = "Compulsory" | "Elective";

const SUBJECTS: {
  sno: number;
  code: string;
  name: string;
  type: "Theory" | "Practical";
  credits: number;
  category: SubjectCategory;
}[] = [
  { sno: 1, code: "CS101", name: "Engineering Mathematics – I", type: "Theory", credits: 4, category: "Compulsory" },
  { sno: 2, code: "CS102", name: "Programming Fundamentals", type: "Theory", credits: 3, category: "Compulsory" },
  { sno: 3, code: "CS103", name: "Digital Electronics", type: "Theory", credits: 3, category: "Compulsory" },
  { sno: 4, code: "CS104", name: "Engineering Physics", type: "Theory", credits: 3, category: "Compulsory" },
  { sno: 5, code: "CS105", name: "Communication Skills", type: "Theory", credits: 2, category: "Compulsory" },
  { sno: 6, code: "CS106", name: "Programming Lab", type: "Practical", credits: 2, category: "Compulsory" },
  { sno: 7, code: "CS107", name: "Physics Lab", type: "Practical", credits: 1, category: "Compulsory" },
  { sno: 8, code: "CS108", name: "Engineering Graphics", type: "Theory", credits: 2, category: "Elective" },
];

const TOTAL_CREDITS = SUBJECTS.reduce((s, sub) => s + sub.credits, 0);

export default function EnrollmentSubjectList() {
  return (
    <div>
      <div style={sectionLabelStyle}>Subjects for Enrollment</div>

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
              {["S.No.", "Subject Code", "Subject Name", "Type", "Credits", "Category"].map((h) => (
                <th key={h} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((row, i) => (
              <tr
                key={row.code}
                className="exam-table-row"
                style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fdfd" }}
              >
                <td style={tdStyle}>{row.sno}</td>
                <td
                  style={{
                    ...tdStyle,
                    fontFamily: "monospace",
                    fontSize: "0.8125rem",
                    color: "#374151",
                  }}
                >
                  {row.code}
                </td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                <td style={tdStyle}>
                  {row.type === "Practical" ? (
                    <span
                      style={{
                        background: "#ede9fe",
                        color: "#5b21b6",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "2px 8px",
                        borderRadius: 20,
                        display: "inline-block",
                      }}
                    >
                      Practical
                    </span>
                  ) : (
                    <span style={{ color: "#374151" }}>Theory</span>
                  )}
                </td>
                <td
                  style={{
                    ...tdStyle,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#007B8A",
                  }}
                >
                  {row.credits}
                </td>
                <td style={tdStyle}>
                  {row.category === "Elective" ? (
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "2px 8px",
                        borderRadius: 20,
                        display: "inline-block",
                      }}
                    >
                      Elective
                    </span>
                  ) : (
                    <span style={{ color: "#374151" }}>Compulsory</span>
                  )}
                </td>
              </tr>
            ))}

            {/* Total credits row */}
            <tr style={{ backgroundColor: "#f8fdfd", borderTop: "2px solid #e0e0e0" }}>
              <td
                colSpan={4}
                style={{ ...tdStyle, fontWeight: 600, color: "#374151", borderBottom: "none" }}
              >
                Total Credits
              </td>
              <td
                style={{
                  ...tdStyle,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#007B8A",
                  borderBottom: "none",
                }}
              >
                {TOTAL_CREDITS}
              </td>
              <td style={{ ...tdStyle, borderBottom: "none" }} />
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
