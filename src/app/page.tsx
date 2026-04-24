import LoginForm from "@/components/portal/LoginForm";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ loggedOut?: string }>;
}) {
  const params = await searchParams;
  const loggedOut = params.loggedOut === "true";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f0f4f5",
      }}
    >
      {/* Header */}
      <header
        style={{ backgroundColor: "#007B8A", height: 80 }}
        className="w-full flex items-center px-6 shrink-0"
      >
        <div style={{ flexShrink: 0 }}>
          <img
            src="/Barkatullah_University_logo.png"
            alt="University Logo"
            width={60}
            height={60}
            style={{ objectFit: "contain", display: "block" }}
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span
            style={{
              color: "#ffffff",
              fontSize: "1.125rem",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "0.01em",
            }}
          >
            Barkatullah Vishwavidyalaya
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.75rem",
              fontWeight: 400,
              marginTop: 3,
            }}
          >
            Hoshangabad Road, Bhopal (M.P.) — 462033
          </span>
        </div>

        {/* Spacer to balance the logo */}
        <div style={{ width: 52, flexShrink: 0 }} />
      </header>

      {/* Nav bar */}
      <nav
        style={{ backgroundColor: "#1a1a2e", height: 44 }}
        className="w-full flex items-center px-6 shrink-0"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8rem",
            letterSpacing: "0.04em",
          }}
        >
          Student Portal &rsaquo; Login
        </span>
      </nav>

      {/* Main — centred login card */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Logged-out banner */}
          {loggedOut && (
            <div
              style={{
                backgroundColor: "#d4f5e9",
                border: "1px solid #a7f3d0",
                borderRadius: 8,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckCircle2 size={16} color="#1a7a4a" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", color: "#1a7a4a", fontWeight: 500 }}>
                You have been logged out. Sign in again to continue.
              </span>
            </div>
          )}

          {/* Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              padding: "36px 32px",
            }}
          >
            {/* Card heading */}
            <div style={{ marginBottom: 28, textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#e6f7f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#007B8A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h1
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                Student Login
              </h1>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  margin: "6px 0 0",
                }}
              >
                Sign in to access your student portal
              </p>
            </div>

            <LoginForm />
          </div>

          {/* Help text */}
          <p
            style={{
              textAlign: "center",
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            Having trouble logging in?{" "}
            <Link
              href="/student/helpdesk"
              style={{ color: "#007B8A", fontWeight: 500, textDecoration: "none" }}
            >
              Contact Help Desk
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1a1a2e",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.72rem",
          textAlign: "center",
          padding: "10px 16px",
          flexShrink: 0,
        }}
      >
        © {new Date().getFullYear()} Barkatullah Vishwavidyalaya, Bhopal. All rights
        reserved.
      </footer>
    </div>
  );
}
