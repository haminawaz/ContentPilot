import { ArticleListingClient } from "@/components/dashboard/article/ArticleListingClient";

export const metadata = {
  title: "Article Listing | ContentPilot",
  description: "Browse and revisit every article you've generated with ContentPilot.",
};

export default function ArticleListingPage() {
  return <ArticleListingClient />;
}
