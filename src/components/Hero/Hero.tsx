import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-gray-900 py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* 主标题 */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            OpenEI
          </h1>
          
          {/* 副标题 */}
          <h2 className="text-xl md:text-2xl font-medium mb-8 text-gray-300">
            具身智能开源社区
          </h2>
          
          {/* 描述文字 */}
          <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            在科技浪潮的澎湃浪潮中，OpenEI具身智能开源社区应运而生，怀揣着远大的理想与坚定的信念，
            我们希望通过OpenEI社区的不懈努力，让具身智能的创业之路不再荆棘丛生。
          </p>

          {/* CTA按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/platform"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors duration-200"
            >
              公共平台
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors duration-200"
            >
              开源项目
            </Link>
            <Link
              to="/marketplace"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors duration-200"
            >
              应用市场
            </Link>
            <Link
              to="/guide"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors duration-200"
            >
              玩转OpenEI
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}