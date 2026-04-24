import { ChevronDown, Search, Loader2 } from "lucide-react";

interface Props {
  enrollmentNo?: string;
  session: string;
  onSessionChange: (s: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const SESSIONS = ["December 2025", "June 2025", "December 2024", "June 2024"];

export default function ExamFormPrerequisites({
  enrollmentNo = "0105IT251024",
  session,
  onSessionChange,
  onSearch,
  isSearching,
}: Props) {
  return (
    <div>
      <div style={sectionLabelStyle}>Exam Form Prerequisites</div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          {/* Enrollment No. — read-only */}
          <div>
            <label style={labelStyle}>Enrollment No.</label>
            <input
              readOnly
              value={enrollmentNo}
              style={{
                background: "#f3f4f6",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                padding: "8px 12px",
                fontSize: "0.875rem",
                color: "#1a1a2e",
                width: 200,
                cursor: "not-allowed",
                display: "block",
              }}
            />
          </div>

          {/* Examination Session */}
          <div>
            <label style={labelStyle}>Examination Session</label>
            <div style={{ position: "relative", display: "inline-block" }}>
              <select
                value={session}
                onChange={(e) => onSessionChange(e.target.value)}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  padding: "8px 34px 8px 12px",
                  fontSize: "0.875rem",
                  color: "#1a1a2e",
                  width: 200,
                  background: "#ffffff",
                  cursor: "pointer",
                  outline: "none",
                  display: "block",
                }}
              >
                {SESSIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#6b7280",
                }}
              />
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={onSearch}
            disabled={isSearching}
            className="search-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: isSearching ? "#9ab8bc" : "#007B8A",
              color: "#ffffff",
              border: "none",
              borderRadius: 6,
              padding: "9px 24px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: isSearching ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              height: 38,
            }}
          >
            {isSearching ? (
              <>
                <Loader2
                  size={15}
                  style={{ animation: "spin 0.7s linear infinite", flexShrink: 0 }}
                />
                Searching…
              </>
            ) : (
              <>
                <Search size={15} />
                Search
              </>
            )}
          </button>
        </div>
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

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#374151",
  display: "block",
  marginBottom: 4,
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  padding: "20px 24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};
