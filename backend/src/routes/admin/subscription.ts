import { Router } from "express";
import * as subscriptionController from "../../controllers/admin/subscription.controller";
import { queryValidator } from "../../middleware/joi";
import { verifyAdminToken } from "../../middleware/adminAuthMiddleware";

const router = Router();

router.get(
  "/",
  verifyAdminToken,
  queryValidator("pagination"),
  subscriptionController.getAllSubscriptions,
);

export default router;
