import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import dashboardRoutes from "./dashboard";
import contentRoutes from "./content";
import subscriptionRoutes from "./subscription";
import planRoutes from "./plan";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/contents", contentRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/plans", planRoutes);

export default router;
