import { FiveElement, Product, getRecommendedProducts, products } from '@/config/fiveElements';

// 产品推荐服务
export class ProductRecommendationService {
  // 根据五行属性获取推荐产品
  static getRecommendationsForElement(element: FiveElement): Product[] {
    return getRecommendedProducts(element);
  }
  
  // 获取所有产品
  static getAllProducts(): Product[] {
    return [...products];
  }
  
  // 根据产品ID获取产品详情
  static getProductById(productId: string): Product | undefined {
    return products.find(product => product.id === productId);
  }
  
  // 获取主打产品（可以根据需求自定义逻辑）
  static getFeaturedProducts(limit: number = 3): Product[] {
    // 这里可以实现更复杂的逻辑，例如按照销量排序等
    // 这里只是简单地返回前几个产品
    return products.slice(0, limit);
  }
  
  // 按元素类型分组产品
  static getProductsByElementGroups(): Record<FiveElement, Product[]> {
    const result: Record<FiveElement, Product[]> = {
      '金': [],
      '木': [],
      '水': [],
      '火': [],
      '土': []
    };
    
    // 将产品按五行分组
    products.forEach(product => {
      product.elements.forEach(element => {
        if (result[element]) {
          result[element].push(product);
        }
      });
    });
    
    return result;
  }
  
  // 根据五行属性生成产品推荐理由
  static getRecommendationReason(element: FiveElement): string {
    const reasons: Record<FiveElement, string> = {
      '金': '您的五行属性偏向于金，适合使用能够增强或平衡金属性的产品。这些产品可以帮助您增强决断力和自信心。',
      '木': '您的五行属性偏向于木，适合使用能够增强或平衡木属性的产品。这些产品可以帮助您增强创造力和成长能力。',
      '水': '您的五行属性偏向于水，适合使用能够增强或平衡水属性的产品。这些产品可以帮助您增强智慧和适应能力。',
      '火': '您的五行属性偏向于火，适合使用能够增强或平衡火属性的产品。这些产品可以帮助您增强热情和表达能力。',
      '土': '您的五行属性偏向于土，适合使用能够增强或平衡土属性的产品。这些产品可以帮助您增强稳定性和踏实感。'
    };
    
    return reasons[element] || '根据您的五行属性，我们推荐以下产品，它们可以帮助您平衡五行能量。';
  }
} 