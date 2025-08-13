import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, ExternalLink, Globe, Clock, Tag } from 'lucide-react';

// 新闻数据接口
interface NewsItem {
  id: string;
  title: string;
  originalTitle?: string;
  summary: string;
  originalSummary?: string;
  source: string;
  sourceType: 'international' | 'domestic';
  publishTime: string;
  url: string;
  category: 'embodied-ai' | 'robotics' | 'ai' | 'automation';
  isTranslated: boolean;
  tags: string[];
}

// 新闻源数据
const newsSources = {
  international: [
    'TechCrunch', 'IEEE Spectrum', 'MIT Technology Review', 'VentureBeat', 'The Verge',
    'Wired', 'Ars Technica', 'Engadget', 'ZDNet', 'CNET', 'Forbes Tech', 'Reuters Technology',
    'Bloomberg Technology', 'Wall Street Journal Tech', 'Financial Times Tech', 'BBC Technology',
    'CNN Tech', 'The Guardian Technology', 'New York Times Technology', 'Washington Post Technology',
    'Robotics Business Review', 'Robot Report', 'Robotics & Automation News', 'AI News',
    'Artificial Intelligence News', 'Machine Learning News', 'Deep Learning AI', 'OpenAI Blog',
    'Google AI Blog', 'Microsoft AI Blog'
  ],
  domestic: [
    '机器之心', '量子位', '雷锋网', '36氪', '新智元', '亿欧网', '钛媒体', '虎嗅网',
    'PingWest品玩', '爱范儿', 'IT之家', '网易智能', '腾讯科技', '新浪科技', '搜狐科技',
    '凤凰科技', '澎湃新闻科技', '第一财经科技', '21世纪经济报道科技', '科技日报'
  ]
};

// 模拟新闻数据
const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI发布具身智能新突破：GPT-4V驱动的机器人系统',
    originalTitle: 'OpenAI Unveils Breakthrough in Embodied AI: GPT-4V-Powered Robotic Systems',
    summary: 'OpenAI最新发布的具身智能系统结合了GPT-4V的视觉理解能力，使机器人能够更好地理解和操作物理世界，在家庭服务和工业自动化领域展现出巨大潜力。',
    originalSummary: 'OpenAI\'s latest embodied AI system combines GPT-4V\'s visual understanding capabilities, enabling robots to better understand and manipulate the physical world, showing great potential in home services and industrial automation.',
    source: 'OpenAI Blog',
    sourceType: 'international',
    publishTime: '2024-01-15T10:30:00Z',
    url: 'https://openai.com/blog/embodied-ai-breakthrough',
    category: 'embodied-ai',
    isTranslated: true,
    tags: ['GPT-4V', '具身智能', '机器人', 'OpenAI']
  },
  {
    id: '2',
    title: '宇树科技发布新一代人形机器人H2：运动能力再次突破',
    summary: '宇树科技正式发布H2人形机器人，相比前代产品在运动灵活性、负载能力和续航时间方面都有显著提升，预计将在2024年下半年开始商业化部署。',
    source: '机器之心',
    sourceType: 'domestic',
    publishTime: '2024-01-14T14:20:00Z',
    url: 'https://jiqizhixin.com/articles/unitree-h2-robot',
    category: 'robotics',
    isTranslated: false,
    tags: ['宇树科技', '人形机器人', 'H2', '商业化']
  },
  {
    id: '3',
    title: 'MIT研究团队开发出新型触觉感知算法，提升机器人操作精度',
    originalTitle: 'MIT Researchers Develop Novel Tactile Sensing Algorithm to Enhance Robot Manipulation Precision',
    summary: 'MIT计算机科学与人工智能实验室开发的新型触觉感知算法，能够让机器人通过触觉反馈实现更精确的物体操作，在精密装配和医疗手术领域具有重要应用价值。',
    originalSummary: 'The new tactile sensing algorithm developed by MIT\'s Computer Science and Artificial Intelligence Laboratory enables robots to achieve more precise object manipulation through tactile feedback, with important applications in precision assembly and medical surgery.',
    source: 'MIT Technology Review',
    sourceType: 'international',
    publishTime: '2024-01-13T16:45:00Z',
    url: 'https://technologyreview.com/mit-tactile-sensing-algorithm',
    category: 'ai',
    isTranslated: true,
    tags: ['MIT', '触觉感知', '机器人操作', '算法']
  },
  {
    id: '4',
    title: '特斯拉Optimus机器人最新进展：已能完成复杂家务任务',
    originalTitle: 'Tesla Optimus Robot Latest Progress: Now Capable of Complex Household Tasks',
    summary: '特斯拉在最新的AI Day活动中展示了Optimus机器人的最新能力，包括叠衣服、整理房间、准备简单餐食等复杂家务任务，标志着家用服务机器人技术的重大进步。',
    originalSummary: 'Tesla showcased the latest capabilities of the Optimus robot at the recent AI Day event, including folding clothes, organizing rooms, and preparing simple meals, marking significant progress in home service robot technology.',
    source: 'TechCrunch',
    sourceType: 'international',
    publishTime: '2024-01-12T09:15:00Z',
    url: 'https://techcrunch.com/tesla-optimus-household-tasks',
    category: 'robotics',
    isTranslated: true,
    tags: ['特斯拉', 'Optimus', '家务机器人', 'AI Day']
  },
  {
    id: '5',
    title: '智元机器人完成B轮融资，加速人形机器人产业化进程',
    summary: '智元机器人宣布完成数亿元B轮融资，本轮融资将主要用于人形机器人的技术研发、产能扩张和市场推广，预计2024年将实现千台级别的商业化交付。',
    source: '36氪',
    sourceType: 'domestic',
    publishTime: '2024-01-11T11:30:00Z',
    url: 'https://36kr.com/zhiyuan-robotics-series-b',
    category: 'robotics',
    isTranslated: false,
    tags: ['智元机器人', 'B轮融资', '产业化', '商业化']
  },
  {
    id: '6',
    title: 'Google DeepMind推出RT-X：大规模机器人学习新范式',
    originalTitle: 'Google DeepMind Introduces RT-X: A New Paradigm for Large-Scale Robot Learning',
    summary: 'Google DeepMind发布RT-X项目，这是一个大规模机器人学习平台，通过整合来自多个机器人系统的数据，实现了跨平台的技能迁移和泛化能力。',
    originalSummary: 'Google DeepMind released the RT-X project, a large-scale robot learning platform that achieves cross-platform skill transfer and generalization by integrating data from multiple robotic systems.',
    source: 'Google AI Blog',
    sourceType: 'international',
    publishTime: '2024-01-10T13:20:00Z',
    url: 'https://ai.googleblog.com/rt-x-robot-learning',
    category: 'ai',
    isTranslated: true,
    tags: ['Google DeepMind', 'RT-X', '机器人学习', '技能迁移']
  },
  {
    id: '7',
    title: '达闼科技发布云端机器人操作系统HARIX OS 3.0',
    summary: '达闼科技正式发布HARIX OS 3.0云端机器人操作系统，新版本在AI推理能力、多机器人协同和边云融合方面实现重大突破，为大规模机器人部署提供技术支撑。',
    source: '雷锋网',
    sourceType: 'domestic',
    publishTime: '2024-01-09T15:45:00Z',
    url: 'https://leifeng.com/cloudminds-harix-os-3',
    category: 'automation',
    isTranslated: false,
    tags: ['达闼科技', 'HARIX OS', '云端机器人', '操作系统']
  },
  {
    id: '8',
    title: 'Boston Dynamics展示Atlas机器人新技能：精确工具使用能力',
    originalTitle: 'Boston Dynamics Demonstrates New Atlas Robot Skills: Precise Tool Usage Capabilities',
    summary: 'Boston Dynamics最新展示了Atlas人形机器人使用各种工具完成复杂任务的能力，包括使用螺丝刀、扳手等工具进行精密操作，展现了机器人在工业应用中的巨大潜力。',
    originalSummary: 'Boston Dynamics recently demonstrated the Atlas humanoid robot\'s ability to use various tools to complete complex tasks, including using screwdrivers and wrenches for precision operations, showcasing the robot\'s great potential in industrial applications.',
    source: 'IEEE Spectrum',
    sourceType: 'international',
    publishTime: '2024-01-08T12:10:00Z',
    url: 'https://spectrum.ieee.org/boston-dynamics-atlas-tools',
    category: 'robotics',
    isTranslated: true,
    tags: ['Boston Dynamics', 'Atlas', '工具使用', '工业应用']
  },
  {
    id: '9',
    title: '小鹏汽车发布PX5人形机器人：汽车制造智能化新突破',
    summary: '小鹏汽车发布PX5人形机器人，专门针对汽车制造场景优化设计，具备高精度装配、质量检测和柔性生产能力，将率先在小鹏汽车工厂进行试点应用。',
    source: '新智元',
    sourceType: 'domestic',
    publishTime: '2024-01-07T10:25:00Z',
    url: 'https://xinzhiyuan.com/xpeng-px5-robot',
    category: 'automation',
    isTranslated: false,
    tags: ['小鹏汽车', 'PX5', '制造业', '智能化']
  },
  {
    id: '10',
    title: 'NVIDIA发布Isaac Sim 4.0：机器人仿真训练新里程碑',
    originalTitle: 'NVIDIA Releases Isaac Sim 4.0: A New Milestone in Robot Simulation Training',
    summary: 'NVIDIA发布Isaac Sim 4.0机器人仿真平台，新版本支持更真实的物理仿真、大规模并行训练和云端部署，为机器人AI训练提供了更强大的工具链。',
    originalSummary: 'NVIDIA released Isaac Sim 4.0 robot simulation platform, with the new version supporting more realistic physics simulation, large-scale parallel training, and cloud deployment, providing a more powerful toolchain for robot AI training.',
    source: 'VentureBeat',
    sourceType: 'international',
    publishTime: '2024-01-06T14:55:00Z',
    url: 'https://venturebeat.com/nvidia-isaac-sim-4-0',
    category: 'ai',
    isTranslated: true,
    tags: ['NVIDIA', 'Isaac Sim', '仿真训练', '机器人AI']
  }
];

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSourceType, setSelectedSourceType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  // 筛选和搜索逻辑
  const filteredNews = useMemo(() => {
    return mockNewsData.filter(item => {
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
            
            {/* 新闻源统计 */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">30</div>
                <div className="text-sm text-gray-400">国际新闻源</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">20</div>
                <div className="text-sm text-gray-400">国内新闻源</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{filteredNews.length}</div>
                <div className="text-sm text-gray-400">今日资讯</div>
              </div>
            </div>
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

        {/* 新闻列表 */}
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

        {/* 分页 */}
        {totalPages > 1 && (
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
        {filteredNews.length === 0 && (
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