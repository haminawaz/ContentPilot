import { Router } from "express";
import * as contentController from "../../controllers/admin/content.controller";
import { queryValidator, paramsValidator } from "../../middleware/joi";
import { verifyAdminToken } from "../../middleware/adminAuthMiddleware";

const router = Router();

router.get(
  "/",
  verifyAdminToken,
  queryValidator("pagination"),
  contentController.getAllContents,
);

router.get(
  "/:id",
  verifyAdminToken,
  paramsValidator("contentId"),
  contentController.getContentDetail,
);

router.delete(
  "/:id",
  verifyAdminToken,
  paramsValidator("contentId"),
  contentController.deleteContent,
);

export default router;
