import prisma from "../../lib/prisma";
import { GenerateArticle } from "../../interface/user/search";

const articleGeneration = async (data: GenerateArticle) => {
  return await prisma.articleGeneration.create({
    data: {
      user_id: parseInt(data.userId),
      topic: data.topic,
      title: data.metadata?.title || data.topic,
      content: data.content,
      word_count: data.wordCount,
      language: data.language || "en",
      metadata: data.metadata as any,
      linking_strategy: data.linkingStrategy as any,
      faq: data.faq as any,
    },
  });
};

const getGeneratedArticles = async (
  userId: string,
  page: number,
  pageSize: number,
) => {
  const [articles, totalCount] = await Promise.all([
    prisma.articleGeneration.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        id: true,
        title: true,
        word_count: true,
        language: true,
        createdAt: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.articleGeneration.count({
      where: {
        user_id: parseInt(userId),
      },
    }),
  ]);

  return { articles, totalCount };
};

const getSingleGeneratedArticle = async (
  userId: string,
  id: number,
) => {
  return await prisma.articleGeneration.findUnique({
    where: {
      user_id: parseInt(userId),
      id: id,
    },
    select: {
      id: true,
      title: true,
      word_count: true,
      language: true,
      createdAt: true,
      updatedAt: true,
      content: true,
      metadata: true,
      linking_strategy: true,
      faq: true,
    },
  });
};

export default {
  articleGeneration,
  getGeneratedArticles,
  getSingleGeneratedArticle,
};
