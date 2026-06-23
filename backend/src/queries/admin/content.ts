import prisma from "../../lib/prisma";

const getAllContents = async (
  page: number,
  limit: number,
  search: string = "",
) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    where.OR = [
      { topic: { contains: search, mode: "insensitive" } },
      { title: { contains: search, mode: "insensitive" } },
      { language: { contains: search, mode: "insensitive" } },
      { status: { contains: search, mode: "insensitive" } },
    ];
  }

  const [contents, total] = await Promise.all([
    prisma.articleGeneration.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        topic: true,
        title: true,
        word_count: true,
        language: true,
        status: true,
        createdAt: true,
        user: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.articleGeneration.count({ where }),
  ]);

  return {
    data: contents,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const checkContent = async (id: number) => {
  return prisma.articleGeneration.findUnique({
    where: { id },
    select: { id: true },
  });
};

const getContentDetail = async (id: number) => {
  return prisma.articleGeneration.findUnique({
    where: { id },
    select: {
      id: true,
      topic: true,
      title: true,
      content: true,
      word_count: true,
      language: true,
      metadata: true,
      linking_strategy: true,
      faq: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: { id: true, first_name: true, last_name: true, email: true },
      },
    },
  });
};

const deleteContent = async (id: number) => {
  return prisma.articleGeneration.delete({ where: { id } });
};

export default {
  getAllContents,
  checkContent,
  getContentDetail,
  deleteContent,
};
