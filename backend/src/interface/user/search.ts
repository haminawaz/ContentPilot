export interface GenerateArticle {
  userId: string,
  topic: string,
  content: string,
  language: string,
  wordCount: number,
  metadata: any,
  linkingStrategy: any,
  faq: any,
}
