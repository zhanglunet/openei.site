export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold text-white">OpenEI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              OpenEI具身智能开源社区致力于为具身智能创业者提供技术资源、经验分享和合作机会，
              推动具身智能技术的产业化应用。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="/platform" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">公共平台</a></li>
              <li><a href="/projects" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">开源项目</a></li>
              <li><a href="/marketplace" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">应用市场</a></li>
              <li><a href="/guide" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">使用指南</a></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">邮箱：contact@openei.org</li>
              <li className="text-gray-400 text-sm">GitHub：github.com/openei</li>
              <li className="text-gray-400 text-sm">微信群：OpenEI社区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 OpenEI具身智能开源社区. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}