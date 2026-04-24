const SUBJECTS = [
  { sno: 1, code: "CS101", name: "Engineering Mathematics", type: "Theory", max: 100, min: 35 },
  { sno: 2, code: "CS102", name: "Programming Fundamentals", type: "Theory", max: 100, min: 35 },
  { sno: 3, code: "CS103", name: "Digital Electronics", type: "Theory", max: 100, min: 35 },
  { sno: 4, code: "CS104", name: "Engineering Physics", type: "Theory", max: 100, min: 35 },
  { sno: 5, code: "CS105", name: "Communication Skills", type: "Theory", max: 50, min: 18 },
  { sno: 6, code: "CS106", name: "Programming Lab", type: "Practical", max: 50, min: 18 },
];

export default function SubjectList() {
  return (
    <div>
      <div style={sectionLabelStyle}>Subjects for This Semester</div>

      <div style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007B8A" }}>
              {["S.No.", "Subject Code", "Subject Name", "Type", "Max Marks", "Min Marks"].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
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
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "0.8125rem", color: "#374151" }}>
                  {row.code}
                </td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{row.name}</td>
                <td style={tdStyle}>
                  {row.type === "Practical" ? (
                    <span style={{
                      background: "#ede9fe",
                      color: "#5b21b6",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: 20,
                      display: "inline-block",
                    }}>
                      Practical
                    </span>
                  ) : (
                    <span style={{ color: "#374151" }}>Theory</span>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{row.max}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{row.min}</td>
              </tr>
            ))}
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
