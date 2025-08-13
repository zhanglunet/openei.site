import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, ExternalLink, Globe, Clock, Tag, RefreshCw, AlertCircle, Loader } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { NewsItem } from '../../services/newsService';

// 新闻数据接口已从服务中导入

// 新闻源数据（用于筛选选项）
const newsSources = {
  international: [
    'TechCrunch AI', 'IEEE Spectrum Robotics', 'MIT Technology Review AI', 'VentureBeat AI', 'The Verge AI',
    'Robotics Business Review', 'AI News'
  ],
  domestic: [
    '机器之心', '量子位', '雷锋网AI科技评论'
  ]
};

// 真实新闻数据通过useNews hook获取

const News: React.FC = () => {
  const { news, loading, error, refreshNews, lastUpdated } = useNews();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSourceType, setSelectedSourceType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  // 筛选和搜索逻辑
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSource = selectedSource === 'all' || item.source === selectedSource;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSourceType = selectedSourceType === 'all' || item.sourceType === selectedSourceType;
      
      return matchesSearch && matchesSource && matchesCategory && matchesSourceType;
    });
  }, [searchTerm, selectedSource, selectedCategory, selectedSourceType]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // 重置分页当筛选条件改变时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSource, selectedCategory, selectedSourceType]);

  // 格式化时间
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取分类标签颜色
  const getCategoryColor = (category: string) => {
    const colors = {
      'embodied-ai': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'robotics': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'ai': 'bg-green-500/20 text-green-300 border-green-500/30',
      'automation': 'bg-orange-500/20 text-orange-300 border-orange-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  // 获取分类中文名
  const getCategoryName = (category: string) => {
    const names = {
      'embodied-ai': '具身智能',
      'robotics': '机器人',
      'ai': '人工智能',
      'automation': '自动化'
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 头部区域 */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              新闻资讯
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              聚合全球50个权威新闻源，每日精选10条具身智能与机器人重大资讯
            </p>
            
            {/* 新闻源统计和状态 */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">7</div>
                <div className="text-sm text-gray-400">国际新闻源</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">3</div>
                <div className="text-sm text-gray-400">国内新闻源</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{loading ? '...' : news.length}</div>
                <div className="text-sm text-gray-400">实时资讯</div>
              </div>
            </div>
            
            {/* 刷新按钮和最后更新时间 */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                onClick={refreshNews}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? '更新中...' : '刷新新闻'}</span>
              </button>
              {lastUpdated && (
                <div className="text-sm text-gray-400">
                  最后更新：{lastUpdated.toLocaleString('zh-CN')}
                </div>
              )}
            </div>
            
            {/* 错误提示 */}
            {error && (
              <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-900/50 border border-red-700 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索和筛选区域 */}
        <div className="mb-8">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索新闻标题、内容或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* 筛选按钮 */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>筛选条件</span>
          </button>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 来源类型筛选 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    来源类型
                  </label>
                  <select
                    value={selectedSourceType}
                    onChange={(e) => setSelectedSourceType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部</option>
                    <option value="international">国际</option>
                    <option value="domestic">国内</option>
                  </select>
                </div>

                {/* 分类筛选 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    新闻分类
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部分类</option>
                    <option value="embodied-ai">具身智能</option>
                    <option value="robotics">机器人</option>
                    <option value="ai">人工智能</option>
                    <option value="automation">自动化</option>
                  </select>
                </div>

                {/* 新闻源筛选 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    新闻源
                  </label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部来源</option>
                    {[...newsSources.international, ...newsSources.domestic].map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <Loader className="w-6 h-6 animate-spin text-blue-400" />
              <span className="text-gray-300">正在获取最新新闻...</span>
            </div>
          </div>
        )}

        {/* 新闻列表 */}
        {!loading && (
          <div className="space-y-6">
            {paginatedNews.map((news) => (
            <article key={news.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              {/* 新闻头部信息 */}
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(news.category)}`}>
                    {getCategoryName(news.category)}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Globe className="w-4 h-4" />
                    <span>{news.source}</span>
                    {news.sourceType === 'international' && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">国际</span>
                    )}
                    {news.isTranslated && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">已翻译</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(news.publishTime)}</span>
                </div>
              </div>

              {/* 新闻标题 */}
              <h2 className="text-xl font-semibold mb-3 text-white hover:text-blue-400 transition-colors">
                {news.title}
              </h2>

              {/* 原文标题（如果有翻译） */}
              {news.originalTitle && (
                <h3 className="text-sm text-gray-400 mb-3 italic">
                  原文：{news.originalTitle}
                </h3>
              )}

              {/* 新闻摘要 */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {news.summary}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                  {news.tags.map((tag, index) => (
                    <span key={index} className="flex items-center space-x-1 px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                
                {/* 阅读原文链接 */}
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                >
                  <span>阅读原文</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
            ))}
          </div>
        )}

        {/* 分页 */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                上一页
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        )}

        {/* 无结果提示 */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">未找到匹配的新闻</p>
              <p className="text-sm">请尝试调整搜索条件或筛选选项</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;