import BottomNav from "@/components/bottom-nav";
import ExpenseSheetProvider from "@/components/expense-sheet-provider";
import { createClient } from "@/lib/supabase/server";
import { getUsers } from "@/lib/users";
import { getCategories } from "@/lib/categories";
import { getLedgerOptions } from "@/lib/ledger";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [users, categories, ledgers] = await Promise.all([
    getUsers(),
    getCategories(),
    getLedgerOptions(),
  ]);
  const me = users.find((u) => u.id === user?.id) ?? users[0];
  const partner = users.find((u) => u.id !== user?.id) ?? users[1];

  return (
    <div style={{ minHeight: "100vh" }}>
      <ExpenseSheetProvider
        categories={categories}
        ledgers={ledgers}
        me={me}
        partner={partner}
      >
        {children}
        <BottomNav />
      </ExpenseSheetProvider>
    </div>
  );
}
