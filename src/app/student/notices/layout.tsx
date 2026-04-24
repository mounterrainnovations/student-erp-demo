import Header from "@/components/portal/Header";
import NavBar from "@/components/portal/NavBar";
import Sidebar from "@/components/portal/Sidebar";
import MainContent from "@/components/portal/MainContent";
import Footer from "@/components/portal/Footer";

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <NavBar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
    </div>
  );
}
