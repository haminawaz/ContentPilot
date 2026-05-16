import prisma from "../../lib/prisma";

const getUserSubscription = async (userId: number | string) => {
  return prisma.userSubscriptions.findFirst({
    where: { user_id: Number(userId), status: "active" },
    select: {
      id: true,
      credits_remaining: true,
      plan: {
        select: {
          id: true,
          plan_name: true,
          price: true,
          description: true,
          features: true,
          credit_limit: true,
        },
      },
      current_period_start: true,
      current_period_end: true,
    },
  });
};

const getAllPlans = async () => {
  return prisma.plans.findMany({
    where: { active: true },
    select: {
      id: true,
      plan_name: true,
      price: true,
      interval: true,
      description: true,
      features: true,
      currency: true,
      credit_limit: true,
    },
  });
};

export default {
  getUserSubscription,
  getAllPlans,
};
