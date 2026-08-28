"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { GENERAL_LEDGER_ID } from "@/lib/ledger";

export type ExpenseSplitInput = {
  amount: number;
  description: string;
  payerId: string;
  categoryId: string | null;
  groupId: string;
  myUserId: string;
  partnerUserId: string;
  /** My share of the cost, 0-100, regardless of who paid. */
  mySharePercent: number;
};

function validate(input: ExpenseSplitInput) {
  if (!(input.amount > 0)) {
    throw new Error("L'import ha de ser més gran que zero");
  }
  if (input.mySharePercent < 0 || input.mySharePercent > 100) {
    throw new Error("El repartiment no és vàlid");
  }
}

function splitCents(input: ExpenseSplitInput) {
  const totalCents = Math.round(input.amount * 100);
  const myOwedCents = Math.round((totalCents * input.mySharePercent) / 100);
  return { myOwedCents, partnerOwedCents: totalCents - myOwedCents };
}

function revalidateLedgers(...groupIds: string[]) {
  revalidatePath("/");
  revalidatePath("/projects");
  for (const groupId of new Set(groupIds)) {
    if (groupId !== GENERAL_LEDGER_ID) {
      revalidatePath(`/projects/${groupId}`);
    }
  }
}

export async function createExpense(input: ExpenseSplitInput) {
  validate(input);
  const supabase = await createClient();
  const { myOwedCents, partnerOwedCents } = splitCents(input);

  const { data: expense, error: expenseError } = await supabase
    .from("expenses")
    .insert({
      group_id: input.groupId,
      category_id: input.categoryId,
      description: input.description.trim() || "Despesa compartida",
      amount: input.amount,
      currency: "EUR",
      paid_by: input.payerId,
      expense_date: new Date().toISOString().slice(0, 10),
      created_by: input.myUserId,
    })
    .select("id")
    .single();
  if (expenseError) throw expenseError;

  const { error: sharesError } = await supabase.from("expense_shares").insert([
    { expense_id: expense.id, user_id: input.myUserId, owed_amount: myOwedCents / 100 },
    { expense_id: expense.id, user_id: input.partnerUserId, owed_amount: partnerOwedCents / 100 },
  ]);
  if (sharesError) throw sharesError;

  revalidateLedgers(input.groupId);
}

export async function updateExpense(
  expenseId: string,
  previousGroupId: string,
  input: ExpenseSplitInput,
) {
  validate(input);
  const supabase = await createClient();
  const { myOwedCents, partnerOwedCents } = splitCents(input);

  const { error: expenseError } = await supabase
    .from("expenses")
    .update({
      group_id: input.groupId,
      category_id: input.categoryId,
      description: input.description.trim() || "Despesa compartida",
      amount: input.amount,
      paid_by: input.payerId,
    })
    .eq("id", expenseId);
  if (expenseError) throw expenseError;

  const { error: deleteSharesError } = await supabase
    .from("expense_shares")
    .delete()
    .eq("expense_id", expenseId);
  if (deleteSharesError) throw deleteSharesError;

  const { error: sharesError } = await supabase.from("expense_shares").insert([
    { expense_id: expenseId, user_id: input.myUserId, owed_amount: myOwedCents / 100 },
    { expense_id: expenseId, user_id: input.partnerUserId, owed_amount: partnerOwedCents / 100 },
  ]);
  if (sharesError) throw sharesError;

  revalidateLedgers(previousGroupId, input.groupId);
}

export async function deleteExpense(expenseId: string, groupId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", expenseId);
  if (error) throw error;

  revalidateLedgers(groupId);
}
