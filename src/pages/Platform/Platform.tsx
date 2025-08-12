import React from 'react';
import { Server, Database, Cloud, Shield, Zap, Users } from 'lucide-react';

const Platform: React.FC = () => {
  const features = [
    {
      icon: <Server className="w-8 h-8" />,
      title: '强大的计算平台',
      description: '提供高性能计算资源，支持大规模AI模型训练和推理',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: '数据管理服务',
      description: '完整的数据生命周期管理，从采集到处理再到存储',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: '云原生架构',
      description: '基于Kubernetes的云原生部署，弹性扩展，高可用性',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '安全可靠',
      description: '企业级安全保障，数据加密传输，权限精细控制',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '高性能优化',
      description: '针对具身智能场景优化，低延迟，高吞吐量',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '协作开发',
      description: '支持团队协作开发，版本控制，代码审查',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            公共平台
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Public Platform
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            为具身智能开发者提供完整的云端开发平台，从模型训练到应用部署，一站式解决方案
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full mb-6`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">平台架构</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              基于云原生技术栈构建的现代化AI开发平台
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">云端基础设施</h3>
                <p className="text-gray-400">弹性计算资源，自动扩缩容</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI开发工具链</h3>
                <p className="text-gray-400">完整的模型开发生命周期</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">数据服务</h3>
                <p className="text-gray-400">海量数据存储与处理</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">开始使用公共平台</h2>
            <p className="text-gray-300 mb-8 text-lg">
              立即注册，体验强大的具身智能开发平台
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                免费试用
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;