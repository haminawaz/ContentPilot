import axios from 'axios';
import type { ContentResponse } from './types.ts';

const API_URL = 'http://localhost:3001/api/v1';

export const generateContent = async (topic: string, language: string, wordCount: number): Promise<ContentResponse> => {
  const response = await axios.post(`${API_URL}/ai-search`, {
    topic,
    language,
    word_count: wordCount
  });
  return response.data;
};
