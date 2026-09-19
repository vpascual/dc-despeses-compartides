"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/actions/projects";
import { formatEur } from "@/lib/format";
import type { ProjectSummary } from "@/lib/ledger";

function segStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    background: active ? "var(--c-surface)" : "transparent",
    color: active ? "var(--c-blue)" : "var(--c-sub)",
  };
}

export default function ProjectsView({
  active,
  closed,
}: {
  active: ProjectSummary[];
  closed: ProjectSummary[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"active" | "closed">("active");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!name.trim()) {
      setError("Posa-li un nom");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const id = await createProject(name);
      setSheetOpen(false);
      setName("");
      router.push(`/projects/${id}`);
      router.refresh();
    } catch {
      setError("No s'ha pogut crear el projecte. Torna-ho a provar.");
    } finally {
      setSaving(false);
    }
  }

  const list = tab === "active" ? active : closed;

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "20px 20px 120px",
        maxWidth: 480,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <header
        style={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--c-sub)",
          }}
        >
          Despeses compartides
        </span>
        <span style={{ fontSize: 19, fontWeight: 500 }}>Projectes</span>
      </header>

      <button
        onClick={() => setSheetOpen(true)}
        style={{
          width: "100%",
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          border: "1px dashed var(--c-border)",
          borderRadius: 4,
          background: "transparent",
          color: "var(--c-body)",
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        <i className="bi bi-plus-lg" />
        Nou projecte
      </button>

      <div
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "var(--c-chip)",
          border: "1px solid var(--c-border)",
          borderRadius: 4,
        }}
      >
        <button onClick={() => setTab("active")} style={segStyle(tab === "active")}>
          Actius ({active.length})
        </button>
        <button onClick={() => setTab("closed")} style={segStyle(tab === "closed")}>
          Arxiu ({closed.length})
        </button>
      </div>

      {tab === "closed" && (
        <span style={{ fontSize: 12, lineHeight: "18px", color: "var(--c-sub)" }}>
          Projectes ja liquidats. El desequilibri de cada un ja consta al
          llibre general.
        </span>
      )}

      {list.length === 0 && (
        <p style={{ fontSize: 14, color: "var(--c-sub)", textAlign: "center", padding: "24px 0" }}>
          {tab === "active" ? "No hi ha cap projecte actiu." : "Encara no hi ha cap projecte arxivat."}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minHeight: tab === "closed" ? undefined : 96,
              padding: "14px 16px",
              border: "1px solid var(--c-border)",
              borderTop:
                tab === "closed"
                  ? "1px solid var(--c-border)"
                  : "1px solid var(--c-blue)",
              borderRadius: 4,
              background: tab === "closed" ? "var(--c-bg)" : "var(--c-surface)",
              color: tab === "closed" ? "var(--c-body)" : "var(--c-text)",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</span>
                {tab === "closed" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      minHeight: 22,
                      padding: "0 8px",
                      borderRadius: 4,
                      background: "var(--c-chip)",
                      border: "1px solid var(--c-border)",
                      color: "var(--c-sub)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    <i className="bi bi-check2" />
                    Tancat
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12, color: "var(--c-sub)" }}>
                {p.expenseCount} {p.expenseCount === 1 ? "despesa" : "despeses"}
              </span>
              {tab !== "closed" && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color:
                      Math.abs(p.net) < 0.005
                        ? "var(--c-sub)"
                        : p.net > 0
                          ? "var(--c-pos)"
                          : "var(--c-neg)",
                  }}
                >
                  {Math.abs(p.net) < 0.005
                    ? "Equilibrat"
                    : `${p.net > 0 ? "+" : "−"}${formatEur(p.net)}`}
                </span>
              )}
            </div>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{formatEur(p.total)}</span>
            <i className="bi bi-chevron-right" style={{ color: "var(--c-sub)", fontSize: 13 }} />
          </Link>
        ))}
      </div>

      {sheetOpen && (
        <>
          <div
            onClick={() => setSheetOpen(false)}
            style={{ position: "fixed", inset: 0, background: "var(--c-scrim)", zIndex: 20 }}
          />
          <div
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              maxWidth: 480,
              margin: "0 auto",
              background: "var(--c-surface)",
              borderTop: "1px solid var(--c-border)",
              borderRadius: "8px 8px 0 0",
              zIndex: 21,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid var(--c-border)",
              }}
            >
              <button
                onClick={() => setSheetOpen(false)}
                style={{
                  minHeight: 44,
                  background: "transparent",
                  border: 0,
                  color: "var(--c-blue)",
                  fontSize: 15,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Cancel·la
              </button>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Nou projecte</span>
              <span style={{ width: 60 }} />
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--c-sub)",
                  }}
                >
                  Nom del projecte
                </span>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Viatge a Roma, Reforma cuina, Regal aniversari…"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: 52,
                    padding: "0 14px",
                    fontSize: 16,
                    color: "var(--c-text)",
                    background: "var(--c-bg)",
                    border: "1px solid var(--c-border)",
                    borderRadius: 4,
                  }}
                />
              </div>
              {error && (
                <p style={{ fontSize: 13, color: "var(--c-neg)" }}>{error}</p>
              )}
              <span style={{ fontSize: 13, lineHeight: "19px", color: "var(--c-sub)" }}>
                Les despeses d&apos;un projecte queden a part. Quan el tanquis,
                el desequilibri passa al llibre general en una sola línia.
              </span>
              <button
                onClick={handleCreate}
                disabled={saving}
                style={{
                  width: "100%",
                  minHeight: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "none",
                  borderRadius: 4,
                  background: "var(--c-blue)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-plus-lg" />
                {saving ? "Creant..." : "Crea el projecte"}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
