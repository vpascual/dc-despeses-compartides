import { createClient } from "@/lib/supabase/server";
import { getUserName } from "@/lib/users";
import SignOutButton from "./sign-out-button";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name_ca, icon, color")
    .eq("is_active", true)
    .order("sort_order");

  const userName = user ? await getUserName(user.id) : null;

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: "24px 20px 40px",
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
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--c-sub)",
            }}
          >
            Despeses compartides
          </span>
          <span style={{ fontSize: 19, fontWeight: 500 }}>
            {userName ? `Hola, ${userName}` : "Sessió iniciada"}
          </span>
        </div>
        <SignOutButton />
      </header>

      <section
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--c-sub)",
          }}
        >
          Categories
        </span>

        {error && (
          <p style={{ fontSize: 14, color: "var(--c-neg)" }}>
            No s&apos;han pogut carregar les categories: {error.message}
          </p>
        )}

        <div
          style={{
            border: "1px solid var(--c-border)",
            borderRadius: 4,
            background: "var(--c-surface)",
            overflow: "hidden",
          }}
        >
          {categories?.map((category, index) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderBottom:
                  index === categories.length - 1
                    ? "none"
                    : "1px solid var(--c-border)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  flex: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  background: "var(--c-chip)",
                  color: category.color ?? "var(--c-body)",
                  fontSize: 16,
                }}
              >
                {category.icon ?? "•"}
              </div>
              <span style={{ fontSize: 15, fontWeight: 500 }}>
                {category.name_ca}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
