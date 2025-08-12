import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../../types';

const navItems: NavItem[] = [
  { label: '首页', path: '/' },
  { label: '公共平台', path: '/platform' },
  { label: '开源项目', path: '/projects' },
  { label: '应用市场', path: '/marketplace' },
  { label: '玩转OpenEI', path: '/guide' },
  { label: '生态伙伴', path: '/partners' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-white tracking-tight">OpenEI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-normal transition-colors duration-200 hover:text-white ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-300 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}