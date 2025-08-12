import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 主标题 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            OpenEI
          </h1>
          
          {/* 副标题 */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-200">
            具身智能开源社区
          </h2>
          
          {/* 描述文字 */}
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            汇聚创新者和生态伙伴的综合性平台，为具身智能创业者提供技术资源、经验分享和合作机会，
            推动具身智能技术的产业化应用。
          </p>

          {/* CTA按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/platform"
              className="px-8 py-4 bg-primary hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
            >
              探索平台
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              开源项目
            </Link>
            <Link
              to="/partners"
              className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              生态伙伴
            </Link>
          </div>

          {/* 滚动提示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}