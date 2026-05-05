import { Router } from "express";
import dashboardRoutes from "./dashboard";
import authRoutes from "./auth";
import aiSearchRoutes from "./search";

const router = Router();

router.use("/dashboard", dashboardRoutes);
router.use("/auth", authRoutes);
router.use("/ai-search", aiSearchRoutes);

export default router;
