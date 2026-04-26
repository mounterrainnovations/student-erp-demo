"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  CreditCard,
  GraduationCap,
  ClipboardList,
  RefreshCw,
  AlertCircle,
  CalendarDays,
  BookOpen,
  BarChart2,
  Lock,
  Receipt,
  CheckSquare,
  UserCircle,
  HardDrive,
  Bell,
  Zap,
  Database,
  Copy,
  Scroll,
  TrendingUp,
  LogOut,
  Briefcase,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  title: string;
  links: NavLink[];
}

const SECTIONS: SidebarSection[] = [
  {
    title: "Student Profile",
    links: [
      { label: "Student Profile", href: "/student/profile", icon: <UserCircle size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Digital Locker", href: "/student/profile/locker", icon: <HardDrive size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Enrollment Form",
    links: [
      { label: "Fill Enrollment Form", href: "/student/enrollment/fill", icon: <FileText size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Remaining Fees for Exam Form", href: "/student/enrollment/fees", icon: <CreditCard size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "PLACEMENT",
    links: [
      { label: "Apply for Placement", href: "/student/placement/apply", icon: <Briefcase size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Examination Form",
    links: [
      { label: "Fill Exam Form", href: "/student/examination/fill-exam-form", icon: <ClipboardList size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Apply Reval-Retotal", href: "/student/examination/apply-reval-retotal", icon: <RefreshCw size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Apply Challenge",
    links: [
      { label: "Apply Challenge", href: "/student/challenge", icon: <AlertCircle size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Time Table",
    links: [
      { label: "Download Time Table", href: "/student/timetable", icon: <CalendarDays size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Scheme-Syllabus",
    links: [
      { label: "Download Scheme-Syllabus", href: "/student/syllabus", icon: <BookOpen size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Reports",
    links: [
      { label: "View Reports", href: "/student/reports", icon: <BarChart2 size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Change Password", href: "/student/account/password", icon: <Lock size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Transaction Summary", href: "/student/account/transactions", icon: <Receipt size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Student Attendance",
    links: [
      { label: "View Attendance", href: "/student/attendance", icon: <CheckSquare size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Notice-Circular",
    links: [
      { label: "Download Notice from BU", href: "/student/notices", icon: <Bell size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Smart Card",
    links: [
      { label: "Activate Smart Card", href: "/student/smartcard/activate", icon: <Zap size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Generate Data File", href: "/student/smartcard/generate", icon: <Database size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "View Smart Card", href: "/student/smartcard/view", icon: <CreditCard size={15} strokeWidth={1.75} className="shrink-0" /> },
      { label: "Duplicate Smart Card", href: "/student/smartcard/duplicate", icon: <Copy size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Apply Transcript",
    links: [
      { label: "Apply Transcript", href: "/student/transcript", icon: <Scroll size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
  {
    title: "Student Mid Term Marks",
    links: [
      { label: "View Mid Term Marks", href: "/student/marks/midterm", icon: <TrendingUp size={15} strokeWidth={1.75} className="shrink-0" /> },
    ],
  },
];

function SidebarSection({
  section,
  isFirst,
}: {
  section: SidebarSection;
  isFirst: boolean; // kept for border-top suppression on first item
}) {
  const pathname = usePathname();
  const isAnyChildActive = section.links.some((l) => pathname === l.href);
  const [open, setOpen] = useState(isAnyChildActive);

  return (
    <div
      style={{
        borderTop: isFirst ? "none" : "1px solid #e0e0e0",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px 6px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: isAnyChildActive ? "#007B8A" : "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "color 0.15s",
          }}
        >
          {section.title}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "#9ca3af",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        style={{
          maxHeight: open ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.25s ease-in-out",
        }}
      >
        <div style={{ paddingBottom: 4 }}>
          {section.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isActive ? "8px 14px 8px 17px" : "8px 14px 8px 20px",
                  fontSize: "0.8125rem",
                  color: isActive ? "#ffffff" : "#374151",
                  textDecoration: "none",
                  backgroundColor: isActive ? "#007B8A" : "transparent",
                  borderLeft: isActive ? "3px solid #00C2D4" : "3px solid transparent",
                  transition: "background 0.15s, color 0.15s, border-color 0.15s",
                }}
                className={`sidebar-link${isActive ? " active" : ""}`}
              >
                {link.icon}
                <span style={{ lineHeight: 1.3 }}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 40 : 260,
        minWidth: collapsed ? 40 : 260,
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e0e0e0",
        overflowX: "hidden",
        height: "100%",
        transition: "width 0.25s ease, min-width 0.25s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toggle button row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "8px 8px",
          borderBottom: "1px solid #e0e0e0",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            background: "none",
            border: "1px solid #e0e0e0",
            borderRadius: 6,
            padding: "4px 6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav sections — hidden when collapsed */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="sidebar-scroll">
        {!collapsed &&
          SECTIONS.map((section, i) => (
            <SidebarSection key={section.title} section={section} isFirst={i === 0} />
          ))}
      </div>

      {/* Logout at bottom */}
      <div style={{ flexShrink: 0, borderTop: "1px solid #e0e0e0" }}>
        <Link
          href="/logout"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            color: "#374151",
            textDecoration: "none",
            fontSize: "0.8125rem",
            fontWeight: 500,
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "background 0.15s, color 0.15s",
          }}
          className="sidebar-logout-link"
        >
          <LogOut size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
