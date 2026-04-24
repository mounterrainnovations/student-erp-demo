import Link from "next/link";

interface MainContentProps {
  children: React.ReactNode;
  studentName?: string;
  role?: string;
  department?: string;
}

export default function MainContent({
  children,
  studentName = "Rajesh Kumar",
  role = "Student",
  department = "BA Economics",
}: MainContentProps) {
  return (
    <main
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      {/* Welcome bar */}
      <div
        style={{
          padding: "16px 24px 16px 24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          marginBottom: 20,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                color: "#6b7280",
              }}
            >
              Welcome:{" "}
            </span>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1a1a2e",
              }}
            >
              {studentName}
            </span>
          </div>
          <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
            <span style={{ fontWeight: 500 }}>Role:</span>{" "}
            <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{role}</span>
            <span style={{ color: "#d1d5db", margin: "0 8px" }}>|</span>
            <span style={{ fontWeight: 500 }}>Department:</span>{" "}
            <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{department}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4 }}>
          <Link
            href="/student"
            style={{
              fontSize: "0.8125rem",
              color: "#007B8A",
              fontWeight: 500,
              textDecoration: "none",
            }}
            className="welcome-link-dashboard"
          >
            Dashboard
          </Link>
          <span style={{ color: "#e0e0e0", fontSize: "0.85rem" }}>|</span>
          <Link
            href="/logout"
            style={{
              fontSize: "0.8125rem",
              color: "#6b7280",
              fontWeight: 400,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            className="welcome-link-logout"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: "0 24px 24px 24px", flex: 1 }}>{children}</div>
    </main>
  );
}
