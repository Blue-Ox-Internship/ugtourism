import { db, reviewsTable } from "@workspace/db";

export async function submitReview(
  userId: number,
  targetType: string,
  body: string,
  rating?: number,
  targetId?: string,
) {
  const [review] = await db
    .insert(reviewsTable)
    .values({ userId, targetType, targetId, body, rating })
    .returning({ id: reviewsTable.id });
  return review;
}
