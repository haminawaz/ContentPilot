import prisma from "../../lib/prisma";

const getDashboardOverview = async (userId: number) => {
  return await prisma.articleGeneration.findMany({
    where: { user_id: userId, status: { not: "deleted" } },
    select: {
      word_count: true,
      metadata: true,
    },
  });
};

export default {
  getDashboardOverview,
};
