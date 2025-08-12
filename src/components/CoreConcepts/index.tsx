import React from 'react';
import { Search, Lightbulb, Cpu, Bot } from 'lucide-react';

interface ConceptCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 transform group-hover:rotate-12">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

const CoreConcepts: React.FC = () => {
  const concepts = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: '深挖需求',
      description: '"被需要" 是直接的驱动力，来自需求的第一性原理。大多数行业的创新，是需要掌握新技术的人躬身入局，了解一线需求。',
      delay: 0
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: '创意碰撞',
      description: '整合与创新，是在人类摸索新技术改进效率的成功模式，通过理解需求，技术人员可以更好的分解任务，实现跨界创新。',
      delay: 200
    },
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: '仿真先行',
      description: '最低成本的在数字世界进行行业仿真和模拟，对模型进行优化，提炼数据集，最终实现技术落地。',
      delay: 400
    },
    {
      icon: <Bot className="w-8 h-8 text-white" />,
      title: '智能具身',
      description: '将智能导入现实应用，社区可以托管基座技术，也可以通过MDaaS平台，服务千行百业，实现Agent 应用市场。',
      delay: 600
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            玩转OpenEI
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              The OpenEI Way
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {concepts.map((concept, index) => (
            <ConceptCard
              key={index}
              icon={concept.icon}
              title={concept.title}
              description={concept.description}
              delay={concept.delay}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-8">
            通过这四大核心理念，我们致力于构建一个完整的具身智能生态系统
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default CoreConcepts;