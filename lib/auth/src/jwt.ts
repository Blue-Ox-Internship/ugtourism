import { SignJWT, jwtVerify } from "jose";

const ALG = "HS256";

function getSecret() {
  const secret = process.env.JWT_SECRET ?? "dev-secret-do-not-use-in-production";
  return new TextEncoder().encode(secret);
}

export async function signToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<{ userId: number }> {
  const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
  if (!payload.sub) throw new Error("Missing sub claim");
  return { userId: Number(payload.sub) };
}
