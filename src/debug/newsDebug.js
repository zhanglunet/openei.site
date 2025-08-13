// 新闻服务调试脚本
import { newsService } from '../services/newsService.js';

console.log('=== 新闻服务调试开始 ===');

// 1. 检查newsService是否正确导出
console.log('1. 检查newsService导出:', newsService);
console.log('newsService类型:', typeof newsService);
console.log('newsService方法:', Object.getOwnPropertyNames(Object.getPrototypeOf(newsService)));

// 2. 测试getAllNews方法
async function testGetAllNews() {
  try {
    console.log('\n2. 测试getAllNews方法...');
    const startTime = Date.now();
    
    const news = await newsService.getAllNews();
    const endTime = Date.now();
    
    console.log(`✓ getAllNews执行成功，耗时: ${endTime - startTime}ms`);
    console.log(`✓ 获取到新闻数量: ${news.length}`);
    
    if (news.length > 0) {
      console.log('✓ 第一条新闻示例:');
      console.log('  - 标题:', news[0].title);
      console.log('  - 来源:', news[0].source);
      console.log('  - 分类:', news[0].category);
      console.log('  - 发布时间:', news[0].publishTime);
      console.log('  - 是否翻译:', news[0].isTranslated);
    } else {
      console.warn('✗ 未获取到任何新闻数据');
    }
    
    return news;
  } catch (error) {
    console.error('✗ getAllNews执行失败:', error);
    console.error('错误堆栈:', error.stack);
    return [];
  }
}

// 3. 测试缓存清除
function testClearCache() {
  try {
    console.log('\n3. 测试缓存清除...');
    newsService.clearCache();
    console.log('✓ 缓存清除成功');
  } catch (error) {
    console.error('✗ 缓存清除失败:', error);
  }
}

// 4. 测试多次调用
async function testMultipleCalls() {
  console.log('\n4. 测试多次调用...');
  
  const call1 = await testGetAllNews();
  console.log('第一次调用结果数量:', call1.length);
  
  testClearCache();
  
  const call2 = await testGetAllNews();
  console.log('第二次调用结果数量:', call2.length);
}

// 执行所有测试
testMultipleCalls().then(() => {
  console.log('\n=== 新闻服务调试完成 ===');
}).catch(error => {
  console.error('调试过程中发生错误:', error);
});