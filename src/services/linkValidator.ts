/**
 * 链接验证服务 - 提供鲁棒的链接原文验证机制
 * 包括URL有效性验证、可访问性测试、重定向处理和链接质量评分
 */

import axios from 'axios';

// 链接验证结果接口
export interface LinkValidationResult {
  isValid: boolean;
  finalUrl: string;
  statusCode?: number;
  qualityScore: number;
  redirectCount: number;
  responseTime: number;
  error?: string;
  isArticleLink: boolean;
  validationDetails: {
    formatValid: boolean;
    domainValid: boolean;
    accessible: boolean;
    redirectsHandled: boolean;
  };
}

// 链接质量评分标准
interface LinkQualityMetrics {
  hasArticleIndicators: boolean;
  hasDateInUrl: boolean;
  hasSlugStructure: boolean;
  pathDepth: number;
  hasQueryParams: boolean;
  isCategoryPage: boolean;
  isHomePage: boolean;
}

export class LinkValidator {
  private static instance: LinkValidator;
  private validationCache = new Map<string, { result: LinkValidationResult; timestamp: number }>();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30分钟缓存
  private readonly MAX_REDIRECTS = 5;
  private readonly TIMEOUT = 10000; // 10秒超时
  private readonly CORS_PROXY = 'https://api.allorigins.win/raw?url=';

  // 文章链接指示词
  private readonly ARTICLE_INDICATORS = [
    'article', 'post', 'story', 'news', 'blog', 'content', 'articles',
    '文章', '新闻', '资讯', '报道', '专题', 'openai', 'ai-', 'robotics', 'tech'
  ];

  // 分类页面指示词
  private readonly CATEGORY_INDICATORS = [
    'category', 'tag', 'archive', 'index', 'list', 'feed',
    '分类', '标签', '归档', '列表', '目录'
  ];

  // 有效域名模式 - 支持多级域名
  private readonly VALID_DOMAIN_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  public static getInstance(): LinkValidator {
    if (!LinkValidator.instance) {
      LinkValidator.instance = new LinkValidator();
    }
    return LinkValidator.instance;
  }

  /**
   * 验证链接的完整性和质量
   */
  public async validateLink(url: string): Promise<LinkValidationResult> {
    console.log(`[LinkValidator] 开始验证链接: ${url}`);
    
    // 检查缓存
    const cached = this.getFromCache(url);
    if (cached) {
      console.log(`[LinkValidator] 使用缓存结果: ${url}`);
      return cached;
    }

    const startTime = Date.now();
    const result: LinkValidationResult = {
      isValid: false,
      finalUrl: url,
      qualityScore: 0,
      redirectCount: 0,
      responseTime: 0,
      isArticleLink: false,
      validationDetails: {
        formatValid: false,
        domainValid: false,
        accessible: false,
        redirectsHandled: false
      }
    };

    try {
      // 1. URL格式验证
      result.validationDetails.formatValid = this.validateUrlFormat(url);
      if (!result.validationDetails.formatValid) {
        result.error = 'URL格式无效';
        this.cacheResult(url, result);
        return result;
      }

      // 2. 域名验证
      result.validationDetails.domainValid = this.validateDomain(url);
      if (!result.validationDetails.domainValid) {
        result.error = '域名无效';
        this.cacheResult(url, result);
        return result;
      }

      // 3. 可访问性测试和重定向处理
      const accessibilityResult = await this.testAccessibility(url);
      result.statusCode = accessibilityResult.statusCode;
      result.finalUrl = accessibilityResult.finalUrl;
      result.redirectCount = accessibilityResult.redirectCount;
      result.validationDetails.accessible = accessibilityResult.accessible;
      result.validationDetails.redirectsHandled = true;

      if (!result.validationDetails.accessible) {
        result.error = accessibilityResult.error || '链接不可访问';
        this.cacheResult(url, result);
        return result;
      }

      // 4. 链接质量评分
      const qualityMetrics = this.analyzeUrlQuality(result.finalUrl);
      result.qualityScore = this.calculateQualityScore(qualityMetrics);
      result.isArticleLink = qualityMetrics.hasArticleIndicators && !qualityMetrics.isCategoryPage;

      // 5. 最终验证结果
      result.isValid = result.validationDetails.formatValid && 
                      result.validationDetails.domainValid && 
                      result.validationDetails.accessible;

      result.responseTime = Date.now() - startTime;
      
      console.log(`[LinkValidator] 验证完成: ${url} -> 有效: ${result.isValid}, 质量分数: ${result.qualityScore}, 是文章链接: ${result.isArticleLink}`);
      
    } catch (error) {
      result.error = error instanceof Error ? error.message : '验证过程中发生未知错误';
      result.responseTime = Date.now() - startTime;
      console.error(`[LinkValidator] 验证失败: ${url}`, error);
    }

    this.cacheResult(url, result);
    return result;
  }

  /**
   * 批量验证链接
   */
  public async validateLinks(urls: string[]): Promise<Map<string, LinkValidationResult>> {
    console.log(`[LinkValidator] 开始批量验证 ${urls.length} 个链接`);
    
    const results = new Map<string, LinkValidationResult>();
    const validationPromises = urls.map(async (url) => {
      try {
        const result = await this.validateLink(url);
        results.set(url, result);
      } catch (error) {
        console.error(`[LinkValidator] 批量验证失败: ${url}`, error);
        results.set(url, {
          isValid: false,
          finalUrl: url,
          qualityScore: 0,
          redirectCount: 0,
          responseTime: 0,
          isArticleLink: false,
          error: error instanceof Error ? error.message : '验证失败',
          validationDetails: {
            formatValid: false,
            domainValid: false,
            accessible: false,
            redirectsHandled: false
          }
        });
      }
    });

    await Promise.allSettled(validationPromises);
    console.log(`[LinkValidator] 批量验证完成，成功验证 ${results.size} 个链接`);
    return results;
  }

  /**
   * 验证URL格式
   */
  private validateUrlFormat(url: string): boolean {
    if (!url || typeof url !== 'string') {
      return false;
    }

    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * 验证域名
   */
  private validateDomain(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      // 检查是否为IP地址
      if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        return true; // IP地址也是有效的
      }
      
      // 检查域名格式
      return this.VALID_DOMAIN_PATTERN.test(hostname);
    } catch {
      return false;
    }
  }

  /**
   * 测试链接可访问性和处理重定向
   */
  private async testAccessibility(url: string): Promise<{
    accessible: boolean;
    statusCode?: number;
    finalUrl: string;
    redirectCount: number;
    error?: string;
  }> {
    let currentUrl = url;
    let redirectCount = 0;
    
    try {
      // 使用HEAD请求测试可访问性（更快，消耗更少带宽）
      const response = await axios.head(this.CORS_PROXY + encodeURIComponent(currentUrl), {
        timeout: this.TIMEOUT,
        maxRedirects: this.MAX_REDIRECTS,
        validateStatus: (status) => status < 500, // 接受所有非服务器错误状态
        headers: {
          'User-Agent': 'OpenEI-LinkValidator/1.0'
        }
      });

      // 检查重定向
      if (response.request && response.request.responseURL) {
        const finalUrl = response.request.responseURL;
        if (finalUrl !== currentUrl) {
          // 计算重定向次数（简化计算）
          redirectCount = response.request._redirectable ? response.request._redirectable._redirectCount || 0 : 0;
          currentUrl = finalUrl;
        }
      }

      const isAccessible = response.status >= 200 && response.status < 400;
      
      return {
        accessible: isAccessible,
        statusCode: response.status,
        finalUrl: currentUrl,
        redirectCount,
        error: isAccessible ? undefined : `HTTP ${response.status}`
      };
      
    } catch (error) {
      // 如果HEAD请求失败，尝试GET请求
      try {
        const response = await axios.get(this.CORS_PROXY + encodeURIComponent(currentUrl), {
          timeout: this.TIMEOUT,
          maxRedirects: this.MAX_REDIRECTS,
          validateStatus: (status) => status < 500,
          headers: {
            'User-Agent': 'OpenEI-LinkValidator/1.0'
          }
        });

        const isAccessible = response.status >= 200 && response.status < 400;
        
        return {
          accessible: isAccessible,
          statusCode: response.status,
          finalUrl: response.request?.responseURL || currentUrl,
          redirectCount: 0, // 简化处理
          error: isAccessible ? undefined : `HTTP ${response.status}`
        };
        
      } catch (getError) {
        return {
          accessible: false,
          finalUrl: currentUrl,
          redirectCount: 0,
          error: getError instanceof Error ? getError.message : '网络请求失败'
        };
      }
    }
  }

  /**
   * 分析URL质量指标
   */
  private analyzeUrlQuality(url: string): LinkQualityMetrics {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.toLowerCase();
      const fullUrl = url.toLowerCase();
      
      // 检查文章指示词
      const hasArticleIndicators = this.ARTICLE_INDICATORS.some(indicator => 
        fullUrl.includes(indicator)
      );
      
      // 检查日期模式 (YYYY/MM/DD, YYYY-MM-DD等)
      const hasDateInUrl = /\/(19|20)\d{2}[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])/.test(pathname) ||
                           /\/(19|20)\d{2}[\/-](0[1-9]|1[0-2])/.test(pathname);
      
      // 检查URL结构（是否有意义的路径段）
      const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
      const hasSlugStructure = pathSegments.some(segment => 
        segment.length > 3 && /^[a-z0-9-]+$/.test(segment)
      );
      
      // 路径深度
      const pathDepth = pathSegments.length;
      
      // 查询参数
      const hasQueryParams = urlObj.search.length > 0;
      
      // 检查是否为分类页面 - 改进逻辑
      const isCategoryPage = this.CATEGORY_INDICATORS.some(indicator => 
        fullUrl.includes(indicator)
      ) || (pathDepth <= 1 && !hasDateInUrl && !hasSlugStructure);
      
      // 检查是否为首页
      const isHomePage = pathname === '/' || pathname === '';
      
      return {
        hasArticleIndicators,
        hasDateInUrl,
        hasSlugStructure,
        pathDepth,
        hasQueryParams,
        isCategoryPage,
        isHomePage
      };
      
    } catch {
      return {
        hasArticleIndicators: false,
        hasDateInUrl: false,
        hasSlugStructure: false,
        pathDepth: 0,
        hasQueryParams: false,
        isCategoryPage: true,
        isHomePage: false
      };
    }
  }

  /**
   * 计算链接质量分数 (0-100)
   */
  private calculateQualityScore(metrics: LinkQualityMetrics): number {
    let score = 0;
    
    // 基础分数
    score += 20;
    
    // 文章指示词 (+30分)
    if (metrics.hasArticleIndicators) {
      score += 30;
    }
    
    // 日期结构 (+20分)
    if (metrics.hasDateInUrl) {
      score += 20;
    }
    
    // URL结构 (+15分)
    if (metrics.hasSlugStructure) {
      score += 15;
    }
    
    // 路径深度评分
    if (metrics.pathDepth >= 2 && metrics.pathDepth <= 4) {
      score += 10; // 适中的路径深度
    } else if (metrics.pathDepth > 4) {
      score += 5; // 较深的路径
    }
    
    // 惩罚项
    if (metrics.isCategoryPage) {
      score -= 25; // 分类页面扣分
    }
    
    if (metrics.isHomePage) {
      score -= 30; // 首页扣分
    }
    
    // 查询参数可能表示动态内容
    if (metrics.hasQueryParams) {
      score -= 5;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * 生成备用链接
   */
  public generateFallbackUrl(originalUrl: string, source: { name: string; url: string }): string {
    console.log(`[LinkValidator] 为 ${source.name} 生成备用链接，原始URL: ${originalUrl}`);
    
    // 使用源的基础URL作为备用链接
    let baseUrl = source.url;
    if (baseUrl.includes('/feed') || baseUrl.includes('/rss')) {
      // 从RSS/Feed URL提取基础域名
      try {
        const urlObj = new URL(baseUrl);
        baseUrl = `${urlObj.protocol}//${urlObj.hostname}`;
      } catch {
        baseUrl = baseUrl.replace(/\/feed.*$/, '').replace(/\/rss.*$/, '');
      }
    }
    
    console.log(`[LinkValidator] 生成的备用链接: ${baseUrl}`);
    return baseUrl;
  }

  /**
   * 缓存管理
   */
  private getFromCache(url: string): LinkValidationResult | null {
    const cached = this.validationCache.get(url);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.result;
    }
    return null;
  }

  private cacheResult(url: string, result: LinkValidationResult): void {
    this.validationCache.set(url, {
      result,
      timestamp: Date.now()
    });
    
    // 清理过期缓存
    if (this.validationCache.size > 1000) {
      this.clearExpiredCache();
    }
  }

  private clearExpiredCache(): void {
    const now = Date.now();
    for (const [url, cached] of this.validationCache.entries()) {
      if (now - cached.timestamp >= this.CACHE_DURATION) {
        this.validationCache.delete(url);
      }
    }
  }

  /**
   * 清除所有缓存
   */
  public clearCache(): void {
    this.validationCache.clear();
    console.log('[LinkValidator] 缓存已清除');
  }

  /**
   * 获取验证统计信息
   */
  public getValidationStats(): {
    cacheSize: number;
    validLinks: number;
    invalidLinks: number;
    articleLinks: number;
  } {
    let validLinks = 0;
    let invalidLinks = 0;
    let articleLinks = 0;
    
    for (const cached of this.validationCache.values()) {
      if (cached.result.isValid) {
        validLinks++;
        if (cached.result.isArticleLink) {
          articleLinks++;
        }
      } else {
        invalidLinks++;
      }
    }
    
    return {
      cacheSize: this.validationCache.size,
      validLinks,
      invalidLinks,
      articleLinks
    };
  }
}

// 导出单例实例
export const linkValidator = LinkValidator.getInstance();