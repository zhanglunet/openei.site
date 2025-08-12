import React from 'react';
import { Github, Star, Download, Users, Calendar, Code } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  downloads: number;
  contributors: number;
  lastUpdate: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  language,
  stars,
  downloads,
  contributors,
  lastUpdate,
  tags
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <Github className="w-5 h-5 text-gray-400" />
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{downloads}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{contributors} contributors</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Updated {lastUpdate}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            查看详情
          </button>
          <button className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
            克隆
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects: ProjectCardProps[] = [
    {
      name: 'OpenEI-Core',
      description: '具身智能核心框架，提供基础的感知、决策和执行能力',
      language: 'Python',
      stars: 1250,
      downloads: 5600,
      contributors: 23,
      lastUpdate: '2 days ago',
      tags: ['AI', 'Robotics', 'Core']
    },
    {
      name: 'Vision-Toolkit',
      description: '计算机视觉工具包，支持目标检测、语义分割等多种视觉任务',
      language: 'Python',
      stars: 890,
      downloads: 3200,
      contributors: 15,
      lastUpdate: '1 week ago',
      tags: ['Computer Vision', 'Deep Learning']
    },
    {
      name: 'Motion-Planning',
      description: '运动规划算法库，支持多种机器人运动规划算法',
      language: 'C++',
      stars: 670,
      downloads: 2100,
      contributors: 12,
      lastUpdate: '3 days ago',
      tags: ['Motion Planning', 'Robotics']
    },
    {
      name: 'Simulation-Engine',
      description: '高性能仿真引擎，支持物理仿真和渲染',
      language: 'C++',
      stars: 1100,
      downloads: 4500,
      contributors: 18,
      lastUpdate: '5 days ago',
      tags: ['Simulation', 'Physics', 'Rendering']
    },
    {
      name: 'NLP-Assistant',
      description: '自然语言处理助手，支持多语言理解和生成',
      language: 'Python',
      stars: 750,
      downloads: 2800,
      contributors: 9,
      lastUpdate: '1 week ago',
      tags: ['NLP', 'Language Model']
    },
    {
      name: 'Hardware-Interface',
      description: '硬件接口库，支持多种传感器和执行器的统一接口',
      language: 'C++',
      stars: 420,
      downloads: 1600,
      contributors: 7,
      lastUpdate: '4 days ago',
      tags: ['Hardware', 'Interface', 'Sensors']
    }
  ];

  const categories = [
    { name: '全部', count: projects.length, active: true },
    { name: '核心框架', count: 2, active: false },
    { name: '视觉感知', count: 1, active: false },
    { name: '运动控制', count: 2, active: false },
    { name: '自然语言', count: 1, active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            开源项目
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Open Source Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            探索具身智能领域的优秀开源项目，加速您的开发进程
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">100+</div>
              <div className="text-gray-400">开源项目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">50K+</div>
              <div className="text-gray-400">代码提交</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-400">贡献者</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">1M+</div>
              <div className="text-gray-400">下载量</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  category.active
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12">
            <Code className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">贡献您的项目</h2>
            <p className="text-gray-300 mb-8 text-lg">
              加入OpenEI开源社区，分享您的创新成果
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                提交项目
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                贡献指南
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;