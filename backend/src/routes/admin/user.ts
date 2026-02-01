import { Router } from "express";
import * as userController from "../../controllers/admin/user.controller";
import {
  queryValidator,
  paramsValidator,
  bodyValidator,
} from "../../middleware/joi";
import { verifyAdminToken } from "../../middleware/adminAuthMiddleware";

const router = Router();

router.get(
  "/",
  verifyAdminToken,
  queryValidator("pagination"),
  userController.getAllUsers,
);

router.get(
  "/:id",
  verifyAdminToken,
  paramsValidator("userId"),
  userController.getUserDetail,
);

router.patch(
  "/:id/status",
  verifyAdminToken,
  paramsValidator("userId"),
  bodyValidator("updateStatus"),
  userController.updateUserStatus,
);

router.delete(
  "/:id",
  verifyAdminToken,
  paramsValidator("userId"),
  userController.deleteUser,
);

export default router;
