import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import adminPlanQueries from "../../queries/admin/plan";

export const getAllPlans = asyncHandler(async (_req: Request, res: Response) => {
  const data = await adminPlanQueries.getAllPlans();

  return res.status(200).json({
    message: "Plans fetched successfully",
    response: {
      data,
    },
    error: null,
  });
});

export const getPlanDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await adminPlanQueries.getPlanDetail(Number(id));
    if (!data) {
      return res.status(404).json({
        message: "Plan not found",
        response: null,
        error: "Plan not found",
      });
    }

    return res.status(200).json({
      message: "Plan details fetched successfully",
      response: {
        data,
      },
      error: null,
    });
  },
);

export const createPlan = asyncHandler(async (req: Request, res: Response) => {
  const data = await adminPlanQueries.createPlan(req.body);

  return res.status(201).json({
    message: "Plan created successfully",
    response: {
      data,
    },
    error: null,
  });
});

export const updatePlan = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const plan = await adminPlanQueries.checkPlan(Number(id));
  if (!plan) {
    return res.status(404).json({
      message: "Plan not found",
      response: null,
      error: "Plan not found",
    });
  }

  const data = await adminPlanQueries.updatePlan(Number(id), req.body);

  return res.status(200).json({
    message: "Plan updated successfully",
    response: {
      data,
    },
    error: null,
  });
});

export const deletePlan = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const plan = await adminPlanQueries.checkPlan(Number(id));
  if (!plan) {
    return res.status(404).json({
      message: "Plan not found",
      response: null,
      error: "Plan not found",
    });
  }

  if (plan._count.subscriptions > 0) {
    return res.status(400).json({
      message:
        "Cannot delete a plan that has active subscribers. Deactivate it instead.",
      response: null,
      error: "Plan has active subscribers",
    });
  }

  await adminPlanQueries.deletePlan(Number(id));

  return res.status(200).json({
    message: "Plan deleted successfully",
    response: null,
    error: null,
  });
});
