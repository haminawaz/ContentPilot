import prisma from "../../lib/prisma";

const getStats = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    totalUsers,
    activeUsers,
    blockedUsers,
    newUsersThisMonth,
    totalArticles,
    articlesThisMonth,
    totalSubscriptions,
    activeSubscriptions,
    planGroups,
    plans,
    activeSubs,
    recentUsers,
    recentArticles,
    usersForChart,
    articlesForChart,
  ] = await Promise.all([
    prisma.users.count(),
    prisma.users.count({ where: { status: "active" } }),
    prisma.users.count({ where: { status: "blocked" } }),
    prisma.users.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.articleGeneration.count(),
    prisma.articleGeneration.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.userSubscriptions.count(),
    prisma.userSubscriptions.count({ where: { status: "active" } }),
    prisma.userSubscriptions.groupBy({
      by: ["plan_id"],
      _count: { plan_id: true },
    }),
    prisma.plans.findMany({
      select: { id: true, plan_name: true, price: true, currency: true },
    }),
    prisma.userSubscriptions.findMany({
      where: { status: "active" },
      select: { plan: { select: { price: true } } },
    }),
    prisma.users.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.articleGeneration.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        topic: true,
        title: true,
        word_count: true,
        language: true,
        createdAt: true,
        user: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
      },
    }),
    prisma.users.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
    prisma.articleGeneration.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
  ]);

  const planMap = new Map(plans.map((p) => [p.id, p]));
  const planDistribution = planGroups.map((g) => ({
    plan_id: g.plan_id,
    plan_name: planMap.get(g.plan_id)?.plan_name || "Unknown",
    count: g._count.plan_id,
  }));

  const mrr = activeSubs.reduce((sum, s) => sum + (s.plan?.price || 0), 0);

  // Build six monthly buckets for the signups / generations chart.
  const months: {
    key: string;
    label: string;
    users: number;
    articles: number;
  }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("en-US", { month: "short" }),
      users: 0,
      articles: 0,
    });
  }
  const bucketIndex = (d: Date) =>
    months.findIndex((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
  usersForChart.forEach((u) => {
    const i = bucketIndex(u.createdAt);
    if (i >= 0) months[i].users++;
  });
  articlesForChart.forEach((a) => {
    const i = bucketIndex(a.createdAt);
    if (i >= 0) months[i].articles++;
  });

  return {
    totals: {
      totalUsers,
      activeUsers,
      blockedUsers,
      newUsersThisMonth,
      totalArticles,
      articlesThisMonth,
      totalSubscriptions,
      activeSubscriptions,
      mrr,
    },
    planDistribution,
    monthly: months,
    recentUsers,
    recentArticles,
  };
};

export default { getStats };
