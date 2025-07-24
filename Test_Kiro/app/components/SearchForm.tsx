'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [topic, setTopic] = useState('');

  const popularTopics = [
    '인공지능', '암호화폐', '기후변화', '우주탐사', 
    '전기차', '메타버스', '바이오테크', '반도체'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic.trim());
    }
  };

  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
    onSearch(selectedTopic);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="관심 있는 주제를 입력하세요..."
            className="search-input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="btn-primary"
          >
            뉴스 검색
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">인기 주제</h3>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((popularTopic) => (
            <button
              key={popularTopic}
              onClick={() => handleTopicClick(popularTopic)}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200 disabled:opacity-50"
            >
              {popularTopic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}