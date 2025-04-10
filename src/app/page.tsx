'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiveElementsCalculator } from '@/utils/fiveElementsCalculator';

export default function Home() {
  const router = useRouter();
  const [countries, setCountries] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 页面加载时获取可用的国家列表
  useEffect(() => {
    const availableCountries = FiveElementsCalculator.getAvailableCountries();
    setCountries(availableCountries);
    
    // 默认选择第一个国家
    if (availableCountries.length > 0) {
      handleCountryChange(availableCountries[0]);
    }
  }, []);

  // 处理国家选择变化
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedRegion(''); // 重置地区选择
    
    // 获取选定国家的地区列表
    const availableRegions = FiveElementsCalculator.getRegionsForCountry(country);
    setRegions(availableRegions);
    
    // 默认选择第一个地区
    if (availableRegions.length > 0) {
      setSelectedRegion(availableRegions[0]);
    }
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!selectedCountry || !selectedRegion || !birthDate || !birthTime) {
      setError('请填写所有必填字段');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 组合日期和时间
      const dateTimeString = `${birthDate}T${birthTime}:00`;
      const birthDateTime = new Date(dateTimeString);
      
      // 导航到结果页面，传递必要的参数
      const params = new URLSearchParams({
        country: selectedCountry,
        region: selectedRegion,
        birthDate: birthDateTime.toISOString(),
      });
      
      router.push(`/result?${params.toString()}`);
    } catch (error) {
      console.error('处理表单时出错:', error);
      setError('提交表单时出错，请检查输入并重试');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">五行属性分析与产品推荐</h1>
          <p className="text-xl text-gray-600">
            根据您的出生信息，我们将分析您的五行属性，并为您推荐最合适的产品
          </p>
        </div>
        
        {/* 介绍卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">什么是五行分析？</h2>
          <p className="text-gray-700 mb-4">
            五行（金、木、水、火、土）是中国古代哲学中对自然界基本物质形态的归纳和分类。
            通过分析您的出生日期、时间和地点，我们可以计算出您的五行属性倾向，
            并据此为您推荐能够平衡或增强特定五行能量的产品。
          </p>
          <p className="text-gray-700">
            无论您是想增强特定五行属性，还是平衡整体五行能量，我们都能为您提供专业的产品推荐。
          </p>
        </div>
        
        {/* 表单部分 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">输入您的信息</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 国家选择 */}
              <div>
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                  出生国家
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">选择国家</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 地区选择 */}
              <div>
                <label htmlFor="region" className="block text-gray-700 font-medium mb-2">
                  出生地区
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">选择地区</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 出生日期 */}
              <div>
                <label htmlFor="birthDate" className="block text-gray-700 font-medium mb-2">
                  出生日期
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              {/* 出生时间 */}
              <div>
                <label htmlFor="birthTime" className="block text-gray-700 font-medium mb-2">
                  出生时间
                </label>
                <input
                  type="time"
                  id="birthTime"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            {/* 提交按钮 */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? '计算中...' : '分析我的五行'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
