import "server-only";
import { createClient } from "@/lib/supabase/server";
import { formatDayMonth, formatEur } from "@/lib/format";

export const GENERAL_LEDGER_ID = "ac73e37d-7c22-46a9-89ad-f95de8185ec5";

type ShareRow = { expense_id: string; user_id: string; owed_amount: number };

/** Net amount `viewerId` is owed (positive) or owes (negative) on one expense. */
function expenseDeltaForViewer(
  expense: { paid_by: string },
  shares: ShareRow[],
  viewerId: string,
): number {
  if (expense.paid_by === viewerId) {
    return shares
      .filter((s) => s.user_id !== viewerId)
      .reduce((sum, s) => sum + s.owed_amount, 0);
  }
  const mine = shares.find((s) => s.user_id === viewerId);
  return mine ? -mine.owed_amount : 0;
}

async function getSharesByExpense(
  expenseIds: string[],
): Promise<Map<string, ShareRow[]>> {
  const byExpense = new Map<string, ShareRow[]>();
  if (expenseIds.length === 0) return byExpense;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("expense_shares")
    .select("expense_id, user_id, owed_amount")
    .in("expense_id", expenseIds);
  if (error) throw error;

  for (const row of data) {
    const arr = byExpense.get(row.expense_id) ?? [];
    arr.push(row);
    byExpense.set(row.expense_id, arr);
  }
  return byExpense;
}

export async function getBalance(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("v_balances")
    .select("net_balance")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.net_balance ?? 0;
}

export type MonthSummary = {
  total: number;
  mine: number;
  theirs: number;
  count: number;
};

export async function getMonthSummary(meId: string): Promise<MonthSummary> {
  const supabase = await createClient();
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    .toISOString()
    .slice(0, 10);

  const { data, error } = await supabase
    .from("expenses")
    .select("amount, paid_by")
    .is("deleted_at", null)
    .gte("expense_date", start)
    .lt("expense_date", nextMonthStart);
  if (error) throw error;

  const total = data.reduce((sum, r) => sum + r.amount, 0);
  const mine = data
    .filter((r) => r.paid_by === meId)
    .reduce((sum, r) => sum + r.amount, 0);

  return { total, mine, theirs: total - mine, count: data.length };
}

export type ProjectSummary = {
  id: string;
  name: string;
  openedAt: string;
  expenseCount: number;
  total: number;
  net: number;
};

async function summarizeProjects(
  meId: string,
  status: "active" | "closed",
): Promise<ProjectSummary[]> {
  const supabase = await createClient();
  const { data: groups, error } = await supabase
    .from("groups")
    .select("id, name, opened_at")
    .eq("type", "project")
    .eq("status", status)
    .order("opened_at", { ascending: false });
  if (error) throw error;
  if (groups.length === 0) return [];

  const groupIds = groups.map((g) => g.id);
  const { data: expenses, error: expError } = await supabase
    .from("expenses")
    .select("id, group_id, amount, paid_by")
    .in("group_id", groupIds)
    .is("deleted_at", null);
  if (expError) throw expError;

  const sharesByExpense = await getSharesByExpense(expenses.map((e) => e.id));

  return groups.map((g) => {
    const groupExpenses = expenses.filter((e) => e.group_id === g.id);
    const total = groupExpenses.reduce((sum, e) => sum + e.amount, 0);
    const net = groupExpenses.reduce(
      (sum, e) =>
        sum +
        expenseDeltaForViewer(e, sharesByExpense.get(e.id) ?? [], meId),
      0,
    );
    return {
      id: g.id,
      name: g.name,
      openedAt: g.opened_at,
      expenseCount: groupExpenses.length,
      total,
      net,
    };
  });
}

export function getActiveProjects(meId: string): Promise<ProjectSummary[]> {
  return summarizeProjects(meId, "active");
}

export type LedgerOption = { id: string; label: string };

export async function getLedgerOptions(): Promise<LedgerOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("groups")
    .select("id, name")
    .eq("type", "project")
    .eq("status", "active")
    .order("opened_at", { ascending: false });
  if (error) throw error;

  return [
    { id: GENERAL_LEDGER_ID, label: "General" },
    ...data.map((g) => ({ id: g.id, label: g.name })),
  ];
}

export function getClosedProjects(meId: string): Promise<ProjectSummary[]> {
  return summarizeProjects(meId, "closed");
}

export type FeedItem = {
  id: string;
  kind: "expense" | "settlement";
  date: string;
  icon: string | null;
  title: string;
  subtitle: string;
  amount: number;
  delta: number | null;
  deltaLabel: string;
  /** Raw fields for editing; only set on user-created (non-rollup) expenses. */
  editable: {
    payerId: string;
    categoryId: string | null;
    groupId: string;
    mySharePercent: number;
  } | null;
};

export async function getGeneralLedgerFeed(
  meId: string,
  meName: string,
  partnerName: string,
): Promise<FeedItem[]> {
  const supabase = await createClient();

  const [expensesRes, settlementsRes] = await Promise.all([
    supabase
      .from("expenses")
      .select(
        "id, description, paid_by, expense_date, amount, group_id, category_id, rolled_up_from_group_id, category:categories(icon)",
      )
      .eq("group_id", GENERAL_LEDGER_ID)
      .is("deleted_at", null)
      .order("expense_date", { ascending: false }),
    supabase
      .from("settlements")
      .select("id, from_user, to_user, amount, settled_at")
      .is("deleted_at", null)
      .order("settled_at", { ascending: false }),
  ]);
  if (expensesRes.error) throw expensesRes.error;
  if (settlementsRes.error) throw settlementsRes.error;

  const expenses = expensesRes.data;
  const settlements = settlementsRes.data;

  const sharesByExpense = await getSharesByExpense(expenses.map((e) => e.id));

  const expenseItems: FeedItem[] = expenses.map((e) => {
    const shares = sharesByExpense.get(e.id) ?? [];
    const delta = expenseDeltaForViewer(e, shares, meId);
    const isRollup = e.rolled_up_from_group_id !== null;

    const mineShare = shares.find((s) => s.user_id === meId)?.owed_amount ?? 0;
    const myPercent = e.amount > 0 ? Math.round((mineShare / e.amount) * 100) : 50;

    let subtitle: string;
    if (isRollup) {
      subtitle = `Projecte tancat · ${formatDayMonth(e.expense_date)}`;
    } else {
      const payerLabel = e.paid_by === meId ? "Has pagat" : `${partnerName} ha pagat`;
      const ratioSuffix =
        myPercent === 50 ? "" : ` · ${myPercent}/${100 - myPercent}`;
      subtitle = `${payerLabel}${ratioSuffix} · ${formatDayMonth(e.expense_date)}`;
    }

    return {
      id: e.id,
      kind: "expense",
      date: e.expense_date,
      icon: e.category?.icon ?? (isRollup ? "box-arrow-in-down" : "receipt"),
      title: e.description,
      subtitle,
      amount: e.amount,
      delta,
      deltaLabel: `${delta >= 0 ? "+" : "−"}${formatEur(delta)}`,
      editable: isRollup
        ? null
        : {
            payerId: e.paid_by,
            categoryId: e.category_id,
            groupId: e.group_id,
            mySharePercent: myPercent,
          },
    };
  });

  const settlementItems: FeedItem[] = settlements.map((s) => {
    const inbound = s.to_user === meId;
    return {
      id: s.id,
      kind: "settlement",
      date: s.settled_at.slice(0, 10),
      icon: "arrow-left-right",
      title: inbound
        ? `${partnerName} t'ha transferit`
        : `Has transferit a ${partnerName}`,
      subtitle: `Saldat · ${formatDayMonth(s.settled_at.slice(0, 10))}`,
      amount: s.amount,
      delta: null,
      deltaLabel: "liquidació",
      editable: null,
    };
  });

  return [...expenseItems, ...settlementItems].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}
