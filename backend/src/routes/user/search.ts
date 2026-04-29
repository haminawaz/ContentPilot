import { Router } from "express";
import * as aiSearchController from "../../controllers/user/search.controller";
import { bodyValidator, queryValidator } from "../../middleware/joi";
import { verifyUserToken } from "../../middleware/authMiddleware";
const router = Router();

router.post(
  "/",
  verifyUserToken,
  bodyValidator("searchSchema"),
  aiSearchController.search,
);

router.get(
  "/",
  verifyUserToken,
  queryValidator("pagination"),
  aiSearchController.getGeneratedArticles,
);

router.get(
  "/:id",
  verifyUserToken,
  aiSearchController.getSingleGeneratedArticle,
);

export default router;
