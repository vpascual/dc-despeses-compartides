import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { WebSocket } from "ws";
import type { WebSocketLikeConstructor } from "@supabase/realtime-js";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database, "sw">(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: "sw" },
      // Node.js < 22 has no global WebSocket, which @supabase/realtime-js
      // requires even though this app never opens a realtime channel.
      realtime: {
        transport: WebSocket as unknown as WebSocketLikeConstructor,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component; safe to ignore because the
            // middleware refreshes the session on every request.
          }
        },
      },
    },
  );
}
