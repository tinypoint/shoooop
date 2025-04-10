# 五行分析与产品推荐系统

这是一个基于Next.js开发的Web应用，能够根据用户输入的国家、地区、出生年月日时信息，计算用户的五行属性，并推荐相应的产品。该应用可以集成到Shopify商店中。

## 功能特点

- 根据用户的出生信息（国家、地区、日期、时间）计算五行属性
- 根据计算出的五行属性推荐适合的产品
- 用户可以选择推荐的产品添加到购物车
- 与Shopify商店集成，实现无缝购物体验

## 技术栈

- **前端框架**：Next.js、React
- **样式**：Tailwind CSS
- **工具库**：date-fns (日期处理)、axios (HTTP请求)
- **集成**：Shopify API

## 快速开始

### 前提条件

- Node.js 16.x 或更高版本
- npm 或 yarn
- Shopify商店和API访问凭证

### 安装与配置

1. 克隆仓库
```bash
git clone <仓库URL>
cd <项目文件夹>
```

2. 安装依赖
```bash
npm install
# 或者
yarn install
```

3. 配置环境变量

复制`.env.local.example`文件为`.env.local`并填入您的Shopify API凭证：
```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_SHOP_NAME=your_shop_name_here
SHOPIFY_API_VERSION=2023-07
```

4. 启动开发服务器
```bash
npm run dev
# 或者
yarn dev
```

5. 访问 http://localhost:3000 开始使用应用

## 部署

### 部署到Vercel

1. 安装Vercel CLI
```bash
npm i -g vercel
```

2. 登录Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

### 集成到Shopify

1. 在Shopify合作伙伴仪表板中创建一个新的应用
2. 配置应用URL指向您部署的应用
3. 设置必要的API权限
4. 安装应用到您的Shopify商店

## 自定义

### 添加更多国家和地区

编辑`src/config/fiveElements.ts`文件，在`regions`对象中添加更多国家和地区信息。

### 修改五行计算逻辑

可以在`src/utils/fiveElementsCalculator.ts`文件中修改`calculate`方法来自定义五行计算逻辑。

### 添加新产品

在`src/config/fiveElements.ts`文件中的`products`数组中添加新的产品信息。

## 贡献指南

欢迎贡献代码和提出改进建议！请遵循以下步骤：

1. Fork项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

如有任何问题或建议，请联系项目维护者。
