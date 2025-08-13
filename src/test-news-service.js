// 由于Node.js无法直接运行TypeScript模块，我们需要在浏览器中测试
// 请在浏览器控制台中运行以下代码：

console.log(`
请在浏览器控制台中运行以下代码来测试newsService：

// 1. 导入newsService
import { newsService } from './services/newsService';

// 2. 测试函数
async function testNewsService() {
  console.log('=== 开始测试 NewsService ===');
  
  try {
    console.log('\\n1. 检查newsService初始化:');
    console.log('newsService:', newsService);
    console.log('newsService.getAllNews:', typeof newsService.getAllNews);
    
    console.log('\\n2. 清除缓存:');
    newsService.clearCache();
    console.log('缓存已清除');
    
    console.log('\\n3. 获取新闻数据:');
    const news = await newsService.getAllNews();
    console.log('获取到的新闻数量:', news.length);
    
    if (news.length > 0) {
      console.log('第一条新闻:', news[0]);
      console.log('新闻标题:', news[0].title);
      console.log('新闻来源:', news[0].source);
      console.log('新闻分类:', news[0].category);
    } else {
      console.log('⚠️ 没有获取到任何新闻数据');
    }
    
    console.log('\\n=== 测试完成 ===');
    
  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error);
    console.error('错误堆栈:', error.stack);
  }
}

// 3. 运行测试
testNewsService();

`);

console.log('请访问 http://localhost:5173/news 并打开浏览器开发者工具的控制台标签页');
console.log('然后复制上面的代码到控制台中运行');