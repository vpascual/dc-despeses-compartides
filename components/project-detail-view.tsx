"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { closeProject } from "@/lib/actions/projects";
import { formatEur } from "@/lib/format";
import { useExpenseSheet } from "@/components/expense-sheet-provider";
import LedgerRow from "@/components/ledger-row";
import type { ProjectDetail } from "@/lib/ledger";

export default function ProjectDetailView({
  project,
  meId,
  partnerId,
  partnerName,
}: {
  project: ProjectDetail;
  meId: string;
  partnerId: string;
  partnerName: string;
}) {
  const router = useRouter();
  const { openCreate } = useExpenseSheet();
  const [closeSheetOpen, setCloseSheetOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = project.status === "active";
  const zero = Math.abs(project.net) < 0.005;
  const netColor = zero ? "var(--c-sub)" : project.net > 0 ? "var(--c-pos)" : "var(--c-neg)";
  const netLine = zero
    ? "Equilibrat"
    : project.net > 0
      ? `${partnerName} et deu ${formatEur(project.net)} d'aquest projecte`
      : `Deus ${formatEur(project.net)} a ${partnerName} d'aquest projecte`;

  async function handleConfirmClose() {
    setClosing(true);
    setError(null);
    try {
      await closeProject(project.id, meId, partnerId);
      setCloseSheetOpen(false);
      router.refresh();
    } catch {
      setError("No s'ha pogut tancar el projecte. Torna-ho a provar.");
    } finally {
      setClosing(false);
    }
  }

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
      <Link
        href="/projects"
        style={{
          alignSelf: "flex-start",
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--c-blue)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <i className="bi bi-chevron-left" />
        Projectes
      </Link>

      <div
        style={{
          border: "1px solid var(--c-border)",
          borderTop: "1px solid var(--c-blue)",
          borderRadius: 8,
          background: "var(--c-surface)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 22, lineHeight: "28px", fontWeight: 500 }}>
            {project.name}
          </span>
          <span style={{ fontSize: 12, color: "var(--c-sub)" }}>
            {project.feed.length} {project.feed.length === 1 ? "despesa" : "despeses"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid var(--c-border)",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--c-sub)",
              }}
            >
              Total
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>{formatEur(project.total)}</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "14px 0 14px 16px",
              borderLeft: "1px solid var(--c-border)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--c-sub)",
              }}
            >
              Desequilibri
            </span>
            <span style={{ fontSize: 22, fontWeight: 500, color: netColor }}>
              {formatEur(project.net)}
            </span>
          </div>
        </div>

        <span style={{ fontSize: 13, color: "var(--c-body)" }}>{netLine}</span>

        {isActive && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => openCreate(project.id)}
              style={{
                flex: 1,
                minHeight: 48,
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
              Despesa
            </button>
            <button
              onClick={() => setCloseSheetOpen(true)}
              style={{
                minHeight: 48,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                border: "1px solid var(--c-border)",
                borderRadius: 4,
                background: "transparent",
                color: "var(--c-body)",
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              <i className="bi bi-box-arrow-in-down" />
              Tanca
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius: 4,
          background: "var(--c-surface)",
          overflow: "hidden",
        }}
      >
        {project.feed.length === 0 && (
          <p style={{ padding: 16, fontSize: 14, color: "var(--c-sub)" }}>
            Encara no hi ha cap despesa en aquest projecte.
          </p>
        )}
        {project.feed.map((item, i) => (
          <LedgerRow key={item.id} item={item} isLast={i === project.feed.length - 1} />
        ))}
      </div>

      {closeSheetOpen && (
        <>
          <div
            onClick={() => !closing && setCloseSheetOpen(false)}
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
                onClick={() => setCloseSheetOpen(false)}
                disabled={closing}
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
                Enrere
              </button>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Tancar el projecte</span>
              <span style={{ width: 52 }} />
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontSize: 20, lineHeight: "26px", fontWeight: 500 }}>
                Tanques «{project.name}»?
              </span>
              <div style={{ border: "1px solid var(--c-border)", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "13px 16px",
                    borderBottom: "1px solid var(--c-border)",
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--c-body)" }}>Despeses del projecte</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{formatEur(project.total)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "13px 16px",
                    borderBottom: "1px solid var(--c-border)",
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--c-body)" }}>Has pagat tu</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{formatEur(project.paidByMe)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "13px 16px",
                    borderBottom: "1px solid var(--c-border)",
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--c-body)" }}>{partnerName} ha pagat</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{formatEur(project.paidByPartner)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "13px 16px",
                    background: "var(--c-soft)",
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--c-body)" }}>
                    {project.net > 0 ? `${partnerName} et deu` : `Deus a ${partnerName}`}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: netColor }}>
                    {formatEur(project.net)}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "14px 16px",
                  background: "var(--c-soft)",
                  border: "1px solid var(--c-border)",
                  borderRadius: 4,
                }}
              >
                <i className="bi bi-info-circle" style={{ color: "var(--c-blue)", fontSize: 15, marginTop: 2 }} />
                <span style={{ fontSize: 13, lineHeight: "19px", color: "var(--c-body)" }}>
                  {zero
                    ? `Es tancarà «${project.name}». Com que està equilibrat, no es crearà cap línia al llibre general.`
                    : `Es crearà una única línia al llibre general: «Tancament: ${project.name}» de ${formatEur(netAbs(project.net))}. El projecte passarà a tancats i no s'hi podran afegir despeses.`}
                </span>
              </div>
              {error && <p style={{ fontSize: 13, color: "var(--c-neg)" }}>{error}</p>}
              <button
                onClick={handleConfirmClose}
                disabled={closing}
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
                <i className="bi bi-check2" />
                {closing ? "Tancant..." : "Confirma i tanca"}
              </button>
              <button
                onClick={() => setCloseSheetOpen(false)}
                disabled={closing}
                style={{
                  minHeight: 44,
                  background: "transparent",
                  border: 0,
                  color: "var(--c-sub)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                No, encara no
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function netAbs(n: number) {
  return Math.abs(n);
}
