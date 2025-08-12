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
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            公共平台
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Public Platform
          </p>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            为具身智能开发者提供完整的云端开发平台，从模型训练到应用部署，一站式解决方案
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">平台架构</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              基于云原生技术栈构建的现代化AI开发平台
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">云端基础设施</h3>
                <p className="text-gray-400 text-sm">弹性计算资源，自动扩缩容</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI开发工具链</h3>
                <p className="text-gray-400 text-sm">完整的模型开发生命周期</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">数据服务</h3>
                <p className="text-gray-400 text-sm">海量数据存储与处理</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-3">开始使用公共平台</h2>
            <p className="text-gray-400 mb-6 text-base">
              立即注册，体验强大的具身智能开发平台
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors duration-200">
                免费试用
              </button>
              <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded font-medium transition-colors duration-200">
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