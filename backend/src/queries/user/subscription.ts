import prisma from "../../lib/prisma";

const getUserSubscription = async (userId: number | string) => {
  return prisma.userSubscriptions.findFirst({
    where: { user_id: Number(userId), status: "active" },
    select: {
      id: true,
      credits_remaining: true,
      plan: {
        select: {
          plan_name: true,
          credit_limit: true,
        },
      },
      current_period_start: true,
      current_period_end: true,
    },
  });
};

export default {
  getUserSubscription,
};
