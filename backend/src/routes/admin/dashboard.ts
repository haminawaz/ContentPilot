import { Router } from "express";
import * as dashboardController from "../../controllers/admin/dashboard.controller";
import { verifyAdminToken } from "../../middleware/adminAuthMiddleware";

const router = Router();

router.get("/stats", verifyAdminToken, dashboardController.getStats);

export default router;
