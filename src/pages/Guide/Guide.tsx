import React from 'react';
import { Book, Code, Lightbulb, Users, ArrowRight, Download, Play, CheckCircle } from 'lucide-react';

interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  steps: number;
}

const GuideCard: React.FC<GuideCardProps> = ({ icon, title, description, level, duration, steps }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded-full border border-green-500/30">
              {level}
            </span>
            <span>{duration}</span>
            <span>{steps} 步骤</span>
          </div>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
        开始学习
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

interface TutorialStepProps {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
}

const TutorialStep: React.FC<TutorialStepProps> = ({ number, title, description, completed = false }) => {
  return (
    <div className="flex gap-4">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        completed 
          ? 'bg-green-600 text-white' 
          : 'bg-blue-600 text-white'
      }`}>
        {completed ? <CheckCircle className="w-4 h-4" /> : number}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const Guide: React.FC = () => {
  const guides: GuideCardProps[] = [
    {
      icon: <Book className="w-6 h-6 text-blue-400" />,
      title: '平台入门指南',
      description: '了解OpenEI平台的基本概念、核心功能和使用方法',
      level: '初级',
      duration: '30分钟',
      steps: 5
    },
    {
      icon: <Code className="w-6 h-6 text-green-400" />,
      title: '开发环境搭建',
      description: '配置开发环境，安装必要的工具和依赖',
      level: '初级',
      duration: '45分钟',
      steps: 8
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      title: '第一个具身智能应用',
      description: '从零开始创建您的第一个具身智能应用',
      level: '中级',
      duration: '2小时',
      steps: 12
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: '多智能体协作',
      description: '学习如何实现多个智能体之间的协作',
      level: '高级',
      duration: '3小时',
      steps: 15
    }
  ];

  const quickStartSteps = [
    {
      number: 1,
      title: '注册账户',
      description: '创建您的OpenEI开发者账户，获取API访问权限',
      completed: true
    },
    {
      number: 2,
      title: '安装SDK',
      description: '下载并安装OpenEI SDK，配置开发环境',
      completed: true
    },
    {
      number: 3,
      title: '创建项目',
      description: '使用模板创建您的第一个具身智能项目',
      completed: false
    },
    {
      number: 4,
      title: '部署应用',
      description: '将应用部署到OpenEI云平台进行测试',
      completed: false
    }
  ];

  const resources = [
    {
      title: 'API 文档',
      description: '完整的API参考文档和示例代码',
      icon: <Book className="w-6 h-6 text-blue-400" />,
      link: '#'
    },
    {
      title: 'SDK 下载',
      description: '支持多种编程语言的SDK包',
      icon: <Download className="w-6 h-6 text-green-400" />,
      link: '#'
    },
    {
      title: '视频教程',
      description: '详细的视频教程和实战案例',
      icon: <Play className="w-6 h-6 text-red-400" />,
      link: '#'
    },
    {
      title: '社区论坛',
      description: '与其他开发者交流经验和问题',
      icon: <Users className="w-6 h-6 text-purple-400" />,
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            开发指南
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Developer Guide
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            从入门到精通，全面掌握具身智能应用开发
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">快速开始</h2>
            <p className="text-gray-300 text-lg">4个简单步骤，快速上手OpenEI平台</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {quickStartSteps.map((step, index) => (
                <TutorialStep key={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">学习路径</h2>
            <p className="text-gray-300 text-lg">选择适合您的学习路径，系统掌握开发技能</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <GuideCard key={index} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">代码示例</h2>
            <p className="text-gray-300 text-lg">快速了解OpenEI API的使用方法</p>
          </div>
          
          <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">Python</span>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`import openei

# 初始化客户端
client = openei.Client(api_key="your_api_key")

# 创建智能体
agent = client.create_agent(
    name="warehouse_robot",
    type="embodied_ai",
    capabilities=["navigation", "object_detection"]
)

# 执行任务
result = agent.execute_task({
    "action": "pick_and_place",
    "target": "box_001",
    "destination": "shelf_A1"
})

print(f"任务状态: {result.status}")`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">开发资源</h2>
            <p className="text-gray-300 text-lg">丰富的开发资源，助力您的项目成功</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="p-3 bg-gray-700/50 rounded-lg w-fit mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  查看详情
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">常见问题</h2>
            <p className="text-gray-300 text-lg">开发过程中的常见问题解答</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">如何获取API密钥？</h3>
              <p className="text-gray-300">在开发者控制台中注册应用后，系统会自动生成API密钥。请妥善保管您的密钥，不要在客户端代码中暴露。</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">支持哪些编程语言？</h3>
              <p className="text-gray-300">目前支持Python、JavaScript、Java、C++等主流编程语言。我们正在不断扩展语言支持。</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">如何处理API限流？</h3>
              <p className="text-gray-300">建议实现指数退避重试机制，并根据响应头中的限流信息调整请求频率。企业用户可申请更高的API配额。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12">
            <Code className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">开始您的开发之旅</h2>
            <p className="text-gray-300 mb-8 text-lg">
              立即开始使用OpenEI平台，构建下一代具身智能应用
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                开始开发
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                查看示例
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;