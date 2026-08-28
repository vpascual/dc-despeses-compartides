export default function ProjectsPage() {
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
      <i className="bi bi-collection" style={{ fontSize: 28, color: "var(--c-sub)" }} />
      <span style={{ fontSize: 16, fontWeight: 500 }}>Projectes</span>
      <span style={{ fontSize: 13, color: "var(--c-sub)", maxWidth: 280 }}>
        Encara en construcció.
      </span>
    </main>
  );
}
