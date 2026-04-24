export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a2e",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.72rem",
        textAlign: "center",
        padding: "10px 16px",
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}
    >
      © {new Date().getFullYear()} Barkatullah Vishwavidyalaya, Bhopal. All rights reserved. · Demo by <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Mounterra Innovations</span>
    </footer>
  );
}
