import axios from 'axios';
import { linkValidator, LinkValidationResult } from './linkValidator';

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
export interface NewsSource {
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
    name: 'Robotics Magazine',
    url: 'https://www.roboticstomorrow.com/rss.php',
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
    name: 'The Robot Report',
    url: 'https://therobotreport.com/feed',
    type: 'international',
    category: 'robotics',
    language: 'en'
  },
  {
    name: 'New Atlas Robotics',
    url: 'https://newatlas.com/robotics/index.rss',
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
  private translationCache: Map<string, string> = new Map();
  private failedTranslations: Set<string> = new Set();
  
  async translate(text: string, targetLang: string = 'zh'): Promise<string> {
    // 如果文本为空或过短，直接返回
    if (!text || text.trim().length < 3) {
      console.log('[Translation] Text too short, returning original:', text);
      return text;
    }
    
    // 检查缓存
    const cacheKey = `${text}_${targetLang}`;
    if (this.translationCache.has(cacheKey)) {
      console.log('[Translation] Using cached translation for:', text.substring(0, 50));
      return this.translationCache.get(cacheKey)!;
    }
    
    // 如果之前翻译失败过，直接返回原文
    if (this.failedTranslations.has(cacheKey)) {
      console.log('[Translation] Previously failed, returning original:', text.substring(0, 50));
      return text;
    }
    
    try {
      console.log('[Translation] Attempting to translate:', text.substring(0, 50));
      
      // 使用免费的翻译API服务，添加更短的超时时间
      const response = await Promise.race([
        axios.post('https://api.mymemory.translated.net/get', null, {
          params: {
            q: text.substring(0, 500), // 限制文本长度
            langpair: `en|${targetLang}`,
            de: 'openei@example.com'
          },
          timeout: 5000 // 减少超时时间到5秒
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Translation timeout')), 3000)
        )
      ]) as any;
      
      if (response.data && response.data.responseData && response.data.responseData.translatedText) {
        const translatedText = response.data.responseData.translatedText;
        console.log('[Translation] Success:', text.substring(0, 30), '->', translatedText.substring(0, 30));
        
        // 缓存成功的翻译
        this.translationCache.set(cacheKey, translatedText);
        return translatedText;
      } else {
        console.warn('[Translation] Invalid response format:', response.data);
        this.failedTranslations.add(cacheKey);
        return text;
      }
    } catch (error) {
      console.warn('[Translation] Failed for text:', text.substring(0, 50), 'Error:', error instanceof Error ? error.message : error);
      this.failedTranslations.add(cacheKey);
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
    console.log('[NewsService] Starting getAllNews...');
    console.log('[NewsService] Available sources:', NEWS_SOURCES.length);
    const cacheKey = 'all_news';
    
    // 检查缓存
    if (this.isCacheValid(cacheKey)) {
      const cachedNews = this.cache.get(cacheKey) || [];
      console.log(`[NewsService] Using cached news: ${cachedNews.length} items`);
      console.log('[NewsService] Cache expiry time:', new Date(this.cacheExpiry.get(cacheKey) || 0).toISOString());
      return cachedNews;
    }

    console.log(`[NewsService] Cache expired or empty, fetching from ${NEWS_SOURCES.length} sources...`);
    console.log('[NewsService] Sources to fetch:', NEWS_SOURCES.map(s => s.name));
    
    try {
      const allNews: NewsItem[] = [];
      const errors: string[] = [];
      const promises = NEWS_SOURCES.map(source => {
        console.log(`[NewsService] Creating promise for source: ${source.name}`);
        return this.fetchNewsFromSource(source);
      });
      
      console.log(`[NewsService] Waiting for ${promises.length} promises to resolve...`);
      const results = await Promise.allSettled(promises);
      
      results.forEach((result, index) => {
        const sourceName = NEWS_SOURCES[index].name;
        if (result.status === 'fulfilled') {
          const newsCount = result.value.length;
          console.log(`[NewsService] ✓ ${sourceName}: ${newsCount} news items`);
          if (result.value.length > 0) {
            console.log(`[NewsService] Sample item from ${sourceName}:`, result.value[0].title.substring(0, 50));
          }
          allNews.push(...result.value);
        } else {
          const errorMsg = `${sourceName}: ${result.reason}`;
          console.warn(`[NewsService] ✗ ${errorMsg}`);
          errors.push(errorMsg);
        }
      });

      console.log(`[NewsService] Total news items before processing: ${allNews.length}`);
      console.log('[NewsService] Errors encountered:', errors.length);
      if (errors.length > 0) {
        console.log('[NewsService] Error details:', errors);
      }
      
      // 如果没有获取到任何新闻，使用备用新闻
      if (allNews.length === 0) {
        console.warn('[NewsService] No news from any source, using fallback');
        const fallbackNews = this.getFallbackNews();
        console.log('[NewsService] Fallback news generated:', fallbackNews.length, 'items');
        // 缓存备用新闻
        this.cache.set(cacheKey, fallbackNews);
        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
        return fallbackNews;
      }
      
      // 按发布时间排序
      console.log('[NewsService] Sorting news by publish time...');
      allNews.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
      console.log('[NewsService] News sorted by publish time');
      console.log('[NewsService] Latest news date:', allNews[0]?.publishTime);
      console.log('[NewsService] Oldest news date:', allNews[allNews.length - 1]?.publishTime);
      
      // 限制数量并去重
      console.log('[NewsService] Removing duplicates and limiting to 50 items...');
      const uniqueNews = this.removeDuplicates(allNews).slice(0, 50);
      console.log(`[NewsService] After deduplication and limiting: ${uniqueNews.length} items`);
      
      // 确保至少有一些新闻
      if (uniqueNews.length === 0) {
        console.warn('[NewsService] No news after deduplication, using fallback');
        const fallbackNews = this.getFallbackNews();
        console.log('[NewsService] Fallback news generated after deduplication:', fallbackNews.length, 'items');
        // 缓存备用新闻
        this.cache.set(cacheKey, fallbackNews);
        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
        return fallbackNews;
      }
      
      // 缓存结果
      this.cache.set(cacheKey, uniqueNews);
      this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
      console.log(`[NewsService] Results cached for ${this.CACHE_DURATION / 1000 / 60} minutes`);
      console.log('[NewsService] Cache will expire at:', new Date(Date.now() + this.CACHE_DURATION).toISOString());
      
      console.log(`[NewsService] ✓ getAllNews completed successfully: ${uniqueNews.length} news items`);
      if (uniqueNews.length > 0) {
        console.log('[NewsService] Sample final item:', uniqueNews[0].title.substring(0, 50));
      }
      return uniqueNews;
    } catch (error) {
      console.error('[NewsService] ✗ Error in getAllNews:', error);
      console.error('[NewsService] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      const fallbackNews = this.getFallbackNews();
      console.log(`[NewsService] Returning fallback news: ${fallbackNews.length} items`);
      return fallbackNews;
    }
  }

  // 从单个新闻源获取新闻（优先使用RSS代理服务获取真实链接）
  private async fetchNewsFromSource(source: NewsSource): Promise<NewsItem[]> {
    console.log(`[NewsService] Fetching news from source: ${source.name}`);
    
    // 首先尝试从真实RSS源获取新闻（包含真实链接）
    try {
      console.log(`[NewsService] Attempting to fetch real RSS from: ${source.name}`);
      const realNews = await this.fetchRealNewsFromSource(source);
      
      if (realNews.length > 0) {
        console.log(`[NewsService] ✓ Successfully fetched ${realNews.length} real news items with authentic links from ${source.name}`);
        // 验证链接有效性
        const validNews = realNews.filter(item => {
          const isValidUrl = item.url && item.url !== '#' && item.url.startsWith('http');
          if (!isValidUrl) {
            console.warn(`[NewsService] Invalid URL detected: ${item.url}`);
          }
          return isValidUrl;
        });
        
        if (validNews.length > 0) {
          console.log(`[NewsService] ✓ ${validNews.length} news items have valid URLs`);
          return validNews;
        }
      }
      
      console.warn(`[NewsService] No valid real news from ${source.name}, using fallback with website links`);
    } catch (error) {
      console.warn(`[NewsService] RSS fetch failed for ${source.name}:`, error instanceof Error ? error.message : error);
    }
    
    // 如果真实RSS抓取失败，使用模拟数据（现在包含真实网站链接）
    try {
      const mockNews = await this.getMockNewsForSource(source);
      
      if (mockNews.length > 0) {
        console.log(`[NewsService] Using mock news with real website links for ${source.name}: ${mockNews.length} items`);
        return mockNews;
      }
    } catch (mockError) {
      console.error(`[NewsService] Mock data generation failed for ${source.name}:`, mockError);
    }
    
    // 最后的备用方案
    console.warn(`[NewsService] All methods failed for ${source.name}, creating basic fallback`);
    return this.createFallbackNewsForSource(source);
  }

  // 从真实RSS源获取新闻
  private async fetchRealNewsFromSource(source: NewsSource): Promise<NewsItem[]> {
    console.log(`[NewsService] Attempting to fetch real RSS from: ${source.url}`);
    
    try {
      // 使用免费的CORS代理服务
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`;
      
      console.log(`[NewsService] Using CORS proxy: ${proxyUrl}`);
      
      const response = await Promise.race([
        axios.get(proxyUrl, {
          timeout: 15000,
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'OpenEI-NewsBot/1.0'
          }
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('RSS fetch timeout')), 12000)
        )
      ]) as any;
      
      if (!response.data || !response.data.contents) {
        console.warn(`[NewsService] CORS proxy returned no content:`, response.data);
        throw new Error('No RSS content received from proxy');
      }
      
      // 解析RSS XML
      const rssContent = response.data.contents;
      console.log(`[NewsService] Received RSS content, length: ${rssContent.length}`);
      
      const items = this.parseRSSContent(rssContent);
      console.log(`[NewsService] Parsed ${items.length} items from RSS`);
      
      if (items.length === 0) {
        console.warn(`[NewsService] No items parsed from RSS feed from ${source.name}`);
        return [];
      }
      
      const news: NewsItem[] = [];
      const maxItems = Math.min(items.length, 5);
      
      for (let i = 0; i < maxItems; i++) {
        try {
          const item = items[i];
          
          if (!item.title || !item.link) {
            console.warn(`[NewsService] Skipping invalid RSS item:`, item);
            continue;
          }
          
          // 清理HTML标签
          const cleanTitle = this.stripHtml(item.title);
          const cleanDescription = this.stripHtml(item.description || '');
          
          if (!cleanTitle.trim()) {
            console.warn(`[NewsService] Skipping item with empty title`);
            continue;
          }
          
          // 验证链接质量
          let finalUrl = item.link;
          let linkValidation: LinkValidationResult | null = null;
          
          try {
            linkValidation = await linkValidator.validateLink(item.link);
            if (linkValidation.isValid && linkValidation.finalUrl) {
              finalUrl = linkValidation.finalUrl;
              console.log(`[NewsService] 链接验证成功: ${item.link} -> ${finalUrl} (质量分数: ${linkValidation.qualityScore})`);
            } else {
              console.warn(`[NewsService] 链接验证失败: ${item.link}, 错误: ${linkValidation.error}`);
              // 如果原始链接格式有效，保留原始链接，否则使用备用链接
              if (item.link && item.link.startsWith('http') && item.link !== '#') {
                finalUrl = item.link; // 保留原始链接，即使验证失败
                console.log(`[NewsService] 保留原始链接: ${finalUrl}`);
              } else {
                finalUrl = linkValidator.generateFallbackUrl(item.link, source);
                console.log(`[NewsService] 使用备用链接: ${finalUrl}`);
              }
            }
          } catch (validationError) {
            console.warn(`[NewsService] 链接验证异常: ${item.link}`, validationError);
            // 如果原始链接格式有效，保留原始链接
            if (item.link && item.link.startsWith('http') && item.link !== '#') {
              finalUrl = item.link;
              console.log(`[NewsService] 验证异常，保留原始链接: ${finalUrl}`);
            } else {
              finalUrl = linkValidator.generateFallbackUrl(item.link, source);
              console.log(`[NewsService] 验证异常，使用备用链接: ${finalUrl}`);
            }
          }
          
          // 创建新闻项
          const newsItem: NewsItem = {
            id: this.generateId(finalUrl + item.pubDate),
            title: cleanTitle,
            originalTitle: source.language === 'en' ? cleanTitle : undefined,
            summary: cleanDescription.substring(0, 300) || cleanTitle,
            originalSummary: source.language === 'en' ? cleanDescription.substring(0, 300) : undefined,
            source: source.name,
            sourceType: source.type,
            publishTime: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            url: finalUrl, // 使用验证后的链接
            category: source.category,
            isTranslated: false,
            tags: this.extractTags(cleanTitle + ' ' + cleanDescription)
          };
          
          // 添加链接质量信息到日志
          if (linkValidation) {
            console.log(`[NewsService] 新闻项链接质量 - 有效: ${linkValidation.isValid}, 文章链接: ${linkValidation.isArticleLink}, 分数: ${linkValidation.qualityScore}`);
          }
          
          // 如果是英文源，尝试翻译
          if (source.language === 'en') {
            try {
              const [translatedTitle, translatedSummary] = await Promise.allSettled([
                Promise.race([
                  this.translationService.translate(cleanTitle, 'zh'),
                  new Promise<string>((resolve) => setTimeout(() => resolve(cleanTitle), 3000))
                ]),
                Promise.race([
                  this.translationService.translate(newsItem.summary, 'zh'),
                  new Promise<string>((resolve) => setTimeout(() => resolve(newsItem.summary), 3000))
                ])
              ]);
              
              if (translatedTitle.status === 'fulfilled' && translatedTitle.value !== cleanTitle) {
                newsItem.title = translatedTitle.value;
                newsItem.isTranslated = true;
              }
              
              if (translatedSummary.status === 'fulfilled' && translatedSummary.value !== newsItem.summary) {
                newsItem.summary = translatedSummary.value;
                newsItem.isTranslated = true;
              }
              
              console.log(`[NewsService] Translation completed for: ${cleanTitle.substring(0, 30)}...`);
            } catch (translationError) {
              console.warn(`[NewsService] Translation failed, using original text:`, translationError);
            }
          }
          
          news.push(newsItem);
          console.log(`[NewsService] Successfully processed RSS item ${i + 1}/${maxItems}: ${newsItem.title.substring(0, 50)}...`);
        } catch (itemError) {
          console.error(`[NewsService] Failed to process RSS item ${i + 1}:`, itemError);
          continue;
        }
      }
      
      console.log(`[NewsService] Successfully processed ${news.length} real news items from ${source.name}`);
      return news;
      
    } catch (error) {
      console.error(`[NewsService] Failed to fetch real RSS from ${source.name}:`, error);
      throw error;
    }
  }
  
  // 解析RSS XML内容
  private parseRSSContent(xmlContent: string): any[] {
    try {
      // 使用正则表达式解析RSS（更可靠的方法）
      console.log('[NewsService] Using regex parsing for RSS content');
      
      const items: any[] = [];
      
      // 匹配RSS item标签
      const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
      let match;
      
      while ((match = itemRegex.exec(xmlContent)) !== null && items.length < 10) {
        const itemContent = match[1];
        
        // 提取标题
        const titleMatch = /<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title[^>]*>([\s\S]*?)<\/title>/i.exec(itemContent);
        const title = titleMatch ? this.stripHtml((titleMatch[1] || titleMatch[2] || '').trim()) : '';
        
        // 提取链接 - 改进链接提取逻辑
        const linkMatch = /<link[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/link>|<link[^>]*>([\s\S]*?)<\/link>/i.exec(itemContent);
        let link = linkMatch ? (linkMatch[1] || linkMatch[2] || '').trim() : '';
        
        // 验证链接是否有效
        if (link && !link.startsWith('http')) {
          console.warn(`[NewsService] Invalid link format: ${link}`);
          link = '';
        }
        
        // 提取描述
        const descMatch = /<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description[^>]*>([\s\S]*?)<\/description>/i.exec(itemContent);
        const description = descMatch ? this.stripHtml((descMatch[1] || descMatch[2] || '').trim()) : '';
        
        // 提取发布日期
        const dateMatch = /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i.exec(itemContent);
        const pubDate = dateMatch ? dateMatch[1].trim() : '';
        
        if (title && link) {
          console.log(`[NewsService] Found RSS item: ${title.substring(0, 50)}... -> ${link}`);
          items.push({
            title,
            link,
            description,
            pubDate
          });
        } else {
          console.warn(`[NewsService] Skipping invalid RSS item - Title: ${!!title}, Link: ${!!link}`);
        }
      }
      
      console.log(`[NewsService] Regex parsing found ${items.length} valid items`);
      return items;
      
    } catch (error) {
      console.error('[NewsService] Failed to parse RSS content:', error);
      return [];
    }
  }
  
  // 清理HTML标签
  private stripHtml(html: string): string {
    if (!html) return '';
    
    // 移除HTML标签
    const withoutTags = html.replace(/<[^>]*>/g, '');
    
    // 解码HTML实体
    const textarea = document.createElement('textarea');
    textarea.innerHTML = withoutTags;
    const decoded = textarea.value;
    
    // 清理多余的空白字符
    return decoded.replace(/\s+/g, ' ').trim();
  }

  // 获取模拟新闻数据（基于真实新闻源的格式）
  private async getMockNewsForSource(source: NewsSource): Promise<NewsItem[]> {
    console.log(`[NewsService] Generating mock news for source: ${source.name}`);
    
    const newsTemplates = {
      'TechCrunch AI': [
        {
          title: 'OpenAI unveils new multimodal AI model with enhanced reasoning capabilities',
          summary: 'The latest AI model demonstrates significant improvements in logical reasoning and multimodal understanding, potentially revolutionizing how AI systems interact with the physical world.',
          url: 'https://techcrunch.com/2024/12/15/openai-multimodal-ai-model-reasoning/'
        },
        {
          title: 'Robotics startup raises $50M to develop autonomous warehouse robots',
          summary: 'The funding will accelerate development of AI-powered robots designed to work alongside humans in warehouse and logistics environments.',
          url: 'https://techcrunch.com/2024/12/14/robotics-startup-50m-warehouse-robots/'
        }
      ],
      'IEEE Spectrum Robotics': [
        {
          title: 'New soft robotics breakthrough enables more human-like movement',
          summary: 'Researchers have developed novel actuators that allow robots to move with unprecedented fluidity and adaptability, mimicking biological muscle systems.',
          url: 'https://spectrum.ieee.org/soft-robotics-human-like-movement'
        },
        {
          title: 'Autonomous drones demonstrate swarm intelligence in complex environments',
          summary: 'A team of researchers has successfully tested drone swarms that can navigate and coordinate in challenging urban environments without human intervention.',
          url: 'https://spectrum.ieee.org/autonomous-drones-swarm-intelligence'
        }
      ],
      'MIT Technology Review AI': [
        {
          title: 'AI breakthrough in robotic manipulation using vision-language models',
          summary: 'Researchers demonstrate how large language models can be combined with computer vision to enable robots to understand and execute complex manipulation tasks.',
          url: 'https://www.technologyreview.com/2024/12/13/ai-robotic-manipulation-vision-language/'
        }
      ],
      'VentureBeat AI': [
        {
          title: 'Enterprise AI adoption accelerates with new embodied intelligence solutions',
          summary: 'Companies are increasingly investing in AI systems that can interact with the physical world, driving growth in the embodied AI market.',
          url: 'https://venturebeat.com/ai/enterprise-embodied-intelligence-adoption/'
        }
      ],
      'The Verge AI': [
        {
          title: 'Tesla Bot demonstrates improved dexterity in latest demo',
          summary: 'Tesla showcases significant improvements in their humanoid robot\'s ability to perform delicate tasks and navigate complex environments.',
          url: 'https://www.theverge.com/2024/12/12/tesla-bot-improved-dexterity-demo'
        }
      ],
      'Robotics Business Review': [
        {
          title: 'Industrial robotics market sees 15% growth driven by AI integration',
          summary: 'The integration of artificial intelligence into industrial robots is driving unprecedented growth in automation across manufacturing sectors.',
          url: 'https://www.roboticsbusinessreview.com/industrial-robotics-ai-integration-growth/'
        }
      ],
      'AI News': [
        {
          title: 'Breakthrough in robot learning enables faster skill acquisition',
          summary: 'New machine learning techniques allow robots to learn complex tasks with significantly fewer training examples than previous methods.',
          url: 'https://artificialintelligence-news.com/robot-learning-breakthrough-skill-acquisition/'
        }
      ],
      '机器之心': [
        {
          title: '清华大学发布新一代具身智能算法，机器人学习效率提升10倍',
          summary: '该算法通过创新的强化学习框架，使机器人能够在更短时间内掌握复杂的操作技能，为具身智能的产业化应用奠定了重要基础。',
          url: 'https://www.jiqizhixin.com/articles/2024-12-15-tsinghua-embodied-ai-algorithm'
        },
        {
          title: '百度发布文心一言机器人版本，支持多模态交互和物理操作',
          summary: '新版本集成了视觉、语音和触觉感知能力，能够理解和执行复杂的物理世界任务，标志着大模型在具身智能领域的重要进展。',
          url: 'https://www.jiqizhixin.com/articles/2024-12-14-baidu-wenxin-robot-version'
        }
      ],
      '量子位': [
        {
          title: '字节跳动推出具身智能大模型，支持机器人实时决策',
          summary: '该模型结合了大语言模型和视觉感知能力，能够帮助机器人在复杂环境中做出实时决策，标志着具身智能技术的重要突破。',
          url: 'https://www.qbitai.com/2024/12/13/bytedance-embodied-ai-model'
        }
      ],
      '雷锋网AI科技评论': [
        {
          title: '小米发布CyberOne人形机器人最新进展，成本控制取得突破',
          summary: '小米在人形机器人的成本控制和量产化方面取得重要进展，预计将推动人形机器人的普及应用。',
          url: 'https://www.leiphone.com/news/202412/xiaomi-cyberone-cost-breakthrough'
        }
      ]
    };

    const templates = newsTemplates[source.name as keyof typeof newsTemplates] || [
      {
        title: `${source.name} 最新AI技术突破`,
        summary: '该技术在人工智能和机器人领域取得了重要进展，为未来的应用奠定了基础。（注：这是示例数据，请访问官方网站获取最新资讯）',
        url: source.url === '#' ? '#' : source.url.replace('/feed', '').replace('/rss', '')
      }
    ];

    const news: NewsItem[] = [];
    const maxItems = Math.min(templates.length, 3);
    
    console.log(`[NewsService] Processing ${maxItems} news items for ${source.name}`);
    
    for (let i = 0; i < maxItems; i++) {
      try {
        const template = templates[i];
        console.log(`[NewsService] Processing item ${i + 1}/${maxItems}: ${template.title.substring(0, 50)}...`);
        
        // 创建基础新闻项，先使用原文
        const newsItem: NewsItem = {
          id: this.generateId(template.url + Date.now() + i),
          title: template.title,
          originalTitle: source.language === 'en' ? template.title : undefined,
          summary: template.summary,
          originalSummary: source.language === 'en' ? template.summary : undefined,
          source: source.name,
          sourceType: source.type,
          publishTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          url: template.url,
          category: source.category,
          isTranslated: false,
          tags: this.extractTags(template.title + ' ' + template.summary)
        };
        
        // 如果是英文源，尝试翻译，但不阻塞新闻生成
        if (source.language === 'en') {
          try {
            console.log(`[NewsService] Attempting translation for: ${template.title.substring(0, 30)}...`);
            
            // 并行翻译标题和摘要，设置较短超时
            const [translatedTitle, translatedSummary] = await Promise.allSettled([
              Promise.race([
                this.translationService.translate(template.title, 'zh'),
                new Promise<string>((resolve) => setTimeout(() => resolve(template.title), 2000))
              ]),
              Promise.race([
                this.translationService.translate(template.summary, 'zh'),
                new Promise<string>((resolve) => setTimeout(() => resolve(template.summary), 2000))
              ])
            ]);
            
            // 使用翻译结果（如果成功）或原文（如果失败）
            newsItem.title = translatedTitle.status === 'fulfilled' ? translatedTitle.value : template.title;
            newsItem.summary = translatedSummary.status === 'fulfilled' ? translatedSummary.value : template.summary;
            newsItem.isTranslated = translatedTitle.status === 'fulfilled' || translatedSummary.status === 'fulfilled';
            
            console.log(`[NewsService] Translation result - Title: ${newsItem.isTranslated ? 'success' : 'failed'}, Summary: ${newsItem.isTranslated ? 'success' : 'failed'}`);
          } catch (translationError) {
            console.warn(`[NewsService] Translation failed for item ${i + 1}, using original text:`, translationError);
            // 保持原文，不影响新闻生成
          }
        }
        
        news.push(newsItem);
        console.log(`[NewsService] Successfully created news item ${i + 1}/${maxItems}`);
      } catch (error) {
        console.error(`[NewsService] Failed to create news item ${i + 1}:`, error);
        // 即使单个新闻项失败，也继续处理其他项
      }
    }
    
    console.log(`[NewsService] Generated ${news.length} news items for ${source.name}`);
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

  // 为特定新闻源创建备用新闻
  private createFallbackNewsForSource(source: NewsSource): NewsItem[] {
    console.log(`[NewsService] Creating fallback news for ${source.name}`);
    
    const fallbackTitles = {
      'international': [
        '[示例] Latest AI and Robotics Developments',
        '[示例] Breakthrough in Embodied Intelligence Research',
        '[示例] New Advances in Autonomous Systems'
      ],
      'domestic': [
        '[示例] 人工智能与机器人技术最新进展',
        '[示例] 具身智能研究取得新突破',
        '[示例] 自主系统技术获得新进展'
      ]
    };
    
    const fallbackSummaries = {
      'international': [
        '[示例内容] Recent developments in artificial intelligence and robotics continue to push the boundaries of what\'s possible in embodied intelligence. (Note: This is sample content, please visit the official website for latest news)',
        '[示例内容] Researchers are making significant strides in creating AI systems that can better understand and interact with the physical world. (Note: This is sample content, please visit the official website for latest news)',
        '[示例内容] New breakthroughs in autonomous systems are paving the way for more sophisticated robotic applications. (Note: This is sample content, please visit the official website for latest news)'
      ],
      'domestic': [
        '[示例内容] 人工智能和机器人技术的最新发展继续推动具身智能领域的边界。（注：这是示例内容，请访问官方网站获取最新资讯）',
        '[示例内容] 研究人员在创建能够更好地理解和与物理世界交互的AI系统方面取得了重大进展。（注：这是示例内容，请访问官方网站获取最新资讯）',
        '[示例内容] 自主系统的新突破为更复杂的机器人应用铺平了道路。（注：这是示例内容，请访问官方网站获取最新资讯）'
      ]
    };
    
    const titles = fallbackTitles[source.type];
    const summaries = fallbackSummaries[source.type];
    const randomIndex = Math.floor(Math.random() * titles.length);
    
    // 为备用新闻提供真实的网站链接
    const fallbackUrl = this.getFallbackUrlForSource(source);
    
    return [{
      id: this.generateId(`fallback-${source.name}-${Date.now()}`),
      title: titles[randomIndex],
      summary: summaries[randomIndex],
      source: source.name,
      sourceType: source.type,
      publishTime: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString(), // 最近2小时内
      url: fallbackUrl,
      category: source.category,
      isTranslated: false,
      tags: ['技术新闻', source.category, '示例数据']
    }];
  }
  
  // 为备用新闻获取真实的网站链接
  private getFallbackUrlForSource(source: NewsSource): string {
    // 如果source.url不是RSS链接，直接使用
    if (source.url && source.url !== '#' && !source.url.includes('/feed') && !source.url.includes('/rss')) {
      return source.url;
    }
    
    // 从RSS链接转换为网站首页链接
    if (source.url && source.url !== '#') {
      return source.url.replace('/feed/', '/').replace('/feed', '').replace('/rss', '').replace('.xml', '');
    }
    
    // 根据新闻源名称提供默认链接
    const sourceUrls: { [key: string]: string } = {
      'TechCrunch AI': 'https://techcrunch.com/category/artificial-intelligence/',
      'IEEE Spectrum Robotics': 'https://spectrum.ieee.org/robotics',
      'MIT Technology Review AI': 'https://www.technologyreview.com/topic/artificial-intelligence/',
      'VentureBeat AI': 'https://venturebeat.com/ai/',
      'The Verge AI': 'https://www.theverge.com/ai-artificial-intelligence',
      'Robotics Business Review': 'https://www.roboticsbusinessreview.com/',
      'AI News': 'https://artificialintelligence-news.com/',
      '机器之心': 'https://www.jiqizhixin.com/',
      '量子位': 'https://www.qbitai.com/',
      '雷锋网AI科技评论': 'https://www.leiphone.com/category/ai'
    };
    
    return sourceUrls[source.name] || 'https://example.com';
  }
  
  // 获取备用新闻（当所有源都失败时）
  private getFallbackNews(): NewsItem[] {
    console.log('[NewsService] Creating comprehensive fallback news');
    
    const fallbackNews: NewsItem[] = [];
    
    // 为每个新闻源类型创建至少一条新闻
    const sampleSources: NewsSource[] = [
      { name: 'AI技术资讯', type: 'domestic', category: 'ai', language: 'zh', url: 'https://www.jiqizhixin.com/' },
      { name: 'Robotics News', type: 'international', category: 'robotics', language: 'en', url: 'https://spectrum.ieee.org/robotics' },
      { name: '具身智能前沿', type: 'domestic', category: 'embodied-ai', language: 'zh', url: 'https://www.qbitai.com/' },
      { name: 'Automation Today', type: 'international', category: 'automation', language: 'en', url: 'https://www.roboticsbusinessreview.com/' }
    ];
    
    sampleSources.forEach(source => {
      fallbackNews.push(...this.createFallbackNewsForSource(source));
    });
    
    // 添加系统状态消息
    fallbackNews.push({
      id: 'system-status',
      title: '[系统状态] 新闻服务状态提示',
      summary: '[示例内容] 新闻服务正在运行中。如果您看到此消息，说明系统正在尝试获取最新的新闻内容。请稍后刷新页面查看更多新闻。点击此处访问OpenEI官网了解更多信息。',
      source: '系统提示',
      sourceType: 'domestic',
      publishTime: new Date().toISOString(),
      url: 'https://openei.site',
      category: 'ai',
      isTranslated: false,
      tags: ['系统消息', '状态更新', '示例数据']
    });
    
    console.log(`[NewsService] Created ${fallbackNews.length} fallback news items`);
    return fallbackNews;
  }

  // 清除缓存
  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

// 导出单例实例
export const newsService = new NewsService();