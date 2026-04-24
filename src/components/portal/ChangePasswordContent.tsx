"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function ChangePasswordContent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // Simple password strength calculation
  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^A-Za-z0-9]/)) score++;
    return score; // 0 to 4
  };

  const strength = getStrength(newPassword);
  
  const strengthColors = ["#e0e0e0", "#ef4444", "#f59e0b", "#10b981", "#059669"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword && strength >= 2) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }, 3000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 500 }}>
      <div>
        <h2 style={{ fontSize: "1.25rem", color: "#1a1a2e", marginBottom: 8, fontWeight: 700 }}>Change Password</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <div style={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        {submitted ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#d4f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <ShieldCheck size={32} color="#1a7a4a" />
            </div>
            <h3 style={{ fontSize: "1.125rem", color: "#1a1a2e", margin: "0 0 8px 0" }}>Password Updated Successfully</h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", margin: 0 }}>
              Your password has been changed. Use your new password the next time you log in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Current Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Current Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9ca3af" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type={showCurrent ? "text" : "password"} 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  style={{ width: "100%", padding: "10px 40px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {showCurrent ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
                </button>
              </div>
            </div>

            <div style={{ height: 1, backgroundColor: "#f3f4f6", margin: "4px 0" }}></div>

            {/* New Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>New Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#007B8A" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type={showNew ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  style={{ width: "100%", padding: "10px 40px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                />
                <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {showNew ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
                </button>
              </div>
              
              {/* Strength Indicator */}
              {newPassword && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 4, height: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} style={{ flex: 1, borderRadius: 2, backgroundColor: strength >= level ? strengthColors[strength] : "#e5e7eb", transition: "background-color 0.3s" }}></div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: strengthColors[strength], fontWeight: 600, textAlign: "right" }}>
                    {strengthLabels[strength]}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Confirm New Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#007B8A" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type={showConfirm ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  style={{ 
                    width: "100%", 
                    padding: "10px 40px", 
                    borderRadius: 6, 
                    border: confirmPassword && newPassword !== confirmPassword ? "1px solid #ef4444" : "1px solid #d1d5db", 
                    fontSize: "0.875rem", 
                    outline: "none", 
                    boxSizing: "border-box",
                    backgroundColor: confirmPassword && newPassword !== confirmPassword ? "#fef2f2" : "#fff"
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {showConfirm ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#ef4444", fontSize: "0.75rem", marginTop: 6 }}>
                  <AlertCircle size={12} /> Passwords do not match
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!currentPassword || strength < 2 || newPassword !== confirmPassword}
              style={{
                marginTop: 12,
                padding: "12px",
                backgroundColor: (!currentPassword || strength < 2 || newPassword !== confirmPassword) ? "#9ca3af" : "#007B8A",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: (!currentPassword || strength < 2 || newPassword !== confirmPassword) ? "not-allowed" : "pointer",
                transition: "background-color 0.2s"
              }}
            >
              Update Password
            </button>
          </form>
        )}
      </div>
      
      <div style={{ backgroundColor: "#eff6ff", padding: 16, borderRadius: 8, border: "1px solid #bfdbfe", fontSize: "0.8125rem", color: "#1e40af", lineHeight: 1.5 }}>
        <strong>Password Requirements:</strong><br />
        • Minimum 8 characters long<br />
        • Include at least one uppercase letter<br />
        • Include at least one number<br />
        • Include at least one special character (e.g. !@#$%)
      </div>
    </div>
  );
}
