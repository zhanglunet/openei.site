import React from 'react';
import { Calendar, Clock, Users, ExternalLink, MessageCircle, Heart, Share2 } from 'lucide-react';

// 活动类型定义
interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'event' | 'article' | 'announcement';
  status: 'upcoming' | 'ongoing' | 'completed';
  participants?: number;
  likes?: number;
  comments?: number;
  link?: string;
  image?: string;
}

// 示例活动数据
const activities: Activity[] = [
  {
    id: '1',
    title: '具身智能技术前沿论坛',
    description: '邀请行业专家分享最新的具身智能技术发展趋势，探讨未来应用场景和技术挑战。',
    date: '2024-02-15',
    time: '14:00-17:00',
    type: 'event',
    status: 'upcoming',
    participants: 156,
    likes: 89,
    comments: 23,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20robotics%20conference%20modern%20tech%20presentation%20hall&image_size=landscape_4_3'
  },
  {
    id: '2',
    title: '开源项目贡献指南：如何参与OpenEI社区建设',
    description: '详细介绍如何为OpenEI开源项目做贡献，包括代码提交、文档编写、测试等各个方面。',
    date: '2024-02-10',
    time: '10:30',
    type: 'article',
    status: 'completed',
    likes: 234,
    comments: 45,
    link: '#',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=open%20source%20collaboration%20coding%20community%20developers&image_size=landscape_4_3'
  },
  {
    id: '3',
    title: '社区月度技术分享会',
    description: '每月定期举办的技术分享活动，社区成员分享项目经验、技术心得和创新想法。',
    date: '2024-02-20',
    time: '19:00-21:00',
    type: 'event',
    status: 'upcoming',
    participants: 89,
    likes: 67,
    comments: 12,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20meetup%20presentation%20developers%20sharing%20knowledge&image_size=landscape_4_3'
  },
  {
    id: '4',
    title: '具身智能在制造业中的应用案例分析',
    description: '深入分析具身智能技术在智能制造、工业自动化等领域的实际应用案例和成功经验。',
    date: '2024-02-08',
    time: '15:20',
    type: 'article',
    status: 'completed',
    likes: 178,
    comments: 31,
    link: '#',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20robotics%20manufacturing%20automation%20smart%20factory&image_size=landscape_4_3'
  },
  {
    id: '5',
    title: '新版本发布公告：OpenEI Platform v2.0',
    description: 'OpenEI平台重大版本更新，新增多项核心功能，提升开发体验和性能表现。',
    date: '2024-02-05',
    time: '09:00',
    type: 'announcement',
    status: 'completed',
    likes: 312,
    comments: 58,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=software%20platform%20update%20release%20announcement%20modern%20UI&image_size=landscape_4_3'
  },
  {
    id: '6',
    title: 'OpenEI黑客马拉松大赛',
    description: '48小时编程挑战，围绕具身智能主题，开发创新应用，赢取丰厚奖品。',
    date: '2024-03-01',
    time: '09:00-18:00',
    type: 'event',
    status: 'upcoming',
    participants: 245,
    likes: 156,
    comments: 67,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=hackathon%20coding%20competition%20developers%20programming%20challenge&image_size=landscape_4_3'
  }
];

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'upcoming':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'ongoing':
      return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'completed':
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

const getTypeIcon = (type: Activity['type']) => {
  switch (type) {
    case 'event':
      return <Calendar className="w-4 h-4" />;
    case 'article':
      return <MessageCircle className="w-4 h-4" />;
    case 'announcement':
      return <ExternalLink className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

const getStatusText = (status: Activity['status']) => {
  switch (status) {
    case 'upcoming':
      return '即将开始';
    case 'ongoing':
      return '进行中';
    case 'completed':
      return '已结束';
    default:
      return '未知';
  }
};

const getTypeText = (type: Activity['type']) => {
  switch (type) {
    case 'event':
      return '活动';
    case 'article':
      return '文章';
    case 'announcement':
      return '公告';
    default:
      return '其他';
  }
};

export default function Activities() {
  const upcomingActivities = activities.filter(activity => activity.status === 'upcoming');
  const recentActivities = activities.filter(activity => activity.status === 'completed').slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero区域 */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              社区活动
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              关注具身智能开源社区最新动态，参与技术分享，共建开源生态
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-blue-400">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">1,234+</span>
                  <span className="text-gray-300">社区成员</span>
                </div>
              </div>
              <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-green-400">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">{upcomingActivities.length}</span>
                  <span className="text-gray-300">即将举行</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 即将举行的活动 */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">即将举行</h2>
            <p className="text-gray-400 text-lg">不要错过这些精彩活动</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {getTypeIcon(activity.type)}
                      {getTypeText(activity.type)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {activity.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{activity.participants}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{activity.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{activity.comments}</span>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最新动态 */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">最新动态</h2>
            <p className="text-gray-400 text-lg">社区最新文章和公告</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {getTypeIcon(activity.type)}
                        {getTypeText(activity.type)}
                      </span>
                      <span className="text-gray-500 text-xs">{activity.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{activity.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{activity.comments}</span>
                        </div>
                      </div>
                      {activity.link && (
                        <a
                          href={activity.link}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              查看更多动态
            </button>
          </div>
        </div>
      </section>

      {/* 关注公众号 */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">关注我们的公众号</h2>
              <p className="text-gray-300 mb-8 text-lg">
                扫描二维码关注"具身智能开源社区"公众号，获取最新技术资讯和活动通知
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="bg-white p-4 rounded-lg">
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">二维码</span>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">具身智能开源社区</h3>
                  <p className="text-gray-400 mb-4">微信公众号ID: openei-community</p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>最新技术文章推送</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>活动预告和报名</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>社区动态更新</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}