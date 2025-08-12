import React from 'react';
import { Target, Users, Rocket, Globe } from 'lucide-react';

const PlatformVision: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            平台愿景
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Platform Vision
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Vision Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                我们的使命
              </h3>
            </div>
            
            <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
              <p className="text-center">
                在科技浪潮的澎湃浪潮中，<span className="text-blue-400 font-semibold">OpenEI具身智能开源社区</span>应运而生，
                怀揣着远大的理想与坚定的信念，我们希望通过OpenEI社区的不懈努力，
                <span className="text-cyan-400 font-semibold">让具身智能的创业之路不再荆棘丛生</span>。
              </p>
              
              <p className="text-center">
                我们期望，每一位怀揣创业梦想的创新者，都能在OpenEI社区找到
                <span className="text-purple-400 font-semibold">志同道合的伙伴</span>，
                获取<span className="text-green-400 font-semibold">丰富的技术资源与经验分享</span>，
                共同攻克硬件智能与工业设计的难题。
              </p>
            </div>
          </div>

          {/* Vision Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">连接创新者</h4>
              <p className="text-gray-400">
                汇聚技术开发者、创业者和产业伙伴，构建强大的创新网络
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">降低创业门槛</h4>
              <p className="text-gray-400">
                提供完整的技术栈和工具链，让创业变得更加简单高效
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">推动产业化</h4>
              <p className="text-gray-400">
                促进具身智能技术的产业化应用，服务千行百业
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                加入我们，共创未来
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                无论您是技术专家、创业者还是投资人，OpenEI都为您提供了展示才华、实现梦想的舞台。
                让我们携手共进，在具身智能的广阔天地中书写属于我们的辉煌篇章。
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-200"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-400"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformVision;