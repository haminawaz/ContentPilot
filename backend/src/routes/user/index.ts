import { Router } from "express";
import authRoutes from "./auth";
import aiSearchRoutes from "./search";

const router = Router();

router.use("/auth", authRoutes);
router.use("/ai-search", aiSearchRoutes);

export default router;
