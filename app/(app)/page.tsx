import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUsers } from "@/lib/users";
import {
  getActiveProjects,
  getBalance,
  getGeneralLedgerFeed,
  getMonthSummary,
} from "@/lib/ledger";
import { formatEur, formatMonthYear } from "@/lib/format";
import LedgerRow from "@/components/ledger-row";
import SignOutButton from "./sign-out-button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await getUsers();
  const me = users.find((u) => u.id === user?.id);
  const partner = users.find((u) => u.id !== user?.id);
  const meId = me?.id ?? "";
  const meName = me?.name ?? "";
  const partnerName = partner?.name ?? "";

  const [balance, month, activeProjects, feed] = await Promise.all([
    getBalance(meId),
    getMonthSummary(meId),
    getActiveProjects(meId),
    getGeneralLedgerFeed(meId, meName, partnerName),
  ]);

  const zero = Math.abs(balance) < 0.005;
  const positive = balance > 0;

  const label = zero
    ? "Esteu a zero"
    : positive
      ? `${partnerName} et deu`
      : `Deus a ${partnerName}`;
  const tag = zero
    ? "Cap deute pendent"
    : positive
      ? "A favor teu"
      : "En contra teva";
  const color = zero ? "var(--c-sub)" : positive ? "var(--c-pos)" : "var(--c-neg)";
  const icon = zero
    ? "check2-circle"
    : positive
      ? "arrow-down-left"
      : "arrow-up-right";

  const mineWidth = month.total ? Math.round((month.mine / month.total) * 100) : 50;

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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--c-sub)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 22,
                height: 18,
                padding: "0 5px",
                borderRadius: 3,
                background: "var(--c-blue)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              DC
            </span>
            Despeses compartides
          </span>
          <span style={{ fontSize: 19, fontWeight: 500 }}>
            {meName} i {partnerName}
          </span>
        </div>
        <SignOutButton />
      </header>

      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius: 8,
          background: "var(--c-soft)",
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--c-sub)",
          }}
        >
          Saldo actual
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 15, color: "var(--c-body)" }}>{label}</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span
              style={{
                fontSize: 46,
                lineHeight: "50px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {formatEur(balance)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              fontWeight: 500,
              color,
            }}
          >
            <i className={`bi bi-${icon}`} />
            <span>{tag}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--c-border)",
          borderRadius: 4,
          background: "var(--c-surface)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--c-sub)",
              }}
            >
              Gastat aquest mes
            </span>
            <span style={{ fontSize: 15, color: "var(--c-sub)" }}>
              {formatMonthYear(new Date())}
            </span>
          </div>
          <span style={{ fontSize: 28, lineHeight: "30px", fontWeight: 500, letterSpacing: "-0.01em" }}>
            {formatEur(month.total)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            height: 6,
            borderRadius: 999,
            overflow: "hidden",
            background: "var(--c-chip)",
          }}
        >
          <div style={{ width: `${mineWidth}%`, background: "var(--c-blue)" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            color: "var(--c-sub)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--c-blue)",
              }}
            />
            {meName} {formatEur(month.mine)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--c-chip)",
                border: "1px solid var(--c-border)",
              }}
            />
            {partnerName} {formatEur(month.theirs)}
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--c-sub)" }}>
          {month.count} {month.count === 1 ? "despesa" : "despeses"} · llibre
          general i projectes
        </span>
      </div>

      {activeProjects.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--c-sub)",
              }}
            >
              Projectes actius
            </span>
            <Link
              href="/projects"
              style={{ fontSize: 13, fontWeight: 500, padding: "6px 0" }}
            >
              Tots
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minHeight: 80,
                  padding: "14px 16px",
                  border: "1px solid var(--c-border)",
                  borderTop: "1px solid var(--c-blue)",
                  borderRadius: 4,
                  background: "var(--c-surface)",
                  color: "var(--c-text)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: "var(--c-sub)" }}>
                    {p.expenseCount} {p.expenseCount === 1 ? "despesa" : "despeses"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 3,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 500 }}>
                    {formatEur(p.total)}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--c-sub)" }}>total</span>
                </div>
                <i className="bi bi-chevron-right" style={{ color: "var(--c-sub)", fontSize: 13 }} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--c-sub)",
          }}
        >
          Llibre general
        </span>
        <div
          style={{
            border: "1px solid var(--c-border)",
            borderRadius: 4,
            background: "var(--c-surface)",
            overflow: "hidden",
          }}
        >
          {feed.length === 0 && (
            <p style={{ padding: 16, fontSize: 14, color: "var(--c-sub)" }}>
              Encara no hi ha cap despesa al llibre general.
            </p>
          )}
          {feed.map((item, i) => (
            <LedgerRow key={item.id} item={item} isLast={i === feed.length - 1} />
          ))}
        </div>
      </div>
    </main>
  );
}
