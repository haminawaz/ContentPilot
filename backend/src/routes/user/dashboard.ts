import { Router } from "express";
import { getDashboardOverview } from "../../controllers/user/dashboard.controller";
import { verifyUserToken } from "../../middleware/authMiddleware";

const router = Router();

router.get("/overview", verifyUserToken, getDashboardOverview);

export default router;
