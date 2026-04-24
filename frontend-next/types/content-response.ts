export interface SEOKeyword {
  keyword: string;
  type: "primary" | "secondary" | "LSI";
  density: string;
}

export interface LinkSuggestion {
  anchorText: string;
  targetTopic: string;
  type: "internal" | "external";
  context: string;
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentResponse {
  message: string;
  response: {
    metadata: {
      title: string;
      metaDescription: string;
      targetKeywords: SEOKeyword[];
    };
    content: {
      markdown: string;
      wordCount: number;
    };
    linkingStrategy: {
      internalLinks: LinkSuggestion[];
      externalLinks: LinkSuggestion[];
    };
    faq: FAQItem[];
  };
}
