'use client';

import { NewsItem } from '../types/news';

interface NewsCardProps {
  news: NewsItem;
  onSummarize: (newsId: string) => void;
  isLoading: boolean;
}

export default function NewsCard({ news, onSummarize, isLoading }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article className="news-card">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex-1 mr-4">
          {news.title}
        </h2>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {news.source}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {news.description}
      </p>

      {news.summary ? (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">🤖</span>
            <h3 className="font-semibold text-blue-800">AI 요약</h3>
          </div>
          <p className="text-blue-700">{news.summary}</p>
        </div>
      ) : (
        <button
          onClick={() => onSummarize(news.id)}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 mb-4"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>AI 요약 중...</span>
            </>
          ) : (
            <>
              <span>🤖</span>
              <span>AI 요약하기</span>
            </>
          )}
        </button>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formatDate(news.publishedAt)}</span>
        {news.url && (
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            원문 보기 →
          </a>
        )}
      </div>
    </article>
  );
}