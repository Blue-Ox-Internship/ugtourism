import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { signToken, hashPassword, verifyPassword } from "@workspace/auth";

export async function register(name: string, email: string, password: string) {
  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existing.length > 0) {
    throw Object.assign(new Error("Email already registered"), { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(usersTable)
    .values({ name, email, passwordHash })
    .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email });

  const token = await signToken(user.id);
  return { user, token };
}

export async function login(email: string, password: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!user) {
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  }

  const token = await signToken(user.id);
  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}

export async function getMe(userId: number) {
  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
}
