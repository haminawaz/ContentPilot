import { getJson } from "serpapi";
import config from "../config/env";

if (!config.serpApiKey) {
  throw new Error("SERP_API_KEY is not defined in environment variables");
}

const serpAPIService = async (searchQuery: string, language: string) => {
  try {
    const data = await getJson({
      engine: "google",
      q: searchQuery,
      location: "London, United Kingdom",
      google_domain: "google.com",
      hl: language,
      gl: "uk",
      api_key: config.serpApiKey,
    });
    return data.organic_results;
  } catch (error) {
    return error;
  }
};

export default serpAPIService;
