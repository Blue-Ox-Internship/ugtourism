import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import * as authService from "./service";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", issues: parsed.error.issues });
    return;
  }
  try {
    const { name, email, password } = parsed.data;
    const result = await authService.register(name, email, password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", issues: parsed.error.issues });
    return;
  }
  try {
    const result = await authService.login(parsed.data.email, parsed.data.password);
    res.json(result);
  } catch (err: any) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await authService.getMe(req.userId!);
    res.json(user);
  } catch (err: any) {
    res.status(err.status ?? 500).json({ error: err.message });
  }
});

export default router;
