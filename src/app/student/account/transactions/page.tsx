import Header from "@/components/portal/Header";
import NavBar from "@/components/portal/NavBar";
import Sidebar from "@/components/portal/Sidebar";
import MainContent from "@/components/portal/MainContent";
import TransactionSummaryContent from "@/components/portal/TransactionSummaryContent";

export default function TransactionSummaryPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <NavBar />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <MainContent>
          <TransactionSummaryContent />
        </MainContent>
      </div>

      <footer style={{
        backgroundColor: "#1a1a2e",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.72rem",
        textAlign: "center",
        padding: "10px 16px",
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}>
        © {new Date().getFullYear()} Barkatullah Vishwavidyalaya, Bhopal. All rights reserved. · Demo by <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Mounterra Innovations</span>
      </footer>
    </div>
  );
}
