import { Router } from "express";
import { getSubscriptionDetails } from "../../controllers/user/subscription.controller";
import { optionalUserToken } from "../../middleware/authMiddleware";

const router = Router();

router.get("/details", optionalUserToken, getSubscriptionDetails);

export default router;
