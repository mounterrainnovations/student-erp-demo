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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f4f5" }}>

      {/* Header */}
      <header
        style={{ backgroundColor: "#007B8A", height: 80 }}
        className="w-full flex items-center px-6 shrink-0"
      >
        <div style={{ flexShrink: 0, marginRight: 16 }}>
          <img
            src="/Barkatullah_University_logo.png"
            alt="University Logo"
            width={60}
            height={60}
            style={{ objectFit: "contain", display: "block" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-left">
          <span style={{ color: "#ffffff", fontSize: "1.125rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "0.01em" }}>
            Barkatullah Vishwavidyalaya
          </span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 400, marginTop: 3 }}>
            Hoshangabad Road, Bhopal (M.P.) — 462033
          </span>
        </div>
      </header>

      {/* Nav bar */}
      <nav
        style={{ backgroundColor: "#1a1a2e", height: 44 }}
        className="w-full flex items-center px-6 shrink-0"
      >
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
          Student Portal &rsaquo; Login
        </span>
      </nav>

      {/* Main — two-column split */}
      <main style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* ── Left panel: login form ───────────────────────────────── */}
        <div
          style={{
            width: "44%",
            minWidth: 340,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 48px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 380 }}>

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
                  marginBottom: 28,
                }}
              >
                <CheckCircle2 size={16} color="#1a7a4a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "#1a7a4a", fontWeight: 500 }}>
                  You have been logged out. Sign in again to continue.
                </span>
              </div>
            )}

            {/* Welcome heading */}
            <div style={{ marginBottom: 36 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#e6f7f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007B8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px 0" }}>
                Welcome back
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
                Sign in to your student portal to continue.
              </p>
            </div>

            <LoginForm />

            {/* Help link */}
            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", marginTop: 28 }}>
              Having trouble?{" "}
              <Link href="/student/helpdesk" style={{ color: "#007B8A", fontWeight: 500, textDecoration: "none" }}>
                Contact Help Desk
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right panel: university image ────────────────────────── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/bg.jpg"
            alt="Barkatullah University Campus"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(0,123,138,0.55) 0%, rgba(26,26,46,0.65) 100%)",
            }}
          />
          {/* Caption */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 40,
              right: 40,
              color: "#ffffff",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                margin: "0 0 8px 0",
              }}
            >
              Student ERP System
            </p>
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                lineHeight: 1.25,
                margin: "0 0 10px 0",
              }}
            >
              Student Portal

            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.75)",
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              Access your academic records, class schedules, fee details, and stay connected with the university's administrative resources all in one place.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1a1a2e",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.72rem",
          textAlign: "center",
          padding: "10px 16px",
          flexShrink: 0,
        }}
      >
        © {new Date().getFullYear()} Barkatullah Vishwavidyalaya, Bhopal. All rights reserved.
      </footer>
    </div>
  );
}
