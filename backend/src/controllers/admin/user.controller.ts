import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import adminQueries from "../../queries/admin/user";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.pageSize);
    const search = (req.query.search as string) || "";

    const data = await adminQueries.getAllUsers(page, limit, search);

    return res.status(200).json({
      message: "Users fetched successfully",
      response: {
        data: data,
      },
      error: null,
    });
  },
);

export const getUserDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await adminQueries.getUserDetails(Number(id));
    if (!data) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      response: {
        data: data,
      },
      error: null,
    });
  },
);

export const updateUserStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const user = await adminQueries.checkUser(Number(id));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    await adminQueries.updateUserStatus(Number(id), status);

    return res.status(200).json({
      message: `User status updated to ${status} successfully`,
      response: null,
      error: null,
    });
  },
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await adminQueries.checkUser(Number(id));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }

    await adminQueries.deleteUser(Number(id));

    return res.status(200).json({
      message: "User deleted successfully",
      response: null,
      error: null,
    });
  },
);
