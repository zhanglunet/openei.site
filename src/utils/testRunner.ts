/**
 * 测试运行器 - 在浏览器环境中运行链接验证器测试
 */

import { runLinkValidatorTests, runBatchValidationTest } from '../tests/linkValidatorTest';

// 全局测试函数，可在浏览器控制台中调用
(window as any).runLinkValidatorTests = async () => {
  try {
    await runLinkValidatorTests();
  } catch (error) {
    console.error('测试运行失败:', error);
  }
};

(window as any).runBatchValidationTest = async () => {
  try {
    await runBatchValidationTest();
  } catch (error) {
    console.error('批量测试运行失败:', error);
  }
};

(window as any).runAllLinkTests = async () => {
  console.log('开始运行所有链接验证测试...');
  try {
    await runLinkValidatorTests();
    await runBatchValidationTest();
    console.log('所有测试完成！');
  } catch (error) {
    console.error('测试运行失败:', error);
  }
};

// 输出使用说明
console.log(`
=== 链接验证器测试工具 ===
可在控制台中使用以下命令:
- runLinkValidatorTests(): 运行基础验证测试
- runBatchValidationTest(): 运行批量验证测试
- runAllLinkTests(): 运行所有测试
`);

export {};