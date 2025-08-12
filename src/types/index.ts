// 合作伙伴类型定义
export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
}

// 项目类型定义
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
}

// 应用案例类型定义
export interface Application {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  features: string[];
}

// 导航菜单项类型定义
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

// 核心理念类型定义
export interface CoreConcept {
  id: string;
  title: string;
  description: string;
  icon: string;
}