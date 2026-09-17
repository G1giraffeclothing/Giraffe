import { auth, currentUser } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const session = await auth();
  if (!session.userId) return null;

  const allowedIds = (process.env.ADMIN_USER_IDS ?? "").split(",").map((id) => id.trim()).filter(Boolean);
  if (allowedIds.includes(session.userId)) return { id: session.userId };

  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  return role === "admin" ? { id: session.userId } : null;
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_USER_IDS?.trim());
}
