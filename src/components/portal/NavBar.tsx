"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/student" },
  { label: "Help Desk / Grievance System", href: "/student/helpdesk" },
  { label: "Training & Placement", href: "/student/placement" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{ backgroundColor: "#1a1a2e", height: "44px" }}
      className="w-full flex items-center px-6 shrink-0"
    >
      <ul className="flex items-center gap-0 h-full">
        {NAV_ITEMS.map((item, i) => {
          const isActive =
            item.href === "/student"
              ? pathname === "/student"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <li key={item.href} className="flex items-center h-full">
              {i > 0 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "0.85rem",
                    margin: "0 14px",
                    userSelect: "none",
                  }}
                >
                  |
                </span>
              )}
              <Link
                href={item.href}
                style={{
                  color: isActive ? "#00C2D4" : "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  padding: "0 2px",
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  height: "100%",
                  borderBottom: isActive
                    ? "2px solid #00C2D4"
                    : "2px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                className="nav-link"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
