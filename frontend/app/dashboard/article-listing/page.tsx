import { ArticleListingClient } from "@/components/dashboard/article/ArticleListingClient";

export const metadata = {
  title: "Article Listing | Structa",
  description: "Browse and revisit every article you've generated with Structa.",
};

export default function ArticleListingPage() {
  return <ArticleListingClient />;
}
