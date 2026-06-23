import prisma from "../../lib/prisma";

const getAllSubscriptions = async (
  page: number,
  limit: number,
  search: string = "",
) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    where.OR = [
      { user: { first_name: { contains: search, mode: "insensitive" } } },
      { user: { last_name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
      { plan: { plan_name: { contains: search, mode: "insensitive" } } },
      { status: { contains: search, mode: "insensitive" } },
    ];
  }

  const [subscriptions, total] = await Promise.all([
    prisma.userSubscriptions.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        status: true,
        credits_remaining: true,
        current_period_start: true,
        current_period_end: true,
        cancel_at: true,
        canceled_at: true,
        createdAt: true,
        user: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
        plan: {
          select: {
            id: true,
            plan_name: true,
            price: true,
            currency: true,
            credit_limit: true,
            interval: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.userSubscriptions.count({ where }),
  ]);

  return {
    data: subscriptions,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export default {
  getAllSubscriptions,
};
