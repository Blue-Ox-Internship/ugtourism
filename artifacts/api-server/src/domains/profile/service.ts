import { eq } from "drizzle-orm";
import { db, usersTable, cardScansTable } from "@workspace/db";

const POINTS: Record<string, number> = {
  Destination: 50,
  Community: 30,
  Experience: 30,
  Taste: 30,
  Journey: 20,
  Action: 10,
};

function computeAchievements(scans: { cardType: string; region: string }[]) {
  const regions = new Set(scans.map((s) => s.region));
  return {
    firstJourney: scans.length >= 1,
    explorer: scans.length >= 10,
    collector: scans.length >= 25,
    storyteller: false, // set to true after first review, checked separately
    centralTraveller: regions.has("Central"),
    westernTraveller: regions.has("Western"),
    northernTraveller: regions.has("Northern"),
    easternTraveller: regions.has("Eastern"),
    fullJourney: ["Central", "Western", "Northern", "Eastern"].every((r) =>
      regions.has(r),
    ),
  };
}

export async function getProfile(userId: number) {
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

  const scans = await db
    .select()
    .from(cardScansTable)
    .where(eq(cardScansTable.userId, userId));

  const totalPoints = scans.reduce(
    (sum, s) => sum + (POINTS[s.cardType] ?? 10) * 2,
    0,
  );
  const achievements = computeAchievements(scans);

  return {
    user,
    totalPoints,
    scanCount: scans.length,
    achievements,
  };
}
