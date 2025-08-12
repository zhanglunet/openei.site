import React from 'react';
import { Target, Users, Rocket, Globe } from 'lucide-react';

const PlatformVision: React.FC = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            平台愿景
          </h2>
          <p className="text-gray-400 text-lg">
            Platform Vision
          </p>
        </div>

        {/* Main Vision Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                我们的使命
              </h3>
            </div>
            
            <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-4">
              <p className="text-center">
                在科技浪潮的澎湃浪潮中，OpenEI具身智能开源社区应运而生，
                怀揣着远大的理想与坚定的信念，我们希望通过OpenEI社区的不懈努力，
                让具身智能的创业之路不再荆棘丛生。
              </p>
              
              <p className="text-center">
                我们期望，每一位怀揣创业梦想的创新者，都能在OpenEI社区找到
                志同道合的伙伴，
                获取丰富的技术资源与经验分享，
                共同攻克硬件智能与工业设计的难题。
              </p>
            </div>
          </div>

          {/* Vision Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">连接创新者</h4>
              <p className="text-gray-400 text-sm">
                汇聚技术开发者、创业者和产业伙伴，构建强大的创新网络
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mb-3">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">降低创业门槛</h4>
              <p className="text-gray-400 text-sm">
                提供完整的技术栈和工具链，让创业变得更加简单高效
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mb-3">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">推动产业化</h4>
              <p className="text-gray-400 text-sm">
                促进具身智能技术的产业化应用，服务千行百业
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                加入我们，共创未来
              </h3>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                无论您是技术专家、创业者还是投资人，OpenEI都为您提供了展示才华、实现梦想的舞台。
                让我们携手共进，在具身智能的广阔天地中书写属于我们的辉煌篇章。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformVision;