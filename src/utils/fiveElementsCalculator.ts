import { calculateFiveElements, FiveElement, RegionModifier, regions } from '@/config/fiveElements';
import { format, addHours } from 'date-fns';

// 五行计算器类
export class FiveElementsCalculator {
  // 计算指定日期、时间、国家和地区的五行
  static calculate(
    birthDate: Date,
    country: string,
    region: string
  ): {
    element: FiveElement;
    adjustedDate: Date;
    birthDateInfo: {
      year: number;
      month: number;
      day: number;
      hour: number;
    };
  } {
    // 获取地区时区调整
    const adjustedDate = this.adjustDateByRegion(birthDate, country, region);
    
    // 解析调整后的日期
    const year = adjustedDate.getFullYear();
    const month = adjustedDate.getMonth() + 1; // JavaScript 中月份从 0 开始
    const day = adjustedDate.getDate();
    const hour = adjustedDate.getHours();
    
    // 计算五行
    const element = calculateFiveElements(year, month, day, hour);
    
    return {
      element,
      adjustedDate,
      birthDateInfo: { year, month, day, hour }
    };
  }
  
  // 根据国家和地区调整时区
  private static adjustDateByRegion(date: Date, country: string, region: string): Date {
    // 获取地区的时区修正值
    const modifier = this.getRegionModifier(country, region);
    
    // 如果找不到修正值，返回原始日期
    if (modifier === null) {
      return date;
    }
    
    // 调整日期的时区（假设输入的日期是UTC时间）
    // 实际应用中可能需要更复杂的时区处理逻辑
    return addHours(date, modifier);
  }
  
  // 获取地区的时区修正值
  private static getRegionModifier(country: string, region: string): number | null {
    // 检查国家是否存在
    if (!regions[country]) {
      return null;
    }
    
    // 查找对应地区
    const regionInfo = regions[country].find(r => r.name === region);
    
    // 如果找不到地区，返回null
    if (!regionInfo) {
      return null;
    }
    
    return regionInfo.modifier;
  }
  
  // 获取可用的国家列表
  static getAvailableCountries(): string[] {
    return Object.keys(regions);
  }
  
  // 获取指定国家的地区列表
  static getRegionsForCountry(country: string): string[] {
    if (!regions[country]) {
      return [];
    }
    
    return regions[country].map(region => region.name);
  }
  
  // 格式化日期为友好显示
  static formatDate(date: Date): string {
    return format(date, 'yyyy年MM月dd日 HH:mm');
  }
} 