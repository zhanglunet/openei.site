import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, Star, Download, Calendar, Tag, Cpu, Battery, Zap, Users, DollarSign } from 'lucide-react';

interface HardwareProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  height: string;
  weight: string;
  dof: number; // degrees of freedom
  walkingSpeed: string;
  batteryLife: string;
  computingPower: string;
  price: string;
  priceRange: string;
  applications: string[];
  tags: string[];
  releaseDate: string;
  downloads: number;
  stars: number;
  specifications: {
    joints: number;
    sensors: string[];
    connectivity: string[];
    operatingSystem: string;
    developmentKit: boolean;
  };
}

const hardwareProducts: HardwareProduct[] = [
  {
    id: '1',
    name: 'H1',
    brand: '宇树科技',
    description: '全尺寸通用人形机器人，具备强大的运动能力和AI算力，适用于工业制造和科研教育场景',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Unitree%20H1%20humanoid%20robot%20full%20body%20standing%20pose%20white%20and%20black%20design%20modern%20technology&image_size=portrait_4_3',
    height: '180cm',
    weight: '47kg',
    dof: 19,
    walkingSpeed: '1.5m/s',
    batteryLife: '1小时',
    computingPower: '275 TOPS',
    price: '¥900,000',
    priceRange: '高端',
    applications: ['工业制造', '科研教育', '展示演示'],
    tags: ['全尺寸', '高算力', '工业级'],
    releaseDate: '2023-08',
    downloads: 1200,
    stars: 4.8,
    specifications: {
      joints: 19,
      sensors: ['IMU', '力传感器', '编码器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '11',
    name: 'Cloud Ginger',
    brand: '达闼科技',
    description: '云端智能人形机器人，具备强大的云端AI能力和5G连接，适用于服务和教育场景',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CloudMinds%20Ginger%20humanoid%20robot%20cloud%20AI%205G%20connectivity%20service%20robot&image_size=portrait_4_3',
    height: '165cm',
    weight: '55kg',
    dof: 34,
    walkingSpeed: '1.2m/s',
    batteryLife: '3小时',
    computingPower: '150 TOPS',
    price: '¥800,000',
    priceRange: '高端',
    applications: ['智能服务', '教育培训', '商业展示'],
    tags: ['云端AI', '5G连接', '服务机器人'],
    releaseDate: '2023-12',
    downloads: 950,
    stars: 4.6,
    specifications: {
      joints: 34,
      sensors: ['IMU', '3D视觉', '语音识别', '触觉传感器'],
      connectivity: ['5G', 'WiFi', 'Bluetooth', 'Ethernet'],
      operatingSystem: 'HARIX OS',
      developmentKit: true
    }
  },
  {
    id: '12',
    name: 'XR-1',
    brand: '达闼科技',
    description: '新一代云端机器人，集成了最新的AI技术和机器人控制系统',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=CloudMinds%20XR1%20humanoid%20robot%20advanced%20AI%20technology%20modern%20design&image_size=portrait_4_3',
    height: '170cm',
    weight: '60kg',
    dof: 38,
    walkingSpeed: '1.4m/s',
    batteryLife: '2.5小时',
    computingPower: '200 TOPS',
    price: '¥1,200,000',
    priceRange: '高端',
    applications: ['智能制造', '医疗辅助', '科研开发'],
    tags: ['云端智能', '医疗级', '高精度'],
    releaseDate: '2024-02',
    downloads: 720,
    stars: 4.7,
    specifications: {
      joints: 38,
      sensors: ['激光雷达', '深度相机', 'IMU', '力传感器'],
      connectivity: ['5G', 'WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'HARIX OS 2.0',
      developmentKit: false
    }
  },
  {
    id: '13',
    name: 'GR-1',
    brand: '傅利叶智能',
    description: '通用人形机器人，具备优秀的运动控制和环境感知能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fourier%20GR1%20general%20purpose%20humanoid%20robot%20motion%20control%20sensing&image_size=portrait_4_3',
    height: '164cm',
    weight: '55kg',
    dof: 40,
    walkingSpeed: '5km/h',
    batteryLife: '2小时',
    computingPower: '100 TOPS',
    price: '¥1,500,000',
    priceRange: '高端',
    applications: ['工业协作', '服务机器人', '研发平台'],
    tags: ['通用型', '高速行走', '协作机器人'],
    releaseDate: '2023-07',
    downloads: 1100,
    stars: 4.5,
    specifications: {
      joints: 40,
      sensors: ['IMU', '力传感器', '视觉系统', '触觉反馈'],
      connectivity: ['WiFi', 'Ethernet', 'CAN', 'RS485'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '14',
    name: 'GR-2',
    brand: '傅利叶智能',
    description: '升级版通用人形机器人，增强了AI能力和作业精度',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fourier%20GR2%20upgraded%20humanoid%20robot%20enhanced%20AI%20precision%20work&image_size=portrait_4_3',
    height: '175cm',
    weight: '63kg',
    dof: 53,
    walkingSpeed: '1.8m/s',
    batteryLife: '3小时',
    computingPower: '180 TOPS',
    price: '¥2,000,000',
    priceRange: '高端',
    applications: ['精密制造', '医疗康复', '智能物流'],
    tags: ['升级版', '高精度', '医疗级'],
    releaseDate: '2024-09',
    downloads: 680,
    stars: 4.8,
    specifications: {
      joints: 53,
      sensors: ['多模态传感器', '3D视觉', 'IMU', '力传感器'],
      connectivity: ['5G', 'WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'Fourier OS',
      developmentKit: true
    }
  },
  {
    id: '15',
    name: 'Kuavo',
    brand: '乐聚机器人',
    description: '全尺寸人形机器人，专注于运动控制和动态平衡技术',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Leju%20Kuavo%20full%20size%20humanoid%20robot%20motion%20control%20dynamic%20balance&image_size=portrait_4_3',
    height: '175cm',
    weight: '50kg',
    dof: 42,
    walkingSpeed: '1.6m/s',
    batteryLife: '2小时',
    computingPower: '120 TOPS',
    price: '¥600,000',
    priceRange: '中高端',
    applications: ['教育科研', '娱乐表演', '技术验证'],
    tags: ['全尺寸', '动态平衡', '运动控制'],
    releaseDate: '2023-11',
    downloads: 1350,
    stars: 4.4,
    specifications: {
      joints: 42,
      sensors: ['IMU', '编码器', '力传感器', '视觉传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '16',
    name: 'Agibot X1',
    brand: '智元机器人',
    description: '轻量化人形机器人，专为灵活作业和人机协作设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Agibot%20X1%20lightweight%20humanoid%20robot%20flexible%20operation%20human%20robot%20collaboration&image_size=portrait_4_3',
    height: '160cm',
    weight: '38kg',
    dof: 30,
    walkingSpeed: '1.3m/s',
    batteryLife: '2.5小时',
    computingPower: '90 TOPS',
    price: '¥400,000',
    priceRange: '中端',
    applications: ['人机协作', '轻工业', '服务机器人'],
    tags: ['轻量化', '协作型', '灵活作业'],
    releaseDate: '2024-01',
    downloads: 1650,
    stars: 4.3,
    specifications: {
      joints: 30,
      sensors: ['IMU', '力传感器', '视觉系统'],
      connectivity: ['WiFi', 'Bluetooth', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '17',
    name: 'Atlas',
    brand: 'Boston Dynamics',
    description: '世界领先的动态人形机器人，具备卓越的运动能力和环境适应性',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Boston%20Dynamics%20Atlas%20humanoid%20robot%20dynamic%20movement%20parkour%20agility&image_size=portrait_4_3',
    height: '150cm',
    weight: '89kg',
    dof: 28,
    walkingSpeed: '2.5m/s',
    batteryLife: '1小时',
    computingPower: '50 TOPS',
    price: '$2,000,000',
    priceRange: '高端',
    applications: ['科研实验', '救援作业', '极限环境'],
    tags: ['动态运动', '极限环境', '世界领先'],
    releaseDate: '2023-04',
    downloads: 450,
    stars: 4.9,
    specifications: {
      joints: 28,
      sensors: ['IMU', '激光雷达', '立体视觉', '力传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'Custom OS',
      developmentKit: false
    }
  },
  {
    id: '18',
    name: 'Pepper',
    brand: 'SoftBank Robotics',
    description: '社交人形机器人，专为人机交互和情感识别设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20Pepper%20social%20humanoid%20robot%20human%20interaction%20emotion%20recognition&image_size=portrait_4_3',
    height: '120cm',
    weight: '28kg',
    dof: 20,
    walkingSpeed: '3km/h',
    batteryLife: '12小时',
    computingPower: '20 TOPS',
    price: '$17,000',
    priceRange: '中端',
    applications: ['客户服务', '教育培训', '娱乐陪伴'],
    tags: ['社交机器人', '情感识别', '长续航'],
    releaseDate: '2021-06',
    downloads: 5200,
    stars: 4.2,
    specifications: {
      joints: 20,
      sensors: ['3D相机', '触摸传感器', '麦克风阵列', 'IMU'],
      connectivity: ['WiFi', 'Ethernet', 'Bluetooth'],
      operatingSystem: 'NAOqi OS',
      developmentKit: true
    }
  },
  {
    id: '19',
    name: 'NAO',
    brand: 'SoftBank Robotics',
    description: '教育型人形机器人，广泛应用于STEM教育和编程学习',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20NAO%20educational%20humanoid%20robot%20STEM%20programming%20learning&image_size=portrait_4_3',
    height: '58cm',
    weight: '5.4kg',
    dof: 25,
    walkingSpeed: '0.5m/s',
    batteryLife: '1.5小时',
    computingPower: '10 TOPS',
    price: '$8,000',
    priceRange: '中端',
    applications: ['STEM教育', '编程学习', '研究平台'],
    tags: ['教育机器人', '编程学习', '小型化'],
    releaseDate: '2020-09',
    downloads: 8500,
    stars: 4.6,
    specifications: {
      joints: 25,
      sensors: ['摄像头', '声纳', '触摸传感器', 'IMU'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'NAOqi OS',
      developmentKit: true
    }
  },
  {
    id: '20',
    name: 'Optimus Gen 2',
    brand: 'Tesla',
    description: 'Tesla最新一代人形机器人，专为工厂自动化和家庭服务设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Tesla%20Optimus%20Gen2%20humanoid%20robot%20factory%20automation%20home%20service&image_size=portrait_4_3',
    height: '173cm',
    weight: '57kg',
    dof: 40,
    walkingSpeed: '1.4m/s',
    batteryLife: '8小时',
    computingPower: '300 TOPS',
    price: '$20,000',
    priceRange: '中端',
    applications: ['工厂自动化', '家庭服务', '物流搬运'],
    tags: ['量产型', '长续航', '多用途'],
    releaseDate: '2024-12',
    downloads: 320,
    stars: 4.7,
    specifications: {
      joints: 40,
      sensors: ['FSD摄像头', '力传感器', 'IMU', '触觉传感器'],
      connectivity: ['WiFi', 'Bluetooth', 'Cellular'],
      operatingSystem: 'Tesla OS',
      developmentKit: false
    }
  },
  {
    id: '21',
    name: 'TALOS',
    brand: '乐聚机器人',
    description: '民用娱乐机器人，具备灵活的运动能力和物体抓取功能',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Leju%20TALOS%20consumer%20entertainment%20humanoid%20robot%20flexible%20movement%20object%20grasping&image_size=portrait_4_3',
    height: '60cm',
    weight: '8kg',
    dof: 17,
    walkingSpeed: '0.45m/s',
    batteryLife: '1小时',
    computingPower: '15 TOPS',
    price: '¥50,000',
    priceRange: '入门级',
    applications: ['娱乐表演', '教育展示', '家庭陪伴'],
    tags: ['小型化', '娱乐型', '物体抓取'],
    releaseDate: '2022-03',
    downloads: 3200,
    stars: 4.1,
    specifications: {
      joints: 17,
      sensors: ['IMU', '摄像头', '编码器'],
      connectivity: ['WiFi', 'Bluetooth'],
      operatingSystem: 'Linux',
      developmentKit: true
    }
  },
  {
    id: '22',
    name: '夸父4.0',
    brand: '乐聚机器人',
    description: '搭载华为云盘古大模型的开源鸿蒙人形机器人，可跳跃和多地形行走',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Leju%20Kuafu%204.0%20HarmonyOS%20humanoid%20robot%20jumping%20multi%20terrain%20walking&image_size=portrait_4_3',
    height: '147cm',
    weight: '46kg',
    dof: 40,
    walkingSpeed: '5km/h',
    batteryLife: '2小时',
    computingPower: '100 TOPS',
    price: '¥800,000',
    priceRange: '中高端',
    applications: ['交通劝导', '家庭服务', '导览参观'],
    tags: ['鸿蒙系统', '可跳跃', '多地形'],
    releaseDate: '2024-06',
    downloads: 1450,
    stars: 4.5,
    specifications: {
      joints: 40,
      sensors: ['IMU', '视觉系统', '力传感器', '环境传感器'],
      connectivity: ['5G', 'WiFi', 'Bluetooth'],
      operatingSystem: 'HarmonyOS',
      developmentKit: true
    }
  },
  {
    id: '23',
    name: 'D9',
    brand: 'PUDU普渡',
    description: '双足人形机器人，具备端到端任务规划和多模态环境理解能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=PUDU%20D9%20bipedal%20humanoid%20robot%20task%20planning%20multimodal%20understanding&image_size=portrait_4_3',
    height: '170cm',
    weight: '65kg',
    dof: 42,
    walkingSpeed: '2m/s',
    batteryLife: '3小时',
    computingPower: '180 TOPS',
    price: '¥1,800,000',
    priceRange: '高端',
    applications: ['多任务服务', '智能配送', '环境清洁'],
    tags: ['双足机器人', '任务规划', '高泛化性'],
    releaseDate: '2024-12',
    downloads: 180,
    stars: 4.6,
    specifications: {
      joints: 42,
      sensors: ['多模态传感器', '3D视觉', 'IMU', '力传感器'],
      connectivity: ['5G', 'WiFi', 'Bluetooth', 'Ethernet'],
      operatingSystem: 'PUDU OS',
      developmentKit: false
    }
  },
  {
    id: '24',
    name: 'TORA-ONE',
    brand: '帕西尼感知科技',
    description: '多维触觉人形机器人，具备高精度触觉感知和灵活精细操作能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pasini%20TORA%20ONE%20tactile%20humanoid%20robot%20precision%20touch%20sensing%20fine%20manipulation&image_size=portrait_4_3',
    height: '165cm',
    weight: '52kg',
    dof: 47,
    walkingSpeed: '1.2m/s',
    batteryLife: '8小时',
    computingPower: '120 TOPS',
    price: '¥2,500,000',
    priceRange: '高端',
    applications: ['工业制造', '家庭服务', '物流仓储'],
    tags: ['触觉感知', '精细操作', '长续航'],
    releaseDate: '2024-08',
    downloads: 350,
    stars: 4.8,
    specifications: {
      joints: 47,
      sensors: ['多维触觉传感器', 'AI视觉', 'IMU', '力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'TORA OS',
      developmentKit: true
    }
  },
  {
    id: '25',
    name: '领航者2号',
    brand: '浙江人形机器人创新中心',
    description: '具有精确技能作业能力的人形机器人，实现高动态运动下稳定站立',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhejiang%20Navigator%202%20humanoid%20robot%20precise%20skill%20operation%20stable%20standing&image_size=portrait_4_3',
    height: '165cm',
    weight: '60kg',
    dof: 41,
    walkingSpeed: '1.5m/s',
    batteryLife: '2.5小时',
    computingPower: '150 TOPS',
    price: '¥1,200,000',
    priceRange: '高端',
    applications: ['工业作业', '精密操作', '技能训练'],
    tags: ['精确作业', '高动态', '稳定控制'],
    releaseDate: '2024-08',
    downloads: 520,
    stars: 4.7,
    specifications: {
      joints: 41,
      sensors: ['高精度传感器', '3D视觉', 'IMU', '六维力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'Navigator OS',
      developmentKit: true
    }
  },
  {
    id: '26',
    name: '天工机器人',
    brand: '北京具身智能机器人创新中心',
    description: '具身智能机器人，实现全链路智能能力闭环，涵盖感知到执行全流程',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20Tiangong%20embodied%20intelligence%20humanoid%20robot%20perception%20execution%20full%20process&image_size=portrait_4_3',
    height: '163cm',
    weight: '56kg',
    dof: 42,
    walkingSpeed: '1.3m/s',
    batteryLife: '3小时',
    computingPower: '550 TOPS',
    price: '¥1,500,000',
    priceRange: '高端',
    applications: ['语音交互', '无序抓取', '复杂任务'],
    tags: ['具身智能', '全链路', '高算力'],
    releaseDate: '2024-08',
    downloads: 680,
    stars: 4.6,
    specifications: {
      joints: 42,
      sensors: ['多视觉传感器', '六维力传感器', 'IMU', '3D视觉'],
      connectivity: ['5G', 'WiFi', 'Ethernet'],
      operatingSystem: 'Tiangong OS',
      developmentKit: true
    }
  },
  {
    id: '27',
    name: 'DR01',
    brand: '云深处机器人',
    description: '轻量化人形机器人，专注于灵活运动和环境适应性',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=DeepRobotics%20DR01%20lightweight%20humanoid%20robot%20flexible%20movement%20environment%20adaptation&image_size=portrait_4_3',
    height: '155cm',
    weight: '42kg',
    dof: 35,
    walkingSpeed: '1.8m/s',
    batteryLife: '2小时',
    computingPower: '80 TOPS',
    price: '¥450,000',
    priceRange: '中端',
    applications: ['科研教育', '技术验证', '平台开发'],
    tags: ['轻量化', '灵活运动', '开发平台'],
    releaseDate: '2024-05',
    downloads: 1250,
    stars: 4.4,
    specifications: {
      joints: 35,
      sensors: ['IMU', '视觉传感器', '力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '28',
    name: 'Mercury X1',
    brand: '大象水星',
    description: '轮式人形机器人，结合了轮式移动和人形操作的优势',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elephant%20Mercury%20X1%20wheeled%20humanoid%20robot%20mobile%20manipulation%20hybrid%20design&image_size=portrait_4_3',
    height: '140cm',
    weight: '35kg',
    dof: 28,
    walkingSpeed: '3m/s',
    batteryLife: '4小时',
    computingPower: '60 TOPS',
    price: '¥280,000',
    priceRange: '中端',
    applications: ['室内服务', '物流配送', '巡检作业'],
    tags: ['轮式移动', '混合设计', '高效率'],
    releaseDate: '2024-03',
    downloads: 980,
    stars: 4.2,
    specifications: {
      joints: 28,
      sensors: ['激光雷达', '摄像头', 'IMU', '超声传感器'],
      connectivity: ['WiFi', 'Bluetooth', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '29',
    name: 'Wanda',
    brand: 'UniX AI',
    description: 'AI驱动的人形机器人，专注于智能对话和情感交互',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UniX%20AI%20Wanda%20humanoid%20robot%20intelligent%20conversation%20emotional%20interaction&image_size=portrait_4_3',
    height: '168cm',
    weight: '48kg',
    dof: 32,
    walkingSpeed: '1.1m/s',
    batteryLife: '6小时',
    computingPower: '90 TOPS',
    price: '¥350,000',
    priceRange: '中端',
    applications: ['客户服务', '教育陪伴', '情感支持'],
    tags: ['AI驱动', '情感交互', '长续航'],
    releaseDate: '2024-04',
    downloads: 1680,
    stars: 4.3,
    specifications: {
      joints: 32,
      sensors: ['情感识别', '语音识别', '面部识别', 'IMU'],
      connectivity: ['WiFi', 'Bluetooth', '4G'],
      operatingSystem: 'UniX OS',
      developmentKit: true
    }
  },
  {
    id: '30',
    name: 'Martian',
    brand: 'UniX AI',
    description: '探索型人形机器人，专为复杂环境和极限条件设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UniX%20AI%20Martian%20exploration%20humanoid%20robot%20complex%20environment%20extreme%20conditions&image_size=portrait_4_3',
    height: '180cm',
    weight: '75kg',
    dof: 45,
    walkingSpeed: '2.2m/s',
    batteryLife: '5小时',
    computingPower: '200 TOPS',
    price: '¥1,800,000',
    priceRange: '高端',
    applications: ['环境探索', '救援作业', '极限环境'],
    tags: ['探索型', '极限环境', '高耐用性'],
    releaseDate: '2024-07',
    downloads: 420,
    stars: 4.7,
    specifications: {
      joints: 45,
      sensors: ['环境传感器', '激光雷达', '热成像', 'IMU'],
      connectivity: ['卫星通信', 'WiFi', 'Ethernet'],
      operatingSystem: 'Martian OS',
      developmentKit: false
    }
  },
  {
    id: '31',
    name: 'Adam',
    brand: 'PNDbotics',
    description: '模块化人形机器人平台，专为研发和教育设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=PNDbotics%20Adam%20modular%20humanoid%20robot%20research%20education%20platform&image_size=portrait_4_3',
    height: '150cm',
    weight: '40kg',
    dof: 30,
    walkingSpeed: '1.0m/s',
    batteryLife: '3小时',
    computingPower: '70 TOPS',
    price: '¥320,000',
    priceRange: '中端',
    applications: ['科研开发', '教育培训', '原型验证'],
    tags: ['模块化', '研发平台', '教育版'],
    releaseDate: '2024-01',
    downloads: 1420,
    stars: 4.2,
    specifications: {
      joints: 30,
      sensors: ['IMU', '摄像头', '力传感器', '编码器'],
      connectivity: ['WiFi', 'Ethernet', 'USB'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '32',
    name: '天链T1 Pro',
    brand: '四川天链机器人',
    description: '工业级人形机器人，专注于制造业自动化应用',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20Tianchain%20T1%20Pro%20industrial%20humanoid%20robot%20manufacturing%20automation&image_size=portrait_4_3',
    height: '175cm',
    weight: '68kg',
    dof: 44,
    walkingSpeed: '1.3m/s',
    batteryLife: '4小时',
    computingPower: '160 TOPS',
    price: '¥1,600,000',
    priceRange: '高端',
    applications: ['制造自动化', '质量检测', '装配作业'],
    tags: ['工业级', '制造业', '自动化'],
    releaseDate: '2024-05',
    downloads: 580,
    stars: 4.5,
    specifications: {
      joints: 44,
      sensors: ['工业相机', '力传感器', 'IMU', '激光测距'],
      connectivity: ['工业以太网', 'CAN', 'Modbus'],
      operatingSystem: 'Tianchain OS',
      developmentKit: false
    }
  },
  {
    id: '33',
    name: 'CyberOne',
    brand: '小米',
    description: '全尺寸人形仿生机器人，具备完整的人机交互能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%20CyberOne%20full%20size%20humanoid%20bionic%20robot%20human%20machine%20interaction&image_size=portrait_4_3',
    height: '177cm',
    weight: '52kg',
    dof: 21,
    walkingSpeed: '1.52m/s',
    batteryLife: '2小时',
    computingPower: '100 TOPS',
    price: '¥600,000',
    priceRange: '中高端',
    applications: ['家庭陪伴', '智能助手', '娱乐互动'],
    tags: ['仿生设计', '情感交互', '智能助手'],
    releaseDate: '2022-08',
    downloads: 2800,
    stars: 4.4,
    specifications: {
      joints: 21,
      sensors: ['深度相机', '麦克风阵列', 'IMU', '触觉传感器'],
      connectivity: ['WiFi', 'Bluetooth', '5G'],
      operatingSystem: 'MIUI for Robot',
      developmentKit: true
    }
  },
  {
    id: '34',
    name: 'Digit',
    brand: 'Agility Robotics',
    description: '商用双足机器人，专为物流和仓储环境设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Agility%20Robotics%20Digit%20commercial%20bipedal%20robot%20logistics%20warehouse&image_size=portrait_4_3',
    height: '160cm',
    weight: '65kg',
    dof: 20,
    walkingSpeed: '1.5m/s',
    batteryLife: '4小时',
    computingPower: '80 TOPS',
    price: '$250,000',
    priceRange: '高端',
    applications: ['物流仓储', '包裹配送', '工厂搬运'],
    tags: ['商用级', '物流专用', '双足行走'],
    releaseDate: '2023-05',
    downloads: 650,
    stars: 4.6,
    specifications: {
      joints: 20,
      sensors: ['激光雷达', '立体相机', 'IMU', '力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'LTE'],
      operatingSystem: 'Agility OS',
      developmentKit: false
    }
  },
  {
    id: '35',
    name: 'ASIMO',
    brand: 'Honda',
    description: '经典人形机器人，在人形机器人发展史上具有里程碑意义',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Honda%20ASIMO%20classic%20humanoid%20robot%20milestone%20white%20design%20walking&image_size=portrait_4_3',
    height: '130cm',
    weight: '50kg',
    dof: 57,
    walkingSpeed: '2.7km/h',
    batteryLife: '1小时',
    computingPower: '30 TOPS',
    price: '$2,500,000',
    priceRange: '高端',
    applications: ['科研展示', '技术验证', '博物馆展览'],
    tags: ['经典机型', '里程碑', '技术先驱'],
    releaseDate: '2011-11',
    downloads: 1200,
    stars: 4.8,
    specifications: {
      joints: 57,
      sensors: ['视觉传感器', '听觉传感器', 'IMU', '触觉传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'Honda OS',
      developmentKit: false
    }
  },
  {
    id: '36',
    name: 'iCub',
    brand: 'IIT',
    description: '开源儿童型人形机器人，专为认知科学研究设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=IIT%20iCub%20open%20source%20child%20humanoid%20robot%20cognitive%20science%20research&image_size=portrait_4_3',
    height: '104cm',
    weight: '22kg',
    dof: 53,
    walkingSpeed: '0.8m/s',
    batteryLife: '2小时',
    computingPower: '40 TOPS',
    price: '$200,000',
    priceRange: '中高端',
    applications: ['认知研究', '机器学习', '科学实验'],
    tags: ['开源', '儿童型', '认知科学'],
    releaseDate: '2020-03',
    downloads: 2100,
    stars: 4.7,
    specifications: {
      joints: 53,
      sensors: ['双目相机', '触觉传感器', 'IMU', '力传感器'],
      connectivity: ['Ethernet', 'CAN', 'USB'],
      operatingSystem: 'YARP',
      developmentKit: true
    }
  },
  {
    id: '37',
    name: 'Sophia',
    brand: 'Hanson Robotics',
    description: '社交人形机器人，以逼真的面部表情和对话能力著称',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hanson%20Robotics%20Sophia%20social%20humanoid%20robot%20realistic%20facial%20expressions&image_size=portrait_4_3',
    height: '167cm',
    weight: '20kg',
    dof: 36,
    walkingSpeed: '无腿部',
    batteryLife: '8小时',
    computingPower: '60 TOPS',
    price: '$1,000,000',
    priceRange: '高端',
    applications: ['媒体展示', '教育演讲', '社交互动'],
    tags: ['社交机器人', '逼真表情', '媒体明星'],
    releaseDate: '2016-02',
    downloads: 3500,
    stars: 4.3,
    specifications: {
      joints: 36,
      sensors: ['面部识别', '语音识别', '情感识别'],
      connectivity: ['WiFi', 'Bluetooth', '4G'],
      operatingSystem: 'Sophia OS',
      developmentKit: false
    }
  },
  {
    id: '38',
    name: 'Robonaut 2',
    brand: 'NASA',
    description: '太空人形机器人，专为国际空间站作业设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=NASA%20Robonaut%202%20space%20humanoid%20robot%20international%20space%20station&image_size=portrait_4_3',
    height: '108cm',
    weight: '150kg',
    dof: 42,
    walkingSpeed: '无腿部',
    batteryLife: '连续供电',
    computingPower: '25 TOPS',
    price: '$2,500,000',
    priceRange: '高端',
    applications: ['太空作业', '科学实验', '维护任务'],
    tags: ['太空机器人', '零重力', '高精度'],
    releaseDate: '2011-02',
    downloads: 180,
    stars: 4.9,
    specifications: {
      joints: 42,
      sensors: ['立体视觉', '力传感器', '触觉传感器'],
      connectivity: ['专用通信', 'Ethernet'],
      operatingSystem: 'ROS',
      developmentKit: false
    }
  },
  {
    id: '39',
    name: 'HRP-5P',
    brand: 'AIST',
    description: '日本产业技术综合研究所开发的建筑作业人形机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=AIST%20HRP5P%20construction%20work%20humanoid%20robot%20building%20site&image_size=portrait_4_3',
    height: '182cm',
    weight: '101kg',
    dof: 37,
    walkingSpeed: '1.0m/s',
    batteryLife: '2小时',
    computingPower: '50 TOPS',
    price: '$1,800,000',
    priceRange: '高端',
    applications: ['建筑施工', '重型作业', '危险环境'],
    tags: ['建筑专用', '重型作业', '高负载'],
    releaseDate: '2018-09',
    downloads: 320,
    stars: 4.4,
    specifications: {
      joints: 37,
      sensors: ['激光雷达', '力传感器', 'IMU', '环境传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'OpenHRP',
      developmentKit: true
    }
  },
  {
    id: '40',
    name: 'Valkyrie',
    brand: 'NASA JSC',
    description: 'NASA约翰逊航天中心开发的太空探索人形机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=NASA%20JSC%20Valkyrie%20space%20exploration%20humanoid%20robot%20mars%20mission&image_size=portrait_4_3',
    height: '188cm',
    weight: '125kg',
    dof: 44,
    walkingSpeed: '1.2m/s',
    batteryLife: '1小时',
    computingPower: '100 TOPS',
    price: '$2,000,000',
    priceRange: '高端',
    applications: ['太空探索', '火星任务', '极地作业'],
    tags: ['太空探索', '极端环境', '高耐用性'],
    releaseDate: '2015-12',
    downloads: 150,
    stars: 4.8,
    specifications: {
      joints: 44,
      sensors: ['多光谱相机', '激光雷达', 'IMU', '力传感器'],
      connectivity: ['卫星通信', 'WiFi'],
      operatingSystem: 'ROS',
      developmentKit: true
    }
  },
  {
    id: '2',
    name: 'G1',
    brand: '宇树科技',
    description: '紧凑型人形机器人，专为教育和研发设计，具备优秀的性价比和开发友好性',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Unitree%20G1%20compact%20humanoid%20robot%20educational%20version%20sleek%20design%20technology&image_size=portrait_4_3',
    height: '127cm',
    weight: '35kg',
    dof: 23,
    walkingSpeed: '2m/s',
    batteryLife: '2小时',
    computingPower: '100 TOPS',
    price: '¥160,000',
    priceRange: '中端',
    applications: ['教育培训', '科研开发', '娱乐展示'],
    tags: ['紧凑型', '教育版', '高性价比'],
    releaseDate: '2024-05',
    downloads: 2800,
    stars: 4.6,
    specifications: {
      joints: 23,
      sensors: ['IMU', '深度相机', '力传感器'],
      connectivity: ['WiFi', 'Bluetooth', 'USB-C'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '3',
    name: 'R1',
    brand: '宇树科技',
    description: '研究型人形机器人平台，为高校和研究机构提供完整的开发环境',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Unitree%20R1%20research%20humanoid%20robot%20laboratory%20setting%20advanced%20technology&image_size=portrait_4_3',
    height: '150cm',
    weight: '40kg',
    dof: 25,
    walkingSpeed: '1.8m/s',
    batteryLife: '1.5小时',
    computingPower: '200 TOPS',
    price: '¥500,000',
    priceRange: '中高端',
    applications: ['科研实验', '算法验证', '学术研究'],
    tags: ['研究型', '开源', '高精度'],
    releaseDate: '2024-03',
    downloads: 850,
    stars: 4.7,
    specifications: {
      joints: 25,
      sensors: ['IMU', '激光雷达', '深度相机', '力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN', 'RS485'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '4',
    name: '远征A1',
    brand: '智元机器人',
    description: '工业级人形机器人，具备49+自由度和液冷关节技术，适用于复杂工业环境',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhiyuan%20A1%20industrial%20humanoid%20robot%20factory%20setting%20advanced%20joints%20technology&image_size=portrait_4_3',
    height: '175cm',
    weight: '55kg',
    dof: 49,
    walkingSpeed: '1.2m/s',
    batteryLife: '3小时',
    computingPower: '150 TOPS',
    price: '¥1,200,000',
    priceRange: '高端',
    applications: ['工业制造', '物流搬运', '质量检测'],
    tags: ['工业级', '液冷技术', '高自由度'],
    releaseDate: '2024-01',
    downloads: 650,
    stars: 4.9,
    specifications: {
      joints: 49,
      sensors: ['IMU', '力传感器', '视觉传感器', '触觉传感器'],
      connectivity: ['WiFi', 'Ethernet', '5G', 'CAN'],
      operatingSystem: '智元OS',
      developmentKit: false
    }
  },
  {
    id: '5',
    name: '远征A2',
    brand: '智元机器人',
    description: '升级版工业人形机器人，增强了环境适应性和作业精度',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhiyuan%20A2%20upgraded%20industrial%20humanoid%20robot%20modern%20design%20precision%20work&image_size=portrait_4_3',
    height: '178cm',
    weight: '58kg',
    dof: 52,
    walkingSpeed: '1.5m/s',
    batteryLife: '4小时',
    computingPower: '200 TOPS',
    price: '¥1,500,000',
    priceRange: '高端',
    applications: ['精密制造', '自动化生产', '危险环境作业'],
    tags: ['升级版', '高精度', '环境适应'],
    releaseDate: '2024-06',
    downloads: 420,
    stars: 4.8,
    specifications: {
      joints: 52,
      sensors: ['IMU', '力传感器', '3D视觉', '环境传感器'],
      connectivity: ['WiFi', 'Ethernet', '5G', 'CAN', 'Modbus'],
      operatingSystem: '智元OS 2.0',
      developmentKit: false
    }
  },
  {
    id: '6',
    name: '灵犀X1',
    brand: '智元机器人',
    description: '开源人形机器人平台，29个关节模块化设计，适合教育和研发',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Zhiyuan%20X1%20open%20source%20humanoid%20robot%20modular%20design%20educational%20platform&image_size=portrait_4_3',
    height: '165cm',
    weight: '45kg',
    dof: 29,
    walkingSpeed: '1.0m/s',
    batteryLife: '2小时',
    computingPower: '80 TOPS',
    price: '¥300,000',
    priceRange: '中端',
    applications: ['教育培训', '开源开发', '原型验证'],
    tags: ['开源', '模块化', '教育版'],
    releaseDate: '2024-04',
    downloads: 1800,
    stars: 4.5,
    specifications: {
      joints: 29,
      sensors: ['IMU', '编码器', '基础视觉'],
      connectivity: ['WiFi', 'USB', 'CAN'],
      operatingSystem: 'ROS2',
      developmentKit: true
    }
  },
  {
    id: '7',
    name: 'Iron',
    brand: '小鹏汽车',
    description: '工业场景L3级人形机器人，搭载自研图灵AI芯片，具备强大的视觉感知能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=XPeng%20Iron%20humanoid%20robot%20automotive%20factory%20L3%20autonomous%20AI%20chip&image_size=portrait_4_3',
    height: '178cm',
    weight: '70kg',
    dof: 62,
    walkingSpeed: '1.2m/s',
    batteryLife: '4小时',
    computingPower: '3000 TOPS',
    price: '¥2,000,000',
    priceRange: '高端',
    applications: ['汽车制造', '3C电子', '工业生产'],
    tags: ['L3级', '自研芯片', '工业级'],
    releaseDate: '2024-11',
    downloads: 280,
    stars: 4.9,
    specifications: {
      joints: 62,
      sensors: ['4D毫米波雷达', 'AI鹰眼视觉', '触觉反馈', 'IMU'],
      connectivity: ['WiFi', 'Ethernet', '5G', 'CAN'],
      operatingSystem: '天玑AIOS',
      developmentKit: false
    }
  },
  {
    id: '8',
    name: 'PX5',
    brand: '小鹏汽车',
    description: '首款双足人形机器人，为Iron的前身产品，验证了小鹏在人形机器人领域的技术实力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=XPeng%20PX5%20bipedal%20humanoid%20robot%20prototype%20technology%20demonstration&image_size=portrait_4_3',
    height: '170cm',
    weight: '65kg',
    dof: 50,
    walkingSpeed: '1.0m/s',
    batteryLife: '2小时',
    computingPower: '1000 TOPS',
    price: '¥800,000',
    priceRange: '中高端',
    applications: ['技术验证', '展示演示', '研发测试'],
    tags: ['原型机', '双足', '技术验证'],
    releaseDate: '2023-10',
    downloads: 150,
    stars: 4.3,
    specifications: {
      joints: 50,
      sensors: ['IMU', '视觉传感器', '力传感器'],
      connectivity: ['WiFi', 'Ethernet', 'CAN'],
      operatingSystem: '小鹏OS',
      developmentKit: false
    }
  },
  {
    id: '9',
    name: 'Walker X',
    brand: '优必选',
    description: '第四代人形服务机器人，具备优秀的运动能力和智能交互功能',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UBTech%20Walker%20X%20humanoid%20service%20robot%20elegant%20design%20home%20service&image_size=portrait_4_3',
    height: '130cm',
    weight: '63kg',
    dof: 41,
    walkingSpeed: '3km/h',
    batteryLife: '2小时',
    computingPower: '100 TOPS',
    price: '$150,000',
    priceRange: '高端',
    applications: ['家庭服务', '商业展示', '教育培训'],
    tags: ['服务机器人', '智能交互', '模块化'],
    releaseDate: '2021-07',
    downloads: 3200,
    stars: 4.7,
    specifications: {
      joints: 41,
      sensors: ['3D立体视觉', '力传感器', '触觉传感器'],
      connectivity: ['WiFi', 'Bluetooth', 'Ethernet'],
      operatingSystem: 'Walker OS',
      developmentKit: true
    }
  },
  {
    id: '10',
    name: 'Walker S1',
    brand: '优必选',
    description: '工业场景专用人形机器人，已在比亚迪和蔚来等车厂实训部署',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UBTech%20Walker%20S1%20industrial%20humanoid%20robot%20factory%20automotive%20manufacturing&image_size=portrait_4_3',
    height: '172cm',
    weight: '76kg',
    dof: 41,
    walkingSpeed: '1.5m/s',
    batteryLife: '3小时',
    computingPower: '120 TOPS',
    price: '¥1,000,000',
    priceRange: '高端',
    applications: ['汽车制造', '工业协作', '物流搬运'],
    tags: ['工业级', '车厂部署', '协作机器人'],
    releaseDate: '2024-10',
    downloads: 890,
    stars: 4.8,
    specifications: {
      joints: 41,
      sensors: ['360度感知', '双耳鱼眼相机', '触觉压力传感器'],
      connectivity: ['WiFi', 'Ethernet', '5G', 'CAN'],
      operatingSystem: 'ROSA 2.0',
      developmentKit: false
    }
  },
  {
    id: '41',
    name: 'Pepper',
    brand: 'SoftBank Robotics',
    description: '情感识别社交机器人，广泛应用于商业服务场景',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20Robotics%20Pepper%20emotion%20recognition%20social%20robot%20commercial%20service&image_size=portrait_4_3',
    height: '120cm',
    weight: '28kg',
    dof: 20,
    walkingSpeed: '3km/h',
    batteryLife: '12小时',
    computingPower: '20 TOPS',
    price: '¥120,000',
    priceRange: '中端',
    applications: ['商业服务', '客户接待', '教育辅助'],
    tags: ['情感识别', '商业应用', '轮式移动'],
    releaseDate: '2014-06',
    downloads: 5200,
    stars: 4.1,
    specifications: {
      joints: 20,
      sensors: ['RGB相机', '深度传感器', '触摸传感器', '麦克风'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'NAOqi OS',
      developmentKit: true
    }
  },
  {
    id: '42',
    name: 'NAO',
    brand: 'SoftBank Robotics',
    description: '教育型人形机器人，全球教育机构广泛使用',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20Robotics%20NAO%20educational%20humanoid%20robot%20classroom%20teaching&image_size=portrait_4_3',
    height: '58cm',
    weight: '5.4kg',
    dof: 25,
    walkingSpeed: '0.9km/h',
    batteryLife: '90分钟',
    computingPower: '15 TOPS',
    price: '¥80,000',
    priceRange: '中端',
    applications: ['教育教学', '编程学习', '研究开发'],
    tags: ['教育机器人', '编程教学', '小型化'],
    releaseDate: '2008-08',
    downloads: 8500,
    stars: 4.5,
    specifications: {
      joints: 25,
      sensors: ['双摄像头', '声纳', '触摸传感器', '陀螺仪'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'NAOqi OS',
      developmentKit: true
    }
  },
  {
    id: '43',
    name: 'Romeo',
    brand: 'SoftBank Robotics',
    description: '家庭助理人形机器人，专为老年人护理设计',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20Robotics%20Romeo%20home%20assistant%20humanoid%20robot%20elderly%20care&image_size=portrait_4_3',
    height: '140cm',
    weight: '40kg',
    dof: 37,
    walkingSpeed: '1.2km/h',
    batteryLife: '4小时',
    computingPower: '35 TOPS',
    price: '¥500,000',
    priceRange: '中高端',
    applications: ['家庭护理', '老年陪伴', '健康监测'],
    tags: ['家庭助理', '护理专用', '健康监测'],
    releaseDate: '2019-03',
    downloads: 1800,
    stars: 4.3,
    specifications: {
      joints: 37,
      sensors: ['3D相机', '力传感器', '生命体征监测'],
      connectivity: ['WiFi', 'Bluetooth', '4G'],
      operatingSystem: 'NAOqi OS',
      developmentKit: false
    }
  },
  {
    id: '44',
    name: 'Nao Evolution',
    brand: 'SoftBank Robotics',
    description: 'NAO机器人的升级版本，具备更强的交互能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=SoftBank%20Robotics%20NAO%20Evolution%20upgraded%20interactive%20humanoid%20robot&image_size=portrait_4_3',
    height: '58cm',
    weight: '5.4kg',
    dof: 25,
    walkingSpeed: '0.9km/h',
    batteryLife: '90分钟',
    computingPower: '18 TOPS',
    price: '¥90,000',
    priceRange: '中端',
    applications: ['高等教育', '研究开发', '竞赛比赛'],
    tags: ['升级版', '高等教育', '竞赛专用'],
    releaseDate: '2014-09',
    downloads: 6200,
    stars: 4.4,
    specifications: {
      joints: 25,
      sensors: ['高清摄像头', '声纳', '触摸传感器', '陀螺仪'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'NAOqi OS 2.0',
      developmentKit: true
    }
  },
  {
    id: '45',
    name: 'Qrio',
    brand: 'Sony',
    description: 'Sony开发的娱乐型小型人形机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20Qrio%20entertainment%20small%20humanoid%20robot%20dancing%20walking&image_size=portrait_4_3',
    height: '60cm',
    weight: '7kg',
    dof: 38,
    walkingSpeed: '1.5km/h',
    batteryLife: '1小时',
    computingPower: '10 TOPS',
    price: '¥150,000',
    priceRange: '中端',
    applications: ['家庭娱乐', '舞蹈表演', '互动游戏'],
    tags: ['娱乐机器人', '舞蹈功能', '小型化'],
    releaseDate: '2003-12',
    downloads: 2500,
    stars: 4.0,
    specifications: {
      joints: 38,
      sensors: ['CCD摄像头', '距离传感器', '加速度传感器'],
      connectivity: ['WiFi', '红外线'],
      operatingSystem: 'Sony OS',
      developmentKit: false
    }
  },
  {
    id: '46',
    name: 'HUBO',
    brand: 'KAIST',
    description: '韩国科学技术院开发的双足行走人形机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=KAIST%20HUBO%20bipedal%20walking%20humanoid%20robot%20korea%20technology&image_size=portrait_4_3',
    height: '130cm',
    weight: '45kg',
    dof: 40,
    walkingSpeed: '1.4km/h',
    batteryLife: '1小时',
    computingPower: '30 TOPS',
    price: '$400,000',
    priceRange: '高端',
    applications: ['科研开发', '技术验证', '竞赛比赛'],
    tags: ['双足行走', '科研平台', '技术验证'],
    releaseDate: '2004-01',
    downloads: 800,
    stars: 4.6,
    specifications: {
      joints: 40,
      sensors: ['立体视觉', 'IMU', '力传感器', '编码器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'Linux',
      developmentKit: true
    }
  },
  {
    id: '47',
    name: 'PETMAN',
    brand: 'Boston Dynamics',
    description: '化学防护服测试专用人形机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Boston%20Dynamics%20PETMAN%20chemical%20protection%20suit%20testing%20humanoid%20robot&image_size=portrait_4_3',
    height: '175cm',
    weight: '80kg',
    dof: 30,
    walkingSpeed: '7.08km/h',
    batteryLife: '连续供电',
    computingPower: '40 TOPS',
    price: '$2,000,000',
    priceRange: '高端',
    applications: ['军用测试', '防护服验证', '极端环境'],
    tags: ['军用级', '防护测试', '高速行走'],
    releaseDate: '2013-07',
    downloads: 120,
    stars: 4.7,
    specifications: {
      joints: 30,
      sensors: ['环境传感器', '温度传感器', '化学传感器'],
      connectivity: ['专用通信'],
      operatingSystem: 'Boston Dynamics OS',
      developmentKit: false
    }
  },
  {
    id: '48',
    name: 'Surena',
    brand: 'University of Tehran',
    description: '伊朗德黑兰大学开发的人形机器人系列',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=University%20Tehran%20Surena%20humanoid%20robot%20series%20iran%20technology&image_size=portrait_4_3',
    height: '190cm',
    weight: '98kg',
    dof: 43,
    walkingSpeed: '1.0km/h',
    batteryLife: '30分钟',
    computingPower: '25 TOPS',
    price: '$300,000',
    priceRange: '中高端',
    applications: ['科研开发', '技术展示', '教育培训'],
    tags: ['科研平台', '大型机器人', '技术展示'],
    releaseDate: '2010-12',
    downloads: 450,
    stars: 4.2,
    specifications: {
      joints: 43,
      sensors: ['视觉传感器', 'IMU', '力传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'Linux',
      developmentKit: true
    }
  },
  {
    id: '49',
    name: 'REEM-C',
    brand: 'PAL Robotics',
    description: '全尺寸双足人形服务机器人',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=PAL%20Robotics%20REEM-C%20full%20size%20bipedal%20humanoid%20service%20robot&image_size=portrait_4_3',
    height: '165cm',
    weight: '80kg',
    dof: 44,
    walkingSpeed: '1.5km/h',
    batteryLife: '8小时',
    computingPower: '50 TOPS',
    price: '€300,000',
    priceRange: '高端',
    applications: ['商业服务', '研究开发', '展览展示'],
    tags: ['服务机器人', '商业应用', '长续航'],
    releaseDate: '2016-04',
    downloads: 680,
    stars: 4.4,
    specifications: {
      joints: 44,
      sensors: ['RGB-D相机', '激光雷达', 'IMU', '力传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'Ubuntu + ROS',
      developmentKit: true
    }
  },
  {
    id: '50',
    name: 'WALK-MAN',
    brand: 'IIT',
    description: '灾难救援人形机器人，具备强大的环境适应能力',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=IIT%20WALK-MAN%20disaster%20rescue%20humanoid%20robot%20environmental%20adaptation&image_size=portrait_4_3',
    height: '185cm',
    weight: '118kg',
    dof: 33,
    walkingSpeed: '0.3m/s',
    batteryLife: '2小时',
    computingPower: '60 TOPS',
    price: '€1,500,000',
    priceRange: '高端',
    applications: ['灾难救援', '危险环境', '重型作业'],
    tags: ['救援机器人', '重型设计', '环境适应'],
    releaseDate: '2015-06',
    downloads: 280,
    stars: 4.8,
    specifications: {
      joints: 33,
      sensors: ['立体相机', '激光雷达', '力传感器', '环境传感器'],
      connectivity: ['WiFi', 'Ethernet'],
      operatingSystem: 'YARP + ROS',
      developmentKit: true
    }
  }
];

const Hardware: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const brands = Array.from(new Set(hardwareProducts.map(product => product.brand)));
  const priceRanges = Array.from(new Set(hardwareProducts.map(product => product.priceRange)));
  const applications = Array.from(new Set(hardwareProducts.flatMap(product => product.applications)));

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = hardwareProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchesPriceRange = selectedPriceRange === 'all' || product.priceRange === selectedPriceRange;
      const matchesApplication = selectedApplication === 'all' || product.applications.includes(selectedApplication);
      
      return matchesSearch && matchesBrand && matchesPriceRange && matchesApplication;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'brand':
          aValue = a.brand;
          bValue = b.brand;
          break;
        case 'releaseDate':
          aValue = new Date(a.releaseDate);
          bValue = new Date(b.releaseDate);
          break;
        case 'stars':
          aValue = a.stars;
          bValue = b.stars;
          break;
        case 'downloads':
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedBrand, selectedPriceRange, selectedApplication, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">硬件展示</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              探索最前沿的人形机器人技术，涵盖宇树、智元、小鹏、优必选等顶尖品牌的创新产品
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索机器人产品、品牌或功能..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有品牌</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有价格</option>
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <select
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">所有应用</option>
                {applications.map(app => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center space-x-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 hover:bg-gray-700"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">按名称</option>
                <option value="brand">按品牌</option>
                <option value="releaseDate">按发布时间</option>
                <option value="stars">按评分</option>
                <option value="downloads">按下载量</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            找到 {filteredAndSortedProducts.length} 个产品
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
              {/* Product Image */}
              <div className="aspect-w-16 aspect-h-12 bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
                    <p className="text-blue-400 font-medium">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{product.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{product.downloads}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Key Specifications */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{product.dof}自由度</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{product.walkingSpeed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{product.batteryLife}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{product.price}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Applications */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">应用场景:</p>
                  <p className="text-sm text-gray-300">{product.applications.join(', ')}</p>
                </div>

                {/* Release Date */}
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>发布时间: {product.releaseDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">未找到匹配的产品</p>
              <p className="text-sm mt-2">请尝试调整搜索条件或筛选器</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hardware;