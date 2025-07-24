export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: string;
  publishedAt: string;
  url?: string;
  summary?: string;
}