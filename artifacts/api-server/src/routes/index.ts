import { Router, type IRouter } from "express";
import healthRouter from "./health";
import uploadRouter from "./upload";
import authRouter from "../domains/auth/routes";
import cardsRouter from "../domains/cards/routes";
import reviewsRouter from "../domains/reviews/routes";
import profileRouter from "../domains/profile/routes";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/upload", uploadRouter);
router.use("/auth", authRouter);
router.use("/cards", cardsRouter);
router.use("/reviews", reviewsRouter);
router.use("/profile", profileRouter);

export default router;
