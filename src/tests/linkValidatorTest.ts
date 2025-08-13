/**
 * 链接验证器测试脚本
 * 用于验证链接验证机制的鲁棒性和准确性
 */

import { linkValidator } from '../services/linkValidator';

// 测试用例
interface TestCase {
  name: string;
  url: string;
  expectedValid: boolean;
  expectedArticleLink: boolean;
  minQualityScore?: number;
}

const testCases: TestCase[] = [
  // 有效的文章链接
  {
    name: '有效的TechCrunch文章链接',
    url: 'https://techcrunch.com/2024/12/15/openai-multimodal-ai-model-reasoning/',
    expectedValid: true,
    expectedArticleLink: true,
    minQualityScore: 70
  },
  {
    name: '有效的IEEE文章链接',
    url: 'https://spectrum.ieee.org/soft-robotics-human-like-movement',
    expectedValid: true,
    expectedArticleLink: true,
    minQualityScore: 70
  },
  {
    name: '有效的机器之心文章链接',
    url: 'https://www.jiqizhixin.com/articles/2024-12-15-tsinghua-embodied-ai-algorithm',
    expectedValid: true,
    expectedArticleLink: true,
    minQualityScore: 70
  },
  
  // 分类页面链接
  {
    name: 'TechCrunch分类页面',
    url: 'https://techcrunch.com/category/artificial-intelligence/',
    expectedValid: true,
    expectedArticleLink: false,
    minQualityScore: 30
  },
  {
    name: 'IEEE分类页面',
    url: 'https://spectrum.ieee.org/robotics',
    expectedValid: true,
    expectedArticleLink: false,
    minQualityScore: 30
  },
  
  // 首页链接
  {
    name: '网站首页',
    url: 'https://techcrunch.com/',
    expectedValid: true,
    expectedArticleLink: false,
    minQualityScore: 20
  },
  
  // 无效链接
  {
    name: '无效URL格式',
    url: 'not-a-valid-url',
    expectedValid: false,
    expectedArticleLink: false
  },
  {
    name: '空链接',
    url: '',
    expectedValid: false,
    expectedArticleLink: false
  },
  {
    name: '井号链接',
    url: '#',
    expectedValid: false,
    expectedArticleLink: false
  },
  {
    name: 'HTTP协议链接',
    url: 'http://example.com/article',
    expectedValid: true,
    expectedArticleLink: true,
    minQualityScore: 40
  }
];

// 运行测试
export async function runLinkValidatorTests(): Promise<void> {
  console.log('\n=== 链接验证器测试开始 ===\n');
  
  let passedTests = 0;
  let totalTests = testCases.length;
  const results: Array<{ name: string; passed: boolean; details: string }> = [];
  
  for (const testCase of testCases) {
    console.log(`测试: ${testCase.name}`);
    console.log(`URL: ${testCase.url}`);
    
    try {
      const result = await linkValidator.validateLink(testCase.url);
      
      let passed = true;
      const issues: string[] = [];
      
      // 检查有效性
      if (result.isValid !== testCase.expectedValid) {
        passed = false;
        issues.push(`有效性不匹配: 期望 ${testCase.expectedValid}, 实际 ${result.isValid}`);
      }
      
      // 检查是否为文章链接
      if (result.isArticleLink !== testCase.expectedArticleLink) {
        passed = false;
        issues.push(`文章链接判断不匹配: 期望 ${testCase.expectedArticleLink}, 实际 ${result.isArticleLink}`);
      }
      
      // 检查质量分数
      if (testCase.minQualityScore && result.qualityScore < testCase.minQualityScore) {
        passed = false;
        issues.push(`质量分数过低: 期望 >= ${testCase.minQualityScore}, 实际 ${result.qualityScore}`);
      }
      
      if (passed) {
        passedTests++;
        console.log(`✅ 通过`);
        console.log(`   - 有效性: ${result.isValid}`);
        console.log(`   - 文章链接: ${result.isArticleLink}`);
        console.log(`   - 质量分数: ${result.qualityScore}`);
        console.log(`   - 最终URL: ${result.finalUrl}`);
        if (result.error) {
          console.log(`   - 错误信息: ${result.error}`);
        }
      } else {
        console.log(`❌ 失败`);
        console.log(`   - 问题: ${issues.join(', ')}`);
        console.log(`   - 实际结果: 有效=${result.isValid}, 文章链接=${result.isArticleLink}, 分数=${result.qualityScore}`);
      }
      
      results.push({
        name: testCase.name,
        passed,
        details: passed ? '通过' : issues.join(', ')
      });
      
    } catch (error) {
      console.log(`❌ 异常: ${error instanceof Error ? error.message : error}`);
      results.push({
        name: testCase.name,
        passed: false,
        details: `测试异常: ${error instanceof Error ? error.message : error}`
      });
    }
    
    console.log('');
  }
  
  // 输出测试总结
  console.log('=== 测试总结 ===');
  console.log(`总测试数: ${totalTests}`);
  console.log(`通过测试: ${passedTests}`);
  console.log(`失败测试: ${totalTests - passedTests}`);
  console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  // 输出详细结果
  console.log('\n=== 详细结果 ===');
  results.forEach((result, index) => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}: ${result.details}`);
  });
  
  // 输出验证器统计信息
  const stats = linkValidator.getValidationStats();
  console.log('\n=== 验证器统计 ===');
  console.log(`缓存大小: ${stats.cacheSize}`);
  console.log(`有效链接: ${stats.validLinks}`);
  console.log(`无效链接: ${stats.invalidLinks}`);
  console.log(`文章链接: ${stats.articleLinks}`);
  
  console.log('\n=== 链接验证器测试完成 ===\n');
}

// 批量验证测试
export async function runBatchValidationTest(): Promise<void> {
  console.log('\n=== 批量验证测试开始 ===\n');
  
  const urls = [
    'https://techcrunch.com/2024/12/15/openai-multimodal-ai-model-reasoning/',
    'https://spectrum.ieee.org/soft-robotics-human-like-movement',
    'https://www.jiqizhixin.com/articles/2024-12-15-tsinghua-embodied-ai-algorithm',
    'https://techcrunch.com/category/artificial-intelligence/',
    'invalid-url',
    '#'
  ];
  
  const startTime = Date.now();
  const results = await linkValidator.validateLinks(urls);
  const endTime = Date.now();
  
  console.log(`批量验证完成，耗时: ${endTime - startTime}ms`);
  console.log(`验证链接数: ${results.size}`);
  
  results.forEach((result, url) => {
    console.log(`\n${url}:`);
    console.log(`  - 有效: ${result.isValid}`);
    console.log(`  - 文章链接: ${result.isArticleLink}`);
    console.log(`  - 质量分数: ${result.qualityScore}`);
    console.log(`  - 响应时间: ${result.responseTime}ms`);
    if (result.error) {
      console.log(`  - 错误: ${result.error}`);
    }
  });
  
  console.log('\n=== 批量验证测试完成 ===\n');
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  // Node.js环境
  runLinkValidatorTests().then(() => {
    return runBatchValidationTest();
  }).catch(console.error);
}