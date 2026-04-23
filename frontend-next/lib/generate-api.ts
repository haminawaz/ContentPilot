import type { ContentResponse } from "@/types/content";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function generateContent(
  topic: string,
  language: string,
  wordCount: number,
): Promise<ContentResponse> {
  const res = await fetch(`${API_URL}/user/ai-search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, language, word_count: wordCount }),
  });

  if (!res.ok) {
    let details: string | undefined;
    try {
      const body = await res.json();
      details = body?.error?.details || body?.message;
    } catch {}
    const err = new Error(details || `Request failed with ${res.status}`);
    throw err;
  }

  return (await res.json()) as ContentResponse;
}
