import React from 'react';
import { ShoppingCart, Star, Download, Eye, Filter, Search } from 'lucide-react';

interface ApplicationCardProps {
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: number;
  price: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  name,
  description,
  category,
  rating,
  downloads,
  price,
  image,
  tags,
  featured = false
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
      featured ? 'ring-2 ring-blue-500/50' : ''
    }`}>
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-white/20">🤖</div>
        </div>
        {featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            推荐
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{downloads}</span>
            </div>
          </div>
          <div className="text-lg font-bold text-blue-400">{price}</div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            获取应用
          </button>
          <button className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Marketplace: React.FC = () => {
  const applications: ApplicationCardProps[] = [
    {
      name: '智能仓储机器人',
      description: '基于AI的智能仓储管理系统，支持自动分拣、路径规划和库存管理',
      category: '物流',
      rating: 4.8,
      downloads: 1200,
      price: '¥299/月',
      image: '',
      tags: ['仓储', '自动化', 'AI'],
      featured: true
    },
    {
      name: '医疗诊断助手',
      description: '结合计算机视觉和深度学习的医疗影像诊断辅助系统',
      category: '医疗',
      rating: 4.9,
      downloads: 850,
      price: '¥599/月',
      image: '',
      tags: ['医疗', '诊断', '深度学习']
    },
    {
      name: '智能制造监控',
      description: '工业4.0智能制造监控平台，实时监控生产线状态',
      category: '制造',
      rating: 4.7,
      downloads: 950,
      price: '¥399/月',
      image: '',
      tags: ['制造', '监控', '工业4.0']
    },
    {
      name: '自动驾驶仿真',
      description: '高精度自动驾驶仿真平台，支持多种场景测试',
      category: '交通',
      rating: 4.6,
      downloads: 720,
      price: '¥799/月',
      image: '',
      tags: ['自动驾驶', '仿真', '测试']
    },
    {
      name: '智能客服机器人',
      description: '基于大语言模型的智能客服系统，支持多轮对话',
      category: '服务',
      rating: 4.5,
      downloads: 1500,
      price: '¥199/月',
      image: '',
      tags: ['客服', 'NLP', '对话']
    },
    {
      name: '农业监测系统',
      description: '基于IoT和AI的智能农业监测解决方案',
      category: '农业',
      rating: 4.4,
      downloads: 680,
      price: '¥299/月',
      image: '',
      tags: ['农业', 'IoT', '监测']
    }
  ];

  const categories = [
    { name: '全部', count: applications.length, active: true },
    { name: '物流', count: 1, active: false },
    { name: '医疗', count: 1, active: false },
    { name: '制造', count: 1, active: false },
    { name: '交通', count: 1, active: false },
    { name: '服务', count: 1, active: false },
    { name: '农业', count: 1, active: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            应用市场
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Application Market
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            发现和部署具身智能应用，为各行各业提供智能化解决方案
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索应用..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Filter className="w-5 h-5" />
              筛选
            </button>
          </div>
          
          {/* Categories */}
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

      {/* Featured Apps */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">推荐应用</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.filter(app => app.featured).map((app, index) => (
              <ApplicationCard key={index} {...app} />
            ))}
          </div>
        </div>
      </section>

      {/* All Apps */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">所有应用</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <ApplicationCard key={index} {...app} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">市场统计</h2>
              <p className="text-gray-300">OpenEI应用市场的发展数据</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-gray-400">应用总数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-400">行业覆盖</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10K+</div>
                <div className="text-gray-400">月活用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">95%</div>
                <div className="text-gray-400">满意度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-12">
            <ShoppingCart className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">发布您的应用</h2>
            <p className="text-gray-300 mb-8 text-lg">
              将您的具身智能应用发布到市场，触达更多用户
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                发布应用
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                开发者指南
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;