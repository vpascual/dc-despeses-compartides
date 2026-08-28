import "server-only";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { WebSocket } from "ws";
import type { WebSocketLikeConstructor } from "@supabase/realtime-js";
import type { Database } from "@/types/database";

export type AppUser = {
  id: string;
  name: string;
  email: string;
};

const COUPLE = [
  { name: "Víctor", email: process.env.VICTOR_EMAIL! },
  { name: "Sílvia", email: process.env.SILVIA_EMAIL! },
] as const;

let cachedUsers: AppUser[] | null = null;

/**
 * Resolves the two app users (Víctor and Sílvia) from `auth.users`, matching
 * on their login email rather than hardcoding Supabase-generated UUIDs.
 */
export async function getUsers(): Promise<AppUser[]> {
  if (cachedUsers) return cachedUsers;

  const admin = createServiceClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    // Node.js < 22 has no global WebSocket, which @supabase/realtime-js
    // requires even though this app never opens a realtime channel.
    {
      realtime: {
        transport: WebSocket as unknown as WebSocketLikeConstructor,
      },
    },
  );

  const {
    data: { users },
    error,
  } = await admin.auth.admin.listUsers();

  if (error) throw error;

  cachedUsers = COUPLE.map(({ name, email }) => {
    const match = users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );
    if (!match) {
      throw new Error(`No auth.users entry found for ${name} (${email})`);
    }
    return { id: match.id, name, email };
  });

  return cachedUsers;
}

export async function getUserName(userId: string): Promise<string> {
  const users = await getUsers();
  return users.find((u) => u.id === userId)?.name ?? "Desconegut";
}
