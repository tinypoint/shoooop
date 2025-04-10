// 五行元素类型
export type FiveElement = '金' | '木' | '水' | '火' | '土';

// 地区和国家对应的修正配置
export interface RegionModifier {
  name: string;
  modifier: number; // 时间修正值（小时）
}

// 产品类型
export interface Product {
  id: string;
  name: string;
  description: string;
  elements: FiveElement[]; // 适合的五行元素
  imageUrl: string;
  price: number;
  shopifyProductId?: string; // Shopify商品ID，用于集成
}

// 地区配置
export const regions: Record<string, RegionModifier[]> = {
  '中国': [
    { name: '北京', modifier: 8 },
    { name: '上海', modifier: 8 },
    { name: '广州', modifier: 8 },
    // 可以添加更多地区
  ],
  '美国': [
    { name: '纽约', modifier: -5 },
    { name: '洛杉矶', modifier: -8 },
    { name: '芝加哥', modifier: -6 },
    // 可以添加更多地区
  ],
  '日本': [
    { name: '东京', modifier: 9 },
    { name: '大阪', modifier: 9 },
    // 可以添加更多地区
  ],
  // 可以添加更多国家
};

// 根据生日时间计算五行的规则
// 这里是一个简化的计算方式，实际的五行计算可能更复杂
export const calculateFiveElements = (
  year: number,
  month: number,
  day: number,
  hour: number
): FiveElement => {
  // 简化的五行计算逻辑，可根据实际需求修改
  const yearMod = year % 10;
  const monthMod = month % 5;
  const dayMod = day % 5;
  const hourMod = hour % 5;
  
  const sum = (yearMod + monthMod + dayMod + hourMod) % 5;
  
  // 根据余数返回五行属性
  switch (sum) {
    case 0: return '金';
    case 1: return '木';
    case 2: return '水';
    case 3: return '火';
    case 4: return '土';
    default: return '金'; // 默认值
  }
};

// 产品列表
export const products: Product[] = [
  {
    id: '1',
    name: '翡翠手镯',
    description: '天然A货翡翠手镯，增强木属性，适合缺木之人',
    elements: ['木'],
    imageUrl: '/products/jade-bracelet.jpg',
    price: 2999,
  },
  {
    id: '2',
    name: '红玛瑙吊坠',
    description: '天然红玛瑙，增强火属性，适合缺火之人',
    elements: ['火'],
    imageUrl: '/products/red-agate-pendant.jpg',
    price: 999,
  },
  {
    id: '3',
    name: '黑曜石手链',
    description: '天然黑曜石，增强水属性，适合缺水之人',
    elements: ['水'],
    imageUrl: '/products/obsidian-bracelet.jpg',
    price: 799,
  },
  {
    id: '4',
    name: '白玉吊坠',
    description: '天然和田白玉，增强金属性，适合缺金之人',
    elements: ['金'],
    imageUrl: '/products/white-jade-pendant.jpg',
    price: 1999,
  },
  {
    id: '5',
    name: '黄水晶项链',
    description: '天然黄水晶，增强土属性，适合缺土之人',
    elements: ['土'],
    imageUrl: '/products/yellow-crystal-necklace.jpg',
    price: 1299,
  },
  {
    id: '6',
    name: '五行平衡手链',
    description: '融合五种宝石，平衡五行能量',
    elements: ['金', '木', '水', '火', '土'],
    imageUrl: '/products/five-elements-bracelet.jpg',
    price: 3999,
  },
];

// 根据五行推荐产品
export const getRecommendedProducts = (element: FiveElement): Product[] => {
  return products.filter(product => product.elements.includes(element));
}; 