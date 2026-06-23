import prisma from "../../lib/prisma";

interface PlanInput {
  plan_name: string;
  price: number;
  interval: string;
  description: string;
  features?: string[];
  currency: string;
  credit_limit: number;
  active?: boolean;
  stripe_price_id?: string;
}

const getAllPlans = async () => {
  const plans = await prisma.plans.findMany({
    orderBy: { price: "asc" },
    select: {
      id: true,
      plan_name: true,
      price: true,
      interval: true,
      description: true,
      features: true,
      currency: true,
      active: true,
      credit_limit: true,
      stripe_price_id: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { subscriptions: true } },
    },
  });

  return plans.map((plan) => ({
    ...plan,
    subscriberCount: plan._count.subscriptions,
  }));
};

const checkPlan = async (id: number) => {
  return prisma.plans.findUnique({
    where: { id },
    select: { id: true, _count: { select: { subscriptions: true } } },
  });
};

const getPlanDetail = async (id: number) => {
  return prisma.plans.findUnique({
    where: { id },
    select: {
      id: true,
      plan_name: true,
      price: true,
      interval: true,
      description: true,
      features: true,
      currency: true,
      active: true,
      credit_limit: true,
      stripe_price_id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const createPlan = async (data: PlanInput) => {
  return prisma.plans.create({
    data: {
      plan_name: data.plan_name,
      price: data.price,
      interval: data.interval,
      description: data.description,
      features: data.features ?? [],
      currency: data.currency,
      credit_limit: data.credit_limit,
      active: data.active ?? true,
      stripe_price_id: data.stripe_price_id ?? "",
    },
  });
};

const updatePlan = async (id: number, data: Partial<PlanInput>) => {
  return prisma.plans.update({
    where: { id },
    data: {
      ...(data.plan_name !== undefined && { plan_name: data.plan_name }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.interval !== undefined && { interval: data.interval }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.features !== undefined && { features: data.features }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.credit_limit !== undefined && {
        credit_limit: data.credit_limit,
      }),
      ...(data.active !== undefined && { active: data.active }),
      ...(data.stripe_price_id !== undefined && {
        stripe_price_id: data.stripe_price_id,
      }),
    },
  });
};

const deletePlan = async (id: number) => {
  return prisma.plans.delete({ where: { id } });
};

export default {
  getAllPlans,
  checkPlan,
  getPlanDetail,
  createPlan,
  updatePlan,
  deletePlan,
};
