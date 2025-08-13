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
    console.log('[useNews] Starting news refresh...');
    setLoading(true);
    setError(null);
    
    try {
      // 清除缓存
      console.log('[useNews] Clearing cache...');
      newsService.clearCache();
      
      // 重新获取新闻
      console.log('[useNews] Fetching fresh news...');
      const freshNews = await newsService.getAllNews();
      console.log('[useNews] Received news:', freshNews.length, 'items');
      console.log('[useNews] First news item:', freshNews[0]);
      
      setNews(freshNews);
      setLastUpdated(new Date());
      console.log('[useNews] News refresh completed successfully');
    } catch (err) {
      console.error('[useNews] Error during news refresh:', err);
      setError(err instanceof Error ? err.message : '获取新闻失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载和定时刷新
  useEffect(() => {
    console.log('[useNews] Initial load triggered');
    refreshNews();
    
    // 每30分钟自动刷新一次
    const interval = setInterval(() => {
      console.log('[useNews] Auto refresh triggered');
      refreshNews();
    }, 30 * 60 * 1000);
    
    return () => {
      console.log('[useNews] Cleanup interval');
      clearInterval(interval);
    };
  }, [refreshNews]);

  return {
    news,
    loading,
    error,
    refreshNews,
    lastUpdated
  };
};