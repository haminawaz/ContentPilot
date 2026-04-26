import { Router } from "express";
import * as authController from "../../controllers/user/auth.controller";
import { bodyValidator, queryValidator } from "../../middleware/joi";
import { verifyUserToken } from "../../middleware/authMiddleware";
const router = Router();

router.post("/register", bodyValidator("register"), authController.register);

router.post(
  "/resend-otp",
  bodyValidator("resendOTP"),
  authController.resendOTP,
);

router.get(
  "/verify-user",
  queryValidator("authToken"),
  authController.verifyUserEmail,
);

router.post("/login", bodyValidator("login"), authController.login);

router.put(
  "/profile",
  verifyUserToken,
  bodyValidator("profileUpdate"),
  authController.updateProfile,
);

router.put(
  "/password",
  verifyUserToken,
  bodyValidator("passwordUpdate"),
  authController.updatePassword,
);

router.post(
  "/forgot-password",
  bodyValidator("forgotPassword"),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  queryValidator("authToken"),
  bodyValidator("resetPassword"),
  authController.resetPassword,
);

export default router;
