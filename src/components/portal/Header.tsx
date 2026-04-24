interface HeaderProps {
  universityName?: string;
  universitySubtitle?: string;
  lastLogin?: string;
  studentName?: string;
}

export default function Header({
  universityName = "Barkatullah Vishwavidyalaya",
  universitySubtitle = "Hoshangabad Road, Bhopal (M.P.) — 462033",
  lastLogin = "24 Apr 2026, 09:41 AM",
  studentName = "Rajesh Kumar",
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

      {/* Right: last login + profile avatar */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div style={{ textAlign: "right" }}>
          <span
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.75rem",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            Last Login:{" "}
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {lastLogin}
          </span>
        </div>
      </div>
    </header>
  );
}
