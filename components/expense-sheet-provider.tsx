"use client";

import {
  createContext,
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createExpense, deleteExpense, updateExpense } from "@/lib/actions/expenses";
import type { Category } from "@/lib/categories";
import type { LedgerOption } from "@/lib/ledger";

type Person = { id: string; name: string };

export type EditableExpense = {
  id: string;
  amount: number;
  description: string;
  payerId: string;
  categoryId: string | null;
  groupId: string;
  mySharePercent: number;
};

type ExpenseSheetContextValue = {
  openCreate: (defaultGroupId?: string) => void;
  openEdit: (expense: EditableExpense) => void;
};

const ExpenseSheetContext = createContext<ExpenseSheetContextValue | null>(null);

export function useExpenseSheet() {
  const ctx = useContext(ExpenseSheetContext);
  if (!ctx) {
    throw new Error("useExpenseSheet must be used within ExpenseSheetProvider");
  }
  return ctx;
}

function chipStyle(active: boolean): CSSProperties {
  return {
    minHeight: 44,
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    border: active ? "1px solid var(--c-blue)" : "1px solid var(--c-border)",
    background: active ? "var(--c-blue)" : "var(--c-bg)",
    color: active ? "#fff" : "var(--c-body)",
  };
}

function amountToStr(amount: number): string {
  return amount.toFixed(2).replace(".", ",").replace(/,00$/, "");
}

export default function ExpenseSheetProvider({
  categories,
  ledgers,
  me,
  partner,
  children,
}: {
  categories: Category[];
  ledgers: LedgerOption[];
  me: Person;
  partner: Person;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previousGroupId, setPreviousGroupId] = useState<string | null>(null);
  const [amountStr, setAmountStr] = useState("");
  const [desc, setDesc] = useState("");
  const [payer, setPayer] = useState<"me" | "partner">("me");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [share, setShare] = useState(50);
  const [customSplit, setCustomSplit] = useState(false);
  const [groupId, setGroupId] = useState(ledgers[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function resetAndClose() {
    setAmountStr("");
    setDesc("");
    setPayer("me");
    setCategoryId(null);
    setShare(50);
    setCustomSplit(false);
    setGroupId(ledgers[0]?.id ?? "");
    setError(null);
    setEditingId(null);
    setPreviousGroupId(null);
    setConfirmingDelete(false);
    setOpen(false);
  }

  function openCreate(defaultGroupId?: string) {
    resetAndClose();
    if (defaultGroupId) setGroupId(defaultGroupId);
    setOpen(true);
  }

  function openEdit(expense: EditableExpense) {
    setEditingId(expense.id);
    setPreviousGroupId(expense.groupId);
    setAmountStr(amountToStr(expense.amount));
    setDesc(expense.description);
    setPayer(expense.payerId === me.id ? "me" : "partner");
    setCategoryId(expense.categoryId);
    setShare(expense.mySharePercent);
    setCustomSplit(![0, 50, 100].includes(expense.mySharePercent));
    setGroupId(expense.groupId);
    setError(null);
    setConfirmingDelete(false);
    setOpen(true);
  }

  function handleAmountInput(raw: string) {
    let v = raw.replace(/\./g, ",").replace(/[^0-9,]/g, "");
    const firstComma = v.indexOf(",");
    if (firstComma !== -1) {
      v =
        v.slice(0, firstComma + 1) +
        v.slice(firstComma + 1).replace(/,/g, "").slice(0, 2);
    }
    setAmountStr(v);
  }

  async function handleSave() {
    const amount = parseFloat(amountStr.replace(",", "."));
    if (!amount || amount <= 0) {
      setError("Escriu un import");
      return;
    }

    setSaving(true);
    setError(null);
    const input = {
      amount,
      description: desc,
      payerId: payer === "me" ? me.id : partner.id,
      categoryId,
      groupId,
      myUserId: me.id,
      partnerUserId: partner.id,
      mySharePercent: share,
    };
    try {
      if (editingId) {
        await updateExpense(editingId, previousGroupId ?? groupId, input);
      } else {
        await createExpense(input);
      }
      const amountLabel =
        amount.toLocaleString("ca-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " €";
      resetAndClose();
      setToast(
        editingId ? `Despesa actualitzada · ${amountLabel}` : `Despesa afegida · ${amountLabel}`,
      );
      setTimeout(() => setToast(null), 2400);
      router.refresh();
    } catch {
      setError("No s'ha pogut desar la despesa. Torna-ho a provar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await deleteExpense(editingId, previousGroupId ?? groupId);
      resetAndClose();
      setToast("Despesa eliminada");
      setTimeout(() => setToast(null), 2400);
      router.refresh();
    } catch {
      setError("No s'ha pogut eliminar la despesa. Torna-ho a provar.");
      setDeleting(false);
    }
  }

  const splitPresets = [
    { label: "50 / 50", on: !customSplit && share === 50, act: () => { setShare(50); setCustomSplit(false); } },
    { label: "Tot jo", on: !customSplit && share === 100, act: () => { setShare(100); setCustomSplit(false); } },
    { label: `Tot ${partner.name}`, on: !customSplit && share === 0, act: () => { setShare(0); setCustomSplit(false); } },
    { label: "Personalitzat", on: customSplit, act: () => setCustomSplit(true) },
  ];

  return (
    <ExpenseSheetContext.Provider value={{ openCreate, openEdit }}>
      {children}

      <button
        aria-label="Afegeix una despesa"
        onClick={() => openCreate()}
        style={{
          position: "fixed",
          right: 20,
          bottom: 84,
          width: 60,
          height: 60,
          borderRadius: 999,
          border: 0,
          background: "var(--c-blue)",
          color: "#fff",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <i className="bi bi-plus-lg" />
      </button>

      {toast && (
        <div
          style={{
            position: "fixed",
            left: 20,
            right: 20,
            bottom: 84,
            maxWidth: 440,
            margin: "0 auto",
            padding: "14px 16px",
            background: "var(--c-text)",
            color: "var(--c-bg)",
            borderRadius: 4,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 30,
          }}
        >
          <i className="bi bi-check2-circle" />
          <span>{toast}</span>
        </div>
      )}

      {open && (
        <>
          <div
            onClick={resetAndClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--c-scrim)",
              zIndex: 20,
            }}
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
              display: "flex",
              flexDirection: "column",
              maxHeight: "92vh",
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
                onClick={resetAndClose}
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
              <span style={{ fontSize: 15, fontWeight: 500 }}>
                {editingId ? "Edita la despesa" : "Nova despesa"}
              </span>
              <button
                onClick={handleSave}
                disabled={saving || !amountStr}
                style={{
                  minHeight: 44,
                  background: "transparent",
                  border: 0,
                  color: amountStr ? "var(--c-blue)" : "var(--c-sub)",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: amountStr ? "pointer" : "default",
                  padding: 0,
                }}
              >
                {saving ? "Desant..." : "Desa"}
              </button>
            </div>

            <div
              style={{
                overflowY: "auto",
                padding: "18px 20px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: 8,
                  padding: "6px 0 2px",
                }}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  autoFocus
                  value={amountStr}
                  onChange={(e) => handleAmountInput(e.target.value)}
                  placeholder="0"
                  style={{
                    width: `${Math.max(amountStr.length, 1)}ch`,
                    minWidth: "1ch",
                    maxWidth: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    padding: 0,
                    fontFamily: "inherit",
                    fontSize: 52,
                    lineHeight: "56px",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: amountStr ? "var(--c-text)" : "var(--c-sub)",
                  }}
                />
                <span style={{ fontSize: 24, fontWeight: 500, color: "var(--c-sub)" }}>
                  €
                </span>
              </div>

              {error && (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--c-neg)",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}

              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descripció (p. ex. Compra setmanal)"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  minHeight: 48,
                  padding: "0 14px",
                  fontSize: 16,
                  color: "var(--c-text)",
                  background: "var(--c-bg)",
                  border: "1px solid var(--c-border)",
                  borderRadius: 4,
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--c-sub)",
                  }}
                >
                  Categoria
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() =>
                        setCategoryId((current) => (current === c.id ? null : c.id))
                      }
                      style={chipStyle(categoryId === c.id)}
                    >
                      <i
                        className={`bi bi-${c.icon ?? "receipt"}`}
                        style={{ marginRight: 7 }}
                      />
                      {c.name_ca}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--c-sub)",
                  }}
                >
                  Qui ha pagat
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setPayer("me")}
                    style={{ ...chipStyle(payer === "me"), flex: 1 }}
                  >
                    Jo ({me.name})
                  </button>
                  <button
                    onClick={() => setPayer("partner")}
                    style={{ ...chipStyle(payer === "partner"), flex: 1 }}
                  >
                    {partner.name}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--c-sub)",
                  }}
                >
                  Repartiment
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {splitPresets.map((o) => (
                    <button key={o.label} onClick={o.act} style={chipStyle(o.on)}>
                      {o.label}
                    </button>
                  ))}
                </div>
                {customSplit && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      padding: "12px 14px",
                      border: "1px solid var(--c-border)",
                      borderRadius: 4,
                      background: "var(--c-bg)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        color: "var(--c-body)",
                      }}
                    >
                      <span>Jo {share}%</span>
                      <span>
                        {partner.name} {100 - share}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={share}
                      onChange={(e) => setShare(parseInt(e.target.value, 10))}
                      style={{ width: "100%", accentColor: "var(--c-blue)" }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--c-sub)",
                  }}
                >
                  Llibre
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {ledgers.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setGroupId(l.id)}
                      style={chipStyle(groupId === l.id)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {editingId && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    paddingTop: 8,
                    borderTop: "1px solid var(--c-border)",
                  }}
                >
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    style={{
                      minHeight: 44,
                      padding: "0 16px",
                      background: "transparent",
                      border: "1px solid var(--c-neg)",
                      borderRadius: 4,
                      color: "var(--c-neg)",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {deleting
                      ? "Eliminant..."
                      : confirmingDelete
                        ? "Segur? Elimina definitivament"
                        : "Elimina la despesa"}
                  </button>
                  {confirmingDelete && (
                    <button
                      onClick={() => setConfirmingDelete(false)}
                      style={{
                        minHeight: 44,
                        background: "transparent",
                        border: 0,
                        color: "var(--c-sub)",
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      Cancel·la
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </ExpenseSheetContext.Provider>
  );
}
