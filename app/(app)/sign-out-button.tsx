"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      style={{
        height: 44,
        padding: "0 16px",
        borderRadius: 4,
        border: "1px solid var(--c-border)",
        background: "transparent",
        color: "var(--c-body)",
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      Tanca la sessió
    </button>
  );
}
