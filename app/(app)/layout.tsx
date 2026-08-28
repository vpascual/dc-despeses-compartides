import BottomNav from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {children}
      <BottomNav />
    </div>
  );
}
