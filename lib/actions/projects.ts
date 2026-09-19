"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { GENERAL_LEDGER_ID, getProjectDetail } from "@/lib/ledger";

export async function createProject(name: string) {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Posa-li un nom al projecte");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("groups")
    .insert({
      name: trimmed,
      type: "project",
      status: "active",
      opened_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath("/projects");
  return data.id as string;
}

/**
 * Closes a project: if there's a net imbalance, rolls it into a single
 * General-ledger expense (amount = the imbalance, not the project's gross
 * total — see CLAUDE.md), then marks the project closed.
 */
export async function closeProject(
  projectId: string,
  meId: string,
  partnerId: string,
) {
  const detail = await getProjectDetail(projectId, meId, "");
  if (!detail) throw new Error("Projecte no trobat");
  if (detail.status !== "active") throw new Error("El projecte ja està tancat");

  const netAbs = Math.round(Math.abs(detail.net) * 100) / 100;

  const supabase = await createClient();

  if (netAbs >= 0.01) {
    const creditorId = detail.net > 0 ? meId : partnerId;
    const debtorId = creditorId === meId ? partnerId : meId;

    const { data: expense, error: expenseError } = await supabase
      .from("expenses")
      .insert({
        group_id: GENERAL_LEDGER_ID,
        category_id: null,
        description: `Tancament: ${detail.name}`,
        amount: netAbs,
        currency: "EUR",
        paid_by: creditorId,
        expense_date: new Date().toISOString().slice(0, 10),
        rolled_up_from_group_id: projectId,
        created_by: meId,
      })
      .select("id")
      .single();
    if (expenseError) throw expenseError;

    const { error: sharesError } = await supabase.from("expense_shares").insert([
      { expense_id: expense.id, user_id: creditorId, owed_amount: 0 },
      { expense_id: expense.id, user_id: debtorId, owed_amount: netAbs },
    ]);
    if (sharesError) throw sharesError;
  }

  const { error: closeError } = await supabase
    .from("groups")
    .update({ status: "closed", closed_at: new Date().toISOString() })
    .eq("id", projectId);
  if (closeError) throw closeError;

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
}
