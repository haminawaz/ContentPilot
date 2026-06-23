import { Router } from "express";
import * as planController from "../../controllers/admin/plan.controller";
import { paramsValidator, bodyValidator } from "../../middleware/joi";
import { verifyAdminToken } from "../../middleware/adminAuthMiddleware";

const router = Router();

router.get("/", verifyAdminToken, planController.getAllPlans);

router.post(
  "/",
  verifyAdminToken,
  bodyValidator("createPlan"),
  planController.createPlan,
);

router.get(
  "/:id",
  verifyAdminToken,
  paramsValidator("planId"),
  planController.getPlanDetail,
);

router.put(
  "/:id",
  verifyAdminToken,
  paramsValidator("planId"),
  bodyValidator("updatePlan"),
  planController.updatePlan,
);

router.delete(
  "/:id",
  verifyAdminToken,
  paramsValidator("planId"),
  planController.deletePlan,
);

export default router;
