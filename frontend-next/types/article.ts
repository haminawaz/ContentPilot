import type {
  SEOKeyword,
  LinkSuggestion,
  FAQItem,
} from "@/types/content-response";

export interface ArticleListItem {
  id: number;
  title: string;
  word_count: number;
  language: string;
  createdAt: string;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginatedArticles {
  articles: ArticleListItem[];
  pagination: Pagination;
}

export interface ArticleDetail {
  id: number;
  title: string;
  word_count: number;
  language: string;
  content: string;
  metadata: {
    title: string;
    metaDescription: string;
    targetKeywords: SEOKeyword[];
  } | null;
  linking_strategy: {
    internalLinks: LinkSuggestion[];
    externalLinks: LinkSuggestion[];
  } | null;
  faq: FAQItem[] | null;
  createdAt: string;
}
