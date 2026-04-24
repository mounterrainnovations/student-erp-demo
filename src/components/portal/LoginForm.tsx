"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!enrollmentNo.trim() || !password.trim()) {
      setError("Please enter your enrollment number and password.");
      return;
    }

    setLoading(true);
    // Placeholder: replace with real auth logic
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/student");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Error banner */}
      {error && (
        <div
          style={{
            background: "#fff1f1",
            border: "1px solid #f5c2c2",
            borderRadius: 6,
            padding: "10px 14px",
            fontSize: "0.8rem",
            color: "#c0392b",
          }}
        >
          {error}
        </div>
      )}

      {/* Enrollment No. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="enrollment"
          style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}
        >
          Enrollment Number
        </label>
        <input
          id="enrollment"
          type="text"
          value={enrollmentNo}
          onChange={(e) => setEnrollmentNo(e.target.value)}
          placeholder="e.g. 0101CS221001"
          autoComplete="username"
          style={{
            height: 42,
            border: "1px solid #d1d5db",
            borderRadius: 7,
            padding: "0 14px",
            fontSize: "0.875rem",
            color: "#1a1a2e",
            outline: "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
            width: "100%",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#007B8A";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,123,138,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Password */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label
            htmlFor="password"
            style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}
          >
            Password
          </label>
          <a
            href="/forgot-password"
            style={{ fontSize: "0.74rem", color: "#007B8A", textDecoration: "none" }}
          >
            Forgot password?
          </a>
        </div>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{
              height: 42,
              border: "1px solid #d1d5db",
              borderRadius: 7,
              padding: "0 42px 0 14px",
              fontSize: "0.875rem",
              color: "#1a1a2e",
              outline: "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
              width: "100%",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#007B8A";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,123,138,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          height: 44,
          backgroundColor: loading ? "#9ab8bc" : "#007B8A",
          color: "#ffffff",
          border: "none",
          borderRadius: 7,
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background-color 0.15s",
          marginTop: 4,
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: 16,
                height: 16,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
            Signing in…
          </>
        ) : (
          <>
            <LogIn size={16} />
            Sign In
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
