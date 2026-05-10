import prisma from "../src/lib/prisma";

async function main() {
  return await prisma.$transaction(async (tx) => {
    const plansData = [
      {
        plan_name: "Free",
        price: 0,
        credit_limit: 2,
        interval: "month",
        description:
          "Perfect for trying out ContentPilot and exploring features.",
        features: [
          "2 AI article credits",
          "Basic SEO analysis",
          "Article history",
          "Email support",
        ],
        active: true,
        currency: "USD",
        stripe_price_id: "",
      },
      {
        plan_name: "Pro",
        price: 19,
        credit_limit: 10,
        interval: "month",
        description:
          "For creators who publish consistently and need precision.",
        features: [
          "10 AI article credits",
          "Advanced SEO insights",
          "Priority generation",
          "Priority support",
        ],
        active: true,
        currency: "USD",
        stripe_price_id: "",
      },
      {
        plan_name: "Agency",
        price: 49,
        credit_limit: 30,
        interval: "month",
        description: "Scale content for teams and clients with full power.",
        features: [
          "10 AI article credits",
          "Team workspace",
          "Custom integrations",
          "Dedicated account manager",
        ],
        active: true,
        currency: "USD",
        stripe_price_id: "",
      },
    ];

    for (const plan of plansData) {
      await tx.plans.upsert({
        where: { id: plansData.indexOf(plan) + 1 },
        update: plan,
        create: plan,
      });
    }

    const freePlan = await tx.plans.findFirst({
      where: { plan_name: "Free", active: true },
    });
    if (!freePlan) {
      throw new Error("Free plan not found after seeding");
    }

    const usersWithoutSub = await tx.users.findMany({
      where: {
        subscriptions: {
          none: {},
        },
      },
    });
    console.log(`Found ${usersWithoutSub.length} users without subscriptions.`);

    for (const user of usersWithoutSub) {
      await tx.userSubscriptions.create({
        data: {
          user_id: user.id,
          plan_id: freePlan.id,
          status: "active",
          credits_remaining: freePlan.credit_limit,
          current_period_start: new Date(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        },
      });
    }

    console.log("Seeding completed successfully!");
    return;
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
