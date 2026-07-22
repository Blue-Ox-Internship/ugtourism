import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import * as reviewsService from "./service";

const router = Router();

const reviewSchema = z.object({
  targetType: z.enum(["destination", "partner", "general"]),
  targetId: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  body: z.string().min(10).max(2000),
});

router.post("/", requireAuth, async (req, res) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", issues: parsed.error.issues });
    return;
  }
  try {
    const { targetType, targetId, rating, body } = parsed.data;
    const review = await reviewsService.submitReview(
      req.userId!,
      targetType,
      body,
      rating,
      targetId,
    );
    res.status(201).json(review);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
