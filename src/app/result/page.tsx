'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiveElementsCalculator } from '@/utils/fiveElementsCalculator';
import { FiveElement, Product } from '@/config/fiveElements';
import { ProductRecommendationService } from '@/services/productRecommendation';
import { ShopifyService } from '@/services/shopifyService';

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [element, setElement] = useState<FiveElement | null>(null);
  const [adjustedDate, setAdjustedDate] = useState<Date | null>(null);
  const [birthDateInfo, setBirthDateInfo] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [recommendationReason, setRecommendationReason] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [shopifyCartUrl, setShopifyCartUrl] = useState<string | null>(null);
  const [creatingCart, setCreatingCart] = useState(false);

  useEffect(() => {
    // 从URL参数中获取数据
    const country = searchParams.get('country');
    const region = searchParams.get('region');
    const birthDateStr = searchParams.get('birthDate');

    // 验证所有必要的参数都存在
    if (!country || !region || !birthDateStr) {
      setError('缺少必要的参数，请返回主页重试');
      setLoading(false);
      return;
    }

    try {
      // 设置页面状态
      setCountry(country);
      setRegion(region);

      // 解析出生日期
      const birthDate = new Date(birthDateStr);
      
      // 计算五行
      const result = FiveElementsCalculator.calculate(
        birthDate,
        country,
        region
      );
      
      // 更新状态
      setElement(result.element);
      setAdjustedDate(result.adjustedDate);
      setBirthDateInfo(result.birthDateInfo);
      
      // 获取产品推荐
      const products = ProductRecommendationService.getRecommendationsForElement(result.element);
      setRecommendedProducts(products);
      
      // 获取推荐理由
      const reason = ProductRecommendationService.getRecommendationReason(result.element);
      setRecommendationReason(reason);
      
      setLoading(false);
    } catch (error) {
      console.error('计算五行时出错:', error);
      setError('计算过程中出现错误，请返回重试');
      setLoading(false);
    }
  }, [searchParams]);

  // 选择或取消选择产品
  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    
    setSelectedProducts(newSelection);
  };

  // 创建Shopify购物车
  const createShopifyCart = async () => {
    if (selectedProducts.size === 0) {
      alert('请先选择至少一个产品');
      return;
    }
    
    setCreatingCart(true);
    
    try {
      // 准备产品列表
      const products = Array.from(selectedProducts).map(id => ({
        id,
        quantity: 1
      }));
      
      // 创建购物车
      const cartUrl = await ShopifyService.createShopifyCart(products);
      
      if (cartUrl) {
        setShopifyCartUrl(cartUrl);
      } else {
        alert('创建购物车失败，请稍后重试');
      }
    } catch (error) {
      console.error('创建购物车时出错:', error);
      alert('创建购物车时出错，请稍后重试');
    } finally {
      setCreatingCart(false);
    }
  };

  // 返回主页
  const goBack = () => {
    router.push('/');
  };

  // 加载中显示
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
          <h2 className="text-xl text-purple-700">正在计算您的五行属性...</h2>
        </div>
      </div>
    );
  }

  // 错误显示
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">出错了</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={goBack}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 结果摘要 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">您的五行分析结果</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">个人信息</h2>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium">出生国家:</span> {country}</li>
                <li><span className="font-medium">出生地区:</span> {region}</li>
                {adjustedDate && (
                  <li>
                    <span className="font-medium">出生日期时间:</span> {FiveElementsCalculator.formatDate(adjustedDate)}
                  </li>
                )}
                {birthDateInfo && (
                  <li>
                    <span className="font-medium">农历参考信息:</span> 
                    (这里可以添加农历信息，如果有相关计算)
                  </li>
                )}
              </ul>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-purple-700">{element}</span>
              </div>
              <h2 className="text-xl font-semibold text-purple-700">您的五行属性偏向于 {element}</h2>
            </div>
          </div>
        </div>
        
        {/* 推荐理由 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">推荐理由</h2>
          <p className="text-gray-700">{recommendationReason}</p>
        </div>
        
        {/* 产品推荐 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">为您推荐的产品</h2>
          
          {recommendedProducts.length === 0 ? (
            <p className="text-center text-gray-600">没有找到适合您五行属性的产品</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    selectedProducts.has(product.id) ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    {/* 实际开发时应替换为真实的产品图片 */}
                    <div className="w-full h-48 bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-700 font-medium">{product.name} 图片</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700 font-bold">¥{product.price.toLocaleString()}</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-purple-600"
                          checked={selectedProducts.has(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                        />
                        <span className="ml-2 text-gray-700">选择</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={goBack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            返回重新计算
          </button>
          
          <button
            onClick={createShopifyCart}
            disabled={selectedProducts.size === 0 || creatingCart}
            className={`
              font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              ${
                selectedProducts.size === 0 || creatingCart
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }
            `}
          >
            {creatingCart ? '正在创建购物车...' : '添加选中商品到购物车'}
          </button>
        </div>
        
        {/* Shopify购物车链接 */}
        {shopifyCartUrl && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg text-center">
            <p className="mb-4">购物车已创建！点击下面的按钮继续购物流程：</p>
            <a
              href={shopifyCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              前往购物车结算
            </a>
          </div>
        )}
      </div>
    </main>
  );
} 