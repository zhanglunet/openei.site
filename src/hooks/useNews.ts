import { useState, useEffect, useCallback } from 'react';
import { NewsItem, newsService } from '../services/newsService';

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refreshNews: () => Promise<void>;
  lastUpdated: Date | null;
}

export const useNews = (): UseNewsReturn => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newsData = await newsService.getAllNews();
      setNews(newsData);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取新闻失败';
      setError(errorMessage);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNews = useCallback(async () => {
    // 清除缓存并重新获取
    newsService.clearCache();
    await fetchNews();
  }, [fetchNews]);

  // 初始加载
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 定时刷新（每30分钟）
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, 30 * 60 * 1000); // 30分钟

    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refreshNews,
    lastUpdated
  };
};