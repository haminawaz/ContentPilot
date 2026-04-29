import { ArticleDetailClient } from "@/components/dashboard/article/ArticleDetailClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";
import { AUTH_COOKIE } from "@/lib/auth-client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  const defaultMetadata: Metadata = {
    title: "Article Detail",
    description: "View your generated SEO article in full detail.",
  };

  if (!token || !id || isNaN(Number(id))) {
    return defaultMetadata;
  }

  try {
    const res = await fetch(`${API_URL}/user/ai-search/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      const articleTitle = data.response?.title;
      if (articleTitle) {
        return {
          ...defaultMetadata,
          title: articleTitle,
        };
      }
    }
  } catch (error) {
    // Fallback to defaultMetadata
  }

  return defaultMetadata;
}

export default function ArticleDetailPage() {
  return <ArticleDetailClient />;
}

