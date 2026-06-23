import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import adminDashboardQueries from "../../queries/admin/dashboard";

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const data = await adminDashboardQueries.getStats();

  return res.status(200).json({
    message: "Dashboard statistics fetched successfully",
    response: {
      data,
    },
    error: null,
  });
});
