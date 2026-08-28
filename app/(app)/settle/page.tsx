export default function SettlePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: "60vh",
        padding: "20px 20px 120px",
        textAlign: "center",
      }}
    >
      <i className="bi bi-arrow-left-right" style={{ fontSize: 28, color: "var(--c-sub)" }} />
      <span style={{ fontSize: 16, fontWeight: 500 }}>Saldar comptes</span>
      <span style={{ fontSize: 13, color: "var(--c-sub)", maxWidth: 280 }}>
        Encara en construcció.
      </span>
    </main>
  );
}
