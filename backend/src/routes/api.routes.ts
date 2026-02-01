import express, { Request, Response, Router } from "express";
import userRoutes from "./user/index";
import adminRoutes from "./admin/index";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "API is working",
    response: {
      version: "1.0.0",
    },
    error: null,
  });
});

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;
