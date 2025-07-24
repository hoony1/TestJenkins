'use client';

import { useState } from 'react';
import { NewsItem } from './types/news';
import SearchForm from './components/SearchForm';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTopic, setSearchTopic] = useState('');
  const [summarizingIds, setSummarizingIds] = useState<Set<string>>(new Set());

  const handleSearch = async (topic: string) => {
    setLoading(true);
    setSearchTopic(topic);
    
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('뉴스를 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error('뉴스 검색 오류:', error);
      alert('뉴스를 가져오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (newsId: string) => {
    const newsItem = news.find(item => item.id === newsId);
    if (!newsItem) return;

    setSummarizingIds(prev => new Set(prev).add(newsId));

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newsItem.title,
          description: newsItem.description,
          content: newsItem.content,
        }),
      });

      if (!response.ok) {
        throw new Error('요약 생성에 실패했습니다.');
      }

      const data = await response.json();
      
      setNews(prevNews => 
        prevNews.map(item => 
          item.id === newsId 
            ? { ...item, summary: data.summary }
            : item
        )
      );
    } catch (error) {
      console.error('요약 생성 오류:', error);
      alert('AI 요약 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSummarizingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(newsId);
        return newSet;
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🤖 AI 뉴스 브리핑
        </h1>
        <p className="text-xl text-gray-600">
          AI가 요약해주는 최신 뉴스를 확인하세요
        </p>
      </header>

      <SearchForm onSearch={handleSearch} isLoading={loading} />

      {loading && (
        <div className="text-center py-8">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            &quot;{searchTopic}&quot; 관련 뉴스를 검색 중입니다...
          </p>
        </div>
      )}

      {!loading && news.length > 0 && (
        <div className="space-y-6">
          {news.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              onSummarize={handleSummarize}
              isLoading={summarizingIds.has(newsItem.id)}
            />
          ))}
        </div>
      )}

      {!loading && news.length === 0 && searchTopic && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            &quot;{searchTopic}&quot;에 대한 뉴스를 찾을 수 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}