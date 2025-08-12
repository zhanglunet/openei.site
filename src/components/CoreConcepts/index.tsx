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
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-blue-600 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            玩转OpenEI
          </h2>
          <p className="text-gray-400 text-lg">
            The OpenEI Way
          </p>
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

        {/* Bottom Description */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            通过这四大核心理念，我们致力于构建一个完整的具身智能生态系统
          </p>
        </div>
      </div>


    </section>
  );
};

export default CoreConcepts;