import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/errorHandler";
import * as ContentGenerator from "../../services/content-generator.service";
import logger from "../../services/logger.service";

export const search = asyncHandler(async (req: Request, res: Response) => {
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
