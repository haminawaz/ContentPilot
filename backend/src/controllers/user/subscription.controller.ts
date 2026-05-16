import { Request, Response } from "express";
import subscriptionQuery from "../../queries/user/subscription";

export const getSubscriptionDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.decoded?.userId ? Number(req.decoded.userId) : null;

    let subscription = null;
    let plans = await subscriptionQuery.getAllPlans();

    if (userId) {
      subscription = await subscriptionQuery.getUserSubscription(userId);
      plans = plans.filter((p) => p.plan_name.toLowerCase() !== "free");
    }

    return res.status(200).json({
      message: "Subscription details fetched successfully",
      response: {
        current_subscription: subscription,
        available_plans: plans,
      },
      error: null,
    });
  } catch (error) {
    console.error("Subscription details error:", error);
    return res.status(500).json({
      error: "Internal server error",
      response: null,
      message: "Server error",
    });
  }
};
