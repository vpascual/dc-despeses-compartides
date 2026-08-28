"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage("No s'ha pogut enviar l'enllaç. Torna-ho a provar.");
      return;
    }

    setStatus("sent");
  }

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 20px",
        gap: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 32,
            height: 26,
            padding: "0 8px",
            borderRadius: 4,
            background: "var(--c-blue)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          DC
        </span>
        <h1 style={{ fontSize: 20, fontWeight: 500 }}>Despeses compartides</h1>
      </div>

      {status === "sent" ? (
        <p
          style={{
            fontSize: 15,
            color: "var(--c-body)",
            textAlign: "center",
            maxWidth: 320,
          }}
        >
          T&apos;hem enviat un enllaç d&apos;accés a <strong>{email}</strong>.
          Obre&apos;l per iniciar sessió.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 320,
          }}
        >
          <label
            style={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            <span style={{ fontSize: 13, color: "var(--c-sub)" }}>
              Correu electrònic
            </span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nom@exemple.com"
              style={{
                height: 44,
                padding: "0 14px",
                borderRadius: 4,
                border: "1px solid var(--c-border)",
                background: "var(--c-surface)",
                color: "var(--c-text)",
                fontSize: 15,
              }}
            />
          </label>

          {status === "error" && (
            <p style={{ fontSize: 13, color: "var(--c-neg)" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              height: 50,
              borderRadius: 4,
              border: "none",
              background: "var(--c-blue)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 500,
              cursor: status === "sending" ? "default" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Enviant..." : "Envia l'enllaç d'accés"}
          </button>
        </form>
      )}
    </main>
  );
}
