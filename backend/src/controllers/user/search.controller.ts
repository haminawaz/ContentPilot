import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import * as ContentGenerator from "../../services/content-generator.service";
import logger from "../../services/logger.service";
import searchQueries from "../../queries/user/search";

export const search = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).decoded?.userId;
  const { topic, language, word_count } = req.body;

  try {
    const result = await ContentGenerator.generateSEOContent(
      topic,
      language,
      word_count,
    );

    if (!result) {
      return res.status(500).json({
        message:
          "We couldn't generate your content. Please try again with a different topic",
        response: null,
        error: {
          code: "GENERATION_FAILED",
          details: "The AI model returned an empty response",
        },
      });
    }

    await searchQueries.articleGeneration({
      userId,
      topic,
      content: result.content.markdown,
      language,
      wordCount: result.content.wordCount,
      metadata: result.metadata,
      linkingStrategy: result.linkingStrategy,
      faq: result.faq,
    });

    return res.status(200).json({
      message: "Your SEO-optimized article has been generated successfully!",
      response: result,
      error: null,
    });
  } catch (error: any) {
    logger.error("Content generation error", error);

    let userMessage =
      "Something went wrong while generating your content. Please try again";
    let errorCode = "UNKNOWN_ERROR";
    const errorDetails = error.message || "An unexpected error occurred";

    if (error.message?.includes("SERP") || error.message?.includes("search")) {
      userMessage =
        "We couldn't fetch search data for your topic. Please check your topic and try again";
      errorCode = "SERP_FETCH_FAILED";
    } else if (
      error.message?.includes("API") ||
      error.message?.includes("OpenAI") ||
      error.code === "insufficient_quota"
    ) {
      userMessage =
        "Our AI service is temporarily unavailable. Please try again in a few moments";
      errorCode = "AI_SERVICE_ERROR";
    } else if (
      error.message?.includes("JSON") ||
      error.message?.includes("parse")
    ) {
      userMessage =
        "We received an unexpected response from our AI. Retrying might help";
      errorCode = "PARSE_ERROR";
    }

    return res.status(500).json({
      message: userMessage,
      response: null,
      error: {
        code: errorCode,
        details: errorDetails,
      },
    });
  }
});

export const getGeneratedArticles = async (req: Request, res: Response) => {
  const userId = (req as any).decoded?.userId;
  const { page = 1, pageSize = 5 } = req.query;
  try {
    const { articles, totalCount } = await searchQueries.getGeneratedArticles(
      userId,
      parseInt(page as string),
      parseInt(pageSize as string),
    );

    const totalPages = Math.ceil(totalCount / parseInt(pageSize as string));

    return res.status(200).json({
      message: "Generated articles fetched successfully!",
      response: {
        articles,
        pagination: {
          totalCount,
          totalPages,
          currentPage: parseInt(page as string),
          pageSize: parseInt(pageSize as string),
        },
      },
      error: null,
    });
  } catch (error: any) {
    logger.error("Failed to fetch generated articles", error);
    return res.status(500).json({
      message: "Failed to fetch generated articles",
      response: null,
      error: {
        code: "FETCH_FAILED",
        details: error.message || "An unexpected error occurred",
      },
    });
  }
};

export const getSingleGeneratedArticle = async (req: Request, res: Response) => {
  const userId = (req as any).decoded?.userId;
  const { id } = req.params;

  try {
    const article = await searchQueries.getSingleGeneratedArticle(
      userId,
      parseInt(id),
    );
    if (!article) {
      return res.status(404).json({
        message: "Generated article not found!",
        response: null,
        error: "Generated article not found",
      });
    }

    return res.status(200).json({
      message: "Generated article fetched successfully!",
      response: article,
      error: null,
    });
  } catch (error: any) {
    logger.error("Failed to fetch generated article", error);
    return res.status(500).json({
      message: "Failed to fetch generated article",
      response: null,
      error: {
        code: "FETCH_FAILED",
        details: error.message || "An unexpected error occurred",
      },
    });
  }
}
