import { Request, Response } from "express";
import dashboardQuery from "../../queries/user/dashboard";

export const getDashboardOverview = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.decoded?.userId);
    const articles = await dashboardQuery.getDashboardOverview(userId);

    const articlesGenerated = articles.length;

    let totalWords = 0;
    let totalKeywords = 0;
    for (const article of articles) {
      totalWords += article.word_count || 0;
      if (article.metadata) {
        const md = article.metadata as any;
        if (md && md.targetKeywords && Array.isArray(md.targetKeywords)) {
          totalKeywords += md.targetKeywords.length;
        }
      }
    }

    const stats = {
      articles_generated: articlesGenerated,
      ranked_keywords: totalKeywords,
      words_written: totalWords,
    };

    return res.status(200).json({
      message: "Dashboard overview fetched successfully",
      response: stats,
      error: null,
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);
    return res.status(500).json({
      error: "Internal server error",
      response: null,
      message: "Server error",
    });
  }
};
