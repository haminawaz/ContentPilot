// import OpenAI from "openai";
import config from "../config/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "../services/logger.service";
import {
  LinkSuggestion,
  FAQItem,
  SEOKeyword,
} from "../types/seo-content.types";

// if (!config.openaiApiKey) {
//   throw new Error("OPENAI_API_KEY is not defined in environment variables");
// }

if (!config.geminiApiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// const openai = new OpenAI({
//   apiKey: config.openaiApiKey,
// });

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const parseJSON = (text: string) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return JSON.parse(text);
    return JSON.parse(text.substring(start, end + 1));
  } catch (e) {
    logger.error("Failed to parse JSON from AI response", { text });
    throw new Error("AI response was not valid JSON");
  }
};

interface ContentStrategy {
  metadata: {
    title: string;
    metaDescription: string;
    targetKeywords: SEOKeyword[];
  };
  outline: {
    h1: string;
    sections: {
      heading: string;
      subheadings?: string[];
      keyPoints: string[];
    }[];
  };
  linking: {
    internalLinks: LinkSuggestion[];
    externalLinks: LinkSuggestion[];
  };
  faq: FAQItem[];
}

export const generateContentStrategy = async (
  topic: string,
  searchResults: any[],
): Promise<ContentStrategy> => {
  const prompt = `
    You are an expert SEO Strategist and Content Architect.
    
    TASK:
    Analyze the provided top 10 SERP results for the topic "${topic}" and create a comprehensive content strategy.
    
    SERP CONTEXT:
    ${JSON.stringify(searchResults.slice(0, 5), null, 2)}
    
    REQUIREMENTS:
    1. Identify primary and secondary keywords based on search intent.
    2. Create a high-converting Title Tag and Meta Description.
    3. detailed Outline with H1, H2, H3 hierarchy.
    4. Linking Strategy:
       - Suggest 3-5 Internal Links (general topics related to "${topic}").
       - Suggest 2-4 External Links to authoritative sources (e.g., wiki, industry reports).
    5. FAQ: 4-5 common questions based on user intent.
    
    OUTPUT FORMAT:
    Return ONLY a raw JSON object with the following structure:
    {
      "metadata": {
        "title": "...",
        "metaDescription": "...",
        "targetKeywords": [{ "keyword": "...", "type": "primary|secondary", "density": "..." }]
      },
      "outline": {
        "h1": "...",
        "sections": [
          { "heading": "...", "subheadings": ["..."], "keyPoints": ["..."] }
        ]
      },
      "linking": {
        "internalLinks": [{ "anchorText": "...", "targetTopic": "...", "type": "internal", "context": "..." }],
        "externalLinks": [{ "anchorText": "...", "targetTopic": "...", "type": "external", "context": "..." }]
      },
      "faq": [{ "question": "...", "answer": "..." }]
    }
  `;

  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content: "You are an SEO expert. Output valid JSON only.",
  //     },
  //     { role: "user", content: prompt },
  //   ],
  //   model: "gpt-4-turbo-preview",
  //   response_format: { type: "json_object" },
  // });

  // return parseJSON(completion.choices[0].message.content || "{}");

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: "You are an SEO expert. Output valid JSON only.",
    generationConfig: { responseMimeType: "application/json" },
  });
  const result = await model.generateContent(prompt);
  return parseJSON(result.response.text());
};

export const generateFullArticle = async (
  topic: string,
  strategy: ContentStrategy,
  wordCount: number,
): Promise<string> => {
  const prompt = `
    You are a professional Content Writer. Write a high-quality, human-like article based on the provided strategy.
    
    TOPIC: ${topic}
    TARGET WORD COUNT: ${wordCount} words
    
    STRATEGY:
    ${JSON.stringify(strategy)}
    
    GUIDELINES:
    1. Use Markdown formatting (# for H1, ## for H2, etc.).
    2. Tone: Professional, authoritative, yet engaging. NOT robotic.
    3. Use the keyword strategy provided.
    4. Incorporate the internal/external link placeholders naturally in the text (e.g., [Link: Anchor Text]).
    5. Ensure the content flows logically.
    6. Include the FAQ section at the end.
    
    OUTPUT:
    Return ONLY the Markdown content.
  `;

  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "You are a professional writer." },
  //     { role: "user", content: prompt },
  //   ],
  //   model: "gpt-4-turbo-preview",
  // });

  // return completion.choices[0].message.content || "";

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: "You are a professional writer.",
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
};
