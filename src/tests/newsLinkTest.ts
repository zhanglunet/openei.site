/**
 * 新闻链接测试脚本
 * 验证新闻服务中的链接是否正确可访问
 */

import { newsService } from '../services/newsService';
import { linkValidator } from '../services/linkValidator';

// 测试新闻服务中的链接
export async function testNewsLinks(): Promise<void> {
  console.log('\n=== 新闻链接测试开始 ===\n');
  
  try {
    // 获取新闻数据
    console.log('正在获取新闻数据...');
    const news = await newsService.getAllNews();
    console.log(`获取到 ${news.length} 条新闻`);
    
    if (news.length === 0) {
      console.log('❌ 没有获取到新闻数据');
      return;
    }
    
    // 测试前5条新闻的链接
    const testNews = news.slice(0, 5);
    console.log(`\n测试前 ${testNews.length} 条新闻的链接:\n`);
    
    let validLinks = 0;
    let articleLinks = 0;
    
    for (let i = 0; i < testNews.length; i++) {
      const newsItem = testNews[i];
      console.log(`${i + 1}. 测试新闻: ${newsItem.title.substring(0, 50)}...`);
      console.log(`   来源: ${newsItem.source}`);
      console.log(`   链接: ${newsItem.url}`);
      
      try {
        const validation = await linkValidator.validateLink(newsItem.url);
        
        console.log(`   验证结果:`);
        console.log(`     - 有效: ${validation.isValid ? '✅' : '❌'}`);
        console.log(`     - 文章链接: ${validation.isArticleLink ? '✅' : '❌'}`);
        console.log(`     - 质量分数: ${validation.qualityScore}`);
        console.log(`     - 最终URL: ${validation.finalUrl}`);
        
        if (validation.error) {
          console.log(`     - 错误: ${validation.error}`);
        }
        
        if (validation.isValid) {
          validLinks++;
        }
        
        if (validation.isArticleLink) {
          articleLinks++;
        }
        
      } catch (error) {
        console.log(`   验证异常: ${error instanceof Error ? error.message : error}`);
      }
      
      console.log('');
    }
    
    // 输出统计结果
    console.log('=== 测试统计 ===');
    console.log(`测试新闻数: ${testNews.length}`);
    console.log(`有效链接: ${validLinks}`);
    console.log(`文章链接: ${articleLinks}`);
    console.log(`有效率: ${((validLinks / testNews.length) * 100).toFixed(1)}%`);
    console.log(`文章链接率: ${((articleLinks / testNews.length) * 100).toFixed(1)}%`);
    
    // 检查是否有模拟数据
    const mockNews = testNews.filter(item => 
      item.title.includes('[示例]') || 
      item.url.includes('example.com') ||
      item.url === '#'
    );
    
    if (mockNews.length > 0) {
      console.log(`\n⚠️  发现 ${mockNews.length} 条模拟数据:`);
      mockNews.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.title.substring(0, 50)}... -> ${item.url}`);
      });
    }
    
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
  
  console.log('\n=== 新闻链接测试完成 ===\n');
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  testNewsLinks().catch(console.error);
}