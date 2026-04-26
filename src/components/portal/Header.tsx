"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  X,
  CheckCheck,
  Info,
  AlertCircle,
  CheckCircle,
  Briefcase,
} from "lucide-react";

interface Notification {
  id: number;
  type: "alert" | "success" | "info" | "placement";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "alert",
    title: "Exam Form Submission Deadline Extended",
    body: "The deadline for Nov/Dec 2025 exam form has been extended to 30 Apr 2026.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Fee Payment Confirmed",
    body: "Your fee payment of ₹12,500 for Semester 6 has been successfully processed.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    type: "placement",
    title: "Placement Drive — TCS",
    body: "TCS campus recruitment drive is scheduled for 5 May 2026. Register by 1 May.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Revised Academic Calendar Published",
    body: "The revised academic calendar for session 2025–26 is now available for download.",
    time: "5 days ago",
    read: true,
  },
  {
    id: 5,
    type: "success",
    title: "Enrollment Form Approved",
    body: "Your enrollment form for Semester 6 has been reviewed and approved by BU.",
    time: "1 week ago",
    read: true,
  },
];

const TYPE_META: Record<
  Notification["type"],
  { color: string; Icon: React.ElementType }
> = {
  alert:     { color: "#f59e0b", Icon: AlertCircle },
  success:   { color: "#10b981", Icon: CheckCircle },
  info:      { color: "#007B8A", Icon: Info },
  placement: { color: "#6366f1", Icon: Briefcase },
};

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Notifications"
        style={{
          position: "relative",
          background: open ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: 8,
          width: 38,
          height: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#ffffff",
          transition: "background 0.15s",
          flexShrink: 0,
        }}
      >
        <Bell size={17} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontSize: "0.6rem",
              fontWeight: 700,
              borderRadius: 999,
              minWidth: 17,
              height: 17,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 3px",
              border: "2px solid #007B8A",
              lineHeight: 1,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            right: 0,
            width: 348,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
            boxShadow: "0 10px 36px rgba(0,0,0,0.14)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 16px 11px 16px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#1a1a2e" }}
              >
                Notifications
              </span>
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: "#007B8A",
                    color: "#ffffff",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "2px 7px",
                  }}
                >
                  {unreadCount} new
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "0.75rem",
                    color: "#007B8A",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: 0,
                  }}
                >
                  <CheckCheck size={13} strokeWidth={2} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  borderRadius: 4,
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification items */}
          <div style={{ maxHeight: 356, overflowY: "auto" }}>
            {notifications.map((n, i) => {
              const { color, Icon } = TYPE_META[n.type];
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 16px",
                    backgroundColor: n.read ? "#ffffff" : "#f0fafa",
                    borderBottom:
                      i < notifications.length - 1 ? "1px solid #f5f5f5" : "none",
                    cursor: "pointer",
                    transition: "background 0.12s",
                  }}
                >
                  {/* Type icon circle */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      backgroundColor: `${color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <Icon size={15} color={color} strokeWidth={1.75} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: n.read ? 500 : 700,
                          color: "#1a1a2e",
                          lineHeight: 1.35,
                        }}
                      >
                        {n.title}
                      </span>
                      {!n.read && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "#007B8A",
                            flexShrink: 0,
                            marginTop: 5,
                          }}
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        margin: "3px 0 5px 0",
                        lineHeight: 1.45,
                      }}
                    >
                      {n.body}
                    </p>
                    <span style={{ fontSize: "0.6875rem", color: "#9ca3af" }}>
                      {n.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel footer */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid #f0f0f0",
              backgroundColor: "#fafafa",
              textAlign: "center",
            }}
          >
            <a
              href="/student/notices"
              style={{
                fontSize: "0.8125rem",
                color: "#007B8A",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              View all notifications →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────────────────── */

interface HeaderProps {
  universityName?: string;
  universitySubtitle?: string;
  lastLogin?: string;
}

export default function Header({
  universityName = "Barkatullah Vishwavidyalaya",
  universitySubtitle = "Hoshangabad Road, Bhopal (M.P.) — 462033",
  lastLogin = "24 Apr 2026, 09:41 AM",
}: HeaderProps) {

  return (
    <header
      style={{ backgroundColor: "#007B8A", height: "80px" }}
      className="w-full flex items-center px-6 shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <img
          src="/Barkatullah_University_logo.png"
          alt="University Logo"
          width={60}
          height={60}
          style={{ objectFit: "contain", display: "block" }}
        />
      </div>

      {/* University name — centered */}
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
          {universityName}
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.75rem",
            fontWeight: 400,
            marginTop: 3,
          }}
        >
          {universitySubtitle}
        </span>
      </div>

      {/* Right: bell · last login */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
        }}
      >
        {/* Notification bell */}
        <NotificationBell />

        {/* Last login (stacked text) */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            Last Login
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {lastLogin}
          </div>
        </div>
      </div>
    </header>
  );
}
