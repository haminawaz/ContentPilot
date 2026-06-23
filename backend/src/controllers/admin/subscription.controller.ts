import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import adminSubscriptionQueries from "../../queries/admin/subscription";

export const getAllSubscriptions = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.pageSize);
    const search = (req.query.search as string) || "";

    const data = await adminSubscriptionQueries.getAllSubscriptions(
      page,
      limit,
      search,
    );

    return res.status(200).json({
      message: "Subscriptions fetched successfully",
      response: {
        data,
      },
      error: null,
    });
  },
);
