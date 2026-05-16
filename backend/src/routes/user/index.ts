import { Router } from "express";
import dashboardRoutes from "./dashboard";
import authRoutes from "./auth";
import aiSearchRoutes from "./search";
import subscriptionRoutes from "./subscription";

const router = Router();

router.use("/dashboard", dashboardRoutes);
router.use("/auth", authRoutes);
router.use("/ai-search", aiSearchRoutes);
router.use("/subscription", subscriptionRoutes);

export default router;
