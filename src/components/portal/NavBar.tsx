import Link from "next/link";

const NAV_ITEMS = [
  { label: "Student Services", href: "/student" },
  { label: "Help Desk / Grievance System", href: "/student/helpdesk" },
  { label: "Training & Placement", href: "/student/placement" },
];

export default function NavBar() {
  return (
    <nav
      style={{ backgroundColor: "#1a1a2e", height: "44px" }}
      className="w-full flex items-center px-6 shrink-0"
    >
      <ul className="flex items-center gap-0 h-full">
        {NAV_ITEMS.map((item, i) => (
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
                color: "#ffffff",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.02em",
                padding: "0 2px",
                position: "relative",
                display: "inline-block",
              }}
              className="nav-link"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
