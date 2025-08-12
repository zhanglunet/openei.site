import React from 'react';
import { Users, Award, Globe, Handshake, ArrowRight, Star, Building, Target } from 'lucide-react';

interface PartnerCardProps {
  name: string;
  logo: string;
  description: string;
  category: string;
  partnership: string;
  website?: string;
  featured?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  logo,
  description,
  category,
  partnership,
  website,
  featured = false
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
      featured ? 'ring-2 ring-blue-500/50' : ''
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-20 mb-4 bg-white/10 rounded-lg">
        <div className="text-3xl font-bold text-white">{name.charAt(0)}</div>
      </div>
      
      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="flex justify-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
            {category}
          </span>
          <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-full border border-green-500/30">
            {partnership}
          </span>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        
        {website && (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            访问官网
          </button>
        )}
      </div>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300">
      <div className="p-3 bg-blue-600/20 rounded-lg w-fit mx-auto mb-4 border border-blue-500/30">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

const Partners: React.FC = () => {
  const partners: PartnerCardProps[] = [
    {
      name: '华为技术',
      logo: '',
      description: '全球领先的ICT基础设施和智能终端提供商，在AI芯片和云计算领域深度合作',
      category: '技术合作',
      partnership: '战略伙伴',
      website: '#',
      featured: true
    },
    {
      name: '腾讯云',
      logo: '',
      description: '提供云计算、大数据、人工智能等技术服务，共同构建智能云生态',
      category: '云服务',
      partnership: '技术伙伴',
      website: '#'
    },
    {
      name: '阿里巴巴',
      logo: '',
      description: '在电商、物流、金融等场景下的具身智能应用合作',
      category: '应用合作',
      partnership: '业务伙伴',
      website: '#',
      featured: true
    },
    {
      name: '百度Apollo',
      logo: '',
      description: '自动驾驶领域的深度合作，推进智能交通解决方案',
      category: '自动驾驶',
      partnership: '技术伙伴',
      website: '#'
    },
    {
      name: '字节跳动',
      logo: '',
      description: '在内容理解和推荐系统方面的AI技术合作',
      category: 'AI算法',
      partnership: '研发伙伴',
      website: '#'
    },
    {
      name: '美团',
      logo: '',
      description: '本地生活服务场景下的智能配送和服务机器人应用',
      category: '服务机器人',
      partnership: '应用伙伴',
      website: '#'
    },
    {
      name: '京东物流',
      logo: '',
      description: '智能仓储和配送机器人的研发与应用合作',
      category: '物流科技',
      partnership: '战略伙伴',
      website: '#',
      featured: true
    },
    {
      name: '科大讯飞',
      logo: '',
      description: '语音识别和自然语言处理技术的深度整合',
      category: '语音AI',
      partnership: '技术伙伴',
      website: '#'
    },
    {
      name: '商汤科技',
      logo: '',
      description: '计算机视觉和深度学习算法的联合研发',
      category: '计算机视觉',
      partnership: '研发伙伴',
      website: '#'
    }
  ];

  const benefits: BenefitCardProps[] = [
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: '技术共享',
      description: '获得最新的AI技术和算法支持，加速产品创新'
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: '生态协作',
      description: '加入开放生态系统，与行业伙伴深度协作'
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: '市场拓展',
      description: '借助平台影响力，快速拓展目标市场'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      title: '品牌提升',
      description: '提升品牌知名度和行业影响力'
    }
  ];

  const partnershipTypes = [
    {
      title: '技术合作伙伴',
      description: '共同研发核心技术，推动行业标准制定',
      icon: <Building className="w-12 h-12 text-blue-400" />,
      features: ['技术共研', 'IP共享', '标准制定', '人才交流']
    },
    {
      title: '生态合作伙伴',
      description: '构建完整产业生态，实现优势互补',
      icon: <Globe className="w-12 h-12 text-green-400" />,
      features: ['产品集成', '渠道共享', '市场推广', '客户服务']
    },
    {
      title: '应用合作伙伴',
      description: '在具体应用场景中深度合作',
      icon: <Target className="w-12 h-12 text-purple-400" />,
      features: ['场景定制', '解决方案', '项目实施', '运营支持']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            合作伙伴
            <span className="block text-2xl md:text-3xl text-blue-400 font-normal mt-2">
              Partners
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            携手行业领军企业，共建具身智能生态系统
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">100+</div>
                <div className="text-gray-400">合作伙伴</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-400">行业领域</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">200+</div>
                <div className="text-gray-400">联合项目</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">95%</div>
                <div className="text-gray-400">满意度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">合作模式</h2>
            <p className="text-gray-300 text-lg">多样化的合作模式，满足不同需求</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="p-4 bg-gray-700/50 rounded-lg w-fit mx-auto mb-6">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6">{type.description}</p>
                <div className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">战略伙伴</h2>
            <p className="text-gray-300 text-lg">与行业领军企业深度合作</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.filter(partner => partner.featured).map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
        </div>
      </section>

      {/* All Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">生态伙伴</h2>
            <p className="text-gray-300 text-lg">共同构建具身智能生态系统</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">合作优势</h2>
            <p className="text-gray-300 text-lg">成为合作伙伴，享受多重优势</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">成功案例</h2>
            <p className="text-gray-300 text-lg">合作伙伴的成功实践</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                  <Building className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">智能制造解决方案</h3>
                  <p className="text-gray-400 text-sm">与华为技术合作</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                通过OpenEI平台与华为云的深度集成，为制造企业提供端到端的智能制造解决方案，
                帮助客户实现生产效率提升30%，质量缺陷率降低50%。
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium">
                查看详情
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">智能物流系统</h3>
                  <p className="text-gray-400 text-sm">与京东物流合作</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                基于OpenEI的具身智能技术，京东物流部署了大规模智能仓储机器人系统，
                实现了24小时无人化作业，配送效率提升40%。
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium">
                查看详情
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12">
            <Handshake className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">成为我们的合作伙伴</h2>
            <p className="text-gray-300 mb-8 text-lg">
              加入OpenEI生态系统，共同推动具身智能技术的发展与应用
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                申请合作
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

export default Partners;