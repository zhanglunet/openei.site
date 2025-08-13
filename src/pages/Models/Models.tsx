import React from 'react';
import { Search, Filter, Download, Star, Eye, Calendar } from 'lucide-react';

interface ModelCard {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: number;
  stars: number;
  lastUpdated: string;
  tags: string[];
  modelType: string;
}

const mockModels: ModelCard[] = [
  {
    id: '1',
    name: 'deepseek-ai/Janus-Pro-7B',
    description: 'Janus-Pro是一个多模态统一框架，旨在实现多模态的理解和生成。它通过解耦视觉编码，分别处理多模态理解和生成任务，并采用统一的Transformer架构，从而增强了框架的灵活性。',
    author: 'deepseek-ai',
    downloads: 1846,
    stars: 2800,
    lastUpdated: '2025-02-01',
    tags: ['多模态', '文生图', '统一框架'],
    modelType: '多模态模型'
  },
  {
    id: '2',
    name: 'Qwen/QwQ-32B',
    description: 'QwQ-32B是Qwen系列中的推理模型，专注于通过思维和推理能力提升下游任务的性能，尤其是在解决复杂问题方面。参数量达到325亿，支持长达131,072 tokens的上下文长度。',
    author: 'Qwen',
    downloads: 1750,
    stars: 3200,
    lastUpdated: '2025-04-11',
    tags: ['推理', '思维链', '长上下文'],
    modelType: '语言模型'
  },
  {
    id: '3',
    name: 'Qwen/Qwen-Image',
    description: 'Qwen系列的图像理解模型，具备强大的视觉理解和分析能力，支持多种图像处理任务。',
    author: 'Qwen',
    downloads: 671,
    stars: 1500,
    lastUpdated: '2025-08-05',
    tags: ['图像理解', '视觉', '多模态'],
    modelType: '视觉模型'
  },
  {
    id: '4',
    name: 'openai/gpt-oss-120b',
    description: 'gpt-oss系列模型是OpenAI发布的开源模型，专注于强大的推理、代理任务和多功能的开发者使用场景。支持可配置的推理强度，并提供完整的思维链。',
    author: 'OpenAI',
    downloads: 272,
    stars: 4500,
    lastUpdated: '2025-08-07',
    tags: ['开源', '推理', '代理任务'],
    modelType: '语言模型'
  },
  {
    id: '5',
    name: 'openai/gpt-oss-20b',
    description: 'gpt-oss-20b模型专为低延迟、本地化或特定用途设计，它具备强大的推理能力，适用于代理任务和多样化的开发者使用场景。',
    author: 'OpenAI',
    downloads: 222,
    stars: 3800,
    lastUpdated: '2025-08-06',
    tags: ['低延迟', '本地化', '推理'],
    modelType: '语言模型'
  },
  {
    id: '6',
    name: 'AIWizards/mplug-owl2-llama2-7b',
    description: 'mPLUG-Owl2专注于多模态对话任务，其技术架构基于Transformer，适用于多模态领域。该模型的核心功能是处理多模态信息，实现更自然、智能的对话交互。',
    author: 'AIWizards',
    downloads: 472,
    stars: 1200,
    lastUpdated: '2023-11-08',
    tags: ['多模态', '对话', 'Transformer'],
    modelType: '多模态模型'
  },
  {
    id: '7',
    name: 'BAAI/bge-m3',
    description: 'BGE-M3专注于多功能性、多语言性和多粒度的文本嵌入。它能够同时执行密集检索、多向量检索和稀疏检索三种常见的检索功能，支持超过100种语言。',
    author: 'BAAI',
    downloads: 401,
    stars: 2100,
    lastUpdated: '2025-07-02',
    tags: ['文本嵌入', '多语言', '检索'],
    modelType: '嵌入模型'
  },
  {
    id: '8',
    name: 'AIWizards/nb-whisper-medium-beta',
    description: 'NB-Whisper Medium (beta)模型专注于自动语音识别（ASR）和语音翻译，基于OpenAI的Whisper架构构建。支持挪威语、挪威博克马尔语、挪威尼诺斯克语和英语。',
    author: 'AIWizards',
    downloads: 340,
    stars: 890,
    lastUpdated: '2024-05-28',
    tags: ['语音识别', '翻译', 'Whisper'],
    modelType: '语言模型'
  },
  {
    id: '9',
    name: 'AIWizards/stable-diffusion-2-depth',
    description: 'Stable Diffusion v2 能够基于文本提示生成和修改图像，它是一种潜在扩散模型，使用固定的预训练文本编码器。增加了额外的输入通道来处理深度预测。',
    author: 'AIWizards',
    downloads: 338,
    stars: 1600,
    lastUpdated: '2024-05-28',
    tags: ['文生图', '扩散模型', '深度'],
    modelType: '视觉模型'
  },
  {
    id: '10',
    name: 'OpenCSG/opencsg-CodeLlama-7b-v0.1',
    description: 'opencsg-CodeLlama-v0.1是一系列基于CodeLlama的通过全参数微调方法进行调优的模型。在HumanEval python pass@1评测中达到43.9%的成绩。',
    author: 'OpenCSG',
    downloads: 1250,
    stars: 980,
    lastUpdated: '2024-01-15',
    tags: ['代码生成', '微调', 'CodeLlama'],
    modelType: '语言模型'
  }
];

const modelTypes = ['全部', '语言模型', '视觉模型', '多模态模型', '嵌入模型'];
const sortOptions = ['最新更新', '下载量', '收藏数', '名称'];

export default function Models() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('全部');
  const [sortBy, setSortBy] = React.useState('最新更新');

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '全部' || model.modelType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              模型库
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              发现、下载和分享最新的AI模型。我们提供丰富的开源模型资源，
              助力您的AI项目快速发展。
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-400">111,239+</span>
                <span>模型数量</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">1,000+</span>
                <span>贡献者</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-400">10M+</span>
                <span>下载量</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索模型名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            {/* Model Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                {modelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div key={model.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200 border border-gray-700 hover:border-gray-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">by {model.author}</p>
                  <span className="inline-block px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded-full">
                    {model.modelType}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Star className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{model.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {model.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{(model.downloads / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{model.stars}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{model.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>下载</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg transition-colors duration-200">
            加载更多模型
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">模型库特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">一键下载</h3>
              <p className="text-gray-400">简单快速的模型下载体验，支持多种格式</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">质量保证</h3>
              <p className="text-gray-400">经过社区验证的高质量模型资源</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">详细文档</h3>
              <p className="text-gray-400">完整的模型说明和使用指南</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}