import React from 'react';
import { Search, Filter, Download, Star, Eye, Calendar, Database, FileText } from 'lucide-react';

interface DatasetCard {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: number;
  stars: number;
  lastUpdated: string;
  tags: string[];
  dataType: string;
  size: string;
  format: string;
}

const mockDatasets: DatasetCard[] = [
  {
    id: '1',
    name: 'WanJuanSiLu-Multimodal-5Languages',
    description: '万卷·丝路多模态语料库，包含8种语言，1150万+数据量，26000+小时音视频，涵盖图片-文本、音频-文本、视频-文本及SFT数据',
    author: 'opendatalab',
    downloads: 125000,
    stars: 2800,
    lastUpdated: '2025-04-23',
    tags: ['多模态', '多语言', '图文', '音频', '视频', 'SFT'],
    dataType: '多模态数据集',
    size: '1.2TB',
    format: 'JSON'
  },
  {
    id: '2',
    name: 'WanJuan-Vietnamese',
    description: '越南语文本生成数据集，包含丰富的越南语语料，适用于文本生成和语言模型训练',
    author: 'opendatalab',
    downloads: 49000,
    stars: 890,
    lastUpdated: '2025-04-23',
    tags: ['越南语', '文本生成', '语言模型'],
    dataType: '文本数据集',
    size: '2.8GB',
    format: 'JSON'
  },
  {
    id: '3',
    name: 'WanJuan-Russian',
    description: '俄语文本生成数据集，包含大规模俄语语料库，支持俄语自然语言处理任务',
    author: 'opendatalab',
    downloads: 42000,
    stars: 756,
    lastUpdated: '2025-04-22',
    tags: ['俄语', '文本生成', 'NLP'],
    dataType: '文本数据集',
    size: '3.2GB',
    format: 'JSON'
  },
  {
    id: '4',
    name: 'WanJuan-Thai',
    description: '泰语语料库，规模超过155GB，包含7个主要类别和34个子类别，涵盖历史、政治、文化等本地特定主题',
    author: 'AIWizards',
    downloads: 38000,
    stars: 1200,
    lastUpdated: '2025-04-20',
    tags: ['泰语', '文本生成', '多领域', '本地化'],
    dataType: '文本数据集',
    size: '155GB',
    format: 'JSON'
  },
  {
    id: '5',
    name: 'Arabic-Multimodal-Dataset',
    description: '阿拉伯语多模态数据集，包含220,000张图片，200小时音频，1738小时视频，23,000条SFT数据',
    author: 'OpenCSG',
    downloads: 35000,
    stars: 980,
    lastUpdated: '2025-04-18',
    tags: ['阿拉伯语', '多模态', '图文', '音频', '视频'],
    dataType: '多模态数据集',
    size: '450GB',
    format: 'Mixed'
  },
  {
    id: '6',
    name: 'Korean-Multimodal-Dataset',
    description: '韩语多模态数据集，包含530,000张图片，202小时音频，3412小时视频，23,000条SFT数据',
    author: 'OpenCSG',
    downloads: 52000,
    stars: 1450,
    lastUpdated: '2025-04-17',
    tags: ['韩语', '多模态', '图文', '音频', '视频'],
    dataType: '多模态数据集',
    size: '680GB',
    format: 'Mixed'
  },
  {
    id: '7',
    name: 'Czech-Multimodal-Dataset',
    description: '捷克语多模态数据集，包含270,000张图片，202小时音频，2453小时视频，23,000条SFT数据',
    author: 'OpenCSG',
    downloads: 28000,
    stars: 720,
    lastUpdated: '2025-04-16',
    tags: ['捷克语', '多模态', '图文', '音频', '视频'],
    dataType: '多模态数据集',
    size: '520GB',
    format: 'Mixed'
  },
  {
    id: '8',
    name: 'Hungarian-Multimodal-Dataset',
    description: '匈牙利语多模态数据集，包含220,000张图片，208小时音频，3470小时视频，23,000条SFT数据',
    author: 'OpenCSG',
    downloads: 31000,
    stars: 850,
    lastUpdated: '2025-04-15',
    tags: ['匈牙利语', '多模态', '图文', '音频', '视频'],
    dataType: '多模态数据集',
    size: '590GB',
    format: 'Mixed'
  },
  {
    id: '9',
    name: 'Serbian-Multimodal-Dataset',
    description: '塞尔维亚语多模态数据集，包含80,000张图片，206小时音频，2578小时视频，23,000条SFT数据',
    author: 'OpenCSG',
    downloads: 22000,
    stars: 650,
    lastUpdated: '2025-04-14',
    tags: ['塞尔维亚语', '多模态', '图文', '音频', '视频'],
    dataType: '多模态数据集',
    size: '480GB',
    format: 'Mixed'
  },
  {
    id: '10',
    name: 'OpenCSG-Chinese-Corpus',
    description: 'OpenCSG中文语料库，包含Fineweb-edu-chinese、Cosmopedia-chinese、Smoltalk-chinese等高质量中文数据',
    author: 'OpenCSG',
    downloads: 89000,
    stars: 2100,
    lastUpdated: '2025-04-13',
    tags: ['中文', '语料库', '教育', '对话'],
    dataType: '文本数据集',
    size: '45GB',
    format: 'JSON'
  },
  {
    id: '11',
    name: 'Children-Speech-Recognition-Dataset',
    description: '儿童语音识别数据集(CSRC)，包含400小时儿童语音数据，专门用于儿童语音识别模型训练',
    author: 'OpenCSG',
    downloads: 15000,
    stars: 420,
    lastUpdated: '2025-04-12',
    tags: ['语音识别', '儿童语音', '音频处理'],
    dataType: '音频数据集',
    size: '120GB',
    format: 'WAV'
  },
  {
    id: '12',
    name: 'OpenOrca-Dataset',
    description: 'OpenOrca数据集，包含大规模指令跟随数据，适用于指令微调和对话系统训练',
    author: 'OpenCSG',
    downloads: 67000,
    stars: 1800,
    lastUpdated: '2025-04-11',
    tags: ['指令跟随', '对话系统', '微调'],
    dataType: '文本数据集',
    size: '18GB',
    format: 'JSON'
  },
  {
    id: '13',
    name: 'CLUENER2020',
    description: '中文细粒度命名实体识别数据集，包含10个实体类别的标注数据',
    author: 'CLUEbenchmark',
    downloads: 45000,
    stars: 1200,
    lastUpdated: '2024-01-15',
    tags: ['NER', '中文', '实体识别'],
    dataType: 'NLP数据集',
    size: '12.5MB',
    format: 'JSON'
  },
  {
    id: '14',
    name: 'CIFAR-100-Chinese',
    description: '包含中文标签的CIFAR-100图像分类数据集，适用于计算机视觉任务',
    author: 'OpenDataLab',
    downloads: 38000,
    stars: 980,
    lastUpdated: '2024-01-12',
    tags: ['图像分类', '计算机视觉', '中文标签'],
    dataType: '图像数据集',
    size: '178MB',
    format: 'PNG'
  },
  {
    id: '15',
    name: 'Chinese-Poetry-Dataset',
    description: '包含唐诗、宋词等中国古典诗词的大规模文本数据集',
    author: 'chinese-poetry',
    downloads: 32000,
    stars: 1500,
    lastUpdated: '2024-01-10',
    tags: ['诗词', '文本生成', '中文文学'],
    dataType: '文本数据集',
    size: '25.8MB',
    format: 'JSON'
  },
  {
    id: '16',
    name: 'WanJuan-Arabic-Text',
    description: '万卷阿拉伯语纯文本语料库，包含丰富的阿拉伯语文本数据，适用于语言模型预训练',
    author: 'OpenDataLab',
    downloads: 28000,
    stars: 750,
    lastUpdated: '2025-04-10',
    tags: ['阿拉伯语', '文本生成', '预训练'],
    dataType: '文本数据集',
    size: '8.5GB',
    format: 'TXT'
  },
  {
    id: '17',
    name: 'WanJuan-Korean-Text',
    description: '万卷韩语纯文本语料库，包含大规模韩语文本数据，支持韩语NLP任务',
    author: 'OpenDataLab',
    downloads: 35000,
    stars: 920,
    lastUpdated: '2025-04-09',
    tags: ['韩语', '文本生成', 'NLP'],
    dataType: '文本数据集',
    size: '12GB',
    format: 'TXT'
  },
  {
    id: '18',
    name: 'Multimodal-Image-Text-Dataset',
    description: '多模态图文数据集，包含200万张图片和对应的文本描述，适用于视觉语言模型训练',
    author: 'OpenCSG',
    downloads: 78000,
    stars: 2200,
    lastUpdated: '2025-04-08',
    tags: ['多模态', '图文', '视觉语言模型'],
    dataType: '多模态数据集',
    size: '850GB',
    format: 'Mixed'
  },
  {
    id: '19',
    name: 'Audio-Text-Alignment-Dataset',
    description: '音频文本对齐数据集，包含1600小时音频和对应文本，适用于语音识别和合成任务',
    author: 'OpenCSG',
    downloads: 42000,
    stars: 1100,
    lastUpdated: '2025-04-07',
    tags: ['音频', '文本对齐', '语音识别', '语音合成'],
    dataType: '音频数据集',
    size: '480GB',
    format: 'WAV'
  },
  {
    id: '20',
    name: 'Video-Caption-Dataset',
    description: '视频字幕数据集，包含25000小时视频和对应字幕，适用于视频理解和生成任务',
    author: 'OpenCSG',
    downloads: 56000,
    stars: 1650,
    lastUpdated: '2025-04-06',
    tags: ['视频', '字幕', '视频理解'],
    dataType: '多模态数据集',
    size: '2.8TB',
    format: 'MP4'
  },
  {
    id: '21',
    name: 'SFT-Instruction-Dataset',
    description: 'SFT指令数据集，包含18万条高质量指令数据，适用于指令微调和对话系统优化',
    author: 'OpenCSG',
    downloads: 89000,
    stars: 2500,
    lastUpdated: '2025-04-05',
    tags: ['SFT', '指令微调', '对话系统'],
    dataType: '文本数据集',
    size: '2.2GB',
    format: 'JSON'
  },
  {
    id: '22',
    name: 'Cultural-Tourism-Dataset',
    description: '文化旅游数据集，包含多语言的文化旅游相关文本、图片和视频数据',
    author: 'OpenCSG',
    downloads: 23000,
    stars: 680,
    lastUpdated: '2025-04-04',
    tags: ['文化旅游', '多语言', '多模态'],
    dataType: '多模态数据集',
    size: '320GB',
    format: 'Mixed'
  },
  {
    id: '23',
    name: 'Business-Trade-Dataset',
    description: '商业贸易数据集，包含商业贸易相关的多语言文本和图像数据',
    author: 'OpenCSG',
    downloads: 31000,
    stars: 850,
    lastUpdated: '2025-04-03',
    tags: ['商业贸易', '多语言', '商务'],
    dataType: '多模态数据集',
    size: '180GB',
    format: 'Mixed'
  },
  {
    id: '24',
    name: 'Science-Education-Dataset',
    description: '科技教育数据集，包含科技教育领域的多语言文本、图像和视频资源',
    author: 'OpenCSG',
    downloads: 45000,
    stars: 1300,
    lastUpdated: '2025-04-02',
    tags: ['科技教育', '多语言', '教育资源'],
    dataType: '多模态数据集',
    size: '420GB',
    format: 'Mixed'
  },
  {
    id: '25',
    name: 'Fine-Grained-Classification-Dataset',
    description: '细粒度分类数据集，包含20多种细粒度的多维度分类标签和详细文本描述',
    author: 'OpenCSG',
    downloads: 38000,
    stars: 1050,
    lastUpdated: '2025-04-01',
    tags: ['细粒度分类', '多维度标签', '分类任务'],
    dataType: '图像数据集',
    size: '95GB',
    format: 'JSON'
  },
  {
    id: '26',
    name: 'Cross-Lingual-NER-Dataset',
    description: '跨语言命名实体识别数据集，支持多种语言的实体识别任务',
    author: 'OpenCSG',
    downloads: 29000,
    stars: 780,
    lastUpdated: '2025-03-31',
    tags: ['跨语言', 'NER', '实体识别', '多语言'],
    dataType: 'NLP数据集',
    size: '15GB',
    format: 'JSON'
  },
  {
    id: '27',
    name: 'Sentiment-Analysis-Multilingual',
    description: '多语言情感分析数据集，包含多种语言的情感标注数据',
    author: 'OpenCSG',
    downloads: 52000,
    stars: 1400,
    lastUpdated: '2025-03-30',
    tags: ['情感分析', '多语言', '文本分类'],
    dataType: 'NLP数据集',
    size: '8.5GB',
    format: 'CSV'
  },
  {
    id: '28',
    name: 'Machine-Translation-Dataset',
    description: '机器翻译数据集，包含多语言对的平行语料，适用于翻译模型训练',
    author: 'OpenCSG',
    downloads: 67000,
    stars: 1900,
    lastUpdated: '2025-03-29',
    tags: ['机器翻译', '平行语料', '多语言'],
    dataType: '文本数据集',
    size: '25GB',
    format: 'TXT'
  },
  {
    id: '29',
    name: 'Question-Answering-Dataset',
    description: '问答数据集，包含多语言的问答对，适用于问答系统和阅读理解任务',
    author: 'OpenCSG',
    downloads: 74000,
    stars: 2100,
    lastUpdated: '2025-03-28',
    tags: ['问答系统', '阅读理解', '多语言'],
    dataType: 'NLP数据集',
    size: '12GB',
    format: 'JSON'
  },
  {
    id: '30',
    name: 'Text-Summarization-Dataset',
    description: '文本摘要数据集，包含多语言的文档和对应摘要，适用于摘要生成任务',
    author: 'OpenCSG',
    downloads: 41000,
    stars: 1150,
    lastUpdated: '2025-03-27',
    tags: ['文本摘要', '摘要生成', '多语言'],
    dataType: '文本数据集',
    size: '18GB',
    format: 'JSON'
  },
  {
    id: '31',
    name: 'Object-Detection-Dataset',
    description: '目标检测数据集，包含多种场景下的目标检测标注数据',
    author: 'OpenCSG',
    downloads: 85000,
    stars: 2400,
    lastUpdated: '2025-03-26',
    tags: ['目标检测', '计算机视觉', '标注数据'],
    dataType: '图像数据集',
    size: '450GB',
    format: 'COCO'
  },
  {
    id: '32',
    name: 'Semantic-Segmentation-Dataset',
    description: '语义分割数据集，包含像素级别的语义分割标注',
    author: 'OpenCSG',
    downloads: 62000,
    stars: 1750,
    lastUpdated: '2025-03-25',
    tags: ['语义分割', '像素级标注', '计算机视觉'],
    dataType: '图像数据集',
    size: '680GB',
    format: 'PNG'
  },
  {
    id: '33',
    name: 'Face-Recognition-Dataset',
    description: '人脸识别数据集，包含多种族、多年龄段的人脸图像数据',
    author: 'OpenCSG',
    downloads: 48000,
    stars: 1320,
    lastUpdated: '2025-03-24',
    tags: ['人脸识别', '生物识别', '多样性'],
    dataType: '图像数据集',
    size: '120GB',
    format: 'JPG'
  },
  {
    id: '34',
    name: 'Speech-Synthesis-Dataset',
    description: '语音合成数据集，包含多说话人的高质量语音数据',
    author: 'OpenCSG',
    downloads: 35000,
    stars: 950,
    lastUpdated: '2025-03-23',
    tags: ['语音合成', '多说话人', 'TTS'],
    dataType: '音频数据集',
    size: '200GB',
    format: 'WAV'
  },
  {
    id: '35',
    name: 'Music-Generation-Dataset',
    description: '音乐生成数据集，包含多种风格的音乐片段和对应的MIDI数据',
    author: 'OpenCSG',
    downloads: 28000,
    stars: 780,
    lastUpdated: '2025-03-22',
    tags: ['音乐生成', 'MIDI', '多风格'],
    dataType: '音频数据集',
    size: '150GB',
    format: 'MIDI'
  },
  {
    id: '36',
    name: 'Dialogue-System-Dataset',
    description: '对话系统数据集，包含多轮对话数据，适用于聊天机器人训练',
    author: 'OpenCSG',
    downloads: 91000,
    stars: 2600,
    lastUpdated: '2025-03-21',
    tags: ['对话系统', '多轮对话', '聊天机器人'],
    dataType: '文本数据集',
    size: '8GB',
    format: 'JSON'
  },
  {
    id: '37',
    name: 'Code-Generation-Dataset',
    description: '代码生成数据集，包含多种编程语言的代码片段和对应描述',
    author: 'OpenCSG',
    downloads: 76000,
    stars: 2200,
    lastUpdated: '2025-03-20',
    tags: ['代码生成', '编程语言', '代码理解'],
    dataType: '文本数据集',
    size: '35GB',
    format: 'JSON'
  },
  {
    id: '38',
    name: 'Medical-Image-Dataset',
    description: '医学图像数据集，包含多种医学影像数据和对应的诊断标注',
    author: 'OpenCSG',
    downloads: 32000,
    stars: 890,
    lastUpdated: '2025-03-19',
    tags: ['医学影像', '诊断标注', '医疗AI'],
    dataType: '图像数据集',
    size: '280GB',
    format: 'DICOM'
  },
  {
    id: '39',
    name: 'Financial-Text-Dataset',
    description: '金融文本数据集，包含金融新闻、报告和分析文本',
    author: 'OpenCSG',
    downloads: 54000,
    stars: 1500,
    lastUpdated: '2025-03-18',
    tags: ['金融文本', '新闻分析', '金融AI'],
    dataType: '文本数据集',
    size: '22GB',
    format: 'TXT'
  },
  {
    id: '40',
    name: 'Legal-Document-Dataset',
    description: '法律文档数据集，包含法律条文、判决书和法律分析文本',
    author: 'OpenCSG',
    downloads: 29000,
    stars: 820,
    lastUpdated: '2025-03-17',
    tags: ['法律文档', '判决书', '法律AI'],
    dataType: '文本数据集',
    size: '18GB',
    format: 'PDF'
  },
  {
    id: '41',
    name: 'Scientific-Paper-Dataset',
    description: '科学论文数据集，包含多学科的科学论文和摘要',
    author: 'OpenCSG',
    downloads: 68000,
    stars: 1950,
    lastUpdated: '2025-03-16',
    tags: ['科学论文', '学术文本', '多学科'],
    dataType: '文本数据集',
    size: '45GB',
    format: 'JSON'
  },
  {
    id: '42',
    name: 'Social-Media-Dataset',
    description: '社交媒体数据集，包含社交媒体文本、图像和用户行为数据',
    author: 'OpenCSG',
    downloads: 82000,
    stars: 2300,
    lastUpdated: '2025-03-15',
    tags: ['社交媒体', '用户行为', '文本图像'],
    dataType: '多模态数据集',
    size: '380GB',
    format: 'Mixed'
  },
  {
    id: '43',
    name: 'E-commerce-Dataset',
    description: '电商数据集，包含商品信息、用户评论和购买行为数据',
    author: 'OpenCSG',
    downloads: 95000,
    stars: 2700,
    lastUpdated: '2025-03-14',
    tags: ['电商', '商品信息', '用户评论'],
    dataType: '多模态数据集',
    size: '220GB',
    format: 'Mixed'
  },
  {
    id: '44',
    name: 'Weather-Forecast-Dataset',
    description: '天气预报数据集，包含历史天气数据和预报信息',
    author: 'OpenCSG',
    downloads: 41000,
    stars: 1150,
    lastUpdated: '2025-03-13',
    tags: ['天气预报', '时间序列', '气象数据'],
    dataType: '文本数据集',
    size: '12GB',
    format: 'CSV'
  },
  {
    id: '45',
    name: 'Traffic-Monitoring-Dataset',
    description: '交通监控数据集，包含交通流量、车辆检测和行为分析数据',
    author: 'OpenCSG',
    downloads: 36000,
    stars: 1000,
    lastUpdated: '2025-03-12',
    tags: ['交通监控', '车辆检测', '行为分析'],
    dataType: '多模态数据集',
    size: '520GB',
    format: 'Mixed'
  },
  {
    id: '46',
    name: 'Agricultural-Dataset',
    description: '农业数据集，包含作物图像、土壤数据和气候信息',
    author: 'OpenCSG',
    downloads: 24000,
    stars: 680,
    lastUpdated: '2025-03-11',
    tags: ['农业', '作物图像', '土壤数据'],
    dataType: '多模态数据集',
    size: '180GB',
    format: 'Mixed'
  },
  {
    id: '47',
    name: 'Environmental-Monitoring-Dataset',
    description: '环境监测数据集，包含空气质量、水质和噪音监测数据',
    author: 'OpenCSG',
    downloads: 31000,
    stars: 850,
    lastUpdated: '2025-03-10',
    tags: ['环境监测', '空气质量', '水质监测'],
    dataType: '文本数据集',
    size: '8GB',
    format: 'CSV'
  },
  {
    id: '48',
    name: 'Sports-Analytics-Dataset',
    description: '体育分析数据集，包含运动员表现、比赛数据和视频分析',
    author: 'OpenCSG',
    downloads: 42000,
    stars: 1200,
    lastUpdated: '2025-03-09',
    tags: ['体育分析', '运动员表现', '比赛数据'],
    dataType: '多模态数据集',
    size: '320GB',
    format: 'Mixed'
  },
  {
    id: '49',
    name: 'Gaming-Behavior-Dataset',
    description: '游戏行为数据集，包含玩家行为、游戏日志和用户体验数据',
    author: 'OpenCSG',
    downloads: 58000,
    stars: 1650,
    lastUpdated: '2025-03-08',
    tags: ['游戏行为', '玩家数据', '用户体验'],
    dataType: '文本数据集',
    size: '15GB',
    format: 'JSON'
  },
  {
    id: '50',
    name: 'Robotics-Simulation-Dataset',
    description: '机器人仿真数据集，包含机器人动作、传感器数据和环境交互信息',
    author: 'OpenCSG',
    downloads: 33000,
    stars: 920,
    lastUpdated: '2025-03-07',
    tags: ['机器人', '仿真数据', '传感器'],
    dataType: '多模态数据集',
    size: '280GB',
    format: 'Mixed'
  }
];

const dataTypes = ['全部', 'NLP数据集', '图像数据集', '音频数据集', '文本数据集', '多模态数据集'];
const sortOptions = ['最新更新', '下载量', '收藏数', '名称', '大小'];
const formats = ['全部', 'JSON', 'CSV', 'PNG', 'JPG', 'WAV', 'MP3', 'TXT', 'Mixed', 'COCO', 'DICOM', 'PDF', 'MIDI', 'MP4'];

export default function Data() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('全部');
  const [selectedFormat, setSelectedFormat] = React.useState('全部');
  const [sortBy, setSortBy] = React.useState('最新更新');

  const filteredDatasets = mockDatasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '全部' || dataset.dataType === selectedType;
    const matchesFormat = selectedFormat === '全部' || dataset.format === selectedFormat;
    return matchesSearch && matchesType && matchesFormat;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              数据集
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              探索和获取高质量的AI训练数据集。我们汇聚了各领域的优质数据资源，
              为您的机器学习项目提供强有力的数据支撑。
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-400">50+</span>
                <span>数据集</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">100+</span>
                <span>贡献者</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-400">15TB+</span>
                <span>数据量</span>
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
                placeholder="搜索数据集名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            {/* Data Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                {dataTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Format Filter */}
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 appearance-none"
              >
                {formats.map(format => (
                  <option key={format} value={format}>{format}</option>
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

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200 border border-gray-700 hover:border-gray-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{dataset.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">by {dataset.author}</p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block px-2 py-1 bg-green-600 text-green-100 text-xs rounded-full">
                      {dataset.dataType}
                    </span>
                    <span className="inline-block px-2 py-1 bg-purple-600 text-purple-100 text-xs rounded-full">
                      {dataset.format}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Star className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{dataset.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {dataset.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{(dataset.downloads / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{dataset.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Database className="w-4 h-4" />
                    <span>{dataset.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{dataset.lastUpdated}</span>
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
            加载更多数据集
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">数据集特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">多样化数据</h3>
              <p className="text-gray-400">涵盖文本、图像、音频等多种数据类型</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">高质量标注</h3>
              <p className="text-gray-400">经过专业标注和质量验证的数据集</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">标准格式</h3>
              <p className="text-gray-400">支持主流数据格式，便于直接使用</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Categories Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">数据分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'NLP数据集', count: '15+', icon: FileText, color: 'bg-blue-600' },
            { name: '图像数据集', count: '8+', icon: Eye, color: 'bg-green-600' },
            { name: '音频数据集', count: '6+', icon: Database, color: 'bg-purple-600' },
            { name: '多模态数据集', count: '21+', icon: Star, color: 'bg-orange-600' }
          ].map((category) => (
            <div key={category.name} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors duration-200 cursor-pointer">
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-2xl font-bold text-blue-400">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}