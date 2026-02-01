import serpAPIService from "../lib/serpapi";
import * as OpenAIService from "../lib/openai";
import logger from "./logger.service";

export const generateSEOContent = async (
  topic: string,
  language: string = "en",
  wordCount: number = 1500,
) => {
  try {
    logger.info(`Fetching SERP data for topic: ${topic}`);
    const searchResults = await serpAPIService(topic, language);

    if (!searchResults) {
      throw new Error("Failed to fetch search results");
    }

    logger.info("Generating content strategy...");
    const strategy = await OpenAIService.generateContentStrategy(
      topic,
      searchResults,
    );

    logger.info("Writing article...");
    const markdown = await OpenAIService.generateFullArticle(
      topic,
      strategy,
      wordCount,
    );

    return {
      metadata: strategy.metadata,
      content: {
        markdown,
        wordCount: markdown.split(/\s+/).length,
      },
      linkingStrategy: strategy.linking,
      faq: strategy.faq,
    };
  } catch (error: any) {
    logger.error("Content generation failed", error);
    throw error;
  }
};
