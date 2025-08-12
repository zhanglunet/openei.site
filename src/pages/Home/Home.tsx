import Hero from '../../components/Hero/Hero';
import { CoreConcept } from '../../types';

const coreConcepts: CoreConcept[] = [
  {
    id: '1',
    title: '深挖需求',
    description: '"被需要" 是直接的驱动力，来自需求的第一性原理。大多数行业的创新，是需要掌握新技术的人躬身入局，了解一线需求。',
    icon: '🔍'
  },
  {
    id: '2',
    title: '创意碰撞',
    description: '整合与创新，是在人类摸索新技术改进效率的成功模式，通过理解需求，技术人员可以更好的分解任务，实现跨界创新。',
    icon: '💡'
  },
  {
    id: '3',
    title: '仿真先行',
    description: '最低成本的在数字世界进行行业仿真和模拟，对模型进行优化，提炼数据集，最终实现技术落地。',
    icon: '🔬'
  },
  {
    id: '4',
    title: '智能具身',
    description: '将智能导入现实应用，社区可以托管基座技术，也可以通过MDaaS平台，服务千行百业，实现Agent 应用市场。',
    icon: '🤖'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero区域 */}
      <Hero />

      {/* 核心理念区域 */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">核心理念</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              OpenEI社区基于四大核心理念，构建具身智能技术生态
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreConcepts.map((concept) => (
              <div
                key={concept.id}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="text-4xl mb-4 text-center">{concept.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {concept.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 平台愿景区域 */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">平台愿景</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <p>
                在科技浪潮的澎湃浪潮中，OpenEI具身智能开源社区应运而生，怀揣着远大的理想与坚定的信念，
                我们希望通过OpenEI社区的不懈努力，让具身智能的创业之路不再荆棘丛生。
              </p>
              <p>
                我们期望，每一位怀揣创业梦想的创新者，都能在OpenEI社区找到志同道合的伙伴，
                获取丰富的技术资源与经验分享，共同攻克硬件智能与工业设计的难题。
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">技术创新</h3>
                <p className="text-gray-400">推动具身智能技术前沿发展</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">开放合作</h3>
                <p className="text-gray-400">构建开放共享的生态环境</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">产业赋能</h3>
                <p className="text-gray-400">服务千行百业数字化转型</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}