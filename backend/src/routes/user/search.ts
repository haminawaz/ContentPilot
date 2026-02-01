import { Router } from "express";
import * as aiSearchController from "../../controllers/user/search.controller";
import { bodyValidator } from "../../middleware/joi";
import { verifyUserToken } from "../../middleware/authMiddleware";
const router = Router();

router.post(
  "/",
  verifyUserToken,
  bodyValidator("searchSchema"),
  aiSearchController.search,
);

export default router;
