import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import * as cardsService from "./service";

const router = Router();

const scanSchema = z.object({
  cardType: z.string().min(1),
  region: z.string().min(1),
});

router.post("/:cardId/scan", requireAuth, async (req, res) => {
  const parsed = scanSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", issues: parsed.error.issues });
    return;
  }
  try {
    const result = await cardsService.scanCard(
      req.userId!,
      String(req.params.cardId),
      parsed.data.cardType,
      parsed.data.region,
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/scanned", requireAuth, async (req, res) => {
  try {
    const result = await cardsService.getScannedCards(req.userId!);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
