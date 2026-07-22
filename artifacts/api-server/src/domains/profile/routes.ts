import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import * as profileService from "./service";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.userId!);
    res.json(profile);
  } catch (err: any) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
});

export default router;
