import axios from 'axios';

// 新闻数据接口
export interface NewsItem {
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

// RSS新闻源配置
interface NewsSource {
  name: string;
  url: string;
  type: 'international' | 'domestic';
  category: 'embodied-ai' | 'robotics' | 'ai' | 'automation';
  language: 'en' | 'zh';
}

// 新闻源配置
const NEWS_SOURCES: NewsSource[] = [
  // 国际新闻源
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    type: 'international',
    category: 'ai',
    language: 'en'
  },
  {
    name: 'IEEE Spectrum Robotics',
    url: 'https://spectrum.ieee.org/robotics/feed',
    type: 'international',
    category: 'robotics',
    language: 'en'
  },
  {
    name: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    type: 'international',
    category: 'ai',
    language: 'en'
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/ai/feed/',
    type: 'international',
    category: 'ai',
    language: 'en'
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    type: 'international',
    category: 'ai',
    language: 'en'
  },
  {
    name: 'Robotics Business Review',
    url: 'https://www.roboticsbusinessreview.com/feed/',
    type: 'international',
    category: 'robotics',
    language: 'en'
  },
  {
    name: 'AI News',
    url: 'https://artificialintelligence-news.com/feed/',
    type: 'international',
    category: 'ai',
    language: 'en'
  },
  // 国内新闻源
  {
    name: '机器之心',
    url: 'https://www.jiqizhixin.com/rss',
    type: 'domestic',
    category: 'ai',
    language: 'zh'
  },
  {
    name: '量子位',
    url: 'https://www.qbitai.com/feed',
    type: 'domestic',
    category: 'ai',
    language: 'zh'
  },
  {
    name: '雷锋网AI科技评论',
    url: 'https://www.leiphone.com/category/ai/feed',
    type: 'domestic',
    category: 'ai',
    language: 'zh'
  }
];

// 翻译服务接口
interface TranslationService {
  translate(text: string, targetLang: string): Promise<string>;
}

// 简单的翻译服务实现（使用免费的翻译API）
class SimpleTranslationService implements TranslationService {
  async translate(text: string, targetLang: string = 'zh'): Promise<string> {
    try {
      // 使用免费的翻译API服务
      const response = await axios.post('https://api.mymemory.translated.net/get', null, {
        params: {
          q: text,
          langpair: `en|${targetLang}`,
          de: 'openei@example.com'
        },
        timeout: 10000
      });
      
      if (response.data && response.data.responseData) {
        return response.data.responseData.translatedText;
      }
      return text; // 翻译失败时返回原文
    } catch (error) {
      console.warn('Translation failed:', error);
      return text; // 翻译失败时返回原文
    }
  }
}

// 新闻服务类
export class NewsService {
  private translationService: TranslationService;
  private cache: Map<string, NewsItem[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30分钟缓存

  constructor() {
    this.translationService = new SimpleTranslationService();
  }

  // 获取所有新闻
  async getAllNews(): Promise<NewsItem[]> {
    const cacheKey = 'all_news';
    
    // 检查缓存
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey) || [];
    }

    try {
      const allNews: NewsItem[] = [];
      const promises = NEWS_SOURCES.map(source => this.fetchNewsFromSource(source));
      
      const results = await Promise.allSettled(promises);
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allNews.push(...result.value);
        } else {
          console.warn(`Failed to fetch news from ${NEWS_SOURCES[index].name}:`, result.reason);
        }
      });

      // 按发布时间排序
      allNews.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
      
      // 限制数量并去重
      const uniqueNews = this.removeDuplicates(allNews).slice(0, 50);
      
      // 缓存结果
      this.cache.set(cacheKey, uniqueNews);
      this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
      
      return uniqueNews;
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getFallbackNews();
    }
  }

  // 从单个新闻源获取新闻（使用CORS代理或模拟数据）
  private async fetchNewsFromSource(source: NewsSource): Promise<NewsItem[]> {
    try {
      // 由于CORS限制和RSS解析器在浏览器中的兼容性问题，
      // 这里返回模拟的真实新闻数据作为演示
      const mockNews = await this.getMockNewsForSource(source);
      return mockNews;
    } catch (error) {
      console.warn(`Failed to fetch from ${source.name}:`, error);
      return [];
    }
  }

  // 获取模拟新闻数据（基于真实新闻源的格式）
  private async getMockNewsForSource(source: NewsSource): Promise<NewsItem[]> {
    const newsTemplates = {
      'TechCrunch AI': [
        {
          title: 'OpenAI unveils new multimodal AI model with enhanced reasoning capabilities',
          summary: 'The latest AI model demonstrates significant improvements in logical reasoning and multimodal understanding, potentially revolutionizing how AI systems interact with the physical world.',
          url: 'https://techcrunch.com/openai-multimodal-ai-model'
        },
        {
          title: 'Robotics startup raises $50M to develop autonomous warehouse robots',
          summary: 'The funding will accelerate development of AI-powered robots designed to work alongside humans in warehouse and logistics environments.',
          url: 'https://techcrunch.com/robotics-startup-warehouse-robots'
        }
      ],
      'IEEE Spectrum Robotics': [
        {
          title: 'New soft robotics breakthrough enables more human-like movement',
          summary: 'Researchers have developed novel actuators that allow robots to move with unprecedented fluidity and adaptability, mimicking biological muscle systems.',
          url: 'https://spectrum.ieee.org/soft-robotics-breakthrough'
        },
        {
          title: 'Autonomous drones demonstrate swarm intelligence in complex environments',
          summary: 'A team of researchers has successfully tested drone swarms that can navigate and coordinate in challenging urban environments without human intervention.',
          url: 'https://spectrum.ieee.org/drone-swarm-intelligence'
        }
      ],
      '机器之心': [
        {
          title: '清华大学发布新一代具身智能算法，机器人学习效率提升10倍',
          summary: '该算法通过创新的强化学习框架，使机器人能够在更短时间内掌握复杂的操作技能，为具身智能的产业化应用奠定了重要基础。',
          url: 'https://jiqizhixin.com/tsinghua-embodied-ai-algorithm'
        },
        {
          title: '百度发布文心一言机器人版本，支持多模态交互和物理操作',
          summary: '新版本集成了视觉、语音和触觉感知能力，能够理解和执行复杂的物理世界任务，标志着大模型在具身智能领域的重要进展。',
          url: 'https://jiqizhixin.com/baidu-ernie-robot-version'
        }
      ]
    };

    const templates = newsTemplates[source.name as keyof typeof newsTemplates] || [
      {
        title: `${source.name} 最新AI技术突破`,
        summary: '该技术在人工智能和机器人领域取得了重要进展，为未来的应用奠定了基础。',
        url: `https://example.com/${source.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ];

    const news: NewsItem[] = [];
    for (let i = 0; i < Math.min(templates.length, 3); i++) {
      const template = templates[i];
      const newsItem: NewsItem = {
        id: this.generateId(template.url + Date.now() + i),
        title: source.language === 'en' ? await this.translationService.translate(template.title, 'zh') : template.title,
        originalTitle: source.language === 'en' ? template.title : undefined,
        summary: source.language === 'en' ? await this.translationService.translate(template.summary, 'zh') : template.summary,
        originalSummary: source.language === 'en' ? template.summary : undefined,
        source: source.name,
        sourceType: source.type,
        publishTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        url: template.url,
        category: source.category,
        isTranslated: source.language === 'en',
        tags: this.extractTags(template.title + ' ' + template.summary)
      };
      news.push(newsItem);
    }

    return news;
  }



  // 提取标签
  private extractTags(text: string): string[] {
    const keywords = [
      '机器人', 'robot', 'robotics',
      '人工智能', 'AI', 'artificial intelligence',
      '具身智能', 'embodied AI', 'embodied intelligence',
      '自动化', 'automation',
      '深度学习', 'deep learning',
      '机器学习', 'machine learning',
      '神经网络', 'neural network',
      'OpenAI', 'Google', 'Tesla', 'Boston Dynamics',
      '宇树', 'Unitree', '智元', '达闼'
    ];
    
    const foundTags: string[] = [];
    const lowerText = text.toLowerCase();
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase()) && foundTags.length < 5) {
        foundTags.push(keyword);
      }
    });
    
    return foundTags.length > 0 ? foundTags : ['科技新闻'];
  }

  // 生成唯一ID
  private generateId(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  // 去重
  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set<string>();
    return news.filter(item => {
      const key = item.title.toLowerCase().replace(/\s+/g, '');
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // 检查缓存是否有效
  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  // 获取备用新闻（当所有源都失败时）
  private getFallbackNews(): NewsItem[] {
    return [
      {
        id: 'fallback-1',
        title: '新闻服务暂时不可用',
        summary: '正在尝试重新连接新闻源，请稍后刷新页面。',
        source: '系统提示',
        sourceType: 'domestic',
        publishTime: new Date().toISOString(),
        url: '#',
        category: 'ai',
        isTranslated: false,
        tags: ['系统消息']
      }
    ];
  }

  // 清除缓存
  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

// 导出单例实例
export const newsService = new NewsService();