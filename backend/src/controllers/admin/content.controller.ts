import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import adminContentQueries from "../../queries/admin/content";

export const getAllContents = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.pageSize);
    const search = (req.query.search as string) || "";

    const data = await adminContentQueries.getAllContents(page, limit, search);

    return res.status(200).json({
      message: "Contents fetched successfully",
      response: {
        data,
      },
      error: null,
    });
  },
);

export const getContentDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await adminContentQueries.getContentDetail(Number(id));
    if (!data) {
      return res.status(404).json({
        message: "Content not found",
        response: null,
        error: "Content not found",
      });
    }

    return res.status(200).json({
      message: "Content details fetched successfully",
      response: {
        data,
      },
      error: null,
    });
  },
);

export const deleteContent = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const content = await adminContentQueries.checkContent(Number(id));
    if (!content) {
      return res.status(404).json({
        message: "Content not found",
        response: null,
        error: "Content not found",
      });
    }

    await adminContentQueries.deleteContent(Number(id));

    return res.status(200).json({
      message: "Content deleted successfully",
      response: null,
      error: null,
    });
  },
);
