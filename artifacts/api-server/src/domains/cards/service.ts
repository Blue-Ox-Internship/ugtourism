import { eq, and } from "drizzle-orm";
import { db, cardScansTable } from "@workspace/db";

const POINTS: Record<string, number> = {
  Destination: 50,
  Community: 30,
  Experience: 30,
  Taste: 30,
  Journey: 20,
  Action: 10,
};

export async function scanCard(
  userId: number,
  cardId: string,
  cardType: string,
  region: string,
) {
  try {
    await db.insert(cardScansTable).values({ userId, cardId, cardType, region });
    // First scan = 2× discovery bonus
    return { points: (POINTS[cardType] ?? 10) * 2, alreadyScanned: false };
  } catch (err: any) {
    // Unique constraint violation — card already scanned
    if (err.code === "23505") {
      return { points: 0, alreadyScanned: true };
    }
    throw err;
  }
}

export async function getScannedCards(userId: number) {
  const scans = await db
    .select()
    .from(cardScansTable)
    .where(eq(cardScansTable.userId, userId));

  const totalPoints = scans.reduce((sum, s) => {
    return sum + (POINTS[s.cardType] ?? 10) * 2;
  }, 0);

  return { scans, totalPoints };
}
