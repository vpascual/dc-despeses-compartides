import "server-only";
import { createClient } from "@/lib/supabase/server";

export type Category = {
  id: string;
  name_ca: string;
  icon: string | null;
};

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name_ca, icon")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data;
}
